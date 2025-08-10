# 🛠️ DSCPL Startup Guide - ISSUE FIXED!

## ✅ Problem Resolved
The startup error has been fixed! The issue was with NODE_ENV detection in the Express+Vite server setup.

## 🚀 Quick Start (Recommended)

### Option 1: Simple Development Mode (RECOMMENDED)
```bash
# Use this for easy development
start_simple.bat
```
- ✅ Backend API: http://localhost:8000 (FastAPI with AI safety)
- ✅ Frontend: http://localhost:3000 (Vite dev server with hot reload)
- ✅ API Docs: http://localhost:8000/docs

### Option 2: Integrated Server Mode
```bash
# Run this script - it will handle dependencies automatically
start_dev.bat
```
This will:
- Install frontend dependencies if needed
- Create Python virtual environment if needed
- Start backend on port 8000
- Start frontend on port 5000 with hot reload

### Option 2: Manual Setup

#### Backend Setup:
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start backend
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

#### Frontend Setup (in another terminal):
```bash
cd dhyana-mandala

# Install dependencies
npm install

# Start development server
set NODE_ENV=development && npm run dev
```

## Access Points

- **Frontend**: http://localhost:5000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## Architecture

The project uses:
- **Backend**: Python FastAPI (port 8000)
- **Frontend**: React + Express dev server (port 5000)
- **Development**: Vite for hot module replacement
- **Production**: Static file serving

## Environment Configuration

### Backend (.env)
```
MONGODB_URI=your-mongodb-connection
REDIS_URL=redis://localhost:6379
SECRET_KEY=your-secret-key
GOOGLE_GEMINI_API_KEY=your-gemini-key
FRONTEND_URL=http://localhost:5000
```

### Frontend (dhyana-mandala/.env)
```
VITE_API_URL=http://localhost:8000/api/v1
```

## Troubleshooting

### Build Directory Error
If you see "Could not find the build directory" error:
- This happens when running in production mode without building first
- Solution: Use development mode with `start_dev.bat`

### Port Issues
- Backend: 8000
- Frontend: 5000
- Make sure these ports are available

### CORS Issues
- Ensure backend FRONTEND_URL matches frontend port (5000)
- Check that API requests use correct backend URL

## Features Available

✅ **AI Safety**: Content filtering and spiritual focus  
✅ **Authentication**: JWT-based user system  
✅ **Spiritual Content**: AI-generated daily content  
✅ **Safe Chat**: Filtered spiritual guidance  
✅ **Progress Tracking**: User practice monitoring  
✅ **Real-time Updates**: Hot reload in development  

The application is fully integrated and ready for development!
