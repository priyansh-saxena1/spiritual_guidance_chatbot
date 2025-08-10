# AI Backend Integration Guide for DSCPL

This document outlines how to integrate the AI-powered backend with the existing DSCPL frontend to enable AI-generated spiritual content and enhanced features.

## Overview

The AI backend will be built using Python FastAPI and will provide AI-generated spiritual content using Google Gemini API. This guide explains how to modify the existing React frontend to communicate with the new backend while maintaining the current spiritual dashboard functionality.

## Current Frontend Architecture

The frontend is currently built with:
- **React 18** with TypeScript
- **Wouter** for routing
- **TailwindCSS** for styling with custom spiritual theme
- **React Query** for state management
- **Express.js** mock backend (to be replaced)

## Proposed Backend Architecture

### Technology Stack
- **Python FastAPI** backend
- **MongoDB Atlas** (free tier) with Motor async driver
- **Redis** (free tier) for caching
- **Google Gemini API** for AI content generation
- **JWT authentication**
- **Pydantic** for data validation

### Database Collections
```javascript
// Users collection
{
  _id: ObjectId,
  email: string,
  name: string,
  hashed_password: string,
  spiritual_path: 'bhakti' | 'jnana' | 'karma' | 'raja',
  ishta_devata: 'krishna' | 'shiva' | 'devi' | 'rama' | 'ganesha' | 'hanuman',
  created_at: Date
}

// Programs collection
{
  _id: ObjectId,
  user_id: ObjectId,
  program_type: 'satsang' | 'japa' | 'dhyana' | 'accountability',
  topic: string,
  duration_days: number,
  current_day: number,
  status: 'active' | 'completed' | 'paused',
  daily_content: Array<AIGeneratedContent>,
  created_at: Date
}

// User Progress collection
{
  _id: ObjectId,
  program_id: ObjectId,
  day_number: number,
  completed: boolean,
  reflection_notes: string,
  completed_at: Date
}
```

## API Integration Points

### 1. Authentication Endpoints

**Current:** Mock authentication in `AuthContext.tsx`
**New:** Replace with actual API calls

```typescript
// Update AuthContext.tsx
const API_BASE = process.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const signIn = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  if (!response.ok) {
    throw new Error('Authentication failed');
  }
  
  const data = await response.json();
  localStorage.setItem('dscpl_token', data.access_token);
  setUser(data.user);
};
```

### 2. Content Generation Integration

**Files to Update:**
- `client/src/pages/app/satsang/SatsangDaily.tsx`
- `client/src/pages/app/japa/JapaMantras.tsx` 
- `client/src/pages/app/dhyana/DhyanaGuided.tsx`

```typescript
// Example for Satsang content
import { useQuery } from '@tanstack/react-query';

const SatsangDaily = () => {
  const { data: dailyContent, isLoading } = useQuery({
    queryKey: ['/api/content/daily', programId, currentDay],
    queryFn: async () => {
      const response = await fetch(`${API_BASE}/content/daily/${programId}/${currentDay}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('dscpl_token')}`
        }
      });
      return response.json();
    }
  });

  if (isLoading) return <div>Loading spiritual content...</div>;

  return (
    <div>
      <h2>{dailyContent.satsang.scripture.source}</h2>
      <p>{dailyContent.satsang.scripture.text}</p>
      <p>{dailyContent.satsang.scripture.translation}</p>
      <div>{dailyContent.satsang.explanation}</div>
      {/* Render other content sections */}
    </div>
  );
};
```

### 3. Progress Tracking Enhancement

**Update:** `client/src/pages/app/progress/Progress.tsx`

```typescript
// Replace mock data with real API calls
const { data: progressData } = useQuery({
  queryKey: ['/api/progress/stats', user.id],
  queryFn: async () => {
    const response = await fetch(`${API_BASE}/progress/stats/${user.id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('dscpl_token')}`
      }
    });
    return response.json();
  }
});

const updateProgress = useMutation({
  mutationFn: async (progressData) => {
    return fetch(`${API_BASE}/progress/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('dscpl_token')}`
      },
      body: JSON.stringify(progressData)
    });
  },
  onSuccess: () => {
    queryClient.invalidateQueries(['/api/progress/stats']);
  }
});
```

