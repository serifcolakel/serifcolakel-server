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
  });
};

export const createProject = async (req, res) => {
  console.log("req.body", req.body, req.body.files);

  const { error } = createProjectSchema.validate({
    ...req.body,
  });
  if (error) {
    return res.status(400).json({
      result: RESULT.VALIDATION_ERROR,
      message: error.details[0].message.replace(/"/g, ""),
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
    const updatedReference = await Project.findOneAndUpdate(
      { userId, _id: projectId },
      { ...rest },
      { new: true }
    );

    res.status(200).json({
      result: RESULT.SUCCESS,
      message: "Experience updated successfully",
      updatedReference,
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

  const deletedExperience = await Project.findOneAndDelete({
    userId,
    _id: projectId,
  });

  if (!deletedExperience) {
    return res.status(400).json({
      result: RESULT.ERROR,
      message: "Experience not found",
    });
  }

  res.status(200).json({
    result: RESULT.SUCCESS,
    message: "Experience deleted successfully",
    deletedExperience,
  });
};
