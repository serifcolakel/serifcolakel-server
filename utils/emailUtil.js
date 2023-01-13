import Joi from "joi";

export const sendEmailSchema = Joi.object({
  fullName: Joi.string().required().messages({
    "string.empty": "Lütfen adınızı giriniz.",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Lütfen email adresinizi giriniz.",
    "string.email": "Lütfen geçerli bir email adresi giriniz.",
  }),
  message: Joi.string().required().messages({
    "string.empty": "Lütfen mesajınızı giriniz.",
  }),
  phone: Joi.string().required().messages({
    "string.empty": "Lütfen telefon numaranızı giriniz.",
  }),
});
