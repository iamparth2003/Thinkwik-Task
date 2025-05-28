import { model, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new Schema(
  {
    id: {
      type: String,
      default: uuidv4,
    },
    email: {
      type: String,
      unique: true,
      default: "",
    },
    password: {
      type: String,
      default: "",
    }
  },
  { timestamps: true }
);

export interface userDocument extends Document {
  id: string;
  email: string;
  password: string;
}

export const User = model<userDocument>("User", userSchema);
