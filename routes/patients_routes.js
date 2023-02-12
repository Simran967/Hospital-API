const express = require('express');
const {authenticate} = require('../config/jwt');
const router = express.Router();
const patientsController = require('../controllers/patients_controller')
const reportsController = require('../controllers/reports_controller');

// mapping incoming routes with their respective controller methods
router.post('/register', authenticate,patientsController.register);
router.post('/:id/create_report',authenticate,reportsController.createReport);
router.get('/:id/all_reports', reportsController.getAllReports);

module.exports = router;