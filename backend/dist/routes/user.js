"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const userRouter = (0, express_1.Router)();
// api/user
userRouter.route("/signup").post(user_1.signup);
exports.default = userRouter;
