const express = require("express");

const router1 = express.Router();
//middlewares
const {authCheck, adminCheck} = require("../middlewares/auth");
//controllers
const {orders, orderStatus} = require('../controllers/admin');

//ryoutes
router1.get('/admin/orders', authCheck, adminCheck, orders);
router1.put('/admin/order-status', authCheck, adminCheck, orderStatus);

module.exports = router1;