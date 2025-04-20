import { Request, Response } from "express";
import User from "../Model/userModel";
import bcrypt from 'bcrypt'
import generateToken from "../services/gentoken";
import otpgenerate from "../services/genOTP";
import sendmail from "../services/sendmail";
import otpTime from "../services/checkotptime";
import hash_password from "../services/hashpassword";



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

        const hashed_password = hash_password(password)
        const user = await User.create({
            username,
            email,
            password: hashed_password,
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
        const token = generateToken(user.id)
        // console.log(token);
        res.status(200).json({
            message: "User logged in successfully",
            token,
        })

    }

    static async forgotPassword(req: Request, res: Response) {
        const { email } = req.body

        // console.log(email);
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        // console.log(user);
        if (!user) {
            return res.status(400).json({
                message: "Email doesnot exists"
            })
        }

        const otp = otpgenerate()
        // console.log(otp); 

        user.otp = otp.toString()
        user.otpGeneratedTime = Date.now().toString()
        await user.save()

        const mailobject = {
            text: `Your OTP for password reset is: ${otp}. Please use this code to reset your password. If you didn't request this, ignore this email.`,
            to: email,
            subject: "Reset Your Password",
        };


        const mail = sendmail(mailobject)

        res.status(200).json({
            message: "otp sent to mail",
            otp,
            mail,


        })

    }

    static async verifyOtp(req: Request, res: Response) {
        const { otp, email } = req.body
        const user = await User.findOne({
            where: {
                email: email,
            }
        })
        // console.log(user?.dataValues);
        if (!user) {
            return res.status(400).json({
                message: "otp invalid "
            })
        }

        const staus = otpTime(user.otpGeneratedTime)

        if (staus == false) {
            return res.status(400).json({
                message: "otp expired"
            })

        }


        // console.log(user);

        return res.status(200).json({
            message: "otp valid",
        })

    }


    static async resetPassword(req: Request, res: Response) {
        const { newPassword, confirmPassword, email } = req.body
        if (!newPassword || !confirmPassword || !email) {
            return res.status(400).json({
                message: 'please provide newPassword,confirmPassword,email,otp'
            })
        }


        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                message: 'newpassword and confirm password must be same'
            })

        }
        const user = await User.findOne({
            where: {
                email: email,
            }
        })
        if (!user) {
            return res.status(400).json({
                message: "user not found"
            })
        }
        user.password = hash_password(newPassword)
        await user.save()
        return res.status(200).json({
            message: "password reset successfully"
        })

    }
}

export default userController