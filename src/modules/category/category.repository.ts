import { DB } from "@/database";
import {
  Category,
  CategoryRequestAttributes,
} from "@/interfaces/category.interfaces";

const categoryRepository = {
  
  getCategories: async (): Promise<Category[]> => {
    return DB.Category.findAll();
  },

 
  getCategoryById: async (id: number): Promise<Category | null> => {
    return DB.Category.findOne({
      where: { id },
    });
  },


  createCategory: async (
    category: CategoryRequestAttributes
  ): Promise<Category> => {
    return DB.Category.create(category);
  },

 
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

 
  deleteCategory: async (id: number): Promise<boolean> => {
    const deletedCount = await DB.Category.destroy({
      where: { id },
    });
    return deletedCount > 0;
  },
};

export default categoryRepository;
