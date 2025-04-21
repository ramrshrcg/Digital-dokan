//package
import express from 'express';


//import files
import '../database/connecttodb';
import userRoute from '../Routes/userRoutes';
import categoryRoute from '../Routes/categoryRoutes';
import productRoute from '../Routes/productRoutes';




const app= express()
app.use(express.json())

app.use("/api/user", userRoute)
app.use("/api/category", categoryRoute)
app.use("/api/product", productRoute)






export default app