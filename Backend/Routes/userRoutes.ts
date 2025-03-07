import express, { Router } from 'express'
import userController from '../Controller/userController'

const router:Router = express.Router()

router.post("/register", userController.register)


export default router