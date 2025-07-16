import { NextFunction, Response, Request } from "express";
import { validateRequestProduct } from "@/utils/validator/product.validator";
import {
  createProductService,
  deleteProductService,
  getProductByIdService,
  getProductsService,
  updateProductService,
} from "./product.service";
import httpStatus from "http-status";
import { CustomError, DataValidator } from "@/utils/custom-error";

export const getProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.page_size as string) || 10;
    const { items, meta } = await getProductsService(page, pageSize);
    res.status(httpStatus.OK).json({
      status: httpStatus[httpStatus.OK as keyof typeof httpStatus],
      message: "Successfully Get Products.",
      data: items,
      meta,
    });
  } catch (error) {
    next(error);
  }
};

export const createProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value } = validateRequestProduct(req.body);

    if (error) {
      const validationErrors = DataValidator(error);
      throw new CustomError(
        httpStatus.BAD_REQUEST as unknown as string,
        httpStatus.BAD_REQUEST,
        validationErrors
      );
    }

    const createdProduct = await createProductService(value);
    res.status(httpStatus.CREATED).json({
      status: httpStatus[httpStatus.CREATED as keyof typeof httpStatus],
      message: "Successfully Created Product.",
      data: createdProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const { error, value } = validateRequestProduct(req.body);

    if (error) {
      const validationErrors = DataValidator(error);
      throw new CustomError(
        httpStatus.BAD_REQUEST as unknown as string,
        httpStatus.BAD_REQUEST,
        validationErrors
      );
    }
    const updatedProduct = await updateProductService(id, value);
    if (updatedProduct) {
      res.status(httpStatus.OK).json({
        status: httpStatus[httpStatus.OK as keyof typeof httpStatus],
        message: "Successfully Updated Product.",
        data: updatedProduct,
      });
      return;
    }
    res.status(httpStatus.NOT_FOUND).json({
      status: httpStatus[httpStatus.NOT_FOUND as keyof typeof httpStatus],
      message: "Product Not Found.",
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const deleteProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await deleteProductService(id);
    if (deleted) {
      res.status(httpStatus.OK).json({
        status: httpStatus[httpStatus.OK as keyof typeof httpStatus],
        message: "Successfully Deleted Product.",
      });
      return;
    }
    res.status(httpStatus.NOT_FOUND).json({
      status: httpStatus[httpStatus.NOT_FOUND as keyof typeof httpStatus],
      message: "Product Not Found.",
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const getProductByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const product = await getProductByIdService(id);
    if (product) {
      res.status(httpStatus.OK).json({
        status: httpStatus[httpStatus.OK as keyof typeof httpStatus],
        message: "Successfully Retrieved Product.",
        data: product,
      });
      return;
    }
    res.status(httpStatus.NOT_FOUND).json({
      status: httpStatus[httpStatus.NOT_FOUND as keyof typeof httpStatus],
      message: "Product Not Found.",
    });
  } catch (error) {
    next(error);
  }
};
