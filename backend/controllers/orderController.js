// const orderModel = require("../models/orderModel");
// const { currency } = require("../../admin/src/App.jsx")
const Order =  require("../models/orderModel")
const User = require('../models/userModel')
const Stripe = require("stripe")
const razorpay = require("razorpay")


//global variables
const currency = 'inr'
const deliveryCharge = 10

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const razorpayInstance = new razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})

// Placing orders using COD Method
exports.placeOrder = async (req,res) => {
    try {
        const { userId, items, amount, address} = req.body;

        // Validate required fields
        if (!userId || !items || !amount || !address) {
            return res.status(400).json({
            success: false,
            message: "userId, items, amount, and address are required",
           });
        }

        const orderData = {
            userId,
            items,
            address,
            amount,
            PaymentMethod: "COD",
            payment: false,
            date: Date.now()
        };
        

        

        const newOrder = await Order.create(orderData)

        await User.findByIdAndUpdate(userId,{cartData:{}})

        res.status(201).json({
            success: true,
            message: "Order Placed Successfully",
            orderId: newOrder._id,
        }); 

    } catch (error) {
        console.error("Order Placement Error:", error);
        res.status(400).json({
            success: false,
            message: error.message,
       });
    }
}

// Placing orders using Stripe Method
exports.placeOrderStripe = async (req,res) => {
    try {
        const { userId, items, amount, address} = req.body;
     
        // Validate required fields
        if (!userId || !items || !amount || !address) {
            return res.status(400).json({
            success: false,
            message: "userId, items, amount, and address are required",
           });
        }

        const { origin} = req.headers

        const orderData = {
            userId,
            items,
            address,
            amount,
            PaymentMethod: "stripe",
            payment: false,
            date: Date.now()
        };

        const newOrder = await Order.create(orderData)

       const line_items = items.map((item)=> ({
        price_data:{
            currency:currency,
            product_data:{
                name:item.name
            },
            unit_amount:item.price * 100
        },
        quantity: item.quantity
       }))

       line_items.push({
        price_data:{
            currency:currency,
            product_data:{
                name:'Delivery Charges'
            },
            unit_amount: deliveryCharge * 100
        },
        quantity: 1
       })

       const session = await stripe.checkout.sessions.create({
        success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
        line_items,
        mode: 'payment'
    });
    
 
       res.status(200).json({
        success:true,
        session_url:session.url
       })
 
    } catch (error) {
        console.error("Order Placement Error:", error);
        res.status(400).json({
            success: false,
            message: error.message,
       });
    }
}

// verify stripe
exports.verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body;

    try {
        if (success === true || success === "true") {
            await Order.findByIdAndUpdate(orderId, { payment: true });
            await User.findByIdAndUpdate(userId, { cartData: {} });

            return res.status(200).json({
                success: true,
                message: "Payment verified and order confirmed",
            });
        } else {
            await Order.findByIdAndDelete(orderId);

            return res.status(400).json({
                success: false,
                message: "Payment failed, order deleted",
            });
        }
    } catch (error) {
        console.error("Order Placement Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error during Stripe verification",
        });
    }
};


exports.verifyRazorpay = async (req,res) => {
    try {
        const {userId, razorpay_order_id } = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        // console.log(orderInfo)
        if(orderInfo.status === 'paid'){
            await Order.findByIdAndUpdate(orderInfo.receipt,{payment:true})
            await User.findByIdAndUpdate(userId,{cartData:{}})
            res.json({
                success:true,
                message:"Payment Successful"
            })
        }else{
            res.json({
                success:false,
                message:'Payment Failed'
            })
        }
    } catch (error) {
        console.error("Order Placement Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error during Stripe verification",
        });
    }
}


// Placing orders using Razorpay Method
exports.placeOrderRazorpay = async (req,res) => {
    try {
        const { userId, items, amount, address} = req.body;
     
        // Validate required fields
        if (!userId || !items || !amount || !address) {
            return res.status(400).json({
            success: false,
            message: "userId, items, amount, and address are required",
           });
        }

        const { origin} = req.headers

        const orderData = {
            userId,
            items,
            address,
            amount,
            PaymentMethod: "Razorpay",
            payment: false,
            date: Date.now()
        };

        const newOrder = await Order.create(orderData)

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()

        }

        await razorpayInstance.orders.create(options, (error,order)=>{
            if(error){
                console.log(error)
                return res.json({
                    success:false,
                    message:error
                })
            }
            res.json({
                success:true,
                order
            })
        })

    } catch (error) {
        console.error("Order Placement Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error during Stripe verification",
        });
    }
}  

// All Orders data for Admin Panel
exports.allOrders = async (req,res) => {
    try {
        const orders = await Order.find({})
        res.status(200).json({
            success:true,
            message:"All Orders",
            orders
        })
    } catch (error) {
        console.error("Orders Error:", error);
        res.status(400).json({
            success: false,
            message: error.message,
       });
    }
}

// All Orders data for Admin Panel
exports.userOrders = async (req,res) => {
    try {
        const {userId} = req.body;
            console.log(userId)
        const orders = await Order.find({userId})
        res.status(200).json({  
            success:true,
            message:"user Orders",
            orders
        })
    } catch (error) {
        console.error("Order Placement Error:", error);
        res.status(500).json({
            success: false,
            message: error.message,
       });
    }
} 

// update order status from Admin panel
exports.updateStatus = async (req,res) => {
    try {
        const { orderId, status} = req.body

        await Order.findByIdAndUpdate(orderId, {status })
        res.status(200).json({
            success:true,
            message:"Status update Successfully"
        })
    } catch (error) {
        console.error("Update status Error:", error);
        res.status(400).json({
            success: false,
            message: error.message,
       });
    }
}