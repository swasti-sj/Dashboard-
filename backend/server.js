// server.js

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Insight from './model.js';  // Mongoose schema

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/dashboardDB', {
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
