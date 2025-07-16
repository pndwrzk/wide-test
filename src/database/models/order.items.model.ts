import { OrderItem } from "@/interfaces/order.interfaces";
import { Product } from "@/interfaces/product.interfaces";
import { Sequelize, DataTypes, Model, Optional } from "sequelize";

export type OrderItemCreationAttributes = Optional<OrderItem, "id">;

export class OrderItemModel extends Model<OrderItem, OrderItemCreationAttributes> implements OrderItem {
  public id!: number;
  public order_id!: number;
  public product_id!: number;
  public quantity!: number;
  public price!: number;
  public created_at?: string;
  public updated_at?: string;
 public product!: Product ;
}

export default function (sequelize: Sequelize): typeof OrderItemModel {
  OrderItemModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      order_id: {
        type: DataTypes.INTEGER,
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
      price: {
        type: DataTypes.DECIMAL(10, 2),
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
      tableName: "order_items",
      createdAt: "created_at",
      updatedAt: "updated_at",
      sequelize,
      timestamps: true,
    }
  );

  return OrderItemModel;
}
