#  Dashboard Visualizer 🚀

A visual analytics dashboard built using **React.js**, **Node.js/Express**, and **MongoDB**. It reads provided JSON data, seeds it into the database, and offers interactive filters and charts to explore metrics like intensity, relevance, topics, and geography.


## Features
- 📊 D3-based interactive visualizations: line, bar, and scatter charts  
- 🔎 Dynamic filters: year, region, topic, PEST, SWOT, source  
- 🔄 API endpoints for each chart and filter combination  
- 📂 Database seed script for easy data loading
---

## 🧩 Tech Stack

| Component        | Description                                                         |
|------------------|---------------------------------------------------------------------|
| **Backend**      | Node.js with Express, Mongoose to connect to MongoDB                |
| **Database**     | MongoDB (local / Atlas) seeded with `jsondata.json`                |
| **Filters / APIs** | `/api/options/:field`, `/api/data` for dynamic filtering        |
| **Visualization**| Chart library (e.g. D3.js, Plotly.js) driven by frontend framework |
| **Frontend**     | React.js / Next.js or similar: fetches data and manages UI filters   |

---

## Installation

# Backend setup
cd backend
npm install
cp .env.example .env         # fill env vars: MONGODB_URI=...
npm run seed                 # import jsondata.json into MongoDB
npm start                    # runs API on http://localhost:5000

# Frontend setup
cd ../frontend
npm install
npm run dev                    # opens dashboard at http://localhost:5173
