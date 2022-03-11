const express = require("express");

const router1 = express.Router();
//middlewares
const {authCheck} = require("../middlewares/auth");
//controllers
const {
    userCart, 
    getUserCart, 
    emptyCart, 
    saveAddress,
    applyCouponToUserCart, 
    createOrder,
    orders,
    addToWishlist,
    wishlist,
    removeFromWishlist,
    createCashOrder,
} = require('../controllers/user');

router1.post('/user/cart', authCheck, userCart );
router1.get('/user/cart', authCheck, getUserCart);
router1.delete('/user/cart', authCheck, emptyCart);
router1.post('/user/address', authCheck, saveAddress);

router1.post('/user/order', authCheck, createOrder);
router1.post('/user/cash-order', authCheck, createCashOrder);
router1.get('/user/orders', authCheck, orders)

//coupon
router1.post('/user/cart/coupon', authCheck, applyCouponToUserCart);

//wishlisht
router1.post('/user/wishlist', authCheck, addToWishlist);
router1.get('/user/wishlist', authCheck, wishlist);
router1.put('/user/wishlist/:productId', authCheck, removeFromWishlist);

// router1.get("/user", (req, res) => {
//     res.json({
//         data:"hey you hit user API endpoint",
//     });
// });

module.exports = router1;