const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    items:{
        type:Array,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    address:{
        type:Object,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:'Order Placed'
    },
    PaymentMethod:{
        type:String,
        required:true
    },
    payment:{
        type:Boolean,
        required:true,
        default:false
    },
    date:{
        type:Date,
        required:true
    }
})


// Export the Mongoose model for the product schema, using the name "product"
module.exports = mongoose.model("Order", orderSchema)
