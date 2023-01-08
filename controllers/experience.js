import { RESULT } from "../common/constants.js";
import {
  createExperienceSchema,
  deleteExperienceSchema,
  updateExperienceSchema,
} from "../utils/experienceUtil.js";

import Experience from "../models/Experience.js";

export const getExperiences = async (req, res) => {
  const { userId } = req.body;

  const experiences = await Experience.find({ userId });

  if (!experiences) {
    return res.status(400).json({
      result: RESULT.ERROR,
      message: "Experience not found",
    });
  }

  res.status(200).json({
    result: RESULT.SUCCESS,
    message: `${experiences.length} Experiences found`,
    experiences,
  });
};

export const createExperience = async (req, res) => {
  const { error } = createExperienceSchema.validate({
    ...req.body,
  });
  if (error) {
    return res.status(400).json({
      result: RESULT.VALIDATION_ERROR,
      message: error.details[0].message.replace(/"/g, ""),
      //...error,
    });
  }

  const experience = new Experience({
    ...req.body,
  });

  try {
    const savedExperience = await experience.save();
    res.status(200).json({
      result: RESULT.SUCCESS,
      message: "Experience added successfully",
      savedExperience,
    });
  } catch (error) {
    res.status(400).json({
      result: RESULT.ERROR,
      message: "Experience already exists",
      error,
    });
  }
};

export const updateExperience = async (req, res) => {
  const { userId, experienceId, ...rest } = req.body;

  const { error } = updateExperienceSchema.validate({
    userId,
    experienceId,
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
    const updatedExperience = await Experience.findOneAndUpdate(
      { userId, _id: experienceId },
      { ...rest },
      { new: true }
    );

    res.status(200).json({
      result: RESULT.SUCCESS,
      message: "Experience updated successfully",
      updatedExperience,
    });
  } catch (error) {
    res.status(400).json({
      result: RESULT.ERROR,
      message: `${error.path} parameter is invalid`,
      //error,
    });
  }
};

export const deleteExperience = async (req, res) => {
  const { userId, experienceId } = req.body;

  const { error } = deleteExperienceSchema.validate({
    userId,
    experienceId,
  });
  if (error) {
    return res.status(400).json({
      result: RESULT.VALIDATION_ERROR,
      message: error.details[0].message.replace(/"/g, ""),
      //...error,
    });
  }

  const deletedExperience = await Experience.findOneAndDelete({
    userId,
    _id: experienceId,
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
