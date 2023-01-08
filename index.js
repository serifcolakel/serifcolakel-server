import mongoose from "mongoose";
import express from "express";
import fs from "fs";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";

import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import contactRouter from "./routes/contact.js";
import referenceRouter from "./routes/reference.js";
import languageRouter from "./routes/language.js";
import skillRouter from "./routes/skill.js";

import { verifyToken } from "./middlewares/verifyToken.js";

const app = express();

// Config
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(morgan("common"));

// Global variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MONGO_DB_URL = process.env.MONGO_DB_URL;
const PORT = process.env.PORT;

// Routes
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
app.use("/auth", authRouter);
app.use("/user", verifyToken, userRouter);
app.use("/contact", verifyToken, contactRouter);
app.use("/reference", verifyToken, referenceRouter);
app.use("/language", verifyToken, languageRouter);
app.use("/skill", verifyToken, skillRouter);

// Connect to DB and start server
mongoose
  .connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    if (!fs.existsSync("public/assets")) {
      console.log("Creating assets folder");
      fs.mkdirSync("public/assets", { recursive: true });
    }
    app.listen(PORT, () =>
      console.log(`DB connected, Server running on ${PORT} PORT`)
    );
  })
  .catch((error) => console.log(`${error} did not connect`));
