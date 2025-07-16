import { DB } from "@/database";
import { Transaction } from "sequelize";

const repository = {
  findCartsWithProduct: async (ids: number[], transaction: Transaction) => {
    return DB.Cart.findAll({
      where: { id: ids },
      attributes: ["id", "product_id", "quantity"],
      include: [
        {
          model: DB.Product,
          as: "product",
          attributes: ["id", "price", "stock"],
        },
      ],
      transaction,
    });
  },

  createOrderRecord: async (data: {
    name_customer: string;
    address_customer: string;
    sub_total: number;
  }, transaction: Transaction) => {
    const order = DB.Order.build(data);
    await order.save({ transaction });
    return order;
  },

  createOrderItem: async (
    item: {
      order_id: number;
      product_id: number;
      quantity: number;
      price: number;
    },
    transaction: Transaction
  ) => {
    return DB.OrderItem.create(item, { transaction });
  },

  updateProductStock: async (
    product_id: number,
    newStock: number,
    transaction: Transaction
  ) => {
    return DB.Product.update(
      { stock: newStock },
      { where: { id: product_id }, transaction }
    );
  },

  clearCarts: async (ids: number[], transaction: Transaction) => {
    return DB.Cart.destroy({ where: { id: ids }, transaction });
  },
};

export default repository;
