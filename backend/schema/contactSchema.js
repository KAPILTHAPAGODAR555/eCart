const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({

    username: String,
    email : String,
    phone : String,
    countryCode: String,
    issue: String,
    describe: String
}, {
    timestamps: true
}
)

module.exports = contactSchema;



/*
username: "",
    email: "",
    phone: "",
    countryCode : "",
    issue: "No Default Selection",
    describe: ""
*/