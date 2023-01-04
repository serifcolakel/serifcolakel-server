import Joi from "joi";

export const referenceSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "userId is required",
  }),
  name: Joi.string().required().messages({
    "string.empty": "name is required",
  }),
  email: Joi.string().uri().required().messages({
    "string.empty": "email is required",
  }),
  phone: Joi.string().uri().required().messages({
    "string.empty": "phone is required",
  }),
});

export const deleteReferenceSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "User Id is required",
  }),
  referenceId: Joi.string().required().messages({
    "string.empty": "Contact Id is required",
  }),
});

export const updateReferenceSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "User Id is required",
  }),
  referenceId: Joi.string().required().messages({
    "string.empty": "Contact Id is required",
  }),
  name: Joi.string().required().messages({
    "string.empty": "name is required",
  }),
  email: Joi.string().uri().required().messages({
    "string.empty": "email is required",
  }),
  phone: Joi.string().uri().required().messages({
    "string.empty": "phone is required",
  }),
});
