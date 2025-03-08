import { Request, Response } from "express";
import User from "../Model/userModel";
import bcrypt from 'bcrypt'



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
}

export default userController