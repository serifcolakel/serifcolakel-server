import express from "express";
import {
  createProject,
  deleteProject,
  getAllProject,
  updateProject,
} from "../controllers/project.js";

const projectRouter = express.Router();

projectRouter.get("/", getAllProject);
projectRouter.post("/", createProject);
projectRouter.post("/update", updateProject);
projectRouter.post("/delete", deleteProject);

export default projectRouter;
