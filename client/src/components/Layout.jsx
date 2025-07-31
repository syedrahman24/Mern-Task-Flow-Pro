import { LogOut, User, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <header className="bg-dark-900/50 backdrop-blur-sm border-b border-dark-800/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-glow">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">Welcome back,</p>
                <p className="text-primary-400 font-semibold">{user?.name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="btn btn-ghost w-10 h-10 p-0">
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="btn btn-secondary flex items-center space-x-2 px-4 py-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout; 