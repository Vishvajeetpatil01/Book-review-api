const express = require("express");
const {
  addBook,
  getBooks,
  getBookById,
  searchBooks
} = require("../controllers/bookController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Get list of books with optional filters and pagination
router.get("/", getBooks);

// Search books by title or author (partial, case-insensitive)
router.get("/search", searchBooks);

// Get detailed info for a single book by ID (including reviews)
router.get("/:id", getBookById);

// Add a new book (only authenticated users)
router.post("/", auth, addBook);

module.exports = router;
