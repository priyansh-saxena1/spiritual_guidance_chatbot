import redis.asyncio as aioredis
import os
from typing import Optional

class RedisClient:
    client: Optional[aioredis.Redis] = None

redis_client = RedisClient()

async def get_redis_client():
    return redis_client.client

async def connect_to_redis():
    """Create Redis connection"""
    redis_client.client = aioredis.from_url(os.getenv("REDIS_URL", "redis://localhost:6379"))
    
async def close_redis_connection():
    """Close Redis connection"""
    if redis_client.client:
        await redis_client.client.close()
