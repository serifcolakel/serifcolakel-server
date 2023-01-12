import fs from "fs";
import { RESULT } from "../common/constants.js";

import Project from "../models/Project.js";

import {
  createProjectSchema,
  deleteProjectSchema,
  updateProjectSchema,
} from "../utils/projectUtil.js";

export const getAllProject = async (req, res) => {
  const { userId } = req.body;

  const projects = await Project.find({ userId });

  if (!projects) {
    return res.status(400).json({
      result: RESULT.ERROR,
      message: "Project not found",
    });
  }

  res.status(200).json({
    result: RESULT.SUCCESS,
    message: "Project found successfully",
    projects,
    count: projects.length,
  });
};

export const createProject = async (req, res) => {
  const { error } = createProjectSchema.validate({
    ...req.body,
  });
  if (error) {
    if (fs.existsSync(req.body.image)) {
      fs.unlinkSync(req.body.image);
    }
    return res.status(400).json({
      result: RESULT.VALIDATION_ERROR,
      message: error.details[0].message.replace(/"/g, ""),
      //...error,
    });
  } else if (
    !req.body.image.includes("http") &&
    !fs.existsSync(req.body.image)
  ) {
    return res.status(400).json({
      result: RESULT.VALIDATION_ERROR,
      message: "Image not found",
      //...error,
    });
  }

  const project = new Project({
    ...req.body,
  });

  try {
    const savedProject = await project.save();
    res.status(200).json({
      result: RESULT.SUCCESS,
      message: "Project added successfully",
      savedProject,
    });
  } catch (error) {
    if (fs.existsSync(req.body.image)) {
      fs.unlinkSync(req.body.image);
    }
    res.status(400).json({
      result: RESULT.ERROR,
      message: "Project already exists",
      error,
    });
  }
};

export const updateProject = async (req, res) => {
  const { userId, projectId, ...rest } = req.body;

  const { error } = updateProjectSchema.validate({
    userId,
    projectId,
    ...rest,
  });

  if (error) {
    return res.status(400).json({
      result: RESULT.VALIDATION_ERROR,
      message: error.details[0].message.replace(/"/g, ""),
      //...error,
    });
  }

  try {
    const updatedProject = await Project.findOneAndUpdate(
      { userId, _id: projectId },
      { ...rest },
      { new: true }
    );

    res.status(200).json({
      result: RESULT.SUCCESS,
      message: "Project updated successfully",
      updatedProject,
    });
  } catch (error) {
    res.status(400).json({
      result: RESULT.ERROR,
      message: `${error.path} parameter is invalid`,
      //error,
    });
  }
};

export const deleteProject = async (req, res) => {
  const { userId, projectId } = req.body;

  const { error } = deleteProjectSchema.validate({
    userId,
    projectId,
  });
  if (error) {
    return res.status(400).json({
      result: RESULT.VALIDATION_ERROR,
      message: error.details[0].message.replace(/"/g, ""),
      //...error,
    });
  }

  const deletedProject = await Project.findOneAndDelete({
    userId,
    _id: projectId,
  });

  if (!deletedProject) {
    return res.status(400).json({
      result: RESULT.ERROR,
      message: "Project not found",
    });
  }

  if (fs.existsSync(deletedProject.image)) {
    fs.unlinkSync(deletedProject.image);
  }

  res.status(200).json({
    result: RESULT.SUCCESS,
    message: "Project deleted successfully",
    deletedProject,
  });
};
