import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Server is running...");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

const mongodburi = process.env.MONGO_URI as string;

mongoose
  .connect(mongodburi)
  .then(() => {
    console.log("Connected to database.....");
  })
  .catch((err) => {
    console.error(err);
    console.log("Unable to connect...");
  });
