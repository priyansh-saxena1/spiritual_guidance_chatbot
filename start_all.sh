#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🕉️  Starting DSCPL Hindu Spiritual Assistant${NC}"
echo -e "${YELLOW}=====================================${NC}"

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        return 0
    else
        return 1
    fi
}

# Kill existing processes on our ports
echo -e "${YELLOW}Checking for existing processes...${NC}"
if check_port 8000; then
    echo -e "${RED}Port 8000 is in use, killing process...${NC}"
    kill -9 $(lsof -t -i:8000) 2>/dev/null || true
fi

if check_port 5173; then
    echo -e "${RED}Port 5173 is in use, killing process...${NC}"
    kill -9 $(lsof -t -i:5173) 2>/dev/null || true
fi

if check_port 5174; then
    echo -e "${RED}Port 5174 is in use, killing process...${NC}"
    kill -9 $(lsof -t -i:5174) 2>/dev/null || true
fi

# Start backend
echo -e "${GREEN}Starting Backend (FastAPI)...${NC}"
cd backend
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend
echo -e "${GREEN}Starting Frontend (React + Vite)...${NC}"
cd ../frontend
npm run dev &
FRONTEND_PID=$!

# Wait a moment for frontend to start
sleep 3

echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}🎉 DSCPL is now running!${NC}"
echo -e "${YELLOW}Backend API: ${NC}http://localhost:8000"
echo -e "${YELLOW}Frontend App: ${NC}http://localhost:5173 (or next available port)"
echo -e "${YELLOW}API Documentation: ${NC}http://localhost:8000/docs"
echo -e "${GREEN}=====================================${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop all services${NC}"

# Function to handle cleanup
cleanup() {
    echo -e "\n${RED}Shutting down services...${NC}"
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    echo -e "${GREEN}✅ All services stopped${NC}"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for both processes
wait
