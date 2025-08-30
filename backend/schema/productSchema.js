const mongoose = require('mongoose');
const { schema } = require('../models/productModel');

const productSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim : true, 

    },
    description : {
        type: String, 
        required : true,
    },
    price : {
        type : Number,
        required: true,
    },
    unit : {
        type: String,
        required : true,
        enum : ['kg' , 'piece' , 'g', 'bunch'],
    },
    category : {
        type: String, 
        required : true,
        trim: true
    },
    reviews: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref : 'review'
        }
    ],
    imageUrl : {
        type: String,
        required : true,

    },
    stock : {
        type: Number,
        required: true,
        default: 0
    },
    discount : {
        type: Number,
        required: true,
        default : 10
    },
    originalPrice: {
        type:Number,
        // required:true
    },
    originPlace: {
        type: String ,
        default: 'Punjab'
    }

}, {
    timestamps : true
})
module.exports = productSchema;