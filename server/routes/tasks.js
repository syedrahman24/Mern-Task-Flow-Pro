const express = require('express');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask
} = require('../controllers/taskController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(authMiddleware);

// Task routes
router.route('/')
  .get(getTasks)
  .post(createTask);

router.route('/:id')
  .put(updateTask)
  .delete(deleteTask);

router.patch('/:id/toggle', toggleTask);

module.exports = router; 