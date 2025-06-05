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
exports.signup = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // thanks to mongoose validation on schema level, required fields (firstName, lastName, email, password) are coming - done
    // check if user already exists - done
    // create a new account - done
    // send token in cookie - done
    try {
        const { firstName, lastName, email, password } = req.body;
        const userDoc = yield user_1.default.findOne({ email });
        if (userDoc) {
            res.status(400).json({ message: "user already exists" });
            return;
        }
        const newUserDoc = new user_1.default({
            firstName,
            lastName,
            email,
            password,
        });
        yield newUserDoc.save(); //pw will be hashed before saving to db thanks to pre('save') hook
        const token = jsonwebtoken_1.default.sign({ userId: newUserDoc.id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24, //1d
            // sameSite: "none", //todo: none when publish
        });
        res.status(200).json({ message: "user created" });
        return;
    }
    catch (error) {
        res.status(400).json({ message: error.message }); //todo: will remove when handling error
        throw new Error(error.message);
    }
});
exports.signup = signup;
