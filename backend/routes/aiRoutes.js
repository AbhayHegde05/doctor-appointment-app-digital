const express = require('express');
const router = express.Router();
const { diagnose } = require('../controllers/aiController');

router.post('/diagnose', diagnose);

module.exports = router;