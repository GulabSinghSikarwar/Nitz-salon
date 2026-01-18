# Salon Oasis - Deployment Guide

## Overview
This is a full-stack salon booking application built with React + Express + PostgreSQL. This guide covers deployment to Vercel with Supabase database.

## Architecture
- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Express.js serverless functions
- **Database**: PostgreSQL (Supabase)
- **ORM**: Drizzle ORM
- **Deployment**: Vercel

## Prerequisites
- Node.js 18+
- npm or yarn
- Git
- Vercel account
- Supabase account

## Database Setup (Supabase)

### 1. Create Supabase Project
```bash
# Go to https://supabase.com
# Create new project
# Note down your project URL and anon key
```

### 2. Get Database URL
```bash
# In Supabase Dashboard:
# Settings > Database > Connection string
# Copy the connection string (use transaction mode)
```

### 3. Environment Variables
Create `.env` file:
```env
DATABASE_URL=postgresql://postgres:[password]@[host]:5432/postgres
```

### 4. Run Database Migrations
```bash
npm install
npm run db:push
```

## Code Changes for Serverless

### 1. Update Database Connection
File: `server/db.ts`
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

### 2. Install Postgres.js
```bash
npm install postgres
npm uninstall pg @types/pg
```

### 3. Create API Functions
Create `api/` directory with serverless functions:

**api/services.ts**
```typescript
import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const data = await storage.getServices();
    return res.json(data);
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
```

**api/bookings.ts**
```typescript
import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';
import { api } from '../shared/routes';
import { z } from 'zod';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      const input = api.bookings.create.input.parse(req.body);
      const booking = await storage.createBooking(input);
      return res.status(201).json({ id: booking.id, message: "Booking confirmed" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      return res.status(500).json({ error: 'Failed to create booking' });
    }
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
```

### 4. Create Additional API Functions
Create these files in `api/` directory:
- `staff.ts` - GET staff list
- `testimonials.ts` - GET testimonials
- `contact.ts` - POST contact messages  
- `subscribe.ts` - POST newsletter subscriptions

## Vercel Configuration

### 1. Create vercel.json
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

### 2. Update Package.json Scripts
```json
{
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "tsx script/build.ts",
    "start": "NODE_ENV=production node dist/index.cjs",
    "db:push": "drizzle-kit push",
    "db:migrate": "drizzle-kit migrate"
  }
}
```

## Deployment Steps

### 1. Prepare Repository
```bash
# Commit all changes
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Deploy to Vercel
```bash
# Option 1: Vercel CLI
npm i -g vercel
vercel

# Option 2: GitHub Integration
# Go to vercel.com
# Import your GitHub repository
```

### 3. Configure Environment Variables
In Vercel Dashboard:
```
DATABASE_URL = your_supabase_connection_string
NODE_ENV = production
```

### 4. Deploy
```bash
# Automatic deployment on git push
# Or manual deployment via Vercel dashboard
```

## Post-Deployment

### 1. Seed Database
```bash
# The app will auto-seed on first API call
# Or manually run: npm run db:push
```

### 2. Test Endpoints
```bash
# Test API endpoints
curl https://your-app.vercel.app/api/services
curl -X POST https://your-app.vercel.app/api/bookings \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com",...}'
```

### 3. Monitor
- Check Vercel Functions logs
- Monitor Supabase database usage
- Test booking flow end-to-end

## Troubleshooting

### Common Issues
1. **Database Connection Errors**
   - Verify DATABASE_URL format
   - Check Supabase connection limits
   - Ensure `prepare: false` in postgres config

2. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies installed
   - Check TypeScript compilation

3. **API Function Timeouts**
   - Optimize database queries
   - Add connection pooling
   - Check function memory limits

### Environment Variables
Required for production:
```env
DATABASE_URL=postgresql://postgres:[password]@[host]:5432/postgres
NODE_ENV=production
```

## Alternative Deployment Options

### Railway
```bash
# railway.toml
[build]
  builder = "NIXPACKS"
  buildCommand = "npm run build"

[deploy]
  startCommand = "npm start"
  healthcheckPath = "/"
```

### Render
```yaml
# render.yaml
services:
  - type: web
    name: salon-oasis
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
```

## Maintenance

### Database Migrations
```bash
# Create new migration
npm run db:generate

# Apply migrations
npm run db:push
```

### Updates
```bash
# Update dependencies
npm update

# Deploy changes
git push origin main
```

## Support
- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- Drizzle Docs: https://orm.drizzle.team
