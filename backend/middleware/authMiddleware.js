const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
require('dotenv').config();


module.exports.verfiyToken = (req , res , next) => {
let token = req.cookies.token;

if(!token)return res.json({message : "You are not authenticate" , status : false});
let auth = jwt.verify(token , process.env.SECRET_KEY , async(err , data)=> {
    if(err){
     return res.json({ status: false })
    }else{
        let user = await userModel.findById(data.id);
        if(user)return res.json({ status: true, user: user })
        else return res.json({status : false});
        
    }
})
}