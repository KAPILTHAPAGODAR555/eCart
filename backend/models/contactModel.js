const mongoose = require('mongoose');
const contactSchema = require('../schema/contactSchema');

const contactModel = mongoose.model("customerCare" , contactSchema);

module.exports = contactModel;