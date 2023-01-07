import Joi from "joi";

export const createSkillSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "userId is required",
  }),
  name: Joi.string().required().messages({
    "string.empty": "name is required",
  }),
  level: Joi.number().min(1).max(5).required().messages({
    "number.base": "level must be a number",
    "number.empty": "level is required",
    "number.min": "level must be greater than or equal to 1",
    "number.max": "level must be less than or equal to 5",
  }),
  image: Joi.string().uri().required().messages({
    "string.empty": "image is required",
    "string.uri": "image must be a valid uri",
  }),
});

export const deleteSkillSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "User Id is required",
  }),
  skillId: Joi.string().required().messages({
    "string.empty": "Skill Id is required",
  }),
});

export const updateSkillSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "userId is required",
  }),
  name: Joi.string().required().messages({
    "string.empty": "name is required",
  }),
  level: Joi.number().min(1).max(5).required().messages({
    "number.base": "level must be a number",
    "number.empty": "level is required",
    "number.min": "level must be greater than or equal to 1",
    "number.max": "level must be less than or equal to 5",
  }),
  image: Joi.string().uri().required().messages({
    "string.empty": "image is required",
    "string.uri": "image must be a valid uri",
  }),
  skillId: Joi.string().required().messages({
    "string.empty": "Skill Id is required",
  }),
});