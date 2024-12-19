import mongoose from "mongoose";

const connectDB = async (connectionString: string) => {
  try {
    await mongoose.connect(connectionString);
    console.log("connected to db");
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export default connectDB;
