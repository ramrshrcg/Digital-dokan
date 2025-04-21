import { Router } from "express";
import express from "express";
import { authenticateToken, authorizeRoles, Role } from "../Middleware/tokenAuth";
import productController from "../Controller/productController";

const route:Router= express.Router()

route.get('/getAllProducts', productController.getAllProducts)
route.get('/getSingleProduct/:id', productController.getSingleProduct)
route.post('/createProduct', authenticateToken,authorizeRoles(Role.Admin), productController.createProduct)
route.post('/deleteProduct/id', authenticateToken,authorizeRoles(Role.Admin), productController.deleteProduct)

export default route;  

