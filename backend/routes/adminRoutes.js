const express = require('express');
const router = express.Router();
const { verifyDoctor, approveCampaign, getPendingDoctors } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware'); // Import Middleware

// All routes here need Login AND Admin role
router.put('/verify-doctor/:id', protect, admin, verifyDoctor);
router.put('/approve-campaign/:id', protect, admin, approveCampaign);
router.get('/pending-doctors', protect, admin, getPendingDoctors);

module.exports = router;