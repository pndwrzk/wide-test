import { Order } from "@/interfaces/order.interfaces";
import { Sequelize, DataTypes, Model, Optional } from "sequelize";

export type OrderCreationAttributes = Optional<Order, "id">;

export class OrderModel
  extends Model<Order, OrderCreationAttributes>
  implements Order
{
  public id!: number;
  public name_customer!: string;
  public address_customer!: string;
  public sub_total!: number;
  public created_at?: string;
  public updated_at?: string;
}

export default function (sequelize: Sequelize): typeof OrderModel {
  OrderModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name_customer: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      address_customer: {
        type: DataTypes.STRING(255),
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
      sub_total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      tableName: "orders",
      createdAt: "created_at",
      updatedAt: "updated_at",
      sequelize,
      timestamps: true,
    }
  );

  return OrderModel;
}
