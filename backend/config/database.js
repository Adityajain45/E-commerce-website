const mongoose = require("mongoose")
require("dotenv").config();

exports.connectDB = () => {
    mongoose.connect(process.env.MONGODB_URL)

    .then(()=> console.log("DB connection Successfully"))
    .catch((error)=>{
        console.log("DB connection Failed")
        console.error(error)
        process.exit(1);
    })
}