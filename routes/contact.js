import express from "express";
import {
  createContact,
  deleteContact,
  getAllContact,
  updateContact,
} from "../controllers/contact.js";
const contactRouter = express.Router();

contactRouter.get("/", getAllContact);
contactRouter.post("/", createContact);
contactRouter.post("/update", updateContact);
contactRouter.post("/delete", deleteContact);

export default contactRouter;
