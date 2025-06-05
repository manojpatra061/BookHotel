import { Router } from "express";
import { searchHotels } from "../controllers/hotel";

const hotelRouter = Router();

// api/hotels
hotelRouter.route("/search").get(searchHotels);

export default hotelRouter;
