import express, { Router } from 'express'
import userController from '../Controller/userController'

const router:Router = express.Router()

router.post("/register", userController.register)
router.post("/login", userController.login)
router.post("/forgotpassword", userController.forgotPassword)
router.post("/resetpassword", userController.resetPassword)
router.post("/verifyotp", userController.verifyOtp)







export default router