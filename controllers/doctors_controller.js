const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctorsSchema');
require('dotenv').config();

// register doctor
exports.register = async(req, res) => {
    try{
        
        // find doctor
        let doctor = await Doctor.findOne({
            username: req.body.username,
            password: req.body.password
        });
        // if doctor return 
        if(doctor){
            return res.status(400).send({error: "Doctor with this username already exists"})
        }
        // create new doctore
        doctor = new Doctor({
            username: req.body.username,
            password: req.body.password
        })
        // save doctor
        await doctor.save();
        res.status(201).send({ message: "Doctor registered successfully"})
    }catch(err){
        res.status(400).send({ error: err.message });
    }

};

exports.login = async(req,res)=>{
    try{
        const doctor = await Doctor.findOne({
            username: req.body.username,
            password: req.body.password,
        });
        console.log(doctor)
        if (!doctor) {
            return res.status(401).send({ error: "Invalid username or password" });
        }
        console.log(doctor)
        const token = jwt.sign({id: doctor._id}, process.env.JWT_SECRET,{
            expiresIn: 10000,
        });
        res.status(200).send({ token });
    }catch(err){
        res.status(400).send({ error: err.message });
    }
};