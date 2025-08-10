from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum

# Enums
class SpiritualPath(str, Enum):
    BHAKTI = "bhakti"
    JNANA = "jnana" 
    KARMA = "karma"
    RAJA = "raja"

class IshtaDevata(str, Enum):
    KRISHNA = "krishna"
    SHIVA = "shiva"
    DEVI = "devi"
    RAMA = "rama"
    GANESHA = "ganesha"
    HANUMAN = "hanuman"

class ProgramType(str, Enum):
    SATSANG = "satsang"
    JAPA = "japa"
    DHYANA = "dhyana"
    COMBINED = "combined"

class ProgramStatus(str, Enum):
    ACTIVE = "active"
    COMPLETED = "completed"
    PAUSED = "paused"

# User Models
class UserCreate(BaseModel):
    email: EmailStr
    name: str = Field(..., min_length=2, max_length=50)
    password: str = Field(..., min_length=6)
    spiritual_path: SpiritualPath
    ishta_devata: IshtaDevata

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(BaseModel):
    id: str = Field(alias="_id")
    email: EmailStr
    name: str
    spiritual_path: SpiritualPath
    ishta_devata: IshtaDevata
    created_at: datetime

    class Config:
        populate_by_name = True

class UserInDB(User):
    hashed_password: str

# Program Models
class ProgramCreate(BaseModel):
    program_type: ProgramType
    topic: str = Field(..., min_length=3, max_length=100)
    duration_days: int = Field(default=7, ge=1, le=30)

class Program(BaseModel):
    id: str = Field(alias="_id")
    user_id: str
    program_type: ProgramType
    topic: str
    duration_days: int
    current_day: int = 1
    status: ProgramStatus = ProgramStatus.ACTIVE
    daily_content: Dict[str, Any] = {}
    created_at: datetime

    class Config:
        populate_by_name = True

# Content Models
class SatsangContent(BaseModel):
    scripture: Dict[str, str]
    explanation: str
    practical_application: str
    reflection_questions: List[str]

class JapaContent(BaseModel):
    mantra: str
    translation: str
    pronunciation: str
    repetitions: int = 108
    duration: str = "15 minutes"

class DhyanaContent(BaseModel):
    technique: str
    instructions: List[str]
    duration: str = "10 minutes"
    focus_point: str

class DailyContent(BaseModel):
    day: int
    satsang: Optional[SatsangContent] = None
    japa: Optional[JapaContent] = None
    dhyana: Optional[DhyanaContent] = None

class ContentGenerateRequest(BaseModel):
    program_type: ProgramType
    topic: str
    spiritual_path: SpiritualPath
    ishta_devata: IshtaDevata
    day: int

# Progress Models
class ProgressUpdate(BaseModel):
    program_id: str
    day_number: int
    completed: bool = True
    reflection_notes: Optional[str] = None

class Progress(BaseModel):
    id: str = Field(alias="_id")
    program_id: str
    day_number: int
    completed: bool
    reflection_notes: Optional[str] = None
    completed_at: Optional[datetime] = None

    class Config:
        populate_by_name = True

class ProgressStats(BaseModel):
    total_programs: int
    completed_programs: int
    active_programs: int
    total_days_completed: int
    current_streak: int
    longest_streak: int

# Response Models
class APIResponse(BaseModel):
    success: bool
    data: Optional[Any] = None
    message: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

# Chat Models
class ChatRequest(BaseModel):
    message: str = Field(..., max_length=1000)
    context: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    filtered: bool = False
    warning: Optional[str] = None
