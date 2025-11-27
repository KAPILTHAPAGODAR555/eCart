const { default: mongoose } = require("mongoose");
const { profileSchema } = require("../schema/profileSchema");

const profileModel = mongoose.model('userProfile' , profileSchema);

module.exports = profileModel;