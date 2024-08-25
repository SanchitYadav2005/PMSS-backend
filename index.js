// configured dotenv to work with .env file.
require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;
const path = require("path");
const cors = require("cors");
const body_parser = require("body-parser");
const { default: mongoose } = require("mongoose");

// Serve static files (like CSS, images, and JS) from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Parse incoming JSON requests and populate req.body with the parsed data
app.use(body_parser.json());

// Parse incoming URL-encoded form data and populate req.body
app.use(body_parser.urlencoded({ extended: true }));

// Enable Cross-Origin Resource Sharing (CORS) to allow requests from different origins (added here because we are working in react for the frontend)
app.use(cors());

//connecting it to mongo db compass(later will be connecting it to the atlas servers)
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    app.listen(port, () => {
      console.log("connected and up for working");
    });
  })
  .catch((error) => {
    console.log(error);
  });
