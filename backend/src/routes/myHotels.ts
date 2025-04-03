import { Router } from "express";
import {
  createHotel,
  getAllMyHotels,
  getMyHotel,
  handleMultipartFormData,
} from "../controllers/hotel";
import { verifyToken } from "../middlewares/auth";

const myHotelRouter = Router();

// api/my-hotels
myHotelRouter
  .route("/")
  .post(verifyToken, handleMultipartFormData, createHotel) //verifyToken makes only logged-in users createHotel
  .get(verifyToken, getAllMyHotels);

// api/my-hotels/:hotelId
myHotelRouter.route("/:hotelId").get(verifyToken, getMyHotel);

export default myHotelRouter;
