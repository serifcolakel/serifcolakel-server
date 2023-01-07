import Joi from "joi";

export const languageSchema = Joi.object({
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
});

export const deleteLanguageSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "User Id is required",
  }),
  languageId: Joi.string().required().messages({
    "string.empty": "Language Id is required",
  }),
});

export const updateLanguageSchema = Joi.object({
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
  languageId: Joi.string().required().messages({
    "string.empty": "Language Id is required",
  }),
});