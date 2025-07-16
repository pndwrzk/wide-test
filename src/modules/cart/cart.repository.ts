import { DB } from "@/database";
import { CartCreationAttributes } from "@/database/models/cart.model";
import { Cart } from "@/interfaces/cart.interfaces";

const repository = {
  findAllCartsWithProduct: async () => {
    return await DB.Cart.findAll({
      attributes: ["id", "product_id", "quantity", "created_at", "updated_at"],
      include: [
        {
          model: DB.Product,
          as: "product",
          attributes: ["id", "price", "name"],
          include: [
            {
              model: DB.Category,
              as: "categories",
              attributes: ["id", "name"],
            },
          ],
        },
      ],
    });
  },



  findCartByProductId: async (product_id: number) => {
    return await DB.Cart.findOne({
      where: { product_id },
    });
  },

  createCart: async (data: CartCreationAttributes) => {
    return await DB.Cart.create(data);
  },

  updateCart: async (cartInstance: Cart, id: number) => {
   DB.Cart.update(cartInstance, {
      where: { id },
    });
    return cartInstance;
  },
  deleteCart: async (id: number) => {
    return await DB.Cart.destroy({ where: { id } });
  },
  findCartById: async (id: number): Promise<Cart | null> => {
    const cart = await DB.Cart.findByPk(id, {
      include: [
        {
          model: DB.Product,
          as: "product",
          attributes: ["id", "name", "price"],
          include: [
            {
              model: DB.Category,
              as: "categories",
              attributes: ["id", "name"],
            },
          ],
        },
      ],
    });

    if (!cart) return null;

    return cart.toJSON() as Cart;
  }
};

export default repository;
