import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/envConfig";
import User from "../Model/userModel";

interface JwtPayload {
  userID: string;
  role: Role;
  iat: number;
  exp: number;
}

enum Role {
  Admin = "admin",
  customer = "customer"

}

interface IExtendedRequest extends Request {
  user?: {
    role: string,
    id: string,
    username: string,
    email: string,
    password: string,
    otp: string,
    otpGeneratedTime: string,

  }
}

const authenticateToken = async (req: IExtendedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];


  // Format: Bearer token
  const token = authHeader?.split(" ")[1];

  // console.log("the token is", token);//kalika krisi ta pasupanxi farm


  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, envConfig.secret as string) as JwtPayload;


    // console.log("\n\n");
    // console.log(decoded);
    // console.log(decoded.userID);


    const userData = await User.findByPk(
      decoded.userID
    )
    // console.log('user data is ', userData?.dataValues);
    if (!userData) {
      res.status(400).json({
        message: "User not found",
      })
      return
    }
    req.user = userData;


    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

const authorizeRoles = (...roles: Role[]) => {
  return (req: IExtendedRequest, res: Response, next: NextFunction) => {

    let role = req.user?.role
    console.log(role);
    if (!role) {
      return res.status(401).json({ message: "Access denied. No role provided." });
    }
    // if (role === Role.Admin) {
    //   return next()
    // }else
    // {
    //   res.status(400).json({
    //     message: "Access denied. You don't have permission to access this resource.",
    //   })
    // }
    if (!roles.includes(role as Role)) {
      return res.status(400).json({
        message: "Access denied. You don't have permission to access this resource.",
      })
      return
    }
    next();




  };
};

export { authenticateToken, authorizeRoles, Role }
