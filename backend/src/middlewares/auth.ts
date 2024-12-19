import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // http-only cookie comes from fend (cookieparser needed) - done
  // check if auth_token cookie exists - done
  // get the payload back from token - done
  // add userId in req so the next midware can access - done
  // go to next midware - done

  const token = req.cookies["auth_token"];
  if (!token) {
    res.status(401).json({ message: "unauthorized - login again" });
    return;
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
  const userId = (decode as jwt.JwtPayload).userId;
  req.userId = userId;
  next();
};
