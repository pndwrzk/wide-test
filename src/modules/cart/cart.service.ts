import {
  Cart,
  CartRequestAttributes,
  CartResponseAttributes,
  ItemsCart,
  CartWithProductAndCategory,
} from "@/interfaces/cart.interfaces";
import repository from "./cart.repository";
import productRepository from "@/modules/product/product.repository";
import { CustomError } from "@/utils/custom-error";
import httpStatus from "http-status";

export const getAllCartsService = async (): Promise<CartResponseAttributes> => {
  const carts = await repository.findAllCartsWithProduct();
  let total = 0;

  const items: ItemsCart[] = (carts as CartWithProductAndCategory[]).map(
    (cart) => {
      const price = cart.product.price;
      const quantity = cart.quantity;
      const productTotal = price * quantity;
      total += productTotal;

      return {
        id: cart.id,
        name: cart.product.name,
        price,
        quantity,
        type: cart.product.categories?.name ?? "",
        total: productTotal,
      };
    }
  );

  return {
    items,
    sub_total: total,
  };
};

export const addToCartService = async (
  cart: CartRequestAttributes
): Promise<void> => {
  const product = await productRepository.findProductStock(cart.product_id);

  if (!product) {
    throw new CustomError("Product not found", httpStatus.NOT_FOUND);
  }

  const existingCart: Cart | null = await repository.findCartByProductId(cart.product_id);

  const totalRequestedQty = cart.quantity + (existingCart?.quantity ?? 0);

  if (totalRequestedQty > product.stock) {
    throw new CustomError(
      `Stock is not enough. Available: ${product.stock}`,
      httpStatus.CONFLICT
    );
  }

  if (existingCart) {
    if (totalRequestedQty <= 0) {
      await repository.deleteCart(existingCart?.id);
      return;
    }
    existingCart.quantity = totalRequestedQty;
    await repository.updateCart(existingCart,existingCart?.id);
    return;
  }

  await repository.createCart(cart);
  return;
};


export const deleteCartService = async (id: number): Promise<void> => {
  const cart = await repository.findCartById(id);
  if (!cart) {
    throw new CustomError("Cart not found", httpStatus.NOT_FOUND);
  }
  await repository.deleteCart(cart.id);
}
