const express = require('express');
const router = express.Router();
const { bookAppointment, getAppointments, updateStatus } = require('../controllers/appointmentController');
const { protect, doctor } = require('../middleware/authMiddleware'); // Import Middleware

router.post('/', protect, bookAppointment);
router.get('/user/:userId', protect, getAppointments);
router.put('/:id/status', protect, doctor, updateStatus); // Only Doctors can update status

module.exports = router;