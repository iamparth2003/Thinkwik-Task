import { Request, Response, NextFunction } from "express";
import { User } from "../model/user.model";
import jwt from "jsonwebtoken";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["x-access-token"] as string;
    if (!token) {
      return res.status(400).json({ message: "Token is not found" });
    }

    const decodedToken = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as { id: string };

    if (!decodedToken) {
      return res.status(400).json({ message: "User not found." });
    }
    console.log(decodedToken);
    
    const user = await User.findOne({
      id: decodedToken.id,
    });

    if (!user) {
      return res.status(400).json({ message: "User not found in DB." });
    }
    req.user = user;

    return next();
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ message: "User is not authenticated, please signup first" });
  }
};
