import express from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const userRouter = express.Router();

const userSchema = Joi.object({
  name: Joi.string().min(6).max(255).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 6 characters",
    "string.max": "Name must be at most 255 characters",
  }),
  email: Joi.string()
    .email()
    .required("Email is must be valid & unique")
    .messages({
      "string.empty": "Email is required",
      "string.email": "Email must be valid",
    }),
  about: Joi.string().required().messages({
    "string.empty": "About is required",
  }),

  password: Joi.string().min(6).max(1024).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
    "string.max": "Password must be at most 1024 characters",
  }),

  avatar: Joi.string().default("https://i.hizliresim.com/mn8lcf9.jpg"),
});

userRouter.post("/update", async (req, res) => {
  const { userId, ...rest } = req.body;

  const { error } = userSchema.validate({
    ...rest,
  });
  if (error) {
    return res.status(400).json({
      title: "Validation Error",
      message: error.details[0].message,
      ...error,
    });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(rest.password, salt);

  const updatedUser = await User.findOneAndUpdate(
    { userId },
    { ...rest, password: hashedPassword },
    { new: true }
  );

  if (!updatedUser) {
    return res.status(400).json({
      title: "Cannot update",
      message: "User not found",
    });
  }

  res.send({
    title: "User updated",
    message: "User updated successfully",
    updatedUser,
  });
});

userRouter.post("/delete", async (req, res) => {
  const { userId } = req.body;

  const deletedUser = await User.findOneAndDelete({ userId });

  if (!deletedUser) {
    return res.status(400).json({
      title: "Cannot delete",
      message: "User not found",
    });
  }

  res.send({
    title: "User deleted",
    message: "User deleted successfully",
    deletedUser,
  });
});

export default userRouter;
