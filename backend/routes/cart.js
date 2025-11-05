const express = require('express');
const { cartAdd, updateCart, showCart, deleteCart } = require('../controllers/cart');
const { verfiyToken } = require('../middleware/authMiddleware');
const router = express.Router({mergeParams: true});

router.get("/product/:productId/user/add/" , verfiyToken ,  cartAdd);
router.put("/update" , verfiyToken ,   updateCart);
router.get("/show" , verfiyToken ,  showCart);
router.delete("/delete/:id" , verfiyToken  , deleteCart)

module.exports = router;