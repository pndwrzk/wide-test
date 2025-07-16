import Joi, { ValidationResult } from "joi";
import {
  CartRequestAttributes,
  OrderItemCreationAttributes,
} from "@/interfaces/order.interfaces";

export const validateCreateOrderItem = (
  body: OrderItemCreationAttributes
): ValidationResult => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required().messages({
      "string.base": "Name must be a text.",
      "string.empty": "Name is required.",
      "string.min": "Name must be at least 3 characters long.",
      "string.max": "Name must not exceed 255 characters.",
      "any.required": "Name is required.",
    }),
    address: Joi.string().min(10).max(500).required().messages({
      "string.base": "Address must be a text.",
      "string.empty": "Address is required.",
      "string.min": "Address must be at least 10 characters long.",
      "string.max": "Address must not exceed 500 characters.",
      "any.required": "Address is required.",
    }),
    ids_cart: Joi.array()
      .items(Joi.number().integer().positive().required())
      .min(1)
      .required()
      .messages({
        "array.base": "ids_cart must be an array.",
        "array.min": "At least one cart ID is required.",
        "any.required": "ids_cart is required.",
        "number.base": "Each cart ID must be a number.",
        "number.integer": "Each cart ID must be an integer.",
        "number.positive": "Each cart ID must be a positive number.",
      }),
  });

  return schema.validate(body, { abortEarly: false, stripUnknown: true });
};

export const validateCreateCart = (
  body: CartRequestAttributes
): ValidationResult => {
  const schema = Joi.object({
    product_id: Joi.number().integer().positive().required().messages({
      "number.base": "Product ID must be a number.",
      "number.integer": "Product ID must be an integer.",
      "number.positive": "Product ID must be a positive number.",
      "any.required": "Product ID is required.",
    }),
    quantity: Joi.number().integer().min(1).required().messages({
      "number.base": "Quantity must be a number.",
      "number.integer": "Quantity must be an integer.",
      "number.min": "Quantity must be at least 1.",
      "any.required": "Quantity is required.",
    }),
  });

  return schema.validate(body, { abortEarly: false, stripUnknown: true });
};
