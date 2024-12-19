import { Router } from "express";
import { signup } from "../controllers/user";

const userRouter = Router();

userRouter.route("/signup").post(signup);

export default userRouter;
