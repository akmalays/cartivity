const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

module.exports = (supabase) => {
  // Get all tasks for user
  router.get('/', auth, async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', req.user.id);
      if (error) throw error;
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create task
  router.post('/', auth, async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{ ...req.body, user_id: req.user.id }])
        .select();
      if (error) throw error;
      res.status(201).json(data[0]);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Update task
  router.put('/:id', auth, async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update(req.body)
        .eq('id', req.params.id)
        .eq('user_id', req.user.id)
        .select();
      if (error) throw error;
      if (data.length === 0) return res.status(404).json({ error: 'Task not found' });
      res.json(data[0]);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Delete task
  router.delete('/:id', auth, async (req, res) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', req.params.id)
        .eq('user_id', req.user.id);
      if (error) throw error;
      res.json({ message: 'Task deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};