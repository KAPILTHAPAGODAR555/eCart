const contactModel = require("../models/contactModel");
const profileModel = require("../models/profileModel");
const userModel = require("../models/userModel");
const { cloudinary } = require("../util/cloudinaryConfig");
const { joiUserSchema, joiContactSchema } = require("../util/joiSecure");
const { createSecretToken } = require("../util/secretToken");
const bcrypt = require('bcrypt');

module.exports.signUp = async(req , res , next)=> {
    let {email , password} = req.body;
    // console.log(email);
    // console.log(req.body);
    let existingUser = await userModel.findOne({email});
    if(existingUser){
        return res.status(400).json({message: "Email exist" , success : false});
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
    res.status(200).json({message : "SignIn successfully , Welcome to eCart" , success : true , id:newUser._id});
    next();
}

module.exports.login = async(req , res , next) => {
    let info = req.body;
    let userExist = await userModel.findOne({email : info.email});
    if(!userExist){
        return res.json({message : "You are not authenticate , try again" , success : false});
    }

    let auth =  bcrypt.compare(info.password , userExist.password);
    if(!auth){
        console.log(info.password);
        return res.json({message : "You are authentication , try again" , success : false});
    }
    let token = createSecretToken(userExist._id);
    res.cookie("token" , token , {
        withCredentials : true, 
        httpOnly: false
    })
    res.status(200).json({message : "You are aunthenticate , welcome to eCart" , success: true , id:userExist._id});
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

module.exports.updateProfilePhoto = async(res,req) =>  {
    let id = req.user;
    if(!req.file)return res.status(404).json({message: "Error not found"});
    try {
        const userProfile = await profileModel.findOne({userInfo: id});
        let url = "";
        const uploadStream = cloudinary.uploader.upload_stream({resource_type: 'auto'} ,async(err , data) => {
            if(err)return res.status(401).json({message: "profile not update"});
            url = data.secure_url;
        })
        uploadStream(req.file.buffer);
        userProfile.profilePicture = url == "" ? userProfile.profilePicture : url;
        await userProfile.save();
        return res.status(200).json({message: "Profile update successfully"});
    } catch (error) {
        return res.json({message: "Error in updating"});
    }
}

module.exports.getProfileInfo = async(req , res) => {
    let id = req.user;

    try {
        const profileInfo = await profileModel.findOne({userInfo: id}).populate('userInfo' , 'email username phone');

        return res.status(200).json({data: profileInfo});
    } catch (error) {
        return res.status(400).json({message: "error in sending the data"});
    }
}