const mongoose = require("mongoose");

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI); // Use URI from .env
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message); // Log connection error
    process.exit(1); // Exit app if connection fails
  }
};

module.exports = connectDB;