## Frontend Changes Required

### 1. Environment Configuration

Create `.env` file:
```bash
VITE_API_URL=http://localhost:8000/api/v1
VITE_APP_NAME=DSCPL
```

### 2. API Client Setup

Create `client/src/lib/apiClient.ts`:
```typescript
const API_BASE = import.meta.env.VITE_API_URL;

export const apiClient = {
  get: async (endpoint: string) => {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('dscpl_token')}`
      }
    });
    return response.json();
  },
  
  post: async (endpoint: string, data: any) => {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('dscpl_token')}`
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }
};
```

### 3. Query Client Configuration

Update `client/src/App.tsx`:
```typescript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}${queryKey[0]}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('dscpl_token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      },
    },
  },
});
```

## AI Content Structure

The backend will generate content in this JSON format:

```json
{
  "satsang": {
    "scripture": {
      "text": "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन",
      "translation": "You have the right to perform action, but not to the fruits of action",
      "source": "Bhagavad Gita 2.47"
    },
    "explanation": "This verse teaches the essence of Karma Yoga...",
    "practical_application": "Apply this by focusing on your daily duties...",
    "reflection_questions": [
      "How can I apply this teaching today?",
      "What actions am I performing for results vs duty?"
    ]
  },
  "japa": {
    "mantra": "ॐ नमो भगवते वासुदेवाय",
    "translation": "Salutations to the Divine Vasudeva",
    "pronunciation": "Om Namo Bhagavate Vasudevaya",
    "repetitions": 108,
    "duration": "15 minutes"
  },
  "dhyana": {
    "technique": "Breath Awareness Meditation",
    "instructions": [
      "Sit comfortably with spine straight",
      "Close eyes and focus on natural breath",
      "When mind wanders, gently return to breath"
    ],
    "duration": "10 minutes",
    "focus_point": "Natural breath rhythm"
  }
}
```

## Implementation Steps

### Phase 1: Backend Setup
1. Set up Python FastAPI backend
2. Configure MongoDB Atlas and Redis
3. Implement authentication endpoints
4. Set up Google Gemini API integration

### Phase 2: Frontend Integration
1. Update authentication to use real API
2. Replace mock data with API calls
3. Implement error handling and loading states
4. Add offline capability with React Query

### Phase 3: Content Generation
1. Integrate AI content generation for Satsang
2. Add AI-powered Japa recommendations
3. Implement personalized Dhyana guidance
4. Create AI accountability partner features

### Phase 4: Enhanced Features
1. Implement chat/AI guidance with conversation history
2. Add community features with real data
3. Enable progress sharing and accountability partners
4. Implement push notifications

## Error Handling

```typescript
// Global error boundary
const ErrorBoundary = ({ children }) => {
  return (
    <ErrorBoundaryProvider
      fallback={<div>Something went wrong. Please refresh.</div>}
      onError={(error) => {
        console.error('Application error:', error);
        // Send to error tracking service
      }}
    >
      {children}
    </ErrorBoundaryProvider>
  );
};

// API error handling
const handleAPIError = (error: any) => {
  if (error.status === 401) {
    localStorage.removeItem('dscpl_token');
    window.location.href = '/auth/login';
  }
  // Handle other errors
};
```

## Security Considerations

1. **JWT Token Management**: Store tokens securely and implement refresh logic
2. **API Rate Limiting**: Implement client-side request throttling
3. **Input Validation**: Validate all user inputs before sending to API
4. **CORS Configuration**: Ensure backend allows frontend domain
5. **Environment Variables**: Keep API keys and secrets in environment variables

## Testing Strategy

1. **Unit Tests**: Test API integration functions
2. **Integration Tests**: Test authentication flow
3. **E2E Tests**: Test complete user journeys
4. **API Mocking**: Use MSW for testing without backend

## Deployment Considerations

1. **Environment Variables**: Set production API URLs
2. **Build Optimization**: Configure Vite for production
3. **CDN**: Serve static assets from CDN
4. **Monitoring**: Implement error tracking and analytics

This integration will transform DSCPL from a static spiritual dashboard into a dynamic, AI-powered spiritual companion that provides personalized guidance and content for users' spiritual journey.