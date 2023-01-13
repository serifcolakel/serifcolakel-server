import express from "express";

import { handleSendEmail } from "../controllers/email.js";

const emailRouter = express.Router();

emailRouter.post("/send-mail", handleSendEmail);

export default emailRouter;
