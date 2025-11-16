const contactModel = require("../models/contactModel");
const userModel = require("../models/userModel");
const { joiUserSchema, joiContactSchema } = require("../util/joiSecure");
const { createSecretToken } = require("../util/secretToken");
const bcrypt = require('bcrypt');

module.exports.signUp = async(req , res , next)=> {
    let {email , password} = req.body;
    // console.log(email);
    // console.log(req.body);
    let existingUser = await userModel.findOne({email});
    if(existingUser){
        return res.status(400).json({message: "User already exist" , success : false});
    }
    let {info }= req.body;
    joiUserSchema.validate(info);
    const hashPassword = await bcrypt.hash(password , 10);
    let newUser = await userModel.insertOne({...info , email , password: hashPassword});
    let token = createSecretToken(newUser._id);
    res.cookie("token" , token , {
        withCredentials : true,
        httpOnly: false,
    })
    res.status(200).json({message : "User signed successfully" , success : true , id:newUser._id});
    next();
}

module.exports.login = async(req , res , next) => {
    let info = req.body;
    let userExist = await userModel.findOne({email : info.email});
    if(!userExist){
        return res.json({message : "You are not authenticate" , success : false});
    }

    let auth =  bcrypt.compare(info.password , userExist.password);
    if(!auth){
        console.log(info.password);
        return res.json({message : "You are authentication wrong" , success : false});
    }
    let token = createSecretToken(userExist._id);
    res.cookie("token" , token , {
        withCredentials : true, 
        httpOnly: false
    })
    res.status(200).json({message : "You are aunthenticate" , success: true , id:userExist._id});
    next();
}

module.exports.contact = async(req , res)=> {
    let info = req.body;
    joiContactSchema.validate(info);
    let contactInfo = await contactModel.insertOne(info);
    if(contactInfo){
    res.json({message: "Your query submitted successfully" , success : true});
    }else{
        res.json({message : "There is issue in submitting query ,please try later" , succes: false , });
    }
    
}