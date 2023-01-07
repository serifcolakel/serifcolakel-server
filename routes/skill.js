import express from "express";
import { createSkill, deleteSkill, getSkills, updateSkill } from "../controllers/skill.js";

const skillRouter = express.Router();

skillRouter.get("/", getSkills);
skillRouter.post("/", createSkill);
skillRouter.post("/update", updateSkill);
skillRouter.post("/delete", deleteSkill);

export default skillRouter;
