// todoController.js

const db = require('../db');

// Get all tasks
exports.getAllTasks = async (req, res) => {
  const query = 'SELECT * FROM tasks';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching tasks', error: err });
    }
    res.status(200).json(results);
  });
};

// Add a new task
exports.addTask = async (req, res) => {
  const { task, deadline, status } = req.body;
  const query = 'INSERT INTO tasks (task, deadline, status) VALUES (?, ?, ?)';
  db.query(query, [task, deadline, status || 'Pending'], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error adding task', error: err });
    }
    res.status(201).json({ id: results.insertId, task, deadline, status });
  });
};

// Update task status
exports.updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Fetch the task to check the deadline
    const [task] = await db.promise().query('SELECT deadline FROM tasks WHERE id = ?', [id]);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const currentDate = new Date();
    const taskDeadline = new Date(task.deadline);

    // Determine the new status
    let newStatus = status;
    if (status === 'Completed' && currentDate > taskDeadline) {
      newStatus = 'Late Completed';
    }

    // Update the task
    await db.promise().query('UPDATE tasks SET status = ? WHERE id = ?', [newStatus, id]);
    res.status(200).json({ message: 'Task status updated successfully', status: newStatus });
  } catch (error) {
    res.status(500).json({ message: 'Error updating task status', error });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM tasks WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting task', error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  });
};
