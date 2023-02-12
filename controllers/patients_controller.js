const Patient = require('../models/patientsSchema');

// register patient
exports.register = async (req,res)=>{
    try{
        // get data from body
        const {name, phoneNumber} = req.body;
        // find patient by phone number
        let patient = await Patient.findOne({ phoneNumber });
        //  if patient then return its data in json 
        if(patient){
            return res.json(patient);
        }
        // create new patient
        patient = new Patient({
            name,
            phoneNumber
        });
        // save patient
        await patient.save();
        return res.json(patient);
    } catch(err){
        return res.status(500).send('Server Error');
    }
};