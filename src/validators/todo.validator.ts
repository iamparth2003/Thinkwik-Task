import Joi from "joi";

export const createTodoSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Title is required",
    "string.empty": "Title cannot be empty",
  }),
  description: Joi.string().required().messages({
    "any.required": "Description is required",
    "string.empty": "Description cannot be empty",
  }),
  dueDate: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      "any.required": "Due date is required",
      "date.base": "Due date must be a valid date",
    }),
});

export const updateTodoSchema = Joi.object({
  title: Joi.string().optional().messages({
    "string.base": "Title must be a string",
  }),
  description: Joi.string().optional().messages({
    "string.base": "Description must be a string",
  }),
  todoId: Joi.string().required().messages({
    "any.required": "Todo ID is required",
  }),
  dueDate: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .messages({
      "string.pattern.base": "Due date must be in 'yyyy-mm-dd' format",
    }),
}).min(1);

export const todoIdParamSchema = Joi.object({});
