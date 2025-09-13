// import.js
import mongoose from "mongoose";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config(); // only needed for local development

const mongoUri = process.env.MONGO_URI;
console.log("Connecting to:", mongoUri);
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ Connected to MongoDB Atlas");
}).catch(err => {
  console.error("❌ MongoDB connection error:", err);
});

// 2. Define a schema (match your JSON structure)
const insightSchema = new mongoose.Schema({
  end_year: String,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: String,
  impact: String,
  added: String,
  published: String,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number,
  swot: String,
  city: String
});

// 3. Create the model
const Insight = mongoose.model("Insight", insightSchema);

// 4. Read the JSON file
const rawData = fs.readFileSync("./jsondata.json");
const jsonData = JSON.parse(rawData);

// 5. Insert the data
Insight.insertMany(jsonData)
  .then(() => {
    console.log("✅ Data successfully imported!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("❌ Error inserting data:", err);
    mongoose.connection.close();
  });
