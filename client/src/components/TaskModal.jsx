import { useState, useEffect } from 'react';
import { X, Calendar, AlertCircle, CheckCircle, Circle } from 'lucide-react';

const TaskModal = ({ task, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
        priority: task.priority || 'medium'
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Please enter a task title');
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      // Error is handled by parent component
    } finally {
      setLoading(false);
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-4 h-4" />;
      case 'medium':
        return <Circle className="w-4 h-4" />;
      case 'low':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-display font-bold text-white mb-2">
                {task ? 'Edit Task' : 'Create New Task'}
              </h2>
              <p className="text-gray-400">
                {task ? 'Update your task details' : 'Add a new task to your list'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="btn btn-ghost w-10 h-10 p-0 hover:bg-dark-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Task Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input"
                placeholder="Enter task title"
                required
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="input min-h-[100px] resize-none"
                placeholder="Enter task description (optional)"
                rows="4"
              />
            </div>

            {/* Due Date & Priority Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Due Date */}
              <div className="form-group">
                <label htmlFor="dueDate" className="form-label">
                  Due Date
                </label>
                <div className="input-group">
                  <Calendar className="input-icon" />
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="input input-with-icon"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              {/* Priority */}
              <div className="form-group">
                <label htmlFor="priority" className="form-label">
                  Priority
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['low', 'medium', 'high'].map((priority) => (
                    <button
                      key={priority}
                      type="button"
                      onClick={() => setFormData({ ...formData, priority })}
                      className={`flex items-center justify-center space-x-2 px-4 py-4 rounded-xl border-2 transition-all duration-200 font-medium ${
                        formData.priority === priority
                          ? 'border-primary-500 bg-primary-500/20 text-primary-400 shadow-glow'
                          : 'border-dark-700 bg-dark-800 text-gray-400 hover:border-dark-600 hover:text-gray-300 hover:bg-dark-700'
                      }`}
                    >
                      {getPriorityIcon(priority)}
                      <span className="capitalize">{priority}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Priority Preview */}
            <div className="bg-dark-800/50 rounded-xl p-6 border border-dark-700/50">
              <div className="flex items-start space-x-4">
                <div className={`priority-badge ${formData.priority === 'high' ? 'priority-high' : formData.priority === 'medium' ? 'priority-medium' : 'priority-low'}`}>
                  {getPriorityIcon(formData.priority)}
                  <span className="ml-2 capitalize font-semibold">{formData.priority} Priority</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-300 font-medium mb-1">
                    {formData.priority === 'high' && 'High Priority Tasks'}
                    {formData.priority === 'medium' && 'Medium Priority Tasks'}
                    {formData.priority === 'low' && 'Low Priority Tasks'}
                  </p>
                  <p className="text-sm text-gray-400">
                    {formData.priority === 'high' && 'These tasks appear first in your list and are highlighted with red indicators. Perfect for urgent deadlines and important deliverables.'}
                    {formData.priority === 'medium' && 'These tasks are balanced and manageable. They appear in the middle of your list and are highlighted with yellow indicators.'}
                    {formData.priority === 'low' && 'These tasks can be completed when convenient. They appear at the bottom of your list and are highlighted with green indicators.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-dark-700/50">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary px-6 py-3"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary px-6 py-3"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="loading-spinner w-5 h-5"></div>
                    <span>{task ? 'Updating...' : 'Creating...'}</span>
                  </div>
                ) : (
                  task ? 'Update Task' : 'Create Task'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskModal; 