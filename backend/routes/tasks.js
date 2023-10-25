// backend/routes/tasks.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/tasks');
const authMiddleware = require('../middleware/auth');

// CRUD routes for tasks
router.post('/', authMiddleware, taskController.createTask);
router.get('/', authMiddleware, taskController.getAllTasks);
router.get('/:id', authMiddleware, taskController.getTaskById);
router.put('/:id', authMiddleware, taskController.updateTask);
router.delete('/:id', authMiddleware, taskController.deleteTask);

module.exports = router;
