const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const productModel = require("../models/productModel");


module.exports.cartAdd = async(req , res)=> {
let {productId , userId} = req.params;
try {
   let product = await productModel.findById(productId);
let user = await userModel.findById(userId);
for(let i = 0; i<user.cart.length; i++){
    if(productId == user.cart[i].product)return res.json({status: false , message: "Product alreday in the cart"}); 
}
user.cart.push({product , qty: 0});
await user.save();
res.json({status: true , message: "Product added successfully in the cart"}); 
} catch (error) {
    res.json({status: false , message: "Try later! It is not work"});
}

}

module.exports.updateCart = async(req , res) => {
    let {cart} = req.body;
    
    // console.log(req.body);
    let {userId} = req.params;
    // console.log(userId);
    let user = await userModel.findById(userId);
    // console.log(user);
    user.cart.map((element) => {
        cart.map((cartEl) => {
            if(element._id == cartEl.id){
            element.qty = cartEl.qty;
        }
        })
        
    })
    // console.log(user.cart);
    user.save();
    res.send("done");
}

module.exports.showCart = async(req , res)=> {
    let {id} = req.params;
    try {
        let userId = await userModel.findById(id).populate( {
            path: 'cart.product',
            model: 'product'
        
    });
    // console.log(userId.cart);
        return res.json({status : true , info: userId.cart});
    } catch (error) {
       return res.json({status: false, info: error});
    }
}

module.exports.deleteCart = async(req , res)=> {
    let {id , userId} = req.params;
    try {
        // let productId = await productModel.findById(id);
        let user= await userModel.findById(userId);
        let newCart = user.cart.filter(element => element._id != id);
        user.cart = newCart;
        await user.save();
        return res.json({status : true, message: "Product Remove Successfully"});
    } catch (error) {
       return res.json({status: false, message: 'Product does not remove successfully'});
    }
}