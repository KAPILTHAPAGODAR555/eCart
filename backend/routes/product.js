const express = require('express');
const { addReview, deleteReview, sendData } = require('../controllers/product');
const { joiReviewSchema } = require('../util/joiSecure');
const router = express.Router({mergeParams: true});
const Joi = require('joi');

router.post("/review/:id", addReview);
router.delete("/:id/review/:reviewId/delete/", deleteReview);
router.get("/show/:id" , sendData);
module.exports = router;