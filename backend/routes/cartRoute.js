const express = require("express");

const router = express.Router();

const {addToCart, updateCart,getUserData} = require('../controllers/cartController');
const { authUser } = require("../middleware/auth");

router.post('/get',authUser, getUserData)
router.post('/add',authUser, addToCart)
router.post('/update',authUser, updateCart)
module.exports = router