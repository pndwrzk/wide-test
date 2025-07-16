import { Category } from "@/interfaces/category.interfaces";
import { Product } from "@/interfaces/product.interfaces";
import { Sequelize, DataTypes, Model, Optional } from "sequelize";

export type ProductCreationAttributes = Optional<Product, "id" | "created_at" | "updated_at">;

export class ProductModel
  extends Model<Product, ProductCreationAttributes>
  implements Product
{
  categories!: Category;
  public id!: number;
  public name!: string;
  public price!: number;
  public stock!: number;
  public category_id!: number;
  public created_at?: string;
  public updated_at?: string;
}

export default function (sequelize: Sequelize): typeof ProductModel {
  ProductModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "products",
      sequelize,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return ProductModel;
}
