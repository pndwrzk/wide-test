import Joi, { ValidationResult } from "joi";
import {
  CategoryRequestAttributes,
} from "@/interfaces/category.interfaces";

export const validateRequestCategory = (
  body: CategoryRequestAttributes
): ValidationResult => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required().messages({
      "string.base": "Name must be a text.",
      "string.empty": "Name is required.",
      "string.min": "Name must be at least 3 characters long.",
      "string.max": "Name must not exceed 255 characters.",
      "any.required": "Name is required.",
    }),
    
  });

  return schema.validate(body, { abortEarly: false, stripUnknown: true });
};


