import { DB } from "@/database";
import {
  Product,
  ProductRequestAttributes,
  ProductWithCategoryName,
} from "@/interfaces/product.interfaces";

const repository = {
  getProducts: async (
    limit: number,
    offset: number
  ): Promise<{ rows: ProductWithCategoryName[]; count: number }> => {
    const result = await DB.Product.findAndCountAll({
      order: [["id", "DESC"]],
      limit,
      offset,
      include: [
        {
          model: DB.Category,
          as: "categories",
          attributes: ["id", "name"],
        },
      ],
    });

    const modifiedRows: ProductWithCategoryName[] = result.rows.map(
      (product) => {
        const plain = product.toJSON() as Product;
        return {
          id: plain.id,
          name: plain.name,
           category_name: plain.categories?.name || null,
          price: Number(plain.price),
          stock: plain.stock,
          created_at: plain.created_at,
          updated_at: plain.updated_at,
         
        };
      }
    );

    return {
      rows: modifiedRows,
      count: result.count,
    };
  },

  getProductById: async (
    id: number
  ): Promise<ProductWithCategoryName | null> => {
    const product = await DB.Product.findOne({
      where: { id },
      include: [
        {
          model: DB.Category,
          as: "categories",
          attributes: ["id", "name"],
        },
      ],
    });

    if (!product) return null;

    const plain = product.toJSON() as Product;
    return {
      id: plain.id,
      name: plain.name,
      price: Number(plain.price),
      stock: plain.stock,
      created_at: plain.created_at,
      updated_at: plain.updated_at,
      category_name: plain.categories?.name || null,
    };
  },

  createProduct: async (
    product: ProductRequestAttributes
  ): Promise<Product> => {
    return DB.Product.create(product);
  },

  updateProduct: async (
    id: number,
    productAttrs: Partial<ProductRequestAttributes>
  ): Promise<Product | null> => {
    const [count] = await DB.Product.update(productAttrs, {
      where: { id },
    });

    if (!count) return null;

    return DB.Product.findByPk(id);
  },

  deleteProduct: async (id: number): Promise<boolean> => {
    const deletedCount = await DB.Product.destroy({
      where: { id },
    });
    return deletedCount > 0;
  },

    findProductStock: async (product_id: number) => {
    return await DB.Product.findOne({
      where: { id: product_id },
      attributes: ["id", "stock"],
    });
  },
};

export default repository;
