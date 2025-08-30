const express = require("express");
const { orderShow, orderFetch, orderTrack } = require("../controllers/order");
const router = express.Router({mergeParams: true});

router.get("/show/:id/" , orderShow);
router.post("/track/" , orderTrack);
router.post("/:userId/" , orderFetch);


module.exports = router;
