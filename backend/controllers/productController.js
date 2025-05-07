const Product =  require("../models/productModel")
const cloudinary = require("cloudinary").v2;
// function for add product
exports.addProduct = async (req,res) => {
    try {
        const {name ,
            description,
            price,
            category,
            subCategory,
            sizes,
            bestseller
        } = req.body;

        console.log(description,
            price,
            category,
            subCategory,
            sizes,
            bestseller)

        if(!req.files ){
            return res.status(400).json({
                success:false,
                message:"Exactly 4 images are required"
            })
        }

        if(!name || !description || ! price || !category || !subCategory || !sizes){
            return res.status(400).json({
                success:false,
                message:"All required fields must be filled"
            });
        } 

        
        const imagePromises = req.files.map(file => cloudinary.uploader.upload(file.path))
        const imageResults = await Promise.all(imagePromises);
        const imageUrls = imageResults.map(result => result.secure_url);

        const newProduct = await Product.create({
            name,
            description,
            price: Number(price),
            image: imageUrls,  // Save Cloudinary image URLs in DB
            category,
            subCategory,
            bestSeller: bestseller === "true"? true :false,
            sizes:JSON.parse(sizes),
            date: Date.now()
        });

        res.status(201).json({
            success:true,
            message:"Product created Successfully",
            product: newProduct
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
} 


// function for list product
exports.listProduct = async (req,res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            success:true,
            message:"All Product",
            products
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
} 


// function for single product
exports.singleProduct = async (req,res) => {
    try {

        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID not provided",
            });
        }
        const product = await Product.findById(productId)
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success:true,
            message: "Single product fetched successfully"
        }) 
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
} 


// function for remove product
exports.removeProduct = async (req,res) => {
    try {

        const { _id } = req.body;

        if(!_id){
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }

        const deletedProduct = await Product.findByIdAndDelete(_id)
       
        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success:true,
            message:"Product delete Successfully"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
} 

