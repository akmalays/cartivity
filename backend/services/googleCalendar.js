const { google } = require('googleapis');
const { OAuth2 } = google.auth;

class GoogleCalendarService {
  constructor() {
    this.oauth2Client = new OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
  }

  // Generate auth URL for user to connect Google Calendar
  getAuthUrl() {
    const scopes = [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events'
    ];

    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent'
    });
  }

  // Exchange authorization code for tokens
  async getTokensFromCode(code) {
    try {
      const { tokens } = await this.oauth2Client.getToken(code);
      return tokens;
    } catch (error) {
      throw new Error(`Failed to get tokens from code: ${error.message}`);
    }
  }

  // Create a calendar event from task
  async createCalendarEvent(refreshToken, task) {
    try {
      this.oauth2Client.setCredentials({
        refresh_token: refreshToken
      });

      const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });

      // Parse task duration into minutes
      const durationInMinutes = Math.round(task.duration * 60);

      // Create event object
      const event = {
        summary: task.title,
        description: task.desc || `Task duration: ${task.duration} hours`,
        start: {
          dateTime: new Date().toISOString(),
          timeZone: 'UTC'
        },
        end: {
          dateTime: new Date(Date.now() + durationInMinutes * 60000).toISOString(),
          timeZone: 'UTC'
        },
        reminders: {
          useDefault: true
        },
        extendedProperties: {
          private: {
            taskId: task.id,
            source: 'cartivity'
          }
        }
      };

      const result = await calendar.events.insert({
        calendarId: 'primary',
        resource: event
      });

      return result.data;
    } catch (error) {
      throw new Error(`Failed to create calendar event: ${error.message}`);
    }
  }

  // Update calendar event when task is updated
  async updateCalendarEvent(refreshToken, taskId, updatedTask, eventId) {
    try {
      this.oauth2Client.setCredentials({
        refresh_token: refreshToken
      });

      const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });

      const durationInMinutes = Math.round(updatedTask.duration * 60);

      const event = {
        summary: updatedTask.title,
        description: updatedTask.desc || `Task duration: ${updatedTask.duration} hours`,
        end: {
          dateTime: new Date(Date.now() + durationInMinutes * 60000).toISOString(),
          timeZone: 'UTC'
        }
      };

      const result = await calendar.events.update({
        calendarId: 'primary',
        eventId: eventId,
        resource: event
      });

      return result.data;
    } catch (error) {
      throw new Error(`Failed to update calendar event: ${error.message}`);
    }
  }

  // Delete calendar event when task is deleted
  async deleteCalendarEvent(refreshToken, eventId) {
    try {
      this.oauth2Client.setCredentials({
        refresh_token: refreshToken
      });

      const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });

      await calendar.events.delete({
        calendarId: 'primary',
        eventId: eventId
      });

      return { success: true };
    } catch (error) {
      throw new Error(`Failed to delete calendar event: ${error.message}`);
    }
  }

  // Find calendar event by task ID
  async findCalendarEventByTaskId(refreshToken, taskId) {
    try {
      this.oauth2Client.setCredentials({
        refresh_token: refreshToken
      });

      const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });

      const result = await calendar.events.list({
        calendarId: 'primary',
        maxResults: 2500,
        orderBy: 'updated'
      });

      const event = result.data.items?.find(
        item => item.extendedProperties?.private?.taskId === taskId
      );

      return event;
    } catch (error) {
      throw new Error(`Failed to find calendar event: ${error.message}`);
    }
  }
}

module.exports = new GoogleCalendarService();
