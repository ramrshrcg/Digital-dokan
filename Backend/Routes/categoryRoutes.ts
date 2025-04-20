import expreess, { Router } from 'express';
import categoryController from '../Controller/categoryController';
import authenticateToken from '../Middleware/tokenAuth';

const router: Router = expreess.Router()

// Crouter.get('/base', categoryController.create)
router.post("/createcategory", authenticateToken, categoryController.createCategory)
router.get("/getcategories", categoryController.getAllCategories)
router.get("/getcategory/:id", categoryController.getCategory)
router.put("/updatecategory/:id", categoryController.updateCategory)
router.delete("/deletecategory/:id", categoryController.deleteCategory)

export default router;  