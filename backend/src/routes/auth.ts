import { Router } from "express";
import { login, logout, verificationComplete } from "../controllers/auth";
import { verifyToken } from "../middlewares/auth";

const authRouter = Router();

authRouter.route("/login").post(login);
authRouter.route("/verify-token").get(verifyToken, verificationComplete);
authRouter.route('/logout').post(logout)

export default authRouter;
