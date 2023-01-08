import express from "express";

import { handleLogin, handleRegister } from "../controllers/auth.js";
import { handleUploadAsset } from "../middlewares/handleUploadAsset.js";

const authRouter = express.Router();

authRouter.post("/register", handleUploadAsset, handleRegister);
authRouter.post("/login", handleLogin);

export default authRouter;
