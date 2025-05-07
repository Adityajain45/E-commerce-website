const express = require("express");

const router = express.Router();


const {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus,verifyStripe, verifyRazorpay } = require('../controllers/orderController');
const { adminAuth } = require("../middleware/adminAuth");
const { authUser } = require("../middleware/auth");

// admin Features
router.post('/list',adminAuth,allOrders)
router.post('/status',adminAuth,updateStatus)

// Payment Features
router.post('/place',authUser,placeOrder)
router.post('/stripe',authUser,placeOrderStripe)
router.post('/razorpay',authUser,placeOrderRazorpay)


//user Feature
router.post('/userorders',authUser,userOrders)

//verify payment
router.post('/verifyStripe',authUser,verifyStripe)
router.post('/verifyRazorpay',authUser,verifyRazorpay)
module.exports = router