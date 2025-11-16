const express = require('express');
const mongoose = require('mongoose');
const userModel = require('./models/userModel');
require("dotenv").config();
const bcrypt = require("bcrypt")
const app = express();
const port = process.env.PORT || 8000;
const cors = require('cors');
const { createSecretToken } = require('./util/secretToken');
const { json } = require('body-parser');
const { verfiyToken } = require('./middleware/authMiddleware');
const productModel = require('./models/productModel');
const contactModel = require('./models/contactModel');
const UserRouter = require('./routes/user');
const OrderRouter = require('./routes/order')
const CartRouter = require('./routes/cart');
const ProductRouter = require("./routes/product");
const reviewModel = require('./models/reviewModel');
const cookieParser = require('cookie-parser');
const { userInfo } = require('./util/userInfo');
const orderModel = require('./models/orderModel');
const MONGO_URL = process.env.MONGO_URL;
console.log(MONGO_URL);
app.use(cors({
    origin: ['http://localhost:5174' , 'http://localhost:5173'],
    methods : ['PUT' , 'GET' , 'POST' , 'DELETE'],
    credentials: true
}))
app.use(json());
app.use(cookieParser())
main().then(()=> {
    console.log("database connect");
}).catch((error)=> {
console.log(error);
})
async function main() {
    await mongoose.connect(MONGO_URL);
}
app.get("/" , async(req , res) => {
res.send("hello from eCart");
});
app.use("/user" , UserRouter);
app.use("/order" , OrderRouter);
app.use("/cart" , CartRouter);
app.use("/product", ProductRouter);
app.get("/allProduct" , async(req , res)=> {
  try {
    let data = await productModel.find({});
    // console.log(data);
    return res.status(200).json({items: data , message: "Succesfully"});
  } catch (error) {
    return res.status(400).json({message: "Error"});
  }
    
})
app.get("/user/login" , verfiyToken);
// order apis 
app.get("/product/buy/:id" , async(req , res) => {
    try {
        let element = [];
    let {id} = req.params;
    let product = await productModel.findById(id);
        res.json({status: true , info: [{product : product , qty: 1}]});
    } catch (error) {
        res.json({status: false , info: error});
    }
})
app.listen(port , ()=> {
    console.log(`app listen at ${port}`);
});