import express from "express";
import { deleteUser, updateUser } from "../controllers/user.js";

const userRouter = express.Router();

userRouter.post("/update", updateUser);
userRouter.post("/delete", deleteUser);

export default userRouter;
