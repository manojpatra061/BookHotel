"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hotel_1 = require("../controllers/hotel");
const auth_1 = require("../middlewares/auth");
const myHotelRouter = (0, express_1.Router)();
// api/my-hotels
myHotelRouter
    .route("/")
    .post(auth_1.verifyToken, hotel_1.handleMultipartFormData, hotel_1.createHotel); //verifyToken makes only logged-in users createHotel
exports.default = myHotelRouter;
