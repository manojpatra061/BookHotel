import { Router } from "express";
import { signup } from "../controllers/user";

const userRouter = Router();

// api/user
userRouter.route("/signup").post(signup);

export default userRouter;
