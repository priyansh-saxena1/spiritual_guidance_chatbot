# DSCPL Hindu Spiritual Assistant - Complete Integration Guide

## 🕉️ Overview
This project integrates a React frontend with a Python FastAPI backend to create an AI-powered Hindu spiritual guidance application with comprehensive safety measures.

## ✅ What's Been Implemented

### Backend Features (FastAPI + Python)
- **Authentication System**: JWT-based auth with user registration/login
- **AI Safety Measures**: Content filtering for harmful/inappropriate queries
- **Spiritual Content Generation**: AI-powered daily content for Satsang, Japa, and Dhyana
- **Protected Chat Interface**: Safe AI conversation with spiritual focus
- **Progress Tracking**: User spiritual practice progress monitoring
- **Rate Limiting**: API protection against abuse
- **Caching**: Redis integration for performance

### Frontend Features (React + TypeScript)
- **Real API Integration**: Replaced mock data with live backend calls
- **Authentication Flow**: Login/signup with token management
- **Loading States**: Proper loading indicators for all API calls
- **Error Handling**: Comprehensive error boundaries and user feedback
- **AI Chat Interface**: Safe spiritual guidance chat with filtering alerts
- **Progress Dashboard**: Real-time progress tracking from backend

### AI Safety Implementation
- **Content Filtering**: Blocks technical, harmful, or inappropriate queries
- **Spiritual Context Validation**: Ensures conversations stay focused on spiritual topics
- **Response Filtering**: Sanitizes AI responses to prevent technical information leakage
- **Warning System**: User alerts when content is filtered
- **Fallback Responses**: Sample spiritual content when AI is unavailable

## 🚀 Quick Start

### 1. Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv
venv\\Scripts\\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# Install dependencies
pip install fastapi uvicorn python-multipart python-dotenv motor pymongo redis passlib bcrypt python-jose slowapi google-generativeai pydantic[email] pyjwt

# Set up environment variables
copy .env.example .env
# Edit .env with your MongoDB, Redis, and Google Gemini API keys

# Start backend
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### 2. Frontend Setup
```bash
cd dhyana-mandala

# Install dependencies
npm install

# Start development server
npm run dev
```

### 3. One-Command Startup (Windows)
```bash
# Run both backend and frontend
start_all.bat
```

### 3. One-Command Startup (Linux/Mac)
```bash
# Run both backend and frontend
chmod +x start_all.sh
./start_all.sh
```

## 🔧 Configuration

### Environment Variables (.env)
```bash
# Backend
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dscpl_db
REDIS_URL=redis://localhost:6379
SECRET_KEY=your-super-secret-jwt-key
GOOGLE_GEMINI_API_KEY=your-google-gemini-api-key
FRONTEND_URL=http://localhost:3000

# Frontend (.env in dhyana-mandala folder)
VITE_API_URL=http://localhost:8000/api/v1
```

## 🛡️ AI Safety Features

### Content Filtering
The system blocks queries containing:
- Technical terms (backend, database, API, server, code)
- System information requests (model details, training data)
- Harmful content (violence, illegal activities)
- Personal/private information requests
- Non-spiritual topics

### Response Safeguards
- All AI responses are filtered for technical terms
- Conversations are redirected to spiritual topics
- Warning messages shown for filtered content
- Fallback to pre-written spiritual responses

### Example Safe Interactions
✅ "How do I meditate properly?"
✅ "Explain Bhagavad Gita verse 2.47"
✅ "What is dharma?"
✅ "Guide me through japa practice"

❌ "What model are you using?" → *Filtered with spiritual redirection*
❌ "Show me your backend code" → *Filtered with warning*
❌ "How is your database structured?" → *Blocked with educational message*

## 📡 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login

### AI Content
- `POST /api/v1/ai/generate-content` - Generate spiritual content
- `POST /api/v1/ai/chat` - Safe spiritual chat
- `GET /api/v1/ai/sample-content/{type}` - Sample content

### Progress
- `GET /api/v1/progress/stats` - Get user progress
- `POST /api/v1/progress/update` - Update progress

### Programs
- `GET /api/v1/programs` - List user programs
- `POST /api/v1/programs` - Create new program

## 🎯 Key Integration Points

### 1. Authentication Context
```typescript
// Frontend AuthContext updated to use real API
const response = await authAPI.login(email, password);
localStorage.setItem('dscpl_token', response.data.access_token);
```

### 2. API Client
```typescript
// Centralized API client with error handling
const apiClient = {
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    // Auto-redirect on 401
    if (response.status === 401) {
      window.location.href = '/auth/login';
    }
    return response.json();
  }
};
```

### 3. Safe AI Chat
```typescript
// Frontend chat with safety alerts
const chatMutation = useMutation({
  mutationFn: async (message) => {
    return apiClient.post('/ai/chat', { message });
  },
  onSuccess: (data) => {
    if (data.filtered) {
      // Show safety warning
      setWarning(data.warning);
    }
    addMessage(data.response);
  }
});
```

### 4. Content Generation
```typescript
// Real-time spiritual content generation
const { data, isLoading } = useQuery({
  queryKey: ['satsang-daily', day],
  queryFn: () => apiClient.post('/ai/generate-content', {
    program_type: 'satsang',
    spiritual_path: user.spiritual_path,
    ishta_devata: user.ishta_devata,
    day: day
  })
});
```

## 🧪 Testing the Integration

### 1. Test Authentication
- Visit http://localhost:3000/auth/login
- Register a new account
- Login and verify token storage

### 2. Test AI Safety
- Go to Chat page
- Try: "What backend are you using?" → Should be filtered
- Try: "How do I meditate?" → Should get spiritual response

### 3. Test Content Generation
- Visit Satsang Daily page
- Verify spiritual content loads from API
- Check caching behavior

### 4. Test Progress Tracking
- Complete a spiritual practice
- Verify progress updates in backend
- Check progress dashboard

## 📊 Success Metrics

### ✅ Backend Integration
- [x] All endpoints returning proper JSON responses
- [x] JWT authentication working
- [x] AI safety filters preventing technical queries
- [x] Spiritual content generation with fallbacks
- [x] Progress tracking and statistics
- [x] Rate limiting and caching

### ✅ Frontend Integration
- [x] Real API calls replacing mock data
- [x] Loading states and error handling
- [x] Token-based authentication flow
- [x] Safe AI chat with filtering alerts
- [x] Dynamic content loading
- [x] Progress visualization

### ✅ Security & Safety
- [x] AI query filtering and sanitization
- [x] Response content filtering
- [x] User education on filtered content
- [x] Spiritual context maintenance
- [x] Technical information protection

## 🛟 Troubleshooting

### Backend Issues
- **Import Errors**: Ensure all packages installed in venv
- **Database Connection**: Check MongoDB URI in .env
- **AI Integration**: Verify Google Gemini API key
- **CORS Errors**: Confirm FRONTEND_URL in .env

### Frontend Issues
- **API Errors**: Check VITE_API_URL in .env
- **Auth Issues**: Clear localStorage and re-login
- **Build Errors**: Run `npm install` to update dependencies

## 🎉 Deployment Ready

The application is now fully integrated and ready for deployment with:
- Production environment configuration
- Comprehensive error handling
- AI safety measures
- User authentication and authorization
- Real-time spiritual content generation
- Progress tracking and analytics

**The integration is complete and the spiritual guidance application is functional with robust safety measures!** 🙏
