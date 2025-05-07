const express = require('express')
const app = express();
const cors = require('cors')
const dotenv = require('dotenv')

const database = require("./config/database");
const {cloudinaryConnect} = require("./config/cloudinary")

const userRoutes = require("./routes/userRoute");
const productRoutes = require("./routes/productRoute")
const cartRoutes = require("./routes/cartRoute")
const orderRoutes = require("./routes/orderRoute")

dotenv.config();
const PORT = process.env.PORT || 4000

//database connect
database.connectDB();  

//cloudinary connection
cloudinaryConnect();

//middlewares
app.use(express.json())
app.use(cors()) 


//routers
app.use("/api/v1/user",userRoutes)
app.use("/api/v1/product",productRoutes)
app.use("/api/v1/cart",cartRoutes)
app.use("/api/v1/order",orderRoutes)

//default route 
app.get('/',(req, res) => {

    // res.send("Hello sir")
    return res.json({
        success:true,
        message:"Your server is up and running...."
    });
  
})

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
})  