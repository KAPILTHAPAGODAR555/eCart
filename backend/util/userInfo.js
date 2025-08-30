const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
require('dotenv').config();

module.exports.userInfo = async(token)=> {
    if(!token)return "Not Found";
    try {
        let data =  jwt.verify(token , process.env.SECRET_KEY)
        let user = await userModel.findById(data.id);
        if(user)return user;
        else return "Not Found";
    } catch (error) {
        return "Not Found";
    }
   
}