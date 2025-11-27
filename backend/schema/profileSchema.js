const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userInfo : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    profilePicture: {
        type: String
    }
})

module.exports = {profileSchema}

