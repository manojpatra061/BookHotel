import { model, Schema } from "mongoose";
import { User } from "../shared/types";
import bcrypt from "bcryptjs";

const userSchema = new Schema<User>({
  firstName: { type: String, required: [true, "firstName is required"] },
  lastName: { type: String, required: [true, "lastName is required"] },
  email: {
    type: String,
    unique: true,
    required: [true, "email is required"],
    lowercase: true,
    match: [
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      "enter a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: [6, "too short! password should be at least 6 characters long"],
  },
});

userSchema.pre("save", function (next) {
  const hashedPassword = bcrypt.hashSync(this.password);
  this.password = hashedPassword;
  next();
});

const User = model<User>("User", userSchema);

export default User;
