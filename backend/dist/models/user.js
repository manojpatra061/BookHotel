"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.Schema({
    firstName: { type: String, required: [true, "firstName is required"] },
    lastName: { type: String, required: [true, "lastName is required"] },
    email: {
        type: String,
        unique: true,
        required: [true, "email is required"],
        lowercase: true,
        match: [
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            "enter a valid email",
        ],
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: [6, "too short! password should be at least 6 characters long"],
    },
});
userSchema.pre("save", function (next) {
    const hashedPassword = bcryptjs_1.default.hashSync(this.password);
    this.password = hashedPassword;
    next();
});
const User = (0, mongoose_1.model)("user", userSchema);
exports.default = User;
