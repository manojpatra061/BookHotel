import { Router } from "express";

const testRouter = Router();

testRouter
  .route("/try")
  .get((_req, res) => {
    res.status(200).json({ message: "working..." });
  });

export default testRouter;
