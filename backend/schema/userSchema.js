const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    username : String,
    email : String,
    phone: String,
    countryCode : String,
    password: String,
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'review'
        }
    ],
    cart: [
       { product : {
            type: mongoose.Schema.Types.ObjectId,
            ref:'product'
        },
        qty: {
            type:Number,
            default:0
        }
    }
    ],
    
})

// userSchema.pre('save' , async function() {
//     this.password = await bcrypt.hash(this.password , 12);
// });

module.exports = userSchema;