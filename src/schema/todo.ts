import Joi from "joi";

export const getCreateTaskSchema = Joi.object({
  todo: Joi.string().required().messages({
    "any.required": "todo is required",
    "string.empty": "todo cannot be empty",
  }),
}).options({
  stripUnknown: true,
});

export const querySchema = Joi.object({
  id: Joi.number().required().messages({
    "number.base": "ID must be a number",
    "any.required": "ID is required",
  }),
}).options({
  stripUnknown: true,
});
