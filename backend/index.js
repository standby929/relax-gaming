require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
const playerRoutes = require('./routes/players');
app.use('/api', playerRoutes);

// Error handling middleware
app.use(errorHandler);

// Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
