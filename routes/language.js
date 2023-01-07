import express from "express";

import {
  createLanguage,
  deleteLanguage,
  getAllLanguage,
  updateLanguage,
} from "../controllers/language.js";

const languageRouter = express.Router();

languageRouter.get("/", getAllLanguage);
languageRouter.post("/", createLanguage);
languageRouter.post("/update", updateLanguage);
languageRouter.post("/delete", deleteLanguage);

export default languageRouter;
