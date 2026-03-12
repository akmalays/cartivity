# Google Calendar Integration Setup Guide

This guide will help you set up Google Calendar integration for the Cartivity app so that tasks automatically sync to a user's Google Calendar.

## Prerequisites

- Google Cloud Project
- Backend environment variables configured

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (top left, next to "Google Cloud")
3. Name it "Cartivity Calendar"
4. Click "Create"

## Step 2: Enable Google Calendar API

1. In the Cloud Console, search for "Calendar API"
2. Click on "Google Calendar API"
3. Click "Enable"
4. Wait for the API to be enabled

## Step 3: Create OAuth 2.0 Credentials

1. Go to "Credentials" in the left sidebar
2. Click "Create Credentials" → "OAuth 2.0 Client IDs"
3. If prompted, configure OAuth consent screen:
   - Choose "External" user type
   - Click "Create"
   - Fill in:
     - App name: **Cartivity**
     - User support email: Your email
     - Developer contact: Your email
   - Click "Save and Continue"
   - On Scopes page, click "Add or Remove Scopes"
   - Search and add:
     - `https://www.googleapis.com/auth/calendar`
     - `https://www.googleapis.com/auth/calendar.events`
   - Click "Save and Continue"
   - Add test users (your email) if still in development
   - Click "Save and Continue"

4. After OAuth consent screen is set up, go back to "Credentials"
5. Click "Create Credentials" → "OAuth 2.0 Client IDs"
6. Select "Web application"
7. Add Authorized redirect URIs:
   - `http://localhost:5000/api/google-calendar/callback` (for local development)
   - `https://cartivity-production.up.railway.app/api/google-calendar/callback` (for production)
8. Click "Create"

## Step 4: Get Your Credentials

1. Copy your Client ID and Client Secret
2. Add them to your `.env` file:

```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:5000/api/google-calendar/callback
```

3. For production (Railway), add these to your Railway environment variables:
   - Go to Railway dashboard
   - Select your project
   - Go to Variables
   - Add the three variables above with production redirect URI

## Step 5: Database Schema Updates

Run this SQL in Supabase to add Google Calendar fields:

```sql
-- Create user_profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  google_refresh_token TEXT,
  google_calendar_connected BOOLEAN DEFAULT FALSE,
  google_calendar_connected_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Add google_calendar_event_id column to tasks table
ALTER TABLE tasks 
ADD COLUMN IF NOT EXISTS google_calendar_event_id TEXT;

-- Enable RLS for user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for user_profiles
CREATE POLICY "Users can view/update their own profile" ON user_profiles
  USING (auth.uid() = user_id);
```

## Step 6: Restart Your Backend

```bash
npm start
```

## Frontend Implementation

### 1. Add Connect to Calendar Button

Create a component to handle Google Calendar connection:

```typescript
import { useEffect, useState } from 'react';
import axios from 'axios';

export const CalendarIntegration = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    checkCalendarConnection();
  }, []);

  const checkCalendarConnection = async () => {
    try {
      const response = await axios.get('/api/google-calendar/connected', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      setIsConnected(response.data.connected);
    } catch (error) {
      console.error('Error checking calendar connection:', error);
    }
  };

  const handleConnect = async () => {
    try {
      const response = await axios.get('/api/google-calendar/auth-url', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      window.location.href = response.data.authUrl;
    } catch (error) {
      console.error('Error getting auth URL:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await axios.post('/api/google-calendar/disconnect', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      setIsConnected(false);
    } catch (error) {
      console.error('Error disconnecting calendar:', error);
    }
  };

  return (
    <div>
      {!isConnected ? (
        <button onClick={handleConnect}>Connect Google Calendar</button>
      ) : (
        <>
          <p>✅ Google Calendar Connected</p>
          <button onClick={handleDisconnect}>Disconnect Google Calendar</button>
        </>
      )}
    </div>
  );
};
```

### 2. Handle OAuth Callback

After user authorizes, Google redirects to your frontend. Add this to handle the callback:

```typescript
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

export const CalendarCallback = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      console.error('Authorization failed:', error);
      window.location.href = '/';
      return;
    }

    if (code) {
      exchangeCodeForToken(code);
    }
  }, [searchParams]);

  const exchangeCodeForToken = async (code: string) => {
    try {
      await axios.post(
        '/api/google-calendar/callback',
        { code },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        }
      );
      console.log('Successfully connected Google Calendar');
      window.location.href = '/'; // Redirect to home
    } catch (error) {
      console.error('Error exchanging code:', error);
      window.location.href = '/';
    }
  };

  return <div>Connecting to Google Calendar...</div>;
};
```

## How It Works

1. **Task Creation**: When a user creates a task and has Google Calendar connected:
   - Task is saved to Supabase
   - Calendar event is automatically created in user's Google Calendar
   - Calendar event ID is saved in task record

2. **Task Update**: When a user updates a task:
   - Task is updated in Supabase
   - Corresponding Google Calendar event is updated

3. **Task Deletion**: When a user deletes a task:
   - Task is deleted from Supabase
   - Corresponding Google Calendar event is deleted

## API Endpoints

- `GET /api/google-calendar/auth-url` - Get authorization URL
- `POST /api/google-calendar/callback` - Handle OAuth callback
- `GET /api/google-calendar/connected` - Check if calendar is connected
- `POST /api/google-calendar/disconnect` - Disconnect Google Calendar

## Troubleshooting

### "Invalid Client Error"
- Double-check your Client ID and Client Secret
- Verify they're in `.env` file in backend root

### "Redirect URI mismatch"
- Ensure your redirect URI matches exactly in Google Cloud Console
- For local development: `http://localhost:5000/api/google-calendar/callback`
- For production: Update with your actual domain

### "Calendar event not created"
- Check that user has connected Google Calendar
- Verify user_profiles table exists and has correct schema
- Check backend logs for error messages

### "Tasks not appearing in Google Calendar"
- Open your Google Calendar settings
- Check that tasks/reminders are set to show
- Verify the event was created in "My calendar"

## Security Notes

- Refresh tokens are stored encrypted in Supabase
- Each user can only access their own calendar data
- Google OAuth tokens expire automatically and refresh as needed
- Never expose Client Secret in frontend code
