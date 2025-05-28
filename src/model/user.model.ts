import { Schema, model, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";
export interface UserDocument extends Document {
  id: string;
  email: string;
  password: string;
}

const userSchema = new Schema<UserDocument>(
  {
    id: {
      type: String,
      default: uuidv4,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<UserDocument>("User", userSchema);
