import { model, Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const todoSchema = new Schema({
  id: {
    type: String,
    default: uuidv4,
  },
  title: {
    type: String,
    required: true,
    default: "",
  },
  description: {
    type: String,
    required: true,
    default: "",
  },
  dueDate: {
    type: Date,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: String,
    ref: "User",
    required: true,
  },
});

export interface todoDocument extends Document {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  user: Schema.Types.ObjectId;
}

export const Todo = model<todoDocument>("Todo", todoSchema);
