// server.js

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import Insight from './model.js';  // Mongoose schema

dotenv.config(); // Loads MONGO_URI from .env (local) or Render environment variables

const app = express();
const PORT = process.env.PORT || 5000; // Render will provide PORT automatically

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI;
console.log("Connecting to MongoDB URI:", mongoUri);

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection failed:', err));



app.get('/', (req, res) => {
  res.send('🎉 Welcome to the Data Dashboard API');
});

app.get('/api/options/:field', async (req, res) => {
  try {
    const { field } = req.params;

    // Validate allowed fields
    const allowedFields = ['topic', 'sector', 'region', 'pestle', 'source', 'swot', 'country', 'city', 'end_year'];
    if (!allowedFields.includes(field)) {
      return res.status(400).json({ error: 'Invalid field' });
    }

    const values = await Insight.distinct(field, { [field]: { $ne: '' } }); // Exclude empty strings
    const sorted = values.sort(); // Optional: sort alphabetically
    res.json(sorted);
  } catch (err) {
    console.error("Error getting field options:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ API Endpoint: GET /api/data
app.get('/api/data', async (req, res) => {
  try {
    // Read filters from the frontend query parameters
    const {
      topic,
      sector,
      region,
      end_year,
      pestle,
      source,
      swot,
      country,
      city,
    } = req.query;

    // Dynamically build a MongoDB filter object
    const filter = {};
    if (topic) filter.topic = topic;
    if (sector) filter.sector = sector;
    if (region) filter.region = region;
    if (end_year) filter.end_year = end_year;
    if (pestle) filter.pestle = pestle;
    if (source) filter.source = source;
    if (swot) filter.swot = swot;
    if (country) filter.country = country;
    if (city) filter.city = city;

    // Fetch filtered data from MongoDB
    const results = await Insight.find(filter);

    res.json(results);
  } catch (err) {
    console.error('❌ Error fetching filtered data:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
