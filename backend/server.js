const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth')(supabase));
app.use('/api/tasks', require('./routes/tasks')(supabase));
app.use('/api/shop', require('./routes/shop')(supabase));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});