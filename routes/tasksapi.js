const express = require('express');
const router = express.Router();

const Task = require('../models/todo');


// Route để tạo công việc mới (Create)
router.post('/tasks', async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const newTask = await Task.create({ title, description, completed });
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi khi tạo công việc mới' });
  }
});

// Route để lấy danh sách công việc (Read all)
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi khi lấy danh sách công việc' });
  }
});

// Route để lấy thông tin một công việc theo ID (Read one)
router.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Không tìm thấy công việc' });
    }
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi khi lấy thông tin công việc' });
  }
});


// Route để cập nhật thông tin một công việc theo ID (Update)
router.put('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Không tìm thấy công việc' });
    }
    const { title, description, completed } = req.body;
    await task.update({ title, description, completed });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi khi cập nhật công việc' });
  }
});


// Route để xóa một công việc theo ID (Delete)
router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Không tìm thấy công việc' });
    }
    await task.destroy();
    res.status(204).json();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi khi xóa công việc' });
  }
});


module.exports = router;
