from motor.motor_asyncio import AsyncIOMotorClient
import os
from typing import Optional

class Database:
    client: Optional[AsyncIOMotorClient] = None

db = Database()

async def get_database():
    return db.client.dscpl_db

async def connect_to_mongo():
    """Create database connection"""
    db.client = AsyncIOMotorClient(os.getenv("MONGODB_URI"))
    
async def close_mongo_connection():
    """Close database connection"""
    db.client.close()

# Collection helpers
async def get_users_collection():
    database = await get_database()
    return database.users

async def get_programs_collection():
    database = await get_database()
    return database.programs

async def get_progress_collection():
    database = await get_database()
    return database.user_progress
