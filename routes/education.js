import express from "express";
import {
  createEducation,
  deleteEducation,
  getEducations,
  updateEducation,
} from "../controllers/education.js";

const educationRouter = express.Router();

educationRouter.get("/", getEducations);
educationRouter.post("/", createEducation);
educationRouter.post("/update", updateEducation);
educationRouter.post("/delete", deleteEducation);

export default educationRouter;
