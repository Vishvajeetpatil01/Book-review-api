const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Generate JWT token with user ID
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });

// Handle user signup
exports.signup = async (req, res) => {
  const { username, password } = req.body;

  // Create and save new user
  const user = new User({ username, password });
  await user.save();

  // Return token after successful signup
  res.status(201).json({ token: generateToken(user._id) });
};

// Handle user login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  const user = await User.findOne({ username });

  // Check if user exists and password matches
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Return token after successful login
  res.json({ token: generateToken(user._id) });
};
