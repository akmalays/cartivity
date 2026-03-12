# Google Calendar API Endpoints Documentation

## Overview
These endpoints handle Google Calendar integration for automatic task synchronization.

## Base URL
```
http://localhost:5000/api/google-calendar
```

## Authentication
All endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Endpoints

### 1. Get Authorization URL
Get the Google OAuth authorization URL to prompt user login.

**Endpoint:** `GET /auth-url`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "authUrl": "https://accounts.google.com/o/oauth2/v2/auth?client_id=..."
}
```

**Example:**
```bash
curl -X GET http://localhost:5000/api/google-calendar/auth-url \
  -H "Authorization: Bearer eyJhbGciOi..."
```

---

### 2. Handle OAuth Callback
Exchange Google authorization code for refresh token and save to user profile.

**Endpoint:** `POST /callback`

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "code": "4/0AX4XfWh..."
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Google Calendar connected successfully"
}
```

**Error Response (400):**
```json
{
  "error": "Authorization code is required"
}
```

**Example:**
```bash
curl -X POST http://localhost:5000/api/google-calendar/callback \
  -H "Authorization: Bearer eyJhbGciOi..." \
  -H "Content-Type: application/json" \
  -d '{"code":"4/0AX4XfWh..."}'
```

---

### 3. Check Calendar Connection Status
Check if user has connected their Google Calendar.

**Endpoint:** `GET /connected`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "connected": true
}
```

**Example:**
```bash
curl -X GET http://localhost:5000/api/google-calendar/connected \
  -H "Authorization: Bearer eyJhbGciOi..."
```

---

### 4. Disconnect Google Calendar
Remove Google Calendar connection and delete stored refresh token.

**Endpoint:** `POST /disconnect`

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Response (200):**
```json
{
  "success": true,
  "message": "Google Calendar disconnected"
}
```

**Example:**
```bash
curl -X POST http://localhost:5000/api/google-calendar/disconnect \
  -H "Authorization: Bearer eyJhbGciOi..." \
  -H "Content-Type: application/json"
```

---

## Task-Calendar Sync Flow

### Creating a Task
When you create a task and Google Calendar is connected:

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer eyJhbGciOi..." \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "desc": "Milk, eggs, bread",
    "duration": 1.5
  }'
```

**Response (201):**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "user_id": "user-uuid-here",
  "title": "Buy groceries",
  "desc": "Milk, eggs, bread",
  "duration": 1.5,
  "done": false,
  "google_calendar_event_id": "abc123def456@google.com",
  "created_at": "2024-03-12T10:30:00Z"
}
```

The task will automatically be:
1. Saved to Supabase
2. Created as a Google Calendar event
3. Stored with calendar event ID for future updates/deletion

### Updating a Task
When you update a task, the corresponding Google Calendar event is also updated:

```bash
curl -X PUT http://localhost:5000/api/tasks/123e4567-e89b-12d3-a456-426614174000 \
  -H "Authorization: Bearer eyJhbGciOi..." \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries and cook dinner",
    "duration": 2.5
  }'
```

The Google Calendar event will be updated with:
- New title
- New duration/end time
- Updated description

### Deleting a Task
When you delete a task, the Google Calendar event is also deleted:

```bash
curl -X DELETE http://localhost:5000/api/tasks/123e4567-e89b-12d3-a456-426614174000 \
  -H "Authorization: Bearer eyJhbGciOi..."
```

The corresponding Google Calendar event will be automatically removed.

---

## Error Handling

### Common Errors

**401 Unauthorized:**
```json
{
  "error": "Access denied"
}
```
Solution: Token is missing or invalid. Re-authenticate.

**400 Bad Request:**
```json
{
  "error": "Authorization code is required"
}
```
Solution: Ensure required fields are included in request body.

**500 Internal Server Error:**
```json
{
  "error": "Failed to create calendar event: ..."
}
```
Solution: Check backend logs. Ensure GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are correctly set.

---

## Testing with Postman

1. **Get Authorization URL:**
   - Method: GET
   - URL: `http://localhost:5000/api/google-calendar/auth-url`
   - Headers: `Authorization: Bearer <your_token>`
   - Send and copy the `authUrl` from response

2. **Visit Authorization URL:**
   - Paste the URL in your browser
   - Sign in with your Google account
   - Grant calendar permissions
   - You'll be redirected back with a code

3. **Exchange Code (Postman):**
   - Method: POST
   - URL: `http://localhost:5000/api/google-calendar/callback`
   - Headers: `Authorization: Bearer <your_token>`
   - Body (raw JSON): `{"code":"<code_from_redirect>"}`

4. **Check Connection:**
   - Method: GET
   - URL: `http://localhost:5000/api/google-calendar/connected`
   - Headers: `Authorization: Bearer <your_token>`

5. **Create a Task:**
   - Method: POST
   - URL: `http://localhost:5000/api/tasks`
   - Headers: `Authorization: Bearer <your_token>`
   - Body:
   ```json
   {
     "title": "Test Task",
     "desc": "Testing Google Calendar sync",
     "duration": 1
   }
   ```

6. **Verify in Google Calendar:**
   - Go to https://calendar.google.com
   - Check that the task appears as an event

---

## Notes

- Calendar events are created in the user's primary calendar ("My calendar")
- Event duration is calculated from the `duration` field (in hours)
- If calendar sync fails, the task is still created (graceful failure)
- Refresh tokens are securely stored in Supabase
- Each task has a unique `google_calendar_event_id` for tracking
