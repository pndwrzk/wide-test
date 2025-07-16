import {
  Product,
  ProductRequestAttributes,
  ResponseGetProducts,
  ProductWithCategoryName,
} from "@/interfaces/product.interfaces";
import repository from "./product.repository";
import categoryRepository from "@modules/category/category.repository";
import { CustomError } from "@/utils/custom-error";
import httpStatus from "http-status";

export const getProductsService = async (
  page: number,
  pageSize: number
): Promise<ResponseGetProducts> => {
  const limit = pageSize;
  const offset = (page - 1) * pageSize;
  const { rows, count } = await repository.getProducts(limit, offset);
  const total_page = Math.ceil(count / pageSize);

  return {
    items: rows,
    meta: {
      page,
      page_size: limit,
      total_page,
    },
  };
};

export const getProductByIdService = async (
  id: number
): Promise<ProductWithCategoryName | null> => {
  return repository.getProductById(id);
};

export const createProductService = async (
  product: ProductRequestAttributes
): Promise<Product> => {
  const category = await categoryRepository.getCategoryById(
    product.category_id
  );
  if (!category) {
    throw new CustomError("Category not found", httpStatus.NOT_FOUND);
  }

  return repository.createProduct(product);
};

export const updateProductService = async (
  id: number,
  product: Partial<ProductRequestAttributes>
): Promise<Product | null> => {
  if (product.category_id) {
    const category = await categoryRepository.getCategoryById(
      product.category_id
    );
    if (!category) {
      throw new CustomError("Category not found", httpStatus.NOT_FOUND);
    }
  }

  return repository.updateProduct(id, product);
};

export const deleteProductService = async (id: number): Promise<boolean> => {
  return repository.deleteProduct(id);
};
