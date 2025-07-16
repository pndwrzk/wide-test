import Joi from "joi";

/* eslint @typescript-eslint/no-explicit-any: "off" */
export class CustomError extends Error {
  public statusCode: number;
  public data: any;

  constructor(message: string, statusCode: number, data: any = null) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const DataValidator = (error: Joi.ValidationError) => {
  const formattedErrors = error.details.map((err) => ({
    field: err.path[0],
    message: err.message,
  }));
  return formattedErrors;
};
