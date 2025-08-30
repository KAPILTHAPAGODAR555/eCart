const mongoose =  require("mongoose");
const orderSchema = require("../schema/orderSchema");


const orderModel = mongoose.model('order' , orderSchema);

module.exports = orderModel;