import expreess, { Router } from "express";
import { authenticateToken } from "../Middleware/tokenAuth";
import orderController from "../Controller/oderController";
import errorHandler from "../Middleware/errorHandler";

const route:Router= expreess.Router()

route.post("/createOrder", authenticateToken, errorHandler(orderController.createOrder))
route.post("/verifypayment", authenticateToken, errorHandler(orderController.verifyPayment))
route.get("/getOrder", authenticateToken, errorHandler(orderController.getOrder))




export default route; 