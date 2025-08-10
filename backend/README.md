# DSCPL Hindu Spiritual Assistant - Backend

A FastAPI backend service for the DSCPL Hindu Spiritual Assistant, providing spiritual guidance through daily programs, AI-generated content, and progress tracking.

## Features

- **User Authentication**: JWT-based registration and login
- **Spiritual Programs**: Create and manage 7-day spiritual practice programs
- **AI Content Generation**: Generate authentic Hindu spiritual content using Google Gemini
- **Progress Tracking**: Track daily progress and spiritual journey statistics
- **Caching**: Redis-based caching for improved performance
- **Rate Limiting**: Built-in API rate limiting

## Technology Stack

- **FastAPI**: Modern Python web framework
- **MongoDB**: Database with Motor async driver
- **Redis**: Caching and session management
- **Google Gemini AI**: Content generation
- **JWT**: Authentication tokens
- **Pydantic**: Data validation

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Environment Configuration

Copy `.env.example` to `.env` and configure:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dscpl_db
REDIS_URL=redis://localhost:6379
SECRET_KEY=your-super-secret-jwt-key
GOOGLE_GEMINI_API_KEY=your-google-gemini-api-key
FRONTEND_URL=http://localhost:3000
```

### 3. Database Setup

- Create a MongoDB Atlas account (free tier)
- Create a new cluster and database named `dscpl_db`
- Update the connection string in `.env`

### 4. Redis Setup

- Install Redis locally or use a cloud service
- Update the Redis URL in `.env`

### 5. Google Gemini API

- Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
- Generate an API key
- Add it to your `.env` file

### 6. Run the Application

```bash
# Development server with auto-reload
python run.py

# Or using uvicorn directly
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/profile` - Get user profile

### Programs
- `POST /api/v1/programs` - Create spiritual program
- `GET /api/v1/programs/{user_id}` - Get user programs
- `PUT /api/v1/programs/{program_id}/status` - Update program status
- `GET /api/v1/programs/{program_id}/details` - Get program details

### Content
- `GET /api/v1/content/daily/{program_id}/{day}` - Get daily content
- `POST /api/v1/content/regenerate/{program_id}/{day}` - Regenerate content

### AI Content Generation
- `POST /api/v1/ai/generate-content` - Generate spiritual content
- `GET /api/v1/ai/sample-content/{program_type}` - Get sample content

### Progress Tracking
- `POST /api/v1/progress/update` - Update daily progress
- `GET /api/v1/progress/stats/{user_id}` - Get progress statistics
- `GET /api/v1/progress/history/{program_id}` - Get program progress

## Spiritual Content Types

### Satsang (Devotional Study)
- Scripture verses with translations
- Detailed explanations
- Practical applications
- Reflection questions

### Japa (Mantra Recitation)
- Sanskrit mantras
- Pronunciation guides
- Meanings and benefits
- Practice instructions

### Dhyana (Meditation)
- Meditation techniques
- Step-by-step instructions
- Duration and focus points
- Progressive practices

## Deployment

### Railway/Render (Recommended)

1. Connect your GitHub repository
2. Set environment variables
3. Deploy with default Python buildpack

### Docker Deployment

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY app/ ./app/
COPY run.py .

EXPOSE 8000
CMD ["python", "run.py"]
```

## Project Structure

```
backend/
├── app/
│   ├── main.py          # FastAPI application
│   ├── models.py        # Pydantic models
│   ├── database.py      # MongoDB connection
│   ├── redis_client.py  # Redis connection
│   ├── auth.py          # Authentication logic
│   ├── programs.py      # Program management
│   ├── content.py       # Content delivery
│   ├── ai.py            # AI content generation
│   └── progress.py      # Progress tracking
├── requirements.txt     # Python dependencies
├── .env.example        # Environment template
├── run.py              # Application runner
└── README.md           # Documentation
```

## API Response Format

All API responses follow this structure:

```json
{
  "success": boolean,
  "data": object,
  "message": string
}
```

## Authentication

Protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

## Rate Limiting

- 100 requests per minute per IP for most endpoints
- 5 requests per minute for health check
- Rate limits can be configured in environment variables

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Caching Strategy

- Daily spiritual content cached for 24 hours
- Cache keys include program type, topic, day, and deity
- Redis used for distributed caching

## Spiritual Paths Supported

- **Bhakti Yoga**: Devotional practices
- **Jnana Yoga**: Knowledge and wisdom
- **Karma Yoga**: Selfless action
- **Raja Yoga**: Meditation and mind control

## Supported Deities

- Krishna
- Shiva  
- Devi (Divine Mother)
- Rama
- Ganesha
- Hanuman

## License

This project is licensed under the MIT License.
