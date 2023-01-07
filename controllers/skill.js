import { RESULT } from "../common/constants.js";
import Skill from "../models/Skill.js";
import { createSkillSchema, deleteSkillSchema, updateSkillSchema } from "../utils/skillUtil.js";

export const getSkills = async (req, res) => {
  const { userId } = req.body;

  const skills = await Skill.find({ userId });

  if (!skills) {
    return res.status(400).json({
      result: RESULT.ERROR,
      message: "skills not found",
    });
  }

  res.status(200).json({
    result: RESULT.SUCCESS,
    message: `${skills.length} skills found`,
    skills,
  });
};

export const createSkill = async (req, res) => {
  const { error } = createSkillSchema.validate({
    ...req.body,
  });
  if (error) {
    return res.status(400).json({
      result: RESULT.VALIDATION_ERROR,
      message: error.details[0].message.replace(/"/g, ""),
      //...error,
    });
  }

  const skill = new Skill({
    ...req.body,
  });

  try {
    const savedSkill = await skill.save();
    res.status(200).json({
      result: RESULT.SUCCESS,
      message: "Skill added successfully",
      savedSkill,
    });
  } catch (error) {
    res.status(400).json({
      result: RESULT.ERROR,
      message: "Skill already exists",
      error,
    });
  }
};

export const updateSkill = async (req, res) => {
  const { userId, skillId, ...rest } = req.body;

  const { error } = updateSkillSchema.validate({
    userId,
    skillId,
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
    const updatedSkill = await Skill.findOneAndUpdate(
      { userId, _id: skillId },
      { ...rest },
      { new: true }
    );

    if (!updatedSkill) {
      return res.status(400).json({
        result: RESULT.ERROR,
        message: "Skill not found",
      });
    }

    res.status(200).json({
      result: RESULT.SUCCESS,
      message: "Skill updated successfully",
      updatedSkill,
    });
  } catch (error) {
    res.status(400).json({
      result: RESULT.ERROR,
      message: `${error.path} parameter is invalid`,
      //error,
    });
  }
};

export const deleteSkill = async (req, res) => {
  const { userId, skillId } = req.body;

  const { error } = deleteSkillSchema.validate({
    userId,
    skillId,
  });
  if (error) {
    return res.status(400).json({
      result: RESULT.VALIDATION_ERROR,
      message: error.details[0].message.replace(/"/g, ""),
      //...error,
    });
  }

  const deletedSkill = await Skill.findOneAndDelete({
    userId,
    _id: skillId,
  });

  if (!deletedSkill) {
    return res.status(400).json({
      result: RESULT.ERROR,
      message: "Skill not found",
    });
  }

  res.status(200).json({
    result: RESULT.SUCCESS,
    message: "Skill deleted successfully",
    deletedSkill,
  });
};
