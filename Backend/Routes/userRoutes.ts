import express, { Router } from 'express'
import userController from '../Controller/userController'

const router:Router = express.Router()

router.post("/register", userController.register)
router.post("/login", userController.login)



export default router