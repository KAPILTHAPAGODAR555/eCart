const express = require("express");
const { orderShow, orderFetch, orderTrack } = require("../controllers/order");
const { verfiyToken } = require("../middleware/authMiddleware");
const router = express.Router({mergeParams: true});

router.get("/show" , verfiyToken ,  orderShow);
router.post("/track/" , verfiyToken ,  orderTrack);
router.post("/" , verfiyToken ,  orderFetch);


module.exports = router;
