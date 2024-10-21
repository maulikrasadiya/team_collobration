const Task = require('../models/taskModel');

const createTask = async (req, res) => {
  const { title, description, assignedTo } = req.body;
  try {
    const newTask = new Task({ title, description, assignedTo });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
}