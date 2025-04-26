
import express from 'express';
import { authenticateToken, authorizeRoles, Role } from '../Middleware/tokenAuth';
import cartController from '../Controller/cartController';
import errorHandler from '../Middleware/errorHandler';

const router = express.Router();


router.post('/addCart', authenticateToken,errorHandler(cartController.addToCart))
router.get('/getCartItems', authenticateToken,errorHandler(cartController.getCartItems))
router.delete('/deleteCart/:id', authenticateToken,authorizeRoles(Role.customer),errorHandler(cartController.deleteFromCart))
router.put('/updateCart/:id', authenticateToken,authorizeRoles(Role.customer),errorHandler(cartController.updateCartItem))

export default router;