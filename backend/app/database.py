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
    if db.client is None:
        return None
    return db.client[os.getenv("DATABASE_NAME", "dscpl_spiritual")]

async def connect_to_mongo():
    """Create database connection"""
    database_url = os.getenv("DATABASE_URL", "mongodb://localhost:27017")
    
    # Multiple connection strategies for MongoDB Atlas
    connection_strategies = [
        # Strategy 1: Standard SSL with certificate validation disabled
        {
            "ssl": True,
            "tlsAllowInvalidCertificates": True,
            "tlsAllowInvalidHostnames": True,
            "serverSelectionTimeoutMS": 5000
        },
        # Strategy 2: No SSL (fallback)
        {
            "ssl": False,
            "serverSelectionTimeoutMS": 5000
        },
        # Strategy 3: Standard connection
        {}
    ]
    
    for i, options in enumerate(connection_strategies, 1):
        try:
            print(f"🔄 Attempting MongoDB connection strategy {i}...")
            
            if "mongodb+srv://" in database_url or "mongodb://" in database_url:
                db.client = AsyncIOMotorClient(database_url, **options)
            else:
                db.client = AsyncIOMotorClient("mongodb://localhost:27017")
            
            # Test the connection with a short timeout
            await db.client.server_info()
            print(f"✅ Connected to MongoDB successfully with strategy {i}")
            return
            
        except Exception as e:
            print(f"❌ Strategy {i} failed: {str(e)[:100]}...")
            if db.client:
                db.client.close()
                db.client = None
    
    print("⚠️ All MongoDB connection strategies failed. Running in offline mode.")
    print("🔄 Continuing in development mode...")

async def close_mongo_connection():
    """Close database connection"""
    if db.client:
        db.client.close()

def is_database_connected():
    """Check if database is available"""
    return db.client is not None

# Collection helpers
async def get_users_collection():
    database = await get_database()
    if database is None:
        return None
    return database.users

async def get_programs_collection():
    database = await get_database()
    if database is None:
        return None
    return database.programs

async def get_progress_collection():
    database = await get_database()
    if database is None:
        return None
    return database.user_progress

async def get_content_collection():
    database = await get_database()
    if database is None:
        return None
    return database.spiritual_content
