import { useState, useEffect } from 'react';
import { Plus, Filter, SortAsc, Search, Zap, CheckCircle, Clock, AlertTriangle, Settings } from 'lucide-react';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import toast from 'react-hot-toast';
import api from '../services/api';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      setTasks([...tasks, response.data.data]);
      setShowModal(false);
      toast.success('Task created successfully! 🎉');
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const response = await api.put(`/tasks/${editingTask._id}`, taskData);
      if (response.data && response.data.success) {
        setTasks(tasks.map(task => task._id === editingTask._id ? response.data.data : task));
        setShowModal(false);
        setEditingTask(null);
        toast.success('Task updated successfully! ✨');
      } else {
        toast.error('Failed to update task');
      }
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await api.delete(`/tasks/${taskId}`);
      if (response.data && response.data.success) {
        setTasks(tasks.filter(task => task._id !== taskId));
        toast.success('Task deleted successfully');
      } else {
        toast.error(response.data && response.data.message ? response.data.message : 'Failed to delete task');
      }
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleToggleTask = async (taskId) => {
    try {
      const response = await api.patch(`/tasks/${taskId}/toggle`);
      if (response.data && response.data.success) {
        setTasks(tasks.map(task => task._id === taskId ? response.data.data : task));
      } else {
        toast.error('Failed to update task');
      }
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  // Filter and sort tasks
  const filteredAndSortedTasks = (Array.isArray(tasks) ? tasks : [])
    .filter(task => {
      const matchesFilter = 
        filter === 'all' || 
        (filter === 'completed' && task.completed) ||
        (filter === 'pending' && !task.completed);
      
      const matchesSearch = 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'createdAt':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  const getStats = () => {
    const tasksArray = Array.isArray(tasks) ? tasks : [];
    const total = tasksArray.length;
    const completed = tasksArray.filter(task => task.completed).length;
    const pending = total - completed;
    const overdue = tasksArray.filter(task => 
      task.dueDate && 
      new Date(task.dueDate) < new Date() && 
      !task.completed
    ).length;

    return { total, completed, pending, overdue };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner w-12 h-12 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Clean Header */}
      <div className="bg-gradient-to-r from-dark-900/90 to-dark-800/90 backdrop-blur-md border-b border-dark-700/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* App Branding */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-glow">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-display font-bold text-white">
                  TaskFlow <span className="gradient-text">Pro</span>
                </h1>
                <p className="text-gray-400 text-xs sm:text-sm hidden sm:block">Premium Task Management</p>
              </div>
            </div>

            {/* User Controls */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* User Info */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full flex items-center justify-center shadow-glow">
                  <span className="text-white text-xs sm:text-sm font-bold">
                    {localStorage.getItem('user') 
                      ? (() => {
                          const user = JSON.parse(localStorage.getItem('user'));
                          const displayName = user.name || user.email || 'U';
                          return displayName.charAt(0).toUpperCase();
                        })()
                      : 'U'
                    }
                  </span>
                </div>
                                 <div className="hidden sm:block">
                   <p className="text-xs sm:text-sm font-medium text-white">
                     Welcome back, {
                       localStorage.getItem('user') 
                         ? (() => {
                             const user = JSON.parse(localStorage.getItem('user'));
                             return user.name || user.email || 'User';
                           })()
                         : 'User'
                     }
                   </p>
                 </div>
              </div>
              
              {/* Logout Button */}
              <button 
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  window.location.href = '/login';
                }}
                className="btn btn-secondary px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium hover:bg-danger-500/20 hover:text-danger-400 hover:border-danger-500/50 transition-all duration-200"
              >
                <span className="hidden sm:inline">Logout</span>
                <span className="sm:hidden">Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 relative">
        {/* Floating Add Task Button */}
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-6 right-6 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-glow hover:shadow-glow-lg hover:scale-110 transition-all duration-300 z-50"
        >
          <Plus className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </button>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card-elevated p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Tasks</p>
                <p className="text-3xl font-bold text-white">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary-400" />
              </div>
            </div>
          </div>

          <div className="card-elevated p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold text-success-400">{stats.completed}</p>
              </div>
              <div className="w-12 h-12 bg-success-500/20 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success-400" />
              </div>
            </div>
          </div>

          <div className="card-elevated p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Pending</p>
                <p className="text-3xl font-bold text-warning-400">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-warning-500/20 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning-400" />
              </div>
            </div>
          </div>

          <div className="card-elevated p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Overdue</p>
                <p className="text-3xl font-bold text-danger-400">{stats.overdue}</p>
              </div>
              <div className="w-12 h-12 bg-danger-500/20 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-danger-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="card-elevated p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-with-icon w-full"
              />
            </div>

            <div className="flex items-center space-x-4">
              {/* Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="bg-dark-800 border border-dark-700 rounded-xl px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50"
                >
                  <option value="all">All Tasks</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Sort */}
              <div className="flex items-center space-x-2">
                <SortAsc className="w-5 h-5 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-dark-800 border border-dark-700 rounded-xl px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50"
                >
                  <option value="createdAt">Date Created</option>
                  <option value="dueDate">Due Date</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Grid */}
        {filteredAndSortedTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onUpdate={openEditModal}
                onDelete={handleDeleteTask}
                onToggle={handleToggleTask}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-dark-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {searchTerm ? 'No tasks found' : 'No tasks yet'}
            </h3>
            <p className="text-gray-400 mb-6">
              {searchTerm 
                ? 'Try adjusting your search terms'
                : 'Create your first task to get started'
              }
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowModal(true)}
                className="btn btn-primary"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Task
              </button>
            )}
          </div>
        )}
      </div>

      {/* Task Modal */}
      {showModal && (
        <TaskModal
          task={editingTask}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Dashboard; 