//package
import express from 'express';


//import files
import '../database/connecttodb';
import router from '../Routes/userRoutes';

const app= express()
app.use(express.json())

app.use("/api", router)




export default app