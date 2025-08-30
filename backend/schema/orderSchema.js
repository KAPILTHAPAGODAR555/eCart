const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    productInfo: [{
        product : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        },
        qty: {
            type: Number,
        }
    }
    ],
    address : {
        type: String,
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    zip: {
        type: String
    },
    mode: {
        type: String
    },
    total : {
        type: Number
    },

    check : {
        type: Boolean
    },
    Currentstatus : {
        type: String,
        enum: ['Shipped', 'Order Placed', 'Out for Delivery' ,  'Delivered'],
        default: 'Order Placed' 
    },
    tracking_history : [
    {
        status : {
            type: String,
            enum: ['Shipped', 'Order Placed', 'Out for Delivery' , 'Delivered'],
            default: 'Order Placed' 
        },
        location : {
            type:String , 
            default: "Online Store",
        },
        timestamps: {
            type: Date,
            default: Date.now()
        },
        remarks: {
            type: String,
            default: "Just order is placed",
        }
    }
]
}, {
    timestamps: true
})

module.exports = orderSchema;