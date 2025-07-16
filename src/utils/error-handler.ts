import express from "express";
import { CustomError } from "./custom-error";
import httpStatus from "http-status";

export const errorHandler = (
  err: Error | CustomError,
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (err) {
    console.error(err);
    const statusCode = err instanceof CustomError ? err.statusCode : 500;
    res.status(statusCode).json({
      status: httpStatus[statusCode as keyof typeof httpStatus],
      message:
        err instanceof CustomError
          ? err.message
          : "An error occurred on the server",
      data: err instanceof CustomError ? err.data : null,
    });
    return;
  }

  next();
};
