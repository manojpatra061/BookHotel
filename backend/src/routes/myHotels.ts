import { Router } from "express";
import {
  createHotel,
  getAllMyHotels,
  getMyHotel,
  handleMultipartFormData,
  updateHotel,
} from "../controllers/hotel";
import { verifyToken } from "../middlewares/auth";

const myHotelsRouter = Router();

// api/my-hotels
myHotelsRouter
  .route("/")
  .post(verifyToken, handleMultipartFormData, createHotel) //verifyToken makes only logged-in users createHotel
  .get(verifyToken, getAllMyHotels);

// api/my-hotels/:hotelId
myHotelsRouter
  .route("/:hotelId")
  .get(verifyToken, getMyHotel)
  .put(verifyToken, handleMultipartFormData, updateHotel);

export default myHotelsRouter;
