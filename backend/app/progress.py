from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from datetime import datetime, timedelta
from bson import ObjectId

from app.models import (
    ProgressUpdate, Progress, ProgressStats, APIResponse, User
)
from app.auth import get_current_user
from app.database import get_progress_collection, get_programs_collection

progress_router = APIRouter()

@progress_router.post("/update", response_model=APIResponse)
async def update_progress(
    progress_data: ProgressUpdate,
    current_user: User = Depends(get_current_user)
):
    """Update daily progress for a program"""
    
    try:
        programs = await get_programs_collection()
        progress_collection = await get_progress_collection()
        
        # Verify program ownership
        program_doc = await programs.find_one({
            "_id": ObjectId(progress_data.program_id),
            "user_id": current_user.id
        })
        
        if not program_doc:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Program not found"
            )
        
        # Validate day number
        if progress_data.day_number < 1 or progress_data.day_number > program_doc["duration_days"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid day number"
            )
        
        # Check if progress already exists for this day
        existing_progress = await progress_collection.find_one({
            "program_id": progress_data.program_id,
            "day_number": progress_data.day_number
        })
        
        if existing_progress:
            # Update existing progress
            update_data = {
                "completed": progress_data.completed,
                "completed_at": datetime.utcnow() if progress_data.completed else None
            }
            
            if progress_data.reflection_notes:
                update_data["reflection_notes"] = progress_data.reflection_notes
            
            await progress_collection.update_one(
                {"_id": existing_progress["_id"]},
                {"$set": update_data}
            )
            
            progress_doc = await progress_collection.find_one({"_id": existing_progress["_id"]})
        else:
            # Create new progress entry
            progress_doc = {
                "program_id": progress_data.program_id,
                "day_number": progress_data.day_number,
                "completed": progress_data.completed,
                "reflection_notes": progress_data.reflection_notes,
                "completed_at": datetime.utcnow() if progress_data.completed else None
            }
            
            result = await progress_collection.insert_one(progress_doc)
            progress_doc["_id"] = result.inserted_id
        
        # Update program's current day if this is the next day
        if progress_data.completed and progress_data.day_number >= program_doc["current_day"]:
            await programs.update_one(
                {"_id": ObjectId(progress_data.program_id)},
                {"$set": {"current_day": min(progress_data.day_number + 1, program_doc["duration_days"])}}
            )
        
        # Convert to response format
        progress_doc["id"] = str(progress_doc["_id"])
        progress_doc.pop("_id", None)
        
        return APIResponse(
            success=True,
            data=progress_doc,
            message="Progress updated successfully"
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update progress: {str(e)}"
        )

@progress_router.get("/stats/{user_id}", response_model=APIResponse)
async def get_progress_stats(
    user_id: str,
    current_user: User = Depends(get_current_user)
):
    """Get comprehensive progress statistics for a user"""
    
    # Ensure user can only access their own stats
    if current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )
    
    try:
        programs = await get_programs_collection()
        progress_collection = await get_progress_collection()
        
        # Get all user programs
        user_programs = await programs.find({"user_id": user_id}).to_list(1000)
        
        total_programs = len(user_programs)
        completed_programs = len([p for p in user_programs if p["status"] == "completed"])
        active_programs = len([p for p in user_programs if p["status"] == "active"])
        
        # Get all progress entries for user's programs
        program_ids = [str(p["_id"]) for p in user_programs]
        all_progress = await progress_collection.find({
            "program_id": {"$in": program_ids},
            "completed": True
        }).sort("completed_at", 1).to_list(10000)
        
        total_days_completed = len(all_progress)
        
        # Calculate current streak
        current_streak = 0
        if all_progress:
            # Get recent progress entries sorted by completion date
            recent_progress = sorted(all_progress, key=lambda x: x.get("completed_at", datetime.min), reverse=True)
            
            today = datetime.utcnow().date()
            current_date = today
            
            for progress in recent_progress:
                progress_date = progress.get("completed_at", datetime.min).date()
                
                # Check if this progress is from current_date or the day before
                if progress_date == current_date:
                    current_streak += 1
                    current_date -= timedelta(days=1)
                elif progress_date == current_date - timedelta(days=1):
                    current_streak += 1
                    current_date = progress_date - timedelta(days=1)
                else:
                    break
        
        # Calculate longest streak
        longest_streak = 0
        if all_progress:
            # Group progress by date
            progress_dates = set()
            for progress in all_progress:
                if progress.get("completed_at"):
                    progress_dates.add(progress["completed_at"].date())
            
            # Convert to sorted list
            sorted_dates = sorted(list(progress_dates))
            
            if sorted_dates:
                current_streak_count = 1
                longest_streak = 1
                
                for i in range(1, len(sorted_dates)):
                    if sorted_dates[i] == sorted_dates[i-1] + timedelta(days=1):
                        current_streak_count += 1
                        longest_streak = max(longest_streak, current_streak_count)
                    else:
                        current_streak_count = 1
        
        stats = ProgressStats(
            total_programs=total_programs,
            completed_programs=completed_programs,
            active_programs=active_programs,
            total_days_completed=total_days_completed,
            current_streak=current_streak,
            longest_streak=longest_streak
        )
        
        return APIResponse(
            success=True,
            data=stats,
            message="Progress statistics retrieved successfully"
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get progress stats: {str(e)}"
        )

@progress_router.get("/history/{program_id}", response_model=APIResponse)
async def get_program_progress_history(
    program_id: str,
    current_user: User = Depends(get_current_user)
):
    """Get progress history for a specific program"""
    
    try:
        programs = await get_programs_collection()
        progress_collection = await get_progress_collection()
        
        # Verify program ownership
        program_doc = await programs.find_one({
            "_id": ObjectId(program_id),
            "user_id": current_user.id
        })
        
        if not program_doc:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Program not found"
            )
        
        # Get all progress entries for this program
        progress_entries = await progress_collection.find({
            "program_id": program_id
        }).sort("day_number", 1).to_list(100)
        
        # Convert to response format
        progress_list = []
        for entry in progress_entries:
            entry["id"] = str(entry["_id"])
            entry.pop("_id", None)
            progress_list.append(entry)
        
        return APIResponse(
            success=True,
            data=progress_list,
            message="Program progress history retrieved successfully"
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get progress history: {str(e)}"
        )
