const express = require("express");

const router1 = express.Router();

//middlewares
const {authCheck, adminCheck} = require("../middlewares/auth");

//controller
const { create, remove, list } = require("../controllers/coupon");
const { Router } = require("express");


//routes
router1.post('/coupon', authCheck, adminCheck, create);
router1.get('/coupons', list);
router1.delete('/coupon/:couponId', authCheck, adminCheck, remove);

module.exports = router1;