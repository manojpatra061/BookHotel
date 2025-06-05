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
exports.logout = exports.verificationComplete = exports.login = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // email, pw come from fend - done
    // check if email and password both are correct - done
    // if correct, create a token and send it in cookie - done
    // success msg - done
    const { email, password } = req.body;
    const userDoc = yield user_1.default.findOne({ email });
    if (!userDoc) {
        res.status(401).json({ message: "invalid email" });
        return;
    }
    const isPasswordCorrect = bcryptjs_1.default.compareSync(password, userDoc.password);
    if (!isPasswordCorrect) {
        res.status(401).json({ message: "invalid password" });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ userId: userDoc.id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
    res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24,
        // sameSite: "none", //todo: none when publish
    });
    res
        .status(200)
        .json({ userId: userDoc.id, message: "successfully logged in" });
});
exports.login = login;
const verificationComplete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ userId: req.userId, message: "verification success" });
});
exports.verificationComplete = verificationComplete;
const logout = (req, res) => {
    // to logout : invalidate the cookie auth_token
    // when logout, user has to login again to enter into
    res.cookie("auth_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 0,
        // sameSite: "none", //todo: none when publish
    });
    res.status(200).json({ message: "successfully logged out" });
};
exports.logout = logout;
