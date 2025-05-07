const jwt = require("jsonwebtoken")
require("dotenv").config()


exports.authUser = async (req,res,next) => {

   try {
    const { token } = req.headers;

    if(!token){
        return res.status(401).json({
            success:false,
            message:"Not Authorized Login Again"
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.body.userId = decoded.id
    req.user = {
        id: decoded.id,
        email: decoded.email, // optional if needed
   };

    next()



   } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token. Please login again.",
    })
   }
}