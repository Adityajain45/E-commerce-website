const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:Array,
        require:true
    },
    category:{
        type:String,
        required:true
    },
    subCategory:{
        type:String,
        required:true
    },
    sizes:{
        type:Array,
        required:true
    },
    bestSeller:{
        type:Boolean
    },
    date:{
        type:Number,
        required:true
    }

}
)

// Export the Mongoose model for the product schema, using the name "product"
module.exports = mongoose.model("Product", productSchema)