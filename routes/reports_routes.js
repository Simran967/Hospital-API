const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reports_controller');

// mapping incoming routes with respective controller methods
router.get('/:status', reportController.getReportsByStatus);

module.exports = router;