const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.adminAuth = async (req, res, next) => {
    try {
      const { token } = req.headers;
  
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Token is missing",
        });
      }
  
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
  
        // Check if the decoded email and password match admin credentials
        if (
          decoded.email !== process.env.ADMIN_EMAIL ||
          decoded.password !== process.env.ADMIN_PASSWORD
        ) {
          return res.status(403).json({
            success: false,
            message: "Not Authorized",
          });
        }
  
        req.user = decoded;
        next();
      } catch (error) {
        return res.status(401).json({
          success: false,
          message: "Token is invalid",
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while validating the token",
      });
    }
};
  
