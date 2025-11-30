const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const productModel = require("../models/productModel");
const reviewModel = require("../models/reviewModel");
const { joiReviewSchema } = require("../util/joiSecure");

module.exports.addReview = async (req, res) => {
    let { id } = req.params;
    let userId = req.user;
    let { info } = req.body;
    joiReviewSchema.validate(info);
    try {
        let review = await reviewModel.insertOne(info);
        review.author.push(user);
        review.save();
        let product = await productModel.findById(id);
        let userRev = await userModel.findById(userId);
        userRev.reviews.push(review);
        await userRev.save();
        product.reviews.push(review);
        await product.save();
        return res.json({ message: "Review save", succes: true });
    } catch (error) {
        return res.json({ message: error, success: false });
    }

}

module.exports.deleteReview = async (req, res) => {
    let productId = req.params.id;
    let reviewId = req.params.reviewId;
    let user = req.user;
    try {
        await userModel.findByIdAndUpdate(user, { $pull: { reviews: reviewId } });
        await productModel.findByIdAndUpdate(productId, { $pull: { reviews: reviewId } })
        await reviewModel.findByIdAndDelete(reviewId);
        res.json({ message: "Successfully delete", success: true });
    } catch (error) {
        res.json({ message: error, success: false });
    }
}

module.exports.sendData = async (req, res) => {
    let { id } = req.params;
    let user = req.user;
    let data = await productModel.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'author',
            model: 'user'
        }
    });
    res.json({ data, success: true, id: user })
}