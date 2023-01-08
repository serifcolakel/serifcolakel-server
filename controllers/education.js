import { RESULT } from "../common/constants.js";
import Education from "../models/Education.js";
import {
  createEducationSchema,
  deleteEducationSchema,
  updateEducationSchema,
} from "../utils/educationUtil.js";

export const getEducations = async (req, res) => {
  const { userId } = req.body;

  const educations = await Education.find({ userId });

  if (!educations) {
    return res.status(400).json({
      result: RESULT.ERROR,
      message: "educations not found",
    });
  }

  res.status(200).json({
    result: RESULT.SUCCESS,
    message: `${educations.length} educations found`,
    educations,
  });
};

export const createEducation = async (req, res) => {
  const { error } = createEducationSchema.validate({
    ...req.body,
  });
  if (error) {
    return res.status(400).json({
      result: RESULT.VALIDATION_ERROR,
      message: error.details[0].message.replace(/"/g, ""),
      //...error,
    });
  }

  const education = new Education({
    ...req.body,
  });

  try {
    const savedEducation = await education.save();
    res.status(200).json({
      result: RESULT.SUCCESS,
      message: "Education added successfully",
      savedEducation,
    });
  } catch (error) {
    res.status(400).json({
      result: RESULT.ERROR,
      message: "Education already exists",
      error,
    });
  }
};

export const updateEducation = async (req, res) => {
  const { userId, educationId, ...rest } = req.body;

  const { error } = updateEducationSchema.validate({
    userId,
    educationId,
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
    const updatedEducation = await Education.findOneAndUpdate(
      { userId, _id: educationId },
      { ...rest },
      { new: true }
    );

    if (!updatedEducation) {
      return res.status(400).json({
        result: RESULT.ERROR,
        message: "Education not found",
      });
    }

    res.status(200).json({
      result: RESULT.SUCCESS,
      message: "Education updated successfully",
      updatedEducation,
    });
  } catch (error) {
    res.status(400).json({
      result: RESULT.ERROR,
      message: `${error.path} parameter is invalid`,
      //error,
    });
  }
};

export const deleteEducation = async (req, res) => {
  const { userId, educationId } = req.body;

  const { error } = deleteEducationSchema.validate({
    userId,
    educationId,
  });
  if (error) {
    return res.status(400).json({
      result: RESULT.VALIDATION_ERROR,
      message: error.details[0].message.replace(/"/g, ""),
      //...error,
    });
  }

  const deletedEducation = await Education.findOneAndDelete({
    userId,
    _id: educationId,
  });

  if (!deletedEducation) {
    return res.status(400).json({
      result: RESULT.ERROR,
      message: "Education not found",
    });
  }

  res.status(200).json({
    result: RESULT.SUCCESS,
    message: "Education deleted successfully",
    deletedEducation,
  });
};
