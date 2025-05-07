const express = require("express");

const router = express.Router();


const {addProduct,listProduct, singleProduct,removeProduct} = require("../controllers/productController");
const  upload  = require("../middleware/multer");
const { adminAuth } = require("../middleware/adminAuth");

// router.post("/add",upload.fields([{name:'image1', maxCount:1},{name:'image2', maxCount:1},{name:'imag3', maxCount:1},{name:'image4', maxCount:1}]),addProduct)
router.post("/add",adminAuth, upload.array("images", 4), addProduct);
router.delete("/remove",adminAuth,removeProduct)
router.get("/single",singleProduct)
router.get("/list",listProduct)

module.exports = router
