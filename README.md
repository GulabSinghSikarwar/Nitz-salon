# Salon Oasis - Complete Application Documentation

## Table of Contents
- [Application Architecture](#application-architecture)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Development Setup](#development-setup)
- [Deployment Options](#deployment-options)
- [Full Application Deployment](#full-application-deployment)
- [Serverless Deployment](#serverless-deployment)
- [Environment Configuration](#environment-configuration)
- [Database Management](#database-management)
- [API Documentation](#api-documentation)
- [Troubleshooting](#troubleshooting)

## Application Architecture

### Overview
Salon Oasis is a full-stack web application for salon booking and management. It combines a React frontend with an Express.js backend, using PostgreSQL for data persistence.

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │◄──►│  Express Server │◄──►│   PostgreSQL    │
│                 │    │                 │    │    Database     │
│ - Vite          │    │ - API Routes    │    │                 │
│ - TailwindCSS   │    │ - Authentication│    │ - Services      │
│ - React Query   │    │ - Session Mgmt  │    │ - Bookings      │
│ - Wouter        │    │ - Validation    │    │ - Staff         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Key Features
- **Service Management**: Display salon services with pricing and descriptions
- **Staff Profiles**: Showcase team members and their specialties
- **Booking System**: Customer appointment scheduling
- **Contact Forms**: Customer inquiries and messages
- **Newsletter**: Email subscription management
- **Testimonials**: Customer reviews and ratings

### Architecture Patterns
- **Monorepo Structure**: Client and server code in single repository
- **Shared Types**: Common schemas and types between frontend/backend
- **API-First Design**: RESTful API with proper validation
- **Database-First**: Schema-driven development with Drizzle ORM

## Technology Stack

### Frontend
- **React 18**: UI library with hooks and functional components
- **Vite**: Fast build tool and development server
- **TailwindCSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **React Query**: Server state management
- **Wouter**: Lightweight client-side routing
- **React Hook Form**: Form handling and validation
- **Framer Motion**: Animation library

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **TypeScript**: Type-safe JavaScript
- **Drizzle ORM**: Type-safe database toolkit
- **Zod**: Schema validation
- **Passport.js**: Authentication middleware
- **Express Session**: Session management

### Database
- **PostgreSQL**: Relational database
- **Drizzle Kit**: Database migrations
- **Connection Pooling**: Efficient database connections

### Development Tools
- **TSX**: TypeScript execution
- **ESBuild**: Fast JavaScript bundler
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixes

## Project Structure

```
salon-oasis/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   ├── App.tsx         # Main app component
│   │   └── main.tsx        # Entry point
│   ├── public/             # Static assets
│   └── index.html          # HTML template
├── server/                 # Backend Express application
│   ├── routes.ts           # API route definitions
│   ├── storage.ts          # Database operations
│   ├── db.ts               # Database connection
│   ├── index.ts            # Server entry point
│   ├── vite.ts             # Vite integration
│   └── static.ts           # Static file serving
├── shared/                 # Shared code between client/server
│   ├── schema.ts           # Database schemas and types
│   └── routes.ts           # API route definitions
├── migrations/             # Database migration files
├── api/                    # Serverless function versions (for Vercel)
├── script/                 # Build and utility scripts
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── drizzle.config.ts       # Database configuration
├── tailwind.config.ts      # TailwindCSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Development Setup

### Prerequisites
```bash
# Required software
Node.js 18+
npm or yarn
Git
PostgreSQL (local) or Supabase account
```

### Installation
```bash
# Clone repository
git clone <repository-url>
cd salon-oasis

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your database URL

# Setup database
npm run db:push

# Start development server
npm run dev
```

### Environment Variables
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/salon_oasis

# Development
NODE_ENV=development
PORT=5000
```

### Development Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run check        # TypeScript type checking
npm run db:push      # Push schema changes to database
```

## Deployment Options

### Comparison Matrix

| Platform | Type | Database | SSL | Cost | Complexity |
|----------|------|----------|-----|------|------------|
| Railway | Full-Stack | ✅ Included | ✅ Auto | Free tier | ⭐ Easy |
| Render | Full-Stack | ✅ Included | ✅ Auto | Free tier | ⭐ Easy |
| Heroku | Full-Stack | ✅ Add-on | ✅ Auto | Paid | ⭐⭐ Medium |
| DigitalOcean | Full-Stack | ✅ Included | ✅ Auto | Paid | ⭐⭐ Medium |
| Vercel | Serverless | ❌ External | ✅ Auto | Free tier | ⭐⭐⭐ Complex |

## Full Application Deployment

### Option 1: Railway (Recommended)

#### Setup
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and initialize
railway login
railway init
```

#### Configuration
```bash
# Add PostgreSQL database
railway add postgresql

# Deploy application
railway up

# Set environment variables
railway variables set NODE_ENV=production
```

#### Railway Features
- **Automatic Detection**: Recognizes Node.js applications
- **Zero Configuration**: No config files needed
- **Integrated Database**: PostgreSQL with automatic connection
- **Git Integration**: Deploy on push
- **Environment Management**: Easy variable configuration
- **Monitoring**: Built-in logs and metrics

### Option 2: Render

#### Configuration File
Create `render.yaml`:
```yaml
services:
  - type: web
    name: salon-oasis
    env: node
    plan: starter
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: salon-db
          property: connectionString

databases:
  - name: salon-db
    databaseName: salon_oasis
    user: salon_user
    plan: starter
```

#### Deployment Steps
1. Push code to GitHub
2. Connect repository to Render
3. Configure service settings
4. Deploy automatically

### Option 3: Heroku

#### Configuration
Create `Procfile`:
```
web: npm start
release: npm run db:push
```

#### Deployment
```bash
# Create Heroku application
heroku create salon-oasis-app

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:mini

# Configure environment
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### Option 4: DigitalOcean App Platform

#### Configuration
Create `.do/app.yaml`:
```yaml
name: salon-oasis
services:
- name: web
  source_dir: /
  github:
    repo: your-username/salon-oasis
    branch: main
  run_command: npm start
  build_command: npm run build
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: NODE_ENV
    value: production
  - key: DATABASE_URL
    value: ${db.DATABASE_URL}

databases:
- name: db
  engine: PG
  num_nodes: 1
  size: db-s-dev-database
  version: "12"
```

## Serverless Deployment

### Vercel with Supabase

#### Database Setup
1. Create Supabase project
2. Get connection string from Settings > Database
3. Use transaction pooling mode

#### Code Modifications

**Update Database Connection** (`server/db.ts`):
```typescript
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@shared/schema";

const client = postgres(process.env.DATABASE_URL!, { 
  prepare: false,
  max: 1 // Important for serverless
});

export const db = drizzle(client, { schema });
```

**Install Dependencies**:
```bash
npm install postgres
npm uninstall pg @types/pg
```

#### API Functions
Create `api/` directory with serverless functions:

**api/services.ts**:
```typescript
import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const data = await storage.getServices();
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch services' });
    }
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
```

#### Vercel Configuration
Create `vercel.json`:
```json
{
  "functions": {
    "api/*.ts": {
      "runtime": "@vercel/node"
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "buildCommand": "npm run build",
  "outputDirectory": "dist/public"
}
```

## Environment Configuration

### Production Environment Variables
```env
# Required for all deployments
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:port/database

# Optional
PORT=5000
SESSION_SECRET=your-secret-key
```

### Platform-Specific Configuration

#### Railway
```bash
railway variables set NODE_ENV=production
railway variables set DATABASE_URL=${{Postgres.DATABASE_URL}}
```

#### Render
```yaml
envVars:
  - key: NODE_ENV
    value: production
  - key: DATABASE_URL
    fromDatabase:
      name: salon-db
      property: connectionString
```

#### Vercel
```bash
# Via Vercel dashboard or CLI
vercel env add NODE_ENV production
vercel env add DATABASE_URL postgresql://...
```

## Database Management

### Schema Definition
Located in `shared/schema.ts`:
```typescript
// Core tables
export const services = pgTable("services", { ... });
export const staff = pgTable("staff", { ... });
export const bookings = pgTable("bookings", { ... });
export const testimonials = pgTable("testimonials", { ... });
export const messages = pgTable("messages", { ... });
export const subscribers = pgTable("subscribers", { ... });
```

### Migration Commands
```bash
# Generate migration
npm run db:generate

# Apply migrations
npm run db:push

# Reset database (development only)
npm run db:reset
```

### Seeding Data
The application automatically seeds initial data on first run:
- Sample services (haircuts, color, makeup, etc.)
- Staff profiles with specialties
- Customer testimonials

## API Documentation

### Endpoints

#### Services
```
GET /api/services        # List all services
GET /api/services/:id    # Get specific service
```

#### Staff
```
GET /api/staff           # List all staff members
```

#### Bookings
```
POST /api/bookings       # Create new booking
```

#### Contact
```
POST /api/contact        # Send contact message
```

#### Newsletter
```
POST /api/subscribe      # Subscribe to newsletter
```

#### Testimonials
```
GET /api/testimonials    # List testimonials
```

### Request/Response Examples

#### Create Booking
```bash
POST /api/bookings
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "serviceId": 1,
  "staffId": 1,
  "date": "2024-01-20",
  "time": "10:00"
}
```

Response:
```json
{
  "id": 123,
  "message": "Booking confirmed successfully"
}
```

## Troubleshooting

### Common Issues

#### Database Connection Errors
```bash
# Check connection string format
DATABASE_URL=postgresql://user:password@host:port/database

# For Supabase, use transaction mode
DATABASE_URL=postgresql://user:password@host:port/database?pgbouncer=true&connection_limit=1
```

#### Build Failures
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript compilation
npm run check
```

#### API Function Timeouts
```bash
# Optimize database queries
# Add connection pooling
# Check function memory limits
```

### Debugging

#### Development
```bash
# Enable debug logging
DEBUG=* npm run dev

# Check database connection
npm run db:push
```

#### Production
```bash
# Check application logs
railway logs  # Railway
heroku logs --tail  # Heroku
```

### Performance Optimization

#### Database
- Use connection pooling
- Add database indexes
- Optimize query patterns
- Use prepared statements

#### Frontend
- Code splitting with React.lazy
- Image optimization
- Bundle size analysis
- Caching strategies

#### Backend
- Response compression
- Rate limiting
- Error handling
- Monitoring and logging

## Maintenance

### Regular Tasks
```bash
# Update dependencies
npm update

# Security audit
npm audit

# Database backup (production)
pg_dump $DATABASE_URL > backup.sql

# Monitor application health
# Check error logs
# Review performance metrics
```

### Scaling Considerations
- **Horizontal Scaling**: Multiple server instances
- **Database Scaling**: Read replicas, connection pooling
- **CDN**: Static asset delivery
- **Caching**: Redis for session storage
- **Load Balancing**: Distribute traffic

## Support Resources

### Documentation
- [Railway Docs](https://docs.railway.app)
- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Drizzle ORM Docs](https://orm.drizzle.team)

### Community
- [Railway Discord](https://discord.gg/railway)
- [Render Community](https://community.render.com)
- [Vercel Discord](https://discord.gg/vercel)

### Monitoring
- Application performance monitoring
- Error tracking (Sentry)
- Uptime monitoring
- Database performance metrics
