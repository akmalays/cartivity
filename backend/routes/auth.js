const express = require('express');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

const router = express.Router();

module.exports = (supabase) => {
  // Register
  router.post('/register', async (req, res) => {
    try {
      const { email, password, username } = req.body;
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username }
        }
      });
      if (error) throw error;
      res.status(201).json({ message: 'User registered successfully', user: data.user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Login
  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;

      const token = jwt.sign({ id: data.user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
      res.json({ token, user: { id: data.user.id, username: data.user.user_metadata.username, email: data.user.email } });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Get user profile
  router.get('/profile', auth, async (req, res) => {
    try {
      const { data, error } = await supabase.auth.admin.getUserById(req.user.id);
      if (error) throw error;
      res.json({ 
        id: data.user.id, 
        email: data.user.email, 
        username: data.user.user_metadata?.username,
        created_at: data.user.created_at 
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Update user profile
  router.put('/profile', auth, async (req, res) => {
    try {
      const { username, email } = req.body;
      const updateData = {};
      
      if (username) updateData.data = { username };
      if (email) updateData.email = email;

      const { data, error } = await supabase.auth.admin.updateUserById(req.user.id, updateData);
      if (error) throw error;
      
      res.json({ message: 'Profile updated successfully', user: { id: data.user.id, email: data.user.email, username: data.user.user_metadata?.username } });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Delete user account
  router.delete('/profile', auth, async (req, res) => {
    try {
      const { error } = await supabase.auth.admin.deleteUser(req.user.id);
      if (error) throw error;
      res.json({ message: 'User account deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Get all users (admin only - requires service role)
  router.get('/users', auth, async (req, res) => {
    try {
      const { data, error } = await supabase.auth.admin.listUsers();
      if (error) throw error;
      
      const users = data.users.map(user => ({
        id: user.id,
        email: user.email,
        username: user.user_metadata?.username,
        created_at: user.created_at
      }));
      
      res.json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  return router;
};