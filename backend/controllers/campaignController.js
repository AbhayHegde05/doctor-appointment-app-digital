const Campaign = require('../models/Campaign');

exports.createCampaign = async (req, res) => {
  try {
    const newCampaign = new Campaign({
      ...req.body,
      status: 'pending' // Always pending until Admin approves
    });
    const savedCampaign = await newCampaign.save();
    res.status(201).json(savedCampaign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCampaigns = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    
    const campaigns = await Campaign.find(filter)
      .populate('creatorId', 'firstName lastName')
      .sort({ createdAt: -1 });
      
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};