import Joi from "joi";

export const createExperienceSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "userId is required",
  }),
  companyName: Joi.string().required().messages({
    "string.empty": "companyName is required",
  }),
  title: Joi.string().required().messages({
    "string.empty": "title is required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "description is required",
  }),
  location: Joi.string().required().messages({
    "string.empty": "location is required",
  }),
  startDate: Joi.string().required().messages({
    "string.empty": "startDate is required",
  }),
  endDate: Joi.string().required().messages({
    "string.empty": "endDate is required",
  }),
});

export const deleteExperienceSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "User Id is required",
  }),
  experienceId: Joi.string().required().messages({
    "string.empty": "experienceId is required",
  }),
});

export const updateExperienceSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "userId is required",
  }),
  experienceId: Joi.string().required().messages({
    "string.empty": "experienceId is required",
  }),
  companyName: Joi.string().required().messages({
    "string.empty": "companyName is required",
  }),
  title: Joi.string().required().messages({
    "string.empty": "title is required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "description is required",
  }),
  location: Joi.string().required().messages({
    "string.empty": "location is required",
  }),
  startDate: Joi.string().required().messages({
    "string.empty": "startDate is required",
  }),
  endDate: Joi.string().required().messages({
    "string.empty": "endDate is required",
  }),
});
