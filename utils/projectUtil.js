import Joi from "joi";

export const createProjectSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "userId is required",
  }),
  name: Joi.string().required().messages({
    "string.empty": "name is required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "description is required",
  }),
  link: Joi.string().uri().required().messages({
    "string.empty": "link is required",
  }),
  image: Joi.string().uri().required().messages({
    "string.empty": "image is required",
  }),
  techStackImage: Joi.array().required().messages({
    "string.empty": "techStackImage is required",
  }),
});

export const deleteProjectSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "User Id is required",
  }),
  projectId: Joi.string().required().messages({
    "string.empty": "projectId is required",
  }),
});

export const updateProjectSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "userId is required",
  }),
  projectId: Joi.string().required().messages({
    "string.empty": "projectId is required",
  }),
  name: Joi.string().required().messages({
    "string.empty": "name is required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "description is required",
  }),
  link: Joi.string().uri().required().messages({
    "string.empty": "link is required",
  }),
  image: Joi.string().uri().required().messages({
    "string.empty": "image is required",
  }),
  techStackImage: Joi.array().required().messages({
    "string.empty": "techStackImage is required",
  }),
});
