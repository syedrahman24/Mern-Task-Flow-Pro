# Task Manager Backend

A production-ready Node.js/Express backend for the MERN Task Manager application.

## 🚀 Features

- **User Authentication** with JWT
- **Task Management** with full CRUD operations
- **Security** with bcrypt password hashing
- **Rate Limiting** and security headers
- **Error Handling** with centralized error management
- **MongoDB** with Mongoose ODM

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from `env.example`):
```bash
cp env.example .env
```

3. Configure environment variables in `.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_ORIGIN=http://localhost:5173
NODE_ENV=development
```

4. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## 🔗 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Tasks

- `GET /api/tasks` - Get all tasks (protected)
- `POST /api/tasks` - Create new task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)
- `PATCH /api/tasks/:id/toggle` - Toggle task completion (protected)

### Query Parameters

- `filter`: `all`, `completed`, `pending`
- `sort`: `createdAt`, `dueDate`, `priority`

## 🔐 Authentication

All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## 🛡️ Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Rate limiting (100 requests per 15 minutes)
- CORS configuration
- Security headers with Helmet
- Input validation and sanitization

## 📁 Project Structure

```
server/
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/         # Mongoose models
├── routes/         # Express routes
├── utils/          # Utility functions
├── server.js       # Main server file
└── package.json    # Dependencies
```

## 🚀 Deployment

### Environment Variables for Production

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/task-manager
JWT_SECRET=your-production-jwt-secret
FRONTEND_ORIGIN=https://your-frontend.netlify.app
NODE_ENV=production
```

### Deployment Platforms

- **Render**: Connect GitHub repo and set environment variables
- **Railway**: Deploy directly from GitHub
- **Heroku**: Add MongoDB addon and configure environment variables 