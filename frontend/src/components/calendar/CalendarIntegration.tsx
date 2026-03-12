import React, { useEffect, useState } from 'react';
import {
  Button,
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const CalendarIntegration: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkCalendarConnection();

    // Check for callback parameters
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      handleCallbackCode(code);
    }
  }, []);

  const checkCalendarConnection = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/google-calendar/connected`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to check calendar connection');
      }

      const data = await response.json();
      setIsConnected(data.connected);
      setLoading(false);
    } catch (err) {
      console.error('Error checking calendar connection:', err);
      setIsConnected(false);
      setLoading(false);
    }
  };

  const handleCallbackCode = async (code: string) => {
    try {
      const token = localStorage.getItem('authToken');

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/google-calendar/callback`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ code })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to connect Google Calendar');
      }

      // Remove code from URL
      window.history.replaceState({}, document.title, window.location.pathname);
      setIsConnected(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect Google Calendar';
      setError(errorMessage);
      console.error('Error handling calendar callback:', err);
    }
  };

  const handleConnect = async () => {
    try {
      setError(null);
      const token = localStorage.getItem('authToken');

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/google-calendar/auth-url`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to get authorization URL');
      }

      const data = await response.json();
      window.location.href = data.authUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect Google Calendar';
      setError(errorMessage);
      console.error('Error getting auth URL:', err);
    }
  };

  const handleDisconnect = async () => {
    try {
      setError(null);
      const token = localStorage.getItem('authToken');

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/google-calendar/disconnect`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to disconnect Google Calendar');
      }

      setIsConnected(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to disconnect Google Calendar';
      setError(errorMessage);
      console.error('Error disconnecting calendar:', err);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent>
          <Box display="flex" alignItems="center" gap={2}>
            <CircularProgress size={24} />
            <Typography>Loading calendar status...</Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <CalendarMonthIcon color="primary" />
          <Typography variant="h6">Google Calendar Integration</Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {isConnected ? (
          <Box>
            <Alert severity="success" sx={{ mb: 2 }}>
              ✅ Your Google Calendar is connected! New tasks will automatically appear in your calendar.
            </Alert>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDisconnect}
              fullWidth
            >
              Disconnect Google Calendar
            </Button>
          </Box>
        ) : (
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Connect your Google Calendar to automatically sync your tasks. Once connected, every task you create will appear in your Google Calendar.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleConnect}
              fullWidth
            >
              Connect Google Calendar
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default CalendarIntegration;
