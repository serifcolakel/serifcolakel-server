import express from "express";

import {
  createReference,
  deleteReference,
  getAllReference,
  updateReference,
} from "../controllers/reference.js";

const referenceRouter = express.Router();

referenceRouter.get("/", getAllReference);
referenceRouter.post("/", createReference);
referenceRouter.post("/update", updateReference);
referenceRouter.post("/delete", deleteReference);

export default referenceRouter;
