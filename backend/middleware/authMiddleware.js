const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
require('dotenv').config();


module.exports.verfiyToken = (req , res , next) => {
let authHeader = req.headers['authorization'];
let token = authHeader && authHeader.split(' ')[1];
// console.log(token);
if(!token)return res.status(401).json({message : "You are not authenticate" , status : false});
jwt.verify(token , process.env.SECRET_KEY , async(err , data)=> {
    if(err){
     return res.status(400).json({ status: false });
    }
    req.user = data.id;
    next(); 
})
}