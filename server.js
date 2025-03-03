require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { Pool } = require("pg");

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies
app.use(morgan("dev"));

// PostgreSQL Connection
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ Database connection error", err));

// Sample Route
app.get("/", (req, res) => {
  res.send("Welcome to the E-Commerce API!");
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
