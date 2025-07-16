import {
  createProductController,
  deleteProductController,
  getProductByIdController,
  getProductsController,
  updateProductController,
} from "@/modules/product/product.controller";

import { createOrderController } from "@/modules/order/order.controller";
import {
  addToCartController,
  deleteCartController,
  getAllCartsController,
} from "@/modules/cart/cart.controller";

import {
  getCategoriesController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
  getCategoryByIdController,
} from "@/modules/category/category.controller";

import express from "express";

const router = express.Router();

router.get("/categories", getCategoriesController);
router.post("/categories", createCategoryController);
router.put("/categories/:id", updateCategoryController);
router.delete("/categories/:id", deleteCategoryController);
router.get("/categories/:id", getCategoryByIdController);

router.get("/products", getProductsController);
router.post("/products", createProductController);
router.put("/products/:id", updateProductController);
router.delete("/products/:id", deleteProductController);
router.get("/products/:id", getProductByIdController);

router.post("/cart", addToCartController);
router.get("/cart", getAllCartsController);
router.delete("/cart/:id", deleteCartController);

router.post("/orders", createOrderController);

export default router;
