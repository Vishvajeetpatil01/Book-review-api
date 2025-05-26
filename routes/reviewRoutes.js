const express = require("express");
const {
  addReview,
  updateReview,
  deleteReview
} = require("../controllers/reviewController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Add a review to a book (authenticated users only)
router.post("/books/:id/reviews", auth, addReview);

// Update your own review by review ID
router.put("/reviews/:id", auth, updateReview);

// Delete your own review by review ID
router.delete("/reviews/:id", auth, deleteReview);

module.exports = router;
