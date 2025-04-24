import { Router } from "express";
import express from "express";
import { authenticateToken, authorizeRoles, Role } from "../Middleware/tokenAuth";
import productController from "../Controller/productController";
import multer from "multer";
import { storage } from "../Middleware/multerConfig";
import errorHandler from "../Middleware/errorHandler";


const upload = multer({ storage: storage })
const route: Router = express.Router()

route.get('/getAllProducts', errorHandler(productController.getAllProducts))
route.get('/getSingleProduct/:id', errorHandler(productController.getSingleProduct))
route.post('/createProduct', authenticateToken, authorizeRoles(Role.Admin), upload.single("image"), errorHandler(productController.createProduct))
route.delete('/deleteProduct/:id', authenticateToken, authorizeRoles(Role.Admin), errorHandler(productController.deleteProduct))
//can add patch route
export default route;

