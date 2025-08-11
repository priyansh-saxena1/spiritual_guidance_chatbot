from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os
from typing import Optional

# Load environment variables
load_dotenv()

class Database:
    client: Optional[AsyncIOMotorClient] = None

db = Database()

async def get_database():
    return db.client[os.getenv("DATABASE_NAME", "dscpl_spiritual")]

async def connect_to_mongo():
    """Create database connection"""
    database_url = os.getenv("DATABASE_URL", "mongodb://localhost:27017")
    db.client = AsyncIOMotorClient(database_url)
    try:
        # Test the connection
        await db.client.server_info()
        print(f"✅ Connected to MongoDB at {database_url}")
    except Exception as e:
        print(f"❌ Failed to connect to MongoDB: {e}")
        # For development, continue without MongoDB
        print("🔄 Continuing in development mode...")
    
async def close_mongo_connection():
    """Close database connection"""
    if db.client:
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

async def get_content_collection():
    database = await get_database()
    return database.spiritual_content
