"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const user_1 = __importDefault(require("../models/user"));
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decode.userId;
    const userDocument = yield user_1.default.findOne({ _id: userId });
    if (!userDocument) {
        res.clearCookie("auth_token");
        res
            .status(401)
            .json({ message: "unauthorized - token exist but user doesn't" });
        return;
    }
    req.userId = userId;
    next();
});
exports.verifyToken = verifyToken;
