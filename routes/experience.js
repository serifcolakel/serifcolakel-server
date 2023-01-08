import express from "express";

import {
  createExperience,
  deleteExperience,
  getExperiences,
  updateExperience,
} from "../controllers/experience.js";

const experienceRouter = express.Router();

experienceRouter.get("/", getExperiences);
experienceRouter.post("/", createExperience);
experienceRouter.post("/update", updateExperience);
experienceRouter.post("/delete", deleteExperience);

export default experienceRouter;
