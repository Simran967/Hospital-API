const mongoose = require('mongoose');
const Report = require('./reportsSchema');

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
    phoneNumber: {
      type: String,
      required: true,
      unique: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: false
    },
    reports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Report',
        required: false
      }
    ]
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;