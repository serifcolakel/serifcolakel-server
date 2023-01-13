import bcrypt from "bcrypt";

import { userSchema } from "../utils/userUtil.js";

import User from "../models/User.js";

export const updateUser = async (req, res) => {
  const { userId, ...rest } = req.body;

  const { error } = userSchema.validate({
    ...rest,
  });
  if (error) {
    return res.status(400).json({
      status: "Validation Error",
      message: error.details[0].message.replace(/"/g, ""),
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
      status: "Cannot update",
      message: "User not found",
    });
  }

  res.send({
    status: "User updated",
    message: "User updated successfully",
    updatedUser,
  });
};

export const deleteUser = async (req, res) => {
  const { userId } = req.body;

  const deletedUser = await User.findOneAndDelete({ userId });

  if (!deletedUser) {
    return res.status(400).json({
      status: "Cannot delete",
      message: "User not found",
    });
  }

  res.send({
    status: "User deleted",
    message: "User deleted successfully",
    deletedUser,
  });
};
