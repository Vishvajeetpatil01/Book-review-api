const Review = require("../models/Review");

// Add a new review to a book
exports.addReview = async (req, res) => {
  const { rating, comment } = req.body;
  try {
    // Create and save review with user and book reference
    const review = new Review({ ...req.body, rating, comment, user: req.user._id, book: req.params.id });
    await review.save();
    res.status(201).json(review);
  } catch {
    // Assume duplicate review (user already reviewed this book)
    res.status(400).json({ message: "You have already reviewed this book" });
  }
};

// Update user's own review
exports.updateReview = async (req, res) => {
  const review = await Review.findById(req.params.id);

  // Check if review exists and belongs to the logged-in user
  if (!review || review.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  // Apply updates and save
  Object.assign(review, req.body);
  await review.save();
  res.json(review);
};

// Delete user's own review
exports.deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);

  // Check if review exists
  if (!review) {
    return res.status(404).json({ message: 'Review not found' });
  }

  // Ensure the review belongs to the user
  if (review.user.toString() !== req.user.id) {
    return res.status(403).json({ message: 'You are not allowed to delete this review' });
  }

  // Delete the review
  await Review.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: 'Review deleted successfully' });
};
