const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const emailPattern = /^\S+@\S+\.\S+$/;

async function register(req, res, next) {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    if (!firstName?.trim() || !lastName?.trim() || !emailPattern.test(email || '') || !password) {
      return res.status(400).json({ success: false, message: 'Please provide valid registration details' });
    }
    if (password.length < 8) return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
    if (password !== confirmPassword) return res.status(400).json({ success: false, message: 'Passwords do not match' });
    const normalizedEmail = email.toLowerCase().trim();
    if (await User.exists({ email: normalizedEmail })) return res.status(409).json({ success: false, message: 'An account with this email already exists' });
    const user = await User.create({ firstName, lastName, email: normalizedEmail, password });
    res.status(201).json({ success: true, message: 'Registration successful. Please sign in.', user: user.safeUser() });
  } catch (error) { next(error); }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password are required' });
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
    if (!user || !(await user.comparePassword(password))) return res.status(401).json({ success: false, message: 'Invalid email or password' });
    res.json({ success: true, message: 'Login successful', token: generateToken(user._id), user: user.safeUser() });
  } catch (error) { next(error); }
}

function getMe(req, res) {
  res.json({ success: true, data: req.user.safeUser() });
}

module.exports = { register, login, getMe };

