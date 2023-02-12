const jwt = require('jsonwebtoken');
require('dotenv').config()

// generate token 
const generateToken = (payload) =>{
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '90000'});
};

// verify token
const verifyToken = (token)=>{
    try{
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch(err){
        throw new Error('Token is not Valid');
    }
};

// authenticate
const authenticate = (req,res,next)=>{
    const  token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({msg:'No token , authorization denied'})
    }

    try{
        req.user = verifyToken(token);
        next();
    }catch(err){
        return res.status(401).json({msg : err.message});
    }
};


module.exports = {
    generateToken,
    verifyToken,
    authenticate
}