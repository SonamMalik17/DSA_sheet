# DSA Sheet - Full Stack Web Application

A DSA (Data Structures & Algorithms) Sheet web application built with the **MERN stack** (MongoDB, Express, React, Node.js).

## Features

1. **Secure Login/Register** - JWT-based authentication
2. **Topic-wise Chapters** - DSA problems organized by chapters (Arrays, Strings, Trees, etc.)
3. **Subtopics** - Problems grouped under subtopics within each chapter
4. **YouTube Tutorial Links** - Video tutorials for each problem
5. **LeetCode/Codeforces Links** - Practice links for coding problems
6. **Article Links** - Theory reference for each problem
7. **Difficulty Indicator** - Easy / Medium / Hard tags
8. **Progress Tracker** - Checkbox per problem, progress saved per user, resumes on next login

## Tech Stack

- **Frontend**: React (Vite) + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **Auth**: JWT + bcrypt

## Project Structure

```
├── client/               # React frontend (Vite)
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── context/      # React context (Auth)
│   │   ├── pages/        # Page components
│   │   └── utils/        # API utility
│   └── ...
├── server/               # Node.js backend
│   ├── config/           # Database configuration
│   ├── controllers/      # Route handlers
│   ├── data/             # Seed data
│   ├── middleware/        # Auth middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   └── index.js          # Entry point
└── package.json          # Root scripts
```

## Setup & Run Locally

### Prerequisites
- Node.js 18+
- MongoDB running locally or a MongoDB Atlas URI

### 1. Install dependencies
```bash
npm run install:all
```

### 2. Configure environment
```bash
cp server/.env.example server/.env
# Edit server/.env with your MongoDB URI and JWT secret
```

### 3. Seed the database
```bash
npm run seed
```

### 4. Run in development
```bash
# Terminal 1 - Backend
npm run dev:server

# Terminal 2 - Frontend
npm run dev:client
```

### 5. Build for production
```bash
npm run build:client
npm start
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | No | Register new user |
| POST | /api/auth/login | No | Login user |
| GET | /api/auth/me | Yes | Get current user |
| GET | /api/problems | No | Get all problems |
| GET | /api/problems/progress | Yes | Get user progress |
| PUT | /api/problems/progress | Yes | Update problem progress |

## AWS Deployment

### Using EC2

1. Launch an EC2 instance (Ubuntu 22.04, t2.micro)
2. SSH into the instance
3. Install Node.js 18+ and MongoDB (or use MongoDB Atlas)
4. Clone the repo, install deps, build frontend, seed DB
5. Use PM2 to run the server:
   ```bash
   npm install -g pm2
   npm run build:client
   npm run seed
   pm2 start server/index.js --name dsa-sheet
   ```
6. Configure Nginx as reverse proxy (port 80 → 5000)
7. Open port 80 in Security Group

### Nginx config example
```nginx
server {
    listen 80;
    server_name your-domain-or-ip;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
