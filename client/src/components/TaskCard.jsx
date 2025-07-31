import { useState } from 'react';
import { Edit, Trash2, CheckCircle, Circle, Calendar, AlertCircle } from 'lucide-react';
import { format, isAfter, startOfDay } from 'date-fns';
import toast from 'react-hot-toast';
import api from '../services/api';

// Custom function to check if a task is overdue
const isOverdue = (dueDate) => {
  return isAfter(startOfDay(new Date()), startOfDay(new Date(dueDate)));
};

const TaskCard = ({ task, onUpdate, onDelete, onToggle }) => {
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      await onToggle(task._id);
      toast.success(task.completed ? 'Task marked as pending' : 'Task completed! 🎉');
    } catch (error) {
      toast.error('Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    setLoading(true);
    try {
      await onDelete(task._id);
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return 'priority-low';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-3 h-3" />;
      case 'medium':
        return <Circle className="w-3 h-3" />;
      case 'low':
        return <CheckCircle className="w-3 h-3" />;
      default:
        return <CheckCircle className="w-3 h-3" />;
    }
  };

  return (
    <div className="task-card relative group">
      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0 pr-4">
            <h3 className={`text-lg font-semibold mb-2 transition-all duration-200 ${
              task.completed 
                ? 'text-gray-500 line-through' 
                : 'text-white group-hover:text-primary-300'
            }`}>
              {task.title}
            </h3>
            {task.description && (
              <p className={`text-sm leading-relaxed transition-all duration-200 ${
                task.completed 
                  ? 'text-gray-600' 
                  : 'text-gray-400 group-hover:text-gray-300'
              }`}>
                {task.description}
              </p>
            )}
          </div>
        </div>

        {/* Priority Badge - Positioned below the title */}
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0">
            <span className={`priority-badge ${getPriorityColor(task.priority)}`}>
              {getPriorityIcon(task.priority)}
              <span className="ml-1 capitalize">{task.priority}</span>
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Due Date */}
            {task.dueDate && (
              <div className="flex items-center space-x-2">
                <Calendar className={`w-4 h-4 ${
                  isOverdue(new Date(task.dueDate)) && !task.completed 
                    ? 'text-danger-400' 
                    : 'text-gray-500'
                }`} />
                <span className={`text-sm font-medium ${
                  isOverdue(new Date(task.dueDate)) && !task.completed 
                    ? 'text-danger-400' 
                    : 'text-gray-400'
                }`}>
                  {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                  {isOverdue(new Date(task.dueDate)) && !task.completed && (
                    <span className="ml-2 text-xs bg-danger-500/20 text-danger-400 px-2 py-1 rounded-full">
                      Overdue
                    </span>
                  )}
                </span>
              </div>
            )}
          </div>

          {/* Toggle Button */}
          <button
            onClick={handleToggle}
            disabled={loading}
            className={`flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-200 ${
              task.completed
                ? 'bg-success-500/20 text-success-400 hover:bg-success-500/30 hover:scale-110'
                : 'bg-gray-700/50 text-gray-400 hover:bg-success-500/20 hover:text-success-400 hover:scale-110'
            }`}
          >
            {loading ? (
              <div className="loading-spinner w-4 h-4"></div>
            ) : task.completed ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Hover Actions - Repositioned to avoid overlap with priority badge */}
      <div className="task-actions">
        <button
          onClick={() => onUpdate(task)}
          className="btn btn-secondary w-8 h-8 p-0 hover:scale-110 transition-transform duration-200"
          title="Edit task"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="btn btn-danger w-8 h-8 p-0 hover:scale-110 transition-transform duration-200"
          title="Delete task"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Completion Overlay */}
      {task.completed && (
        <div className="absolute inset-0 bg-success-500/10 border border-success-500/20 rounded-2xl pointer-events-none"></div>
      )}


    </div>
  );
};

export default TaskCard; 