// backend/controllers/users.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

// User registration
const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      res.status(400).json({ error: 'Username already exists' });
    } else {
      const newUser = await User.create({ username, password });

      // Create a JWT token for authentication
      const token = jwt.sign({ userId: newUser.id }, config.jwtSecret, { expiresIn: '1h' });

      res.status(201).json({ user: newUser, token });
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not register the user' });
  }
};

// User login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (user && user.password === password) {
      // Create a JWT token for authentication
      const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: '1h' });

      res.status(200).json({ user, token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not log in' });
  }
};

module.exports = {
  register,
  login,
};
