import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/envConfig";



// You can move this to .env
// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

interface JwtPayload {
  id: number;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];

  // Format: Bearer token
  const token = authHeader?.split(" ")[1];

  console.log(token);
 

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, envConfig.secret as string) as JwtPayload;

    // You can attach user info to the request object
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

export default authenticateToken; 