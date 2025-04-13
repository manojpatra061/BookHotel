import { Request, Response } from "express";
import UserModel from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { UserType } from "../shared/types";

export const login = async (req: Request, res: Response) => {
  /**
   * email, pw come from fend - done
   * check if email and password both are correct - done
   * if correct, create a token and send it in cookie - done
   * success msg - done
   */

  const { email, password }: UserType = req.body;
  const userDoc = await UserModel.findOne({ email });

  if (!userDoc) {
    res.status(401).json({ message: "invalid email" });
    return;
  }

  const isPasswordCorrect = bcrypt.compareSync(password, userDoc.password);
  if (!isPasswordCorrect) {
    res.status(401).json({ message: "invalid password" });
    return;
  }

  const token = jwt.sign(
    { userId: userDoc.id },
    process.env.JWT_SECRET_KEY as string,
    { expiresIn: "1d" }
  );

  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24,
    // sameSite: "none", // todo: none when publish
  });
  res
    .status(200)
    .json({ userId: userDoc.id, message: "successfully logged in" });
};

export const verificationComplete = async (req: Request, res: Response) => {
  res.status(200).json({ userId: req.userId, message: "verification success" });
};

export const logout = (req: Request, res: Response) => {
  /**
   * to logout : invalidate the cookie auth_token
   * when logout, user has to login again to enter into
   */
  res.cookie("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    // sameSite: "none", // todo: none when publish
  });
  res.status(200).json({ message: "successfully logged out" });
};
