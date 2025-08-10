from fastapi import APIRouter, HTTPException, Depends, status
from typing import Dict, Any
import json
from bson import ObjectId

from app.models import APIResponse, User
from app.auth import get_current_user
from app.database import get_programs_collection
from app.redis_client import get_redis_client
from app.ai import generate_spiritual_content
from app.models import ContentGenerateRequest, DailyContent

content_router = APIRouter()

@content_router.get("/daily/{program_id}/{day}", response_model=APIResponse)
async def get_daily_content(
    program_id: str,
    day: int,
    current_user: User = Depends(get_current_user)
):
    """Get daily spiritual content for a specific program and day"""
    
    try:
        programs = await get_programs_collection()
        
        # Get program and verify ownership
        program_doc = await programs.find_one({
            "_id": ObjectId(program_id),
            "user_id": current_user.id
        })
        
        if not program_doc:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Program not found"
            )
        
        # Validate day range
        if day < 1 or day > program_doc["duration_days"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid day number"
            )
        
        # Check if content exists in program document
        daily_content_key = f"day_{day}"
        if daily_content_key in program_doc.get("daily_content", {}):
            content_data = program_doc["daily_content"][daily_content_key]
            return APIResponse(
                success=True,
                data=content_data,
                message="Daily content retrieved successfully"
            )
        
        # Check Redis cache
        redis_client = await get_redis_client()
        cache_key = f"content:{program_doc['program_type']}:{program_doc['topic']}:{day}:{current_user.ishta_devata}"
        
        if redis_client:
            cached_content = await redis_client.get(cache_key)
            if cached_content:
                content_data = json.loads(cached_content)
                
                # Store in program document for future access
                await programs.update_one(
                    {"_id": ObjectId(program_id)},
                    {"$set": {f"daily_content.{daily_content_key}": content_data}}
                )
                
                return APIResponse(
                    success=True,
                    data=content_data,
                    message="Daily content retrieved from cache"
                )
        
        # Generate new content if not found
        content_request = ContentGenerateRequest(
            program_type=program_doc["program_type"],
            topic=program_doc["topic"],
            spiritual_path=current_user.spiritual_path,
            ishta_devata=current_user.ishta_devata,
            day=day
        )
        
        # Use the AI service to generate content
        from app.ai import get_spiritual_prompt, model
        prompt = get_spiritual_prompt(content_request)
        response = model.generate_content(prompt)
        
        try:
            content_text = response.text.strip()
            # Remove any markdown formatting if present
            if content_text.startswith("```json"):
                content_text = content_text[7:-3]
            elif content_text.startswith("```"):
                content_text = content_text[3:-3]
            
            content_data = json.loads(content_text)
            
            # Validate content structure
            daily_content = DailyContent(day=day, **content_data)
            
            # Cache the content for 24 hours
            if redis_client:
                await redis_client.setex(cache_key, 86400, json.dumps(content_data))
            
            # Store in program document
            await programs.update_one(
                {"_id": ObjectId(program_id)},
                {"$set": {f"daily_content.{daily_content_key}": content_data}}
            )
            
            return APIResponse(
                success=True,
                data=content_data,
                message="Daily content generated and retrieved successfully"
            )
            
        except json.JSONDecodeError:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to parse AI generated content"
            )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get daily content: {str(e)}"
        )

@content_router.post("/regenerate/{program_id}/{day}", response_model=APIResponse)
async def regenerate_daily_content(
    program_id: str,
    day: int,
    current_user: User = Depends(get_current_user)
):
    """Regenerate daily content for a specific program and day"""
    
    try:
        programs = await get_programs_collection()
        
        # Get program and verify ownership
        program_doc = await programs.find_one({
            "_id": ObjectId(program_id),
            "user_id": current_user.id
        })
        
        if not program_doc:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Program not found"
            )
        
        # Validate day range
        if day < 1 or day > program_doc["duration_days"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid day number"
            )
        
        # Clear cache
        redis_client = await get_redis_client()
        cache_key = f"content:{program_doc['program_type']}:{program_doc['topic']}:{day}:{current_user.ishta_devata}"
        if redis_client:
            await redis_client.delete(cache_key)
        
        # Generate fresh content
        content_request = ContentGenerateRequest(
            program_type=program_doc["program_type"],
            topic=program_doc["topic"],
            spiritual_path=current_user.spiritual_path,
            ishta_devata=current_user.ishta_devata,
            day=day
        )
        
        from app.ai import get_spiritual_prompt, model
        prompt = get_spiritual_prompt(content_request)
        response = model.generate_content(prompt)
        
        try:
            content_text = response.text.strip()
            if content_text.startswith("```json"):
                content_text = content_text[7:-3]
            elif content_text.startswith("```"):
                content_text = content_text[3:-3]
            
            content_data = json.loads(content_text)
            
            # Validate content structure
            daily_content = DailyContent(day=day, **content_data)
            
            # Cache the new content
            if redis_client:
                await redis_client.setex(cache_key, 86400, json.dumps(content_data))
            
            # Update program document
            daily_content_key = f"day_{day}"
            await programs.update_one(
                {"_id": ObjectId(program_id)},
                {"$set": {f"daily_content.{daily_content_key}": content_data}}
            )
            
            return APIResponse(
                success=True,
                data=content_data,
                message="Daily content regenerated successfully"
            )
            
        except json.JSONDecodeError:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to parse regenerated content"
            )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to regenerate content: {str(e)}"
        )
