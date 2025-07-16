import Joi, { ValidationResult } from "joi";
import { ProductRequestAttributes } from "@/interfaces/product.interfaces";

export const validateRequestProduct = (body: ProductRequestAttributes): ValidationResult => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required().messages({
      "string.base": "Name must be a text.",
      "string.empty": "Name is required.",
      "string.min": "Name must be at least 3 characters long.",
      "string.max": "Name must not exceed 255 characters.",
      "any.required": "Name is required.",
    }),
    price: Joi.number().greater(0).required().messages({
      "number.base": "Price must be a number.",
      "number.greater": "Price must be greater than 0.",
      "any.required": "Price is required.",
    }),
    stock: Joi.number().integer().min(0).required().messages({
      "number.base": "Stock must be a number.",
      "number.integer": "Stock must be an integer.",
      "number.min": "Stock must be at least 0.",
      "any.required": "Stock is required.",
    }),
    category_id: Joi.number().integer().positive().required().messages({
      "number.base": "Category ID must be a number.",
      "number.integer": "Category ID must be an integer.",
      "number.positive": "Category ID must be a positive number.",
      "any.required": "Category ID is required.",
    }),
  });

  return schema.validate(body, { abortEarly: false, stripUnknown: true });
};
