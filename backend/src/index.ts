import express from "express";
import connectDB from "./db";
import { authRoute, testRoute, userRoute } from "./routes";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

const app = express();
app.use(express.static(path.join(__dirname, "../../frontend/dist"))); //serving the frontend dist as static files
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL0 as string],
    credentials: true,
  })
); //enable CORS for fronend url only

// api endpoints
app.use("/api/test", testRoute);
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

const start = async () => {
  console.log(`loaded → ${process.env.ENVFILE}`); //todo: will del
  const PORT = Number(process.env.PORT);
  const HOST = process.env.HOST as string;
  await connectDB(process.env.MONGODB_CONNECTION_STRING as string);
  app.listen(PORT, HOST, async () => {
    console.log(`server is running at \n → http://${HOST}:${PORT}`);
  });
};

start();
