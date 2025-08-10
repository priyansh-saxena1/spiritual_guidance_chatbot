# DSCPL - Hindu Spiritual Assistant

## Overview

DSCPL is a comprehensive spiritual practice application designed to help users with daily Hindu spiritual practices including Satsang (devotional study), Japa (mantra meditation), Dhyana (meditation), and Accountability tracking. The application provides AI-generated content, progress tracking, and personalized spiritual guidance through a modern web interface built with React and Express.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side is built using React with TypeScript and follows a component-based architecture:

- **UI Framework**: React 18 with TypeScript for type safety
- **Styling**: TailwindCSS with custom Hindu spiritual theme including sacred colors (saffron, gold, maroon)
- **Component Library**: Radix UI primitives with shadcn/ui components for consistent design
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query for server state, React Context for authentication
- **Build Tool**: Vite for fast development and optimized builds

The application uses a protected route pattern where all `/app/*` routes require authentication. The UI follows a sacred Hindu design system with custom gradients, animations, and spiritual iconography.

### Backend Architecture
The server-side uses a modern Node.js stack:

- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL (configured for Neon Database)
- **Session Storage**: PostgreSQL-based sessions with connect-pg-simple
- **Build Process**: ESBuild for production bundling

The backend follows a modular architecture with separate routing, storage abstraction, and development tooling. Currently implements in-memory storage as a base implementation that can be extended to full database operations.

### Authentication & Authorization
- JWT-based authentication system
- Protected routes requiring authentication
- User profiles with spiritual preferences (spiritual path, ishta devata)
- Session management with secure cookie storage

### Data Storage Strategy
The application is configured for PostgreSQL using Drizzle ORM:

- **Schema Location**: `shared/schema.ts` for type-safe database definitions
- **Migration System**: Drizzle Kit for database migrations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Storage Interface**: Abstracted storage layer allowing for different implementations

Current schema includes users table with spiritual profile fields. The storage interface in `server/storage.ts` provides CRUD operations with both in-memory and database implementations.

### Development & Build System
- **Development Server**: Vite dev server with HMR
- **Type Checking**: Strict TypeScript configuration
- **Path Mapping**: Absolute imports with `@/` prefix for client code
- **Asset Handling**: Vite-based asset processing and optimization
- **Error Handling**: Runtime error overlay for development

## External Dependencies

### UI & Component Libraries
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives
- **Lucide React**: Icon library for consistent iconography
- **TailwindCSS**: Utility-first CSS framework with custom spiritual theme
- **React Hook Form**: Form validation and management
- **Zod**: Runtime type validation for forms and API responses

### Data & State Management
- **React Query (TanStack Query)**: Server state management and caching
- **Drizzle ORM**: Type-safe database operations and schema management
- **Drizzle Zod**: Integration between Drizzle and Zod for validation

### Database & Infrastructure
- **Neon Database**: Serverless PostgreSQL database
- **Connect PG Simple**: PostgreSQL session store for Express
- **Date-fns**: Date manipulation utilities

### Development Tools
- **Replit Integration**: Cartographer plugin for Replit development environment
- **ESBuild**: Fast JavaScript bundler for production
- **TSX**: TypeScript execution for development
- **Vite Plugins**: Runtime error modal and development tooling

### Spiritual Content Features
The application includes specialized UI components for spiritual practices:
- **Mantra Counter**: Interactive component for Japa meditation with Sanskrit text
- **Breathing Circle**: Meditation timer with visual breathing guides
- **Progress Tracking**: Spiritual practice analytics and streak tracking
- **Sacred Design System**: Custom CSS variables and gradients following Hindu aesthetic principles

The architecture supports future integration with AI content generation services (Google Gemini API as specified in project documentation) and can be extended with additional spiritual practice modules.