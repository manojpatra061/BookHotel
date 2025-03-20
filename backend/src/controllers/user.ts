import { Request, Response } from "express";
import UserModel from "../models/user";
import jwt from "jsonwebtoken";
import { UserType } from "../shared/types";

export const signup = async (req: Request, res: Response) => {
  // thanks to mongoose validation on schema level, required fields (firstName, lastName, email, password) are coming - done
  // check if user already exists - done
  // create a new account - done
  // send token in cookie - done
  try {
    const { firstName, lastName, email, password }: UserType = req.body;
    const userDoc = await UserModel.findOne({ email });

    if (userDoc) {
      res.status(400).json({ message: "user already exists" });
      return;
    }

    const newUserDoc = new UserModel<UserType>({
      firstName,
      lastName,
      email,
      password,
    });
    await newUserDoc.save(); //pw will be hashed before saving to db thanks to pre('save') hook

    const token = jwt.sign(
      { userId: newUserDoc.id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24, //1d
      // sameSite: "none", //todo: none when publish
    });
    res.status(200).json({ message: "user created" });

    return;
  } catch (error) {
    res.status(400).json({ message: (error as Error).message }); //todo: will remove when handling error
    throw new Error((error as Error).message);
  }
};
