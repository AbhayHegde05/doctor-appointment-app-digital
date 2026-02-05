const User = require('../models/User');
const Campaign = require('../models/Campaign');

exports.verifyDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, { isVerified: true });
    res.json({ message: 'Doctor verified successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.approveCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    await Campaign.findByIdAndUpdate(id, { status: 'approved' });
    res.json({ message: 'Campaign approved successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Helper to get unverified doctors
exports.getPendingDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor', isVerified: false });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};