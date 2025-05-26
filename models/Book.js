const mongoose = require("mongoose");

// Schema for Book collection
const bookSchema = new mongoose.Schema({
  title: String,                    // Book title
  author: String,                   // Book author
  genre: String,                    // Book genre
  createdBy: {                      // Reference to the user who added the book
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Book", bookSchema);
