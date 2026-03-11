# Task Manager

Full-stack task & shop management application built with React, Node.js, and Supabase.

## Project Structure

```
/task-manager
  /frontend         - React application
  /backend          - Express.js API server
  README.md         - This file
```

## Quick Start

### Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on `http://localhost:3000`

### Backend

```bash
cd backend
nvm use v22
npm install
npm run dev
```

Backend runs on `http://localhost:5000`

## Environment Variables

### Frontend (`frontend/.env.local`)
```
REACT_APP_API_URL=http://localhost:5000
```

### Backend (`backend/.env`)
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SERVICE_ROLE_KEY=your_service_role_key
JWT_SECRET=your_jwt_secret
PORT=5000
```

## Deployment

- **Frontend**: Vercel (https://cartivity.vercel.app)
- **Backend**: Railway (https://cartivity-production.up.railway.app)

## API Documentation

See [backend/API_DOCUMENTATION.md](backend/API_DOCUMENTATION.md) for complete API documentation.

## Features

- User authentication with JWT
- Task management (CRUD operations)
- Product catalog with categories
- Responsive React UI
- Supabase integration

## Tech Stack

### Frontend
- React
- TypeScript
- Redux Toolkit
- React Router
- Material-UI

### Backend
- Node.js / Express
- Supabase (Authentication & Database)
- JWT
- CORS

## License

MIT
