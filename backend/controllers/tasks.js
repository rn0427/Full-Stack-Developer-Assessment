// backend/controllers/task.js

const Task = require('../models/Task');

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, completed } = req.body;
    const newTask = await Task.create({
      title,
      description,
      dueDate,
      completed,
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Could not create the task' });
  }
};

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch tasks' });
  }
};

// Get a task by ID
const getTaskById = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findByPk(taskId);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch the task' });
  }
};

// Update a task by ID
const updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { title, description, dueDate, completed } = req.body;

  try {
    const task = await Task.findByPk(taskId);
    if (task) {
      task.title = title;
      task.description = description;
      task.dueDate = dueDate;
      task.completed = completed;
      await task.save();

      res.status(200).json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not update the task' });
  }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findByPk(taskId);
    if (task) {
      await task.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not delete the task' });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
