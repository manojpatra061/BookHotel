"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const auth_2 = require("../middlewares/auth");
const authRouter = (0, express_1.Router)();
// api/auth
authRouter.route("/login").post(auth_1.login);
authRouter.route("/verify-token").get(auth_2.verifyToken, auth_1.verificationComplete);
authRouter.route('/logout').post(auth_1.logout);
exports.default = authRouter;
