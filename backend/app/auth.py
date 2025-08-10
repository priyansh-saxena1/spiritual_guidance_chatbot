from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
import os
from typing import Optional

from app.models import UserCreate, UserLogin, User, UserInDB, TokenResponse, APIResponse
from app.database import get_users_collection

# Security setup
security = HTTPBearer()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

auth_router = APIRouter()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def authenticate_user(email: str, password: str) -> Optional[UserInDB]:
    users = await get_users_collection()
    user_doc = await users.find_one({"email": email})
    if not user_doc:
        return None
    user = UserInDB(**user_doc)
    if not verify_password(password, user.hashed_password):
        return None
    return user

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    users = await get_users_collection()
    user_doc = await users.find_one({"email": email})
    if user_doc is None:
        raise credentials_exception
    
    # Convert MongoDB document to User model
    user_doc["id"] = str(user_doc["_id"])
    return User(**user_doc)

@auth_router.post("/register", response_model=APIResponse)
async def register(user: UserCreate):
    users = await get_users_collection()
    
    # Check if user exists
    existing_user = await users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    hashed_password = get_password_hash(user.password)
    user_doc = {
        "email": user.email,
        "name": user.name,
        "hashed_password": hashed_password,
        "spiritual_path": user.spiritual_path,
        "ishta_devata": user.ishta_devata,
        "created_at": datetime.utcnow()
    }
    
    result = await users.insert_one(user_doc)
    
    # Return user data without password
    user_doc["id"] = str(result.inserted_id)
    user_doc.pop("hashed_password", None)
    user_doc.pop("_id", None)
    
    return APIResponse(
        success=True,
        data=user_doc,
        message="User registered successfully"
    )

@auth_router.post("/login", response_model=APIResponse)
async def login(user_credentials: UserLogin):
    user = await authenticate_user(user_credentials.email, user_credentials.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    
    return APIResponse(
        success=True,
        data=TokenResponse(access_token=access_token, token_type="bearer"),
        message="Login successful"
    )

@auth_router.get("/profile", response_model=APIResponse)
async def get_profile(current_user: User = Depends(get_current_user)):
    return APIResponse(
        success=True,
        data=current_user,
        message="Profile retrieved successfully"
    )
