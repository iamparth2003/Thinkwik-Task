import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../model/user.model";
import jwt from "jsonwebtoken";

export async function signup(req: Request, res: Response) {
  try {
    const { email, password } = req.validatedData as {
      email: string;
      password: string;
    };

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({ email, password: hashedPassword });
    const token = jwt.sign(
      { email, password: hashedPassword },
      process.env.SECRET_KEY as string,
      {
        expiresIn: "24h",
      }
    );

    return res
      .status(200)
      .json({ message: "User created successfully.", token, user });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.validatedData as {
      email: string;
      password: string;
    };

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.SECRET_KEY as string,
      {
        expiresIn: "24h",
      }
    );

    return res.status(200).json({ message: "Login successful.", token, user });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
