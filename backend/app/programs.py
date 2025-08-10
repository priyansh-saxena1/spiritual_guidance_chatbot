from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from datetime import datetime
from bson import ObjectId

from app.models import (
    ProgramCreate, Program, APIResponse, User, ProgramStatus
)
from app.auth import get_current_user
from app.database import get_programs_collection

programs_router = APIRouter()

@programs_router.post("", response_model=APIResponse)
async def create_program(
    program_data: ProgramCreate,
    current_user: User = Depends(get_current_user)
):
    programs = await get_programs_collection()
    
    # Create new program
    program_doc = {
        "user_id": current_user.id,
        "program_type": program_data.program_type,
        "topic": program_data.topic,
        "duration_days": program_data.duration_days,
        "current_day": 1,
        "status": ProgramStatus.ACTIVE,
        "daily_content": {},
        "created_at": datetime.utcnow()
    }
    
    result = await programs.insert_one(program_doc)
    
    # Return created program
    program_doc["id"] = str(result.inserted_id)
    program_doc.pop("_id", None)
    
    return APIResponse(
        success=True,
        data=program_doc,
        message="Program created successfully"
    )

@programs_router.get("/{user_id}", response_model=APIResponse)
async def get_user_programs(
    user_id: str,
    current_user: User = Depends(get_current_user)
):
    # Ensure user can only access their own programs
    if current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )
    
    programs = await get_programs_collection()
    program_docs = await programs.find({"user_id": user_id}).to_list(100)
    
    # Convert MongoDB documents to Program models
    user_programs = []
    for doc in program_docs:
        doc["id"] = str(doc["_id"])
        doc.pop("_id", None)
        user_programs.append(doc)
    
    return APIResponse(
        success=True,
        data=user_programs,
        message="Programs retrieved successfully"
    )

@programs_router.put("/{program_id}/status", response_model=APIResponse)
async def update_program_status(
    program_id: str,
    status: ProgramStatus,
    current_user: User = Depends(get_current_user)
):
    programs = await get_programs_collection()
    
    # Verify program ownership
    program_doc = await programs.find_one({"_id": ObjectId(program_id), "user_id": current_user.id})
    if not program_doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Program not found"
        )
    
    # Update status
    await programs.update_one(
        {"_id": ObjectId(program_id)},
        {"$set": {"status": status}}
    )
    
    return APIResponse(
        success=True,
        data={"program_id": program_id, "status": status},
        message="Program status updated successfully"
    )

@programs_router.get("/{program_id}/details", response_model=APIResponse)
async def get_program_details(
    program_id: str,
    current_user: User = Depends(get_current_user)
):
    programs = await get_programs_collection()
    
    # Get program and verify ownership
    program_doc = await programs.find_one({"_id": ObjectId(program_id), "user_id": current_user.id})
    if not program_doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Program not found"
        )
    
    program_doc["id"] = str(program_doc["_id"])
    program_doc.pop("_id", None)
    
    return APIResponse(
        success=True,
        data=program_doc,
        message="Program details retrieved successfully"
    )
