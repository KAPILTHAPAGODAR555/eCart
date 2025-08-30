const express = require('express');
const { cartAdd, updateCart, showCart, deleteCart } = require('../controllers/cart');
const router = express.Router({mergeParams: true});

router.get("/product/:productId/add/:userId/" ,cartAdd);
router.put("/update/:userId/" ,  updateCart);
router.get("/show/:id/" , showCart);
router.delete("/show/:id/:userId" ,deleteCart)

module.exports = router;