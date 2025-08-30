const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const { joiOrderSchema } = require("../util/joiSecure");
module.exports.orderShow =  async(req , res)=> {
    let {id} = req.params;
    try {
       let order = await orderModel.find({userId : id}).populate('tracking_history')
    // console.log(userId.cart);
        return res.json({status : true , info: order});
    } catch (error) {
       return res.json({status: false, info: error});
    }
}
module.exports.orderTrack = async(req , res) => {
    let {info , orderId} = req.body;
    let orderTrack = await orderModel.findById(orderId);
    orderTrack.tracking_history = [];
    orderTrack.Currentstatus = info.status;
    orderTrack.tracking_history.push(info);
    orderTrack.save();
    return res.json({status: true , message: "got"});
}

module.exports.orderFetch = async(req , res) => {
    try {
         let prodInfo = [];
    let {userId} = req.params;
    let {data , info , sum} = req.body;
   
    for(let i = 0; i<data.length; i++){
        let productId = data[i].product._id;
        let qty = data[i].qty;
        prodInfo.push({productId , qty});
    };

    // let statusArr = ['Shipped', 'Processing', 'Delivered'];
    let status =  'Order Placed';
    let tracking_history = {
        status 
    }
    // console.log(prodInfo);
    let finalInfo = {userId , productInfo:prodInfo , address: info.address , state: info.state , check: info.check , zip: info.zip , city: info.city , mode: info.mode , total: sum, currentStatus : status , tracking_history}
    joiOrderSchema.validate(finalInfo);
    await orderModel.insertOne(finalInfo)
     if(data.length != 1){
    let user = await userModel.findById(userId);
    user.cart = [];
    await user.save();
}
     // console.log(req.body);
    } catch (error) {
        return res.json({status: false});
    }
    return res.json({status: true});
}


