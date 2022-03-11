const express = require('express')
const router1 = express.Router()

const {createPaymentIntent} = require('../controllers/stripe')
//middleware
const {authCheck} = require('../middlewares/auth');

router1.post('/create-payment-intent', authCheck, createPaymentIntent);

module.exports = router1;