import Joi from "joi";

export const contactSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "userId is required",
  }),
  name: Joi.string().min(6).max(255).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 6 characters",
    "string.max": "Name must be at most 255 characters",
  }),
  link: Joi.string().uri().required().messages({
    "string.empty": "Link is required",
    "string.uri": "Link must be valid",
  }),
  type: Joi.object()
    .valid("location", "mail", "phone", "linkedin", "website", "github")
    .required()
    .messages({
      "string.empty": "Type is required",
    }),
});

export const updateContactSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "userId is required",
  }),
  contactId: Joi.string().required().messages({
    "string.empty": "contactId is required",
  }),
  name: Joi.string().min(6).max(255).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 6 characters",
    "string.max": "Name must be at most 255 characters",
  }),
  link: Joi.string().uri().required().messages({
    "string.empty": "Link is required",
    "string.uri": "Link must be valid",
  }),
  type: Joi.object()
    .valid("location", "mail", "phone", "linkedin", "website", "github")
    .required()
    .messages({
      "string.empty": "Type is required",
    }),
});

export const deleteContactSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "userId is required",
  }),
  contactId: Joi.string().required().messages({
    "string.empty": "contactId is required",
  }),
});
