import express, { Router } from 'express'
import userController from '../Controller/userController'
import authenticateToken from '../Middleware/tokenAuth'

const router:Router = express.Router()

router.post("/forgotpassword", userController.forgotPassword)
router.post("/register", userController.register)
router.post("/resetpassword", userController.resetPassword)
router.post("/login", userController.login)
router.post("/verifyotp", userController.verifyOtp)







export default router