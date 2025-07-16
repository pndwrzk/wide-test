import {
  Category,
  CategoryRequestAttributes,
} from "@/interfaces/category.interfaces";
import categoryRepository from "./category.repository";

export const getCategoriesService = async (): Promise<Category[]> => {
  return categoryRepository.getCategories();
};

export const getCategoryByIdService = async (
  id: number
): Promise<Category | null> => {
  return categoryRepository.getCategoryById(id);
};

export const createCategoryService = async (
  data: CategoryRequestAttributes
): Promise<Category> => {
  return categoryRepository.createCategory(data);
};

export const updateCategoryService = async (
  id: number,
  data: Partial<CategoryRequestAttributes>
): Promise<Category | null> => {
  return categoryRepository.updateCategory(id, data);
};

export const deleteCategoryService = async (
  id: number
): Promise<boolean> => {
  return categoryRepository.deleteCategory(id);
};
