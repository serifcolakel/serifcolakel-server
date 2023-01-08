import Joi from "joi";

export const createEducationSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "userId is required",
  }),
  schoolName: Joi.string().required().messages({
    "string.empty": "schoolName is required",
  }),
  faculty: Joi.string().required().messages({
    "string.empty": "faculty is required",
  }),
  fieldOfStudy: Joi.string().required().messages({
    "string.empty": "fieldOfStudy is required",
  }),
  start: Joi.string().required().messages({
    "string.empty": "start date is required",
  }),
  end: Joi.string().required().messages({
    "string.empty": "end date is required",
  }),
  gpas: Joi.string().required().messages({
    "string.empty": "gpas is required",
  }),
  educationType: Joi.valid("Örgün Öğretim", "İkinci Öğretim")
    .required()
    .messages({
      "any.only": "educationType must be Örgün or İkinci Öğretim",
    }),
});

export const deleteEducationSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "User Id is required",
  }),
  educationId: Joi.string().required().messages({
    "string.empty": "educationId is required",
  }),
});

export const updateEducationSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "User Id is required",
  }),
  educationId: Joi.string().required().messages({
    "string.empty": "educationId is required",
  }),
  schoolName: Joi.string().required().messages({
    "string.empty": "schoolName is required",
  }),
  faculty: Joi.string().required().messages({
    "string.empty": "faculty is required",
  }),
  fieldOfStudy: Joi.string().required().messages({
    "string.empty": "fieldOfStudy is required",
  }),
  start: Joi.string().required().messages({
    "string.empty": "start date is required",
  }),
  end: Joi.string().required().messages({
    "string.empty": "end date is required",
  }),
  gpas: Joi.string().required().messages({
    "string.empty": "gpas is required",
  }),
  educationType: Joi.valid("Örgün Öğretim", "İkinci Öğretim")
    .required()
    .messages({
      "any.only": "educationType must be Örgün or İkinci Öğretim",
    }),
});
