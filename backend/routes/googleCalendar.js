const express = require('express');
const auth = require('../middleware/auth');
const googleCalendarService = require('../services/googleCalendar');

const router = express.Router();

module.exports = (supabase) => {
  // Get Google Calendar auth URL
  router.get('/auth-url', auth, async (req, res) => {
    try {
      const authUrl = googleCalendarService.getAuthUrl();
      res.json({ authUrl });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Handle Google OAuth callback
  router.post('/callback', auth, async (req, res) => {
    try {
      const { code } = req.body;
      if (!code) {
        return res.status(400).json({ error: 'Authorization code is required' });
      }

      // Get tokens from Google
      const tokens = await googleCalendarService.getTokensFromCode(code);

      // Save refresh token to user profile in Supabase
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({
          google_refresh_token: tokens.refresh_token,
          google_calendar_connected: true,
          google_calendar_connected_at: new Date().toISOString()
        })
        .eq('user_id', req.user.id);

      if (updateError) {
        // If user_profiles table doesn't exist, create user profile
        const { error: insertError } = await supabase
          .from('user_profiles')
          .insert([{
            user_id: req.user.id,
            google_refresh_token: tokens.refresh_token,
            google_calendar_connected: true,
            google_calendar_connected_at: new Date().toISOString()
          }]);

        if (insertError) throw insertError;
      }

      res.json({
        success: true,
        message: 'Google Calendar connected successfully'
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Check if Google Calendar is connected
  router.get('/connected', auth, async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('google_calendar_connected')
        .eq('user_id', req.user.id)
        .single();

      if (error) {
        return res.json({ connected: false });
      }

      res.json({
        connected: data?.google_calendar_connected || false
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Disconnect Google Calendar
  router.post('/disconnect', auth, async (req, res) => {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          google_refresh_token: null,
          google_calendar_connected: false
        })
        .eq('user_id', req.user.id);

      if (error) throw error;

      res.json({
        success: true,
        message: 'Google Calendar disconnected'
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  return router;
};
