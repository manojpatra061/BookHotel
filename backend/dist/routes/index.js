"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myHotelRoute = exports.authRoute = exports.userRoute = exports.testRoute = void 0;
const test_1 = __importDefault(require("./test"));
exports.testRoute = test_1.default;
const user_1 = __importDefault(require("./user"));
exports.userRoute = user_1.default;
const auth_1 = __importDefault(require("./auth"));
exports.authRoute = auth_1.default;
const myHotels_1 = __importDefault(require("./myHotels"));
exports.myHotelRoute = myHotels_1.default;
