import { Cart } from "@/interfaces/order.interfaces";
import { Product } from "@/interfaces/product.interfaces";
import { Sequelize, DataTypes, Model, Optional } from "sequelize";

export type CartCreationAttributes = Optional<Cart, "id">;

export class CartModel
  extends Model<Cart, CartCreationAttributes>
  implements Cart
{
  public id!: number;
  public product_id!: number;
  public quantity!: number;
  public created_at?: string;
  public updated_at?: string;
  public product?: Product;
}

export default function (sequelize: Sequelize): typeof CartModel {
  CartModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
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
      tableName: "carts",
      createdAt: "created_at",
      updatedAt: "updated_at",
      sequelize,
      timestamps: true,
    }
  );

  return CartModel;
}
