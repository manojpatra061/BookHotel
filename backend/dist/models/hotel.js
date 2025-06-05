"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const hotelSchema = new mongoose_1.Schema({
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
const Hotel = (0, mongoose_1.model)("hotel", hotelSchema);
exports.default = Hotel;
