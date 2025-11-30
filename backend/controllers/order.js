const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const { joiOrderSchema } = require("../util/joiSecure");
module.exports.orderShow = async (req, res) => {
    let id = req.user;
    try {
        let order = await orderModel.find({ userId: id }).populate('tracking_history')
        return res.json({ status: true, info: order.reverse() });
    } catch (error) {
        return res.json({ status: false, info: error });
    }
}
module.exports.orderTrack = async (req, res) => {
    let { info, orderId } = req.body;
    let orderTrack = await orderModel.findById(orderId);
    orderTrack.tracking_history = [];
    orderTrack.Currentstatus = info.status;
    orderTrack.tracking_history.push(info);
    orderTrack.save();
    return res.json({ status: true, message: "update successfully" });
}

module.exports.orderFetch = async (req, res) => {
    try {
        let prodInfo = [];
        let userId = req.user;
        let { data, info, sum } = req.body;

        for (let i = 0; i < data.length; i++) {
            let productId = data[i].product._id;
            let qty = data[i].qty;
            prodInfo.push({ productId, qty });
        };
        let status = 'Order Placed';
        let tracking_history = {
            status
        }
        let finalInfo = { userId, productInfo: prodInfo, address: info.address, state: info.state, check: info.check, zip: info.zip, city: info.city, mode: info.mode, total: sum, currentStatus: status, tracking_history }
        joiOrderSchema.validate(finalInfo);
        await orderModel.insertOne(finalInfo)
        if (data.length != 1) {
            let user = await userModel.findById(userId);
            user.cart = [];
            await user.save();
        }
    } catch (error) {
        return res.json({ status: false });
    }
    return res.json({ status: true });
}


