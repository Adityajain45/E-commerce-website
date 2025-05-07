
//add products to user cart


const User = require("../models/userModel")

exports.addToCart = async (req,res) => {
   try {
    const { userId, itemId, size} = req.body

    if (!userId || !itemId || !size) {
        return res.status(400).json({
          success: false,
          message: "userId, itemId, and size are required.",
        });
    }

    const userData = await User.findById(userId)

    if (!userData) {
        return res.status(400).json({
            success: false,
            message: "User not found.",
        });
    }
    

    let cartData = userData.cartData || {};


    if(cartData[itemId]){
        if(cartData[itemId][size]){
            cartData[itemId][size] +=1
        }
        else{
            cartData[itemId][size] = 1
        }
    }else{
        cartData[itemId] ={}
        cartData[itemId][size] = 1
    }

    await User.findByIdAndUpdate(userId,{cartData})

    res.status(200).json({
        success: true,
        message: "Added to cart",
    });

   } catch (error) {
    console.error("Add to Cart Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    })

   }
}
 

// update user cart
exports.updateCart = async (req,res) => {
    try {
        const {userId, itemId, size, quantity} = req.body

        if (!userId || !itemId || !size || quantity === undefined) {
            return res.status(400).json({
              success: false,
              message: "userId, itemId, size, and quantity are required",
            });
        }

        const userData = await User.findById(userId)

        if (!userData) {
            return res.status(404).json({
            success: false,
            message: "User not found.",
            });
        }

        let cartData = userData.cartData || {};

        cartData[itemId][size] = quantity
        await User.findByIdAndUpdate(userId,{cartData})

        res.json({
            success:true,
            message:"cart Updated"
        })
    } catch (error) {
        console.error("Update cart Error:", error);
       res.status(500).json({
      success: false,
      message: error.message,
    })
    }
}


// get user cart data
exports.getUserData = async (req,res) => {
    try {
        const {userId} = req.body

        if(!userId) {
            return res.status(401).json({
                success:false,
                message: "User ID is required",
            })
        } 
 
        const userData = await User.findById(userId)

        if (!userData) {
            return res.status(400).json({
            success: false,
            message: "UserData not found.",
            });
        }
        

        let cartData = userData.cartData;

        res.json({
            success:true,
            message: "Cart data fetched successfully",
            cartData
        })
    } catch (error) {
        console.error("Get Cart Error:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

