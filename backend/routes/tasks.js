const express = require('express');
const auth = require('../middleware/auth');
const googleCalendarService = require('../services/googleCalendar');

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

      const newTask = data[0];

      // Try to sync with Google Calendar if connected
      try {
        const { data: userProfile } = await supabase
          .from('user_profiles')
          .select('google_refresh_token, google_calendar_connected')
          .eq('user_id', req.user.id)
          .single();

        if (userProfile?.google_refresh_token && userProfile?.google_calendar_connected) {
          const calendarEvent = await googleCalendarService.createCalendarEvent(
            userProfile.google_refresh_token,
            newTask
          );

          // Save calendar event ID to task
          await supabase
            .from('tasks')
            .update({ google_calendar_event_id: calendarEvent.id })
            .eq('id', newTask.id);
        }
      } catch (calendarError) {
        // Log calendar sync error but don't fail task creation
        console.error('Calendar sync error:', calendarError.message);
      }

      res.status(201).json(newTask);
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

      const updatedTask = data[0];

      // Try to sync with Google Calendar if connected
      try {
        const { data: userProfile } = await supabase
          .from('user_profiles')
          .select('google_refresh_token, google_calendar_connected')
          .eq('user_id', req.user.id)
          .single();

        if (updatedTask.google_calendar_event_id && userProfile?.google_refresh_token) {
          await googleCalendarService.updateCalendarEvent(
            userProfile.google_refresh_token,
            updatedTask.id,
            updatedTask,
            updatedTask.google_calendar_event_id
          );
        }
      } catch (calendarError) {
        // Log calendar sync error but don't fail task update
        console.error('Calendar sync error:', calendarError.message);
      }

      res.json(updatedTask);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Delete task
  router.delete('/:id', auth, async (req, res) => {
    try {
      // Get task before deletion to get calendar event ID
      const { data: taskData } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', req.params.id)
        .eq('user_id', req.user.id)
        .single();

      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', req.params.id)
        .eq('user_id', req.user.id);
      if (error) throw error;

      // Try to delete from Google Calendar if event exists
      try {
        if (taskData?.google_calendar_event_id) {
          const { data: userProfile } = await supabase
            .from('user_profiles')
            .select('google_refresh_token')
            .eq('user_id', req.user.id)
            .single();

          if (userProfile?.google_refresh_token) {
            await googleCalendarService.deleteCalendarEvent(
              userProfile.google_refresh_token,
              taskData.google_calendar_event_id
            );
          }
        }
      } catch (calendarError) {
        // Log calendar sync error but don't fail task deletion
        console.error('Calendar sync error:', calendarError.message);
      }

      res.json({ message: 'Task deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};