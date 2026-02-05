const express = require('express');
const router = express.Router();
const { createCampaign, getCampaigns } = require('../controllers/campaignController');
const { protect } = require('../middleware/authMiddleware'); // Import Middleware

router.post('/', protect, createCampaign); // Must be logged in to raise funds
router.get('/', getCampaigns); // Public access

module.exports = router;