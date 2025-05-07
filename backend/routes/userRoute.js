const express = require ("express");
const router = express.Router();

const {login, registerUser,adminLogin} = require("../controllers/userController")

router.post("/register",registerUser)
router.post('/login', login)
router.post("/admin",adminLogin)

module.exports = router