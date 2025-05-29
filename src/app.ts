import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.route";
import todoRouter from "./routes/todo.route";
import { scheduleExpiredTodoJob } from "./cron/expireTodoItem";
dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Server is running...");
});

app.use("/user", userRouter);
app.use("/todo", todoRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

const mongodburi = process.env.MONGO_URI as string;

mongoose
  .connect(mongodburi)
  .then(() => {
    console.log("Connected to database.....");
    // scheduleExpiredTodoJob();
  })
  .catch((err) => {
    console.error(err);
    console.log("Unable to connect...");
  });
