# 📋 MERN Task Manager App

A production-ready, full-stack task management application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring modern UI, authentication, and real-time task management.

![Task Manager](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-orange)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.6-38B2AC)

## ✨ Features

### 🔐 Authentication
- User registration and login
- JWT token-based authentication
- Password hashing with bcryptjs
- Protected routes and middleware
- Automatic token refresh

### 📝 Task Management
- Create, read, update, and delete tasks
- Task completion tracking
- Priority levels (Low, Medium, High)
- Due date management with overdue indicators
- Task filtering (All, Pending, Completed)
- Task sorting (Date, Priority, Creation time)

### 🎨 Modern UI/UX
- Dark mode design with blue accents
- Responsive layout for all devices
- Smooth animations and transitions
- Interactive task cards with hover effects
- Toast notifications for user feedback
- Loading states and error handling

### 🛡️ Security & Performance
- Rate limiting and security headers
- Input validation and sanitization
- CORS configuration for cross-origin requests
- Optimized database queries with indexing
- Error handling and logging

## 🏗️ Project Structure

```
├── client/                 # Frontend React App
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── contexts/      # React contexts (Auth)
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── ...
│   ├── package.json
│   └── README.md
│
├── server/                 # Backend Node.js/Express App
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # Express routes
│   ├── utils/            # Utility functions
│   ├── server.js         # Main server file
│   ├── package.json
│   └── README.md
│
└── README.md             # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd mern-task-manager
```

### 2. Backend Setup
```bash
cd server
npm install
cp env.example .env
```

Edit `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_ORIGIN=http://localhost:5173
NODE_ENV=development
```

Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../client
npm install
cp env.example .env
```

Edit `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```

### 4. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Tasks
- `GET /api/tasks` - Get all tasks (protected)
- `POST /api/tasks` - Create new task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)
- `PATCH /api/tasks/:id/toggle` - Toggle completion (protected)

### Query Parameters
- `filter`: `all`, `completed`, `pending`
- `sort`: `createdAt`, `dueDate`, `priority`

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security headers
- **express-rate-limit** - Rate limiting

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library
- **Date-fns** - Date utility library

## 🌐 Deployment

### Backend Deployment (Render/Railway)
1. Push code to GitHub
2. Connect repository to Render/Railway
3. Set environment variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/task-manager
   JWT_SECRET=your-production-jwt-secret
   FRONTEND_ORIGIN=https://your-frontend.netlify.app
   NODE_ENV=production
   ```

### Frontend Deployment (Netlify/Vercel)
1. Push code to GitHub
2. Connect repository to Netlify/Vercel
3. Set environment variables:
   ```env
   VITE_API_URL=https://your-backend.onrender.com/api
   ```

## 🔐 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Rate Limiting**: 100 requests per 15 minutes
- **CORS Protection**: Configured for specific origins
- **Security Headers**: Helmet middleware
- **Input Validation**: Server-side validation
- **Error Handling**: Centralized error management

## 🎨 UI/UX Features

- **Dark Mode**: Modern dark theme with blue accents
- **Responsive Design**: Works on all screen sizes
- **Smooth Animations**: CSS transitions and keyframes
- **Interactive Elements**: Hover effects and feedback
- **Loading States**: Spinners and skeleton screens
- **Toast Notifications**: User feedback for actions
- **Form Validation**: Client and server-side validation

## 📱 Mobile Responsive

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones
- Touch devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Express.js](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Vite](https://vitejs.dev/) - Build tool
- [Lucide](https://lucide.dev/) - Icons

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the maintainers.

---

**Built with ❤️ using the MERN stack** 