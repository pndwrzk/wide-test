import { validateCreateCart } from "@/utils/validator/order.validator";
import {
  addToCartService,
  deleteCartService,
  getAllCartsService,
} from "./cart.service";
import { NextFunction, Response, Request } from "express";
import httpStatus from "http-status";
import { CustomError, DataValidator } from "@/utils/custom-error";

export const addToCartController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error, value } = validateCreateCart(req.body);

    if (error) {
      const validationErrors = DataValidator(error);
      throw new CustomError(
        httpStatus.BAD_REQUEST as unknown as string,
        httpStatus.BAD_REQUEST,
        validationErrors
      );
    }

    await addToCartService(value);
    res.status(httpStatus.CREATED).json({
      status: httpStatus[httpStatus.CREATED as keyof typeof httpStatus],
      message: "Product added to cart successfully.",
      data: value,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCartsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const carts = await getAllCartsService();
    res.status(httpStatus.OK).json({
      status: httpStatus[httpStatus.OK as keyof typeof httpStatus],
      message: "Successfully retrieved all carts.",
      data: carts,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCartController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await deleteCartService(Number(id));
    res.status(httpStatus.OK).json({
      status: httpStatus[httpStatus.OK as keyof typeof httpStatus],
      message: "Cart deleted successfully.",
      data: {
        id: Number(id),
      },
    });
  } catch (error) {
    next(error);
  }
};
