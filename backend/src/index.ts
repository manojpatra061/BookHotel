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
    origin: [process.env.FRONTEND_URL1 as string],
    credentials: true,
  })
); //enable CORS for fronend url only

// api endpoints
app.use("/api/test", testRoute);
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

const start = async () => {
  const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
  await connectDB(process.env.MONGODB_CONNECTION_STRING as string);
  app.listen(PORT, async () => {
    console.log(`server is running at port ${PORT}`);
  });
};

start();
