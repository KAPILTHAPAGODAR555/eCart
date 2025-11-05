const express = require("express");
const { orderShow, orderFetch, orderTrack } = require("../controllers/order");
const { verfiyToken } = require("../middleware/authMiddleware");
const router = express.Router({mergeParams: true});

router.get("/show/:id/" , orderShow);
router.post("/track/" , orderTrack);
router.post("/" , verfiyToken ,  orderFetch);


module.exports = router;
