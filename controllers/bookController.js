// Add a new book to the system
// route POST /api/books
// access to Private (authenticated users only)

const Book = require("../models/Book");
const Review = require("../models/Review");

exports.addBook = async (req, res) => {
  const book = new Book({ ...req.body, createdBy: req.user._id });
  await book.save();
  res.status(201).json(book);
};

exports.getBooks = async (req, res) => {
  const { author, genre, page = 1, limit = 10 } = req.query;
  const filter = {};
  if (author) filter.author = new RegExp(author, "i");
  if (genre) filter.genre = new RegExp(genre, "i");

  const books = await Book.find(filter)
    .skip((page - 1) * limit)
    .limit(+limit);
  res.json(books);
};

exports.getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });

  const reviews = await Review.find({ book: book._id });
  const averageRating = reviews.reduce((acc, cur) => acc + cur.rating, 0) / (reviews.length || 1);

  res.json({ ...book.toObject(), averageRating, reviews });
};

exports.searchBooks = async (req, res) => {
  const { q } = req.query;
  const regex = new RegExp(q, "i");
  const books = await Book.find({ $or: [{ title: regex }, { author: regex }] });
  res.json(books);
};
