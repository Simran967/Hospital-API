const express = require("express");
const router = express.Router();
const fs = require('fs');

// importing all required routes
const doctorsRoutes = require('./doctors_routes');
const patientsRoutes = require('./patients_routes');
const reportsRoutes = require('./reports_routes')

// imported routes will be called after their respective route
router.use('/doctors', doctorsRoutes);
router.use('/patients', patientsRoutes);
router.use('/reports', reportsRoutes);

// rendering index.html data
router.get("/", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile('index.html', function (err, data) {
    if (err) 
        return res.end('<h1>Error!</h1>')
    return res.end(data)
    });
});

module.exports = router;