const User = require('../models/User');
const Otp = require('../models/Otp');
const sendEmailOtp = require('../utils/emailService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');
const dns = require('dns');
const { promisify } = require('util');
const resolveMx = promisify(dns.resolveMx);

// --- 1. VALIDATE EMAIL (DNS Check) ---
exports.validateEmail = async (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) return res.status(400).json({ message: 'Invalid format' });

  const domain = email.split('@')[1];

  try {
    const addresses = await resolveMx(domain);
    if (!addresses || addresses.length === 0) {
      throw new Error('No mail server found');
    }
    res.status(200).json({ message: 'Valid' });
  } catch (error) {
    return res.status(400).json({ message: `Invalid Domain (@${domain})` });
  }
};

// --- 2. SEND OTP (Real Email) ---
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already registered. Please Login.' });
    }

    // Generate Code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Send Email (Waits for success)
    await sendEmailOtp(email, otp);

    // Save to DB (Upsert: Update if exists, Insert if new)
    await Otp.findOneAndUpdate(
      { email }, 
      { otp, createdAt: Date.now() }, 
      { upsert: true, new: true }
    );

    res.json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.error("OTP Error:", err);
    res.status(500).json({ message: 'Failed to send email. Check address.' });
  }
};

// --- 3. VERIFY OTP (Strict Database Check) ---
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    // Find the record
    const record = await Otp.findOne({ email });

    // Check 1: Does record exist?
    if (!record) {
      return res.status(400).json({ message: "OTP expired. Resend Code." });
    }

    // Check 2: Does code match?
    if (record.otp.trim() !== otp.trim()) {
      return res.status(400).json({ message: "Invalid OTP. Try again." });
    }

    // Success
    res.json({ message: 'OTP verified' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- 4. REGISTER (Final Step) ---
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, mobile } = req.body;

    // Double check user doesn't exist (security)
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    user = new User({
      firstName, lastName, email, mobile,
      password: hashedPassword,
      role: role || 'patient',
      isVerified: role === 'patient' 
    });

    await user.save();
    
    // Clean up OTP
    await Otp.deleteOne({ email });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- 5. LOGIN ---
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id, user.role);
    res.json({
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};