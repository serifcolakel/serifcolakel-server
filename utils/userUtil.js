import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().min(6).max(255).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 6 characters",
    "string.max": "Name must be at most 255 characters",
  }),
  email: Joi.string()
    .email()
    .required("Email is must be valid & unique")
    .messages({
      "string.empty": "Email is required",
      "string.email": "Email must be valid",
    }),
  about: Joi.string().required().messages({
    "string.empty": "About is required",
  }),
  password: Joi.string().min(6).max(1024).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
    "string.max": "Password must be at most 1024 characters",
  }),
  image: Joi.string().required().messages({
    "string.empty": "Image is required",
  }),
});
