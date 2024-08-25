// Load environment variables from .env file
require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Import route handlers
const studentRoutes = require("./routes/studentRoutes");
const authorityRoutes = require("./routes/authorityRoutes");

const app = express();
const port = process.env.PORT || 3000; // Default to port 3000 if PORT is not defined

// Middleware
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Parse incoming JSON requests and populate req.body with the parsed data
app.use(bodyParser.json());

// Parse incoming URL-encoded form data and populate req.body
app.use(bodyParser.urlencoded({ extended: true }));

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Use routes
app.use("/students", studentRoutes);
app.use("/authorities", authorityRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
