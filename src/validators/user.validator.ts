import Joi from "joi";

export const userSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.email": "Email must be a valid email",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(8).max(20).required().messages({
    "string.base": "Password must be a string",
    "string.min": "Password must be at least 8 characters",
    "string.max": "Password must be at most 20 characters long",
    "any.required": "Password is required",
  }),
});
