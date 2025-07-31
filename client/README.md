# Task Manager Frontend

A modern React application built with Vite, Tailwind CSS, and TypeScript for the MERN Task Manager.

## 🚀 Features

- **Modern UI** with dark mode design
- **Responsive Layout** that works on all devices
- **Real-time Updates** with toast notifications
- **Task Management** with full CRUD operations
- **Authentication** with JWT tokens
- **Filtering & Sorting** for tasks
- **Priority Levels** with color-coded badges
- **Due Date Tracking** with overdue indicators

## 🛠️ Tech Stack

- **React 18** with Hooks
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router DOM** for routing
- **Axios** for API communication
- **React Hot Toast** for notifications
- **Lucide React** for icons
- **Date-fns** for date formatting

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
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## 🎨 UI Features

### Dark Mode Design
- Modern dark theme with blue accents
- Smooth transitions and hover effects
- Custom scrollbars and animations
- Responsive grid layout

### Task Cards
- Interactive hover effects
- Priority badges with colors
- Due date display with overdue indicators
- Quick action buttons (edit/delete)
- Completion toggle

### Forms
- Modern input styling
- Password visibility toggle
- Form validation
- Loading states
- Error handling

## 📱 Pages

### Authentication
- **Login Page**: Email/password authentication
- **Register Page**: User registration with validation
- **Protected Routes**: Automatic redirect to login

### Dashboard
- **Task Overview**: Grid layout with task cards
- **Filters**: All, Pending, Completed tasks
- **Sorting**: By date, priority, or creation time
- **Quick Actions**: Add, edit, delete, toggle tasks

## 🔧 Components

### Core Components
- `Layout`: Header with user info and logout
- `TaskCard`: Individual task display
- `TaskModal`: Create/edit task form
- `LoadingSpinner`: Loading state indicator
- `ProtectedRoute`: Authentication guard

### Context
- `AuthContext`: User authentication state management
- JWT token handling
- Automatic token refresh
- Logout functionality

## 🚀 Deployment

### Environment Variables for Production

```env
VITE_API_URL=https://your-backend-api.com/api
```

### Deployment Platforms

- **Netlify**: Connect GitHub repo and set environment variables
- **Vercel**: Deploy directly from GitHub
- **GitHub Pages**: Use GitHub Actions for deployment

### Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## 🎯 Key Features

### Task Management
- ✅ Create new tasks with title, description, due date, and priority
- ✅ Edit existing tasks
- ✅ Delete tasks with confirmation
- ✅ Toggle task completion status
- ✅ Filter tasks by status (all, pending, completed)
- ✅ Sort tasks by date, priority, or creation time

### User Experience
- ✅ Modern dark UI with smooth animations
- ✅ Responsive design for all screen sizes
- ✅ Toast notifications for user feedback
- ✅ Loading states for better UX
- ✅ Form validation and error handling
- ✅ Keyboard navigation support

### Security
- ✅ JWT token authentication
- ✅ Protected routes
- ✅ Automatic token refresh
- ✅ Secure logout functionality

## 📁 Project Structure

```
client/
├── src/
│   ├── components/     # Reusable components
│   ├── contexts/       # React contexts
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── App.jsx        # Main app component
│   ├── main.jsx       # Entry point
│   └── index.css      # Global styles
├── public/            # Static assets
├── index.html         # HTML template
├── package.json       # Dependencies
├── tailwind.config.js # Tailwind configuration
└── vite.config.js     # Vite configuration
```

## 🎨 Customization

### Colors
The app uses a custom color palette defined in `tailwind.config.js`:
- Primary blue colors for accents
- Dark gray theme for backgrounds
- Priority colors for task badges

### Animations
Custom animations are defined in the Tailwind config:
- `fade-in`: Smooth opacity transitions
- `slide-up`: Slide up animations
- `bounce-in`: Bounce effect for modals

### Components
All components use Tailwind utility classes and custom component classes defined in `index.css`. 