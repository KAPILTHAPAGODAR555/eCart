const express = require('express');
const { addReview, deleteReview, sendData } = require('../controllers/product');
const router = express.Router({mergeParams: true});
const { verfiyToken } = require('../middleware/authMiddleware');

router.post("/review/:id", verfiyToken ,  addReview);
router.delete("/:id/review/:reviewId/delete/", verfiyToken , deleteReview);
router.get("/show/:id" , verfiyToken ,  sendData);
module.exports = router;