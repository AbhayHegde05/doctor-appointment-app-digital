require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Initialize App
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows us to parse JSON bodies

// Connect to Database
connectDB();

// Routes
app.use('/api', require('./routes/authRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/campaigns', require('./routes/campaignRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));

// Root Route (for testing)
app.get('/', (req, res) => {
  res.send('HealthSync Backend is Running...');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));