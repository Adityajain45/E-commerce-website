const User = require("../models/userModel");
const validator = require("validator");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(422).json({
                success: false,
                message: "Invalid email format",
            });
        }

        // Password length check
        // Password length check
        if (password.length < 6) {
          return res.status(422).json({
              success: false,
              message: "Password must be at least 6 characters long.",
          });
        }


        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User is not registered, please sign up first.",
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password.",
            });
        }

        // JWT Token generation
        const payload = {
            email: user.email,
            id: user._id,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "4h",
        });

        user.token = token;
        user.password = undefined;

        // Success Response
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user,
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later.",
        });
    }
};


// Route for user register
exports.registerUser = async (req, res) => {
    try {
      const { email, name, password } = req.body;
  
      // Check for required fields
      if (!email || !name || !password) {
        return res.status(400).json({
          success: false,
          message: "All fields (name, email, password) are required.",
        });
      }
  
      // Validate email format
      if (!validator.isEmail(email)) {
        return res.status(422).json({
          success: false,
          message: "Invalid email format.",
        });
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "User already exists. Please use a different email.",
        });
      }
  
      // Password strength check
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 6 characters long.",
        });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create user
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
  
      // Create JWT token
      const payload = {
        email: user.email,
        id: user._id,
      };
  
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
  
      user.token = token;
      user.password = undefined;  
  
      return res.status(201).json({
        success: true,
        message: "User registered successfully.",
        token,
      });
    } catch (error) {
      console.error("Registration error:", error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again later.",
      });
    }
};
  

//Route for admin login
exports.adminLogin = async (req, res) => {
    try {
      const {email, password} = req.body

      if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const token = jwt.sign({ email,password }, process.env.JWT_SECRET,{
          expiresIn: "1h"
        });
        res.status(200).json({
          success:true,
          message:"Login successful",
          token
        })
      }else{
        res.status(401).json({
          success:false,
          message:"Invalid credentials"
        })
      }
    } catch (error) {
        console.log(error)
        res.status(500).json({
          success:false,
          message:error.message
      })
  }
}