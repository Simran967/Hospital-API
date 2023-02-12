// importing schemas
const Patient = require("../models/patientsSchema");
const Report = require("../models/reportsSchema");

// creating report
exports.createReport = async (req, res) => {
  try {
    // taking status and doctor from req
    const { status } = req.body;
    const doctor = req.user;
    // find patient by id
    const patient = await Patient.findById(req.params.id);

    // if no patient the return
    if (!patient) {
      return res.status(400).json({ msg: "Patient not found" });
    }
    // create report 
    const report = new Report({
      createdBy: doctor._id,
      status,
      date: Date.now(),
    });
    // store id of patient in report of patient
    report.patient = patient._id;
    // save report
    await report.save();
    // push report to patient 
    patient.reports.push(report);
    // save patient
    await patient.save();
    // return response of report in json format
    return res.json(report);
  } catch (err) {
    return res.status(500).send("Server Error");
  }
};

// get all reports
exports.getAllReports = async (req, res) => {
  try {
    // find patient by id annnd populate its data
    const patient = await Patient.findById(req.params.id).populate(
      "reports",
      "status createdOn"
    );
    // if no patient then return  
    if (!patient) {
      return res.status(400).json({ msg: "Patient not found" });
    }

    // return report in json format
    return res.json(patient.reports);
  } catch (err) {
    return res.status(500).send("Server Error");
  }
};

// get report by status
exports.getReportsByStatus = (req, res) => {
  // get status from params
  const status = req.params.status;
  // find report from status then populate its data
  Report.find({ status })
    .populate("patient", "name")
    .sort({ date: 1 })
    .then((reports)=>{
        if(!reports)
        {
            return res.status(404).send({ message: 'Reports not found' });
        }
        res.status(200).send({ reports });
    }) 
    .catch((error) => {
        res.status(500).send({ message: error.message });
    });
};
