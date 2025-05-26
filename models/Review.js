const mongoose = require("mongoose");

// Schema for book reviews
const reviewSchema = new mongoose.Schema({
  user: {                            // Reference to the user who wrote the review
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  book: {                            // Reference to the reviewed book
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book"
  },
  rating: {                          // Rating from 1 to 5
    type: Number,
    min: 1,
    max: 5
  },
  comment: String                    // Optional text comment
});

// Ensure one review per user per book
reviewSchema.index({ user: 1, book: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
