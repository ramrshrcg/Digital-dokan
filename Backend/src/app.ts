//package
import express from 'express';
import cors from "cors";


//import files
import '../database/connecttodb';
import userRoute from '../Routes/userRoutes';
import categoryRoute from '../Routes/categoryRoutes';
import productRoute from '../Routes/productRoutes';
import orderRoute from "../Routes/orderRoute"
import cartRoute from "../Routes/cartRoute"




const app= express()
app.use(express.json())
app.use(cors())


app.use("/api/user", userRoute)
app.use("/api/category", categoryRoute)
app.use("/api/product", productRoute)
app.use("/api/order",orderRoute)
app.use("/api/cart", cartRoute)






export default app