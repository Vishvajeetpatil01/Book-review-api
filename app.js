const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
connectDB();

const app = express();

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Log HTTP requests in development
app.use(morgan("dev"));

// Routes for authentication (signup, login)
app.use("/api", require("./routes/authRoutes"));

// Routes for book-related endpoints
app.use("/api/books", require("./routes/bookRoutes"));

// Routes for review-related endpoints
app.use("/api", require("./routes/reviewRoutes"));

module.exports = app;
