import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import UserModel from "../models/user";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // http-only cookie comes from fend (cookieparser needed) - done
  // check if auth_token cookie exists - done
  // get the payload back from token - done
  // check if the userId extracted from the token exists in the database or not - done
  // add userId in req so the next midware can access - done
  // go to next midware - done

  const token = req.cookies["auth_token"];
  if (!token) {
    res.status(401).json({ message: "unauthorized - token doesn't exist" });
    return;
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
  const userId = (decode as jwt.JwtPayload).userId;

  const userDocument = await UserModel.findOne({ _id: userId });
  if (!userDocument) {
    res.clearCookie("auth_token");
    res
      .status(401)
      .json({ message: "unauthorized - token exist but user doesn't" });
    return;
  }

  req.userId = userId;
  next();
};
