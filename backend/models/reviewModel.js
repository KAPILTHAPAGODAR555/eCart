const mongoose  = require("mongoose");
const reviewSchema = require("../schema/reviewSchema");

const reviewModel = mongoose.model('review' , reviewSchema);

module.exports = reviewModel;