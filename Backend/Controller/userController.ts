import { Request, Response } from "express";
import User from "../Model/userModel";
import bcrypt from 'bcrypt'
import generateToken from "../services/gentoken";



class userController {

    static async register(req: Request, res: Response) {

        const { username, email, password } = req.body
        console.log(req.body);

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        const data = await User.findOne({
            where: {
                email: email
            }
        })
        if (data) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hash_password = bcrypt.hashSync(password, 11)
        const user = await User.create({
            username,
            email,
            password: hash_password,
        })


        res.status(200).json({
            user,
            message: "User created successfully",
        })

    }

    static async login(req: Request, res: Response) {
        const { email, password } = req.body
        console.log(req.body);
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }
        const user = await User.findOne({
            where: {
                email: email
            }
        })

        // console.log(user?.id);     
        if (!user) {
            return res.status(400).json({ message: "Email does not exist" });
        }
        const isMatch = bcrypt.compareSync(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Password does not match" });
        }
        const token =generateToken(user.id)
        // console.log(token);
        res.status(200).json({
            message: "User logged in successfully",
            token,
        })

    }

}

export default userController