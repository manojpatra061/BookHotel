import { model, Schema } from "mongoose";
import { HotelType } from "../shared/types";

const hotelSchema = new Schema<HotelType>({
  userId: { type: String, required: true }, // *only logged in user can create hotels
  name: { type: String, require: true },
  city: { type: String, require: true },
  country: { type: String, require: true },
  description: { type: String, require: true },
  pricePerNight: { type: Number, require: true },
  starRating: { type: Number, require: true },
  type: { type: String, require: true },
  adultCount: { type: Number, require: true },
  childCount: { type: Number, require: true },
  facilities: { type: [String], require: true },
  imageUrls: { type: [String], require: true },
});

const Hotel = model<HotelType>("hotel", hotelSchema);

export default Hotel;