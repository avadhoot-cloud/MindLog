const express = require('express');
const {
  getAllTasks,
  addTask,
  updateTaskStatus,
  deleteTask,
} = require('../controllers/todoController');

const router = express.Router();

// Get all tasks
router.get('/', getAllTasks);

// Add a new task
router.post('/', addTask);

// Update task status
router.put('/:id', updateTaskStatus);

// Delete a task
router.delete('/:id', deleteTask);

module.exports = router;
