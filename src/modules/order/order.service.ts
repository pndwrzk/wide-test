import { DB } from "@/database";
import {
  Order,
  OrderItemCreationAttributes,
} from "@/interfaces/order.interfaces";
import repository from "./order.repository";
import { CustomError } from "@/utils/custom-error";
import httpStatus from "http-status";

export const createOrderService = async (
  orderReq: OrderItemCreationAttributes
): Promise<Order> => {
  const sequelize = DB.sequelize;
  const t = await sequelize.transaction();

  try {
    const carts = await repository.findCartsWithProduct(orderReq.ids_cart, t);

    if (!carts.length) {
      throw new CustomError(
        "Cart is empty or invalid.",
        httpStatus.BAD_REQUEST
      );
    }

    const order = await repository.createOrderRecord(
      {
        name_customer: orderReq.name,
        address_customer: orderReq.address,
        sub_total: 0,
      },
      t
    );

    let subtotal = 0;

    for (const cart of carts) {
      const price = cart.product?.price ?? 0;
      const stock = cart.product?.stock ?? 0;
      const quantity = cart.quantity;

      if (stock < quantity) {
        throw new CustomError(
          `Stock for product_id ${cart.product_id} not enough.`,
          httpStatus.CONFLICT
        );
      }

      subtotal += price * quantity;

      await repository.updateProductStock(cart.product_id, stock - quantity, t);

      await repository.createOrderItem(
        {
          order_id: order.id,
          product_id: cart.product_id,
          quantity,
          price,
        },
        t
      );
    }

    order.sub_total = subtotal;
    await order.save({ transaction: t });

    await repository.clearCarts(orderReq.ids_cart, t);

    await t.commit();
    return order;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};
