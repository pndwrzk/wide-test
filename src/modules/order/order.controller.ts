import {
  validateCreateOrderItem,
} from "@/utils/validator/order.validator";
import {

  createOrderService,

} from "./order.service";
import { NextFunction, Response, Request } from "express";
import httpStatus from "http-status";
import { CustomError, DataValidator } from "@/utils/custom-error";


export const createOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error, value } = validateCreateOrderItem(req.body);

    if (error) {
      const validationErrors = DataValidator(error);
      throw new CustomError(
        httpStatus.BAD_REQUEST as unknown as string,
        httpStatus.BAD_REQUEST,
        validationErrors
      );
    }

    const newOrder = await createOrderService(value);
    res.status(httpStatus.CREATED).json({
      status: httpStatus[httpStatus.CREATED as keyof typeof httpStatus],
      message: "Order created successfully.",
      data: newOrder,
    });
  } catch (error) {
    next(error);
  }
};
