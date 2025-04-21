import expreess, { Router } from 'express';
import categoryController from '../Controller/categoryController';
import { authenticateToken, authorizeRoles, Role } from '../Middleware/tokenAuth';


const router: Router = expreess.Router()

router.get("/getcategories", categoryController.getAllCategories)
router.get("/getcategory/:id", categoryController.getCategory)
router.put("/updatecategory/:id", categoryController.updateCategory)
router.post("/createcategory", authenticateToken,authorizeRoles(Role.Admin), categoryController.createCategory)
router.delete("/deletecategory/:id", categoryController.deleteCategory)

export default router;  