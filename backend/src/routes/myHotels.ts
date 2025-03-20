import { Router } from "express";
import { createHotel, handleMultipartFormData } from "../controllers/hotel";
import { verifyToken } from "../middlewares/auth";

const myHotelRouter = Router();

// api/my-hotels
myHotelRouter
  .route("/")
  .post(verifyToken, handleMultipartFormData, createHotel); //verifyToken makes only logged-in users createHotel

export default myHotelRouter;
