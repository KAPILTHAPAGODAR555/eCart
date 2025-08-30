const mongoose = require('mongoose');
const contactSchema = require('../schema/contactSchema');

const contactModel = mongoose.model("contact" , contactSchema);

module.exports = contactModel;