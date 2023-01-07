import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import contactRouter from "./routes/contact.js";
import referenceRouter from "./routes/reference.js";
import languageRouter from "./routes/language.js";
import skillRouter from "./routes/skill.js";

import { verifyToken } from "./middlewares/verifyToken.js";

const app = express();

const PORT = process.env.PORT || 5001;

dotenv.config();
app.use(cors());
app.use(express.json());

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
    });
    console.log("Mongo DB connected.");
  } catch (error) {
    console.error(error);
  }
}

connect();

app.use("/auth", authRouter);
app.use("/user", verifyToken, userRouter);
app.use("/contact", verifyToken, contactRouter);
app.use("/reference", verifyToken, referenceRouter);
app.use("/language", verifyToken, languageRouter);
app.use("/skill", verifyToken, skillRouter);

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
