import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import {
  getCategoriesService,
  getCategoryByIdService,
  createCategoryService,
  updateCategoryService,
  deleteCategoryService,
} from "./category.service";
import { validateRequestCategory } from "@/utils/validator/category.validator";
import { CustomError, DataValidator } from "@/utils/custom-error";

export const getCategoriesController = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const categories = await getCategoriesService();
    res.status(httpStatus.OK).json({
      status: httpStatus[httpStatus.OK as keyof typeof httpStatus],
      message: "Successfully Retrieved Categories.",
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategoryByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const category = await getCategoryByIdService(id);
    if (category) {
      res.status(httpStatus.OK).json({
        status: httpStatus[httpStatus.OK as keyof typeof httpStatus],
        message: "Successfully Retrieved Category.",
        data: category,
      });
      return;
    }
    res.status(httpStatus.NOT_FOUND).json({
      status: httpStatus[httpStatus.NOT_FOUND as keyof typeof httpStatus],
      message: "Category Not Found.",
    });
  } catch (error) {
    next(error);
  }
};

export const createCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value } = validateRequestCategory(req.body);
    if (error) {
      const validationErrors = DataValidator(error);
      throw new CustomError(
        httpStatus.BAD_REQUEST as unknown as string,
        httpStatus.BAD_REQUEST,
        validationErrors
      );
    }

    const newCategory = await createCategoryService(value);
    res.status(httpStatus.CREATED).json({
      status: httpStatus[httpStatus.CREATED as keyof typeof httpStatus],
      message: "Successfully Created Category.",
      data: newCategory,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const { error, value } = validateRequestCategory(req.body);
    if (error) {
      const validationErrors = DataValidator(error);
      throw new CustomError(
        httpStatus.BAD_REQUEST as unknown as string,
        httpStatus.BAD_REQUEST,
        validationErrors
      );
    }

    const updatedCategory = await updateCategoryService(id, value);
    if (updatedCategory) {
      res.status(httpStatus.OK).json({
        status: httpStatus[httpStatus.OK as keyof typeof httpStatus],
        message: "Successfully Updated Category.",
        data: updatedCategory,
      });
    } else {
      res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus[httpStatus.NOT_FOUND as keyof typeof httpStatus],
        message: "Category Not Found.",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await deleteCategoryService(id);
    if (deleted) {
      res.status(httpStatus.OK).json({
        status: httpStatus[httpStatus.OK as keyof typeof httpStatus],
        message: "Successfully Deleted Category.",
      });
    } else {
      res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus[httpStatus.NOT_FOUND as keyof typeof httpStatus],
        message: "Category Not Found.",
      });
    }
  } catch (error) {
    next(error);
  }
};
