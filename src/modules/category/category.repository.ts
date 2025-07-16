import { DB } from "@/database";
import {
  Category,
  CategoryRequestAttributes,
} from "@/interfaces/category.interfaces";

const categoryRepository = {
  
  getCategories: async (): Promise<Category[]> => {
    return DB.Category.findAll();
  },

  // Get category by ID
  getCategoryById: async (id: number): Promise<Category | null> => {
    return DB.Category.findOne({
      where: { id },
    });
  },

  // Create new category
  createCategory: async (
    category: CategoryRequestAttributes
  ): Promise<Category> => {
    return DB.Category.create(category);
  },

  // Update category
  updateCategory: async (
    id: number,
    updateData: Partial<CategoryRequestAttributes>
  ): Promise<Category | null> => {
    const [updatedCount, [updatedCategory]] = await DB.Category.update(
      updateData,
      {
        where: { id },
        returning: true,
      }
    );
    return updatedCount > 0 ? updatedCategory : null;
  },

  // Delete category
  deleteCategory: async (id: number): Promise<boolean> => {
    const deletedCount = await DB.Category.destroy({
      where: { id },
    });
    return deletedCount > 0;
  },
};

export default categoryRepository;
