//package
import express from 'express';


//import files
import '../database/connecttodb';
import userRoute from '../Routes/userRoutes';
import categoryRoute from '../Routes/categoryRoutes';




const app= express()
app.use(express.json())

app.use("/api/user", userRoute)
app.use("/api/category", categoryRoute)






export default app