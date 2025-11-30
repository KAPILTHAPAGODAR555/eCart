const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const productModel = require("../models/productModel");


module.exports.cartAdd = async (req, res) => {
    let { productId, userId } = req.params;
    try {
        let product = await productModel.findById(productId);
        let user = await userModel.findById(req.user);
        for (let i = 0; i < user.cart.length; i++) {
            if (productId == user.cart[i].product) return res.status(200).json({ status: false, message: "Product alreday in the cart" });
        }
        user.cart.push({ product, qty: 0 });
        await user.save();
        res.status(200).json({ status: true, message: "Product added successfully in the cart" });
    } catch (error) {
        res.status(200).json({ status: false, message: "Try later! It is not work" });
    }

}

module.exports.updateCart = async (req, res) => {
    let { cart } = req.body;
    let userId = req.user;
    let user = await userModel.findById(userId);
    user.cart.map((element) => {
        if (element._id == cart.id) {
            element.qty = cart.qty;
        }
    })
    user.save();
    res.send("done");
}

module.exports.showCart = async (req, res) => {
    try {
        let userId = await userModel.findById(req.user).populate({
            path: 'cart.product',
            model: 'product'

        });
        return res.json({ status: true, info: userId.cart });
    } catch (error) {
        return res.json({ status: false, info: error });
    }
}

module.exports.deleteCart = async (req, res) => {
    let { id } = req.params;
    let userId = req.user;
    try {
        let user = await userModel.findById(userId);
        let newCart = user.cart.filter(element => element._id != id);
        user.cart = newCart;
        await user.save();
        return res.json({ status: true, message: "Product Remove Successfully" });
    } catch (error) {
        return res.json({ status: false, message: 'Product does not remove successfully' });
    }
}