import express, { Request, Response } from "express";
import connectDB from "./db";
import { authRoute, myHotelRoute, testRoute, userRoute } from "./routes";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.COULDINARY_CLOUD_NAME,
  api_key: process.env.COULDINARY_API_KEY,
  api_secret: process.env.COULDINARY_API_SECRET,
});

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
app.use("/api/my-hotels", myHotelRoute);

// catch-all route for React Router
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist", "/index.html"));
});

const start = async () => {
  const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
  await connectDB(process.env.MONGODB_CONNECTION_STRING as string);
  app.listen(PORT, async () => {
    console.log(`server is running at port ${PORT}`);
  });
};

start();
