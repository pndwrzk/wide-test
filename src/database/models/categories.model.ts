import { Category } from "@/interfaces/category.interfaces";
import { Sequelize, DataTypes, Model, Optional } from "sequelize";

export type CategoryCreationAttributes = Optional<Category, "id">;

export class CategoryModel
  extends Model<Category, CategoryCreationAttributes>
  implements Category
{
  public id!: number;
  public name!: string;
  public created_at?: string;
  public updated_at?: string;
}

export default function (sequelize: Sequelize): typeof CategoryModel {
  CategoryModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(100),
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
      tableName: "categories",
      createdAt: "created_at",
      updatedAt: "updated_at",
      sequelize,
      timestamps: true,
    }
  );

  return CategoryModel;
}
