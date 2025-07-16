import { Sequelize, Dialect } from "sequelize";

// Import model definitions
import ProductModelDef from "./models/products.model";
import CategoryModelDef from "./models/categories.model";
import CartModelDef from "./models/cart.model";
import OrderModelDef from "./models/order.model";
import OrderItemModelDef from "./models/order.items.model";

import {
  DB_DIALECT,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from "@/config";

// Config umum Sequelize
const commonConfig = {
  define: {
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
    underscored: true,
    freezeTableName: true,
  },
  pool: { min: 0, max: 5 },
  logQueryParameters: true,
  logging: (query: string, time?: number) =>
    console.info(`${time ?? 0}ms ${query}`),
  benchmark: true,
};

// Init Sequelize instance
const sequelize = new Sequelize({
  database: DB_NAME,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: parseInt(DB_PORT ?? "5432", 10),
  dialect: DB_DIALECT as Dialect,
  ...commonConfig,
});

// Init models
const Product = ProductModelDef(sequelize);
const Category = CategoryModelDef(sequelize);
const Cart = CartModelDef(sequelize);
const Order = OrderModelDef(sequelize);
const OrderItem = OrderItemModelDef(sequelize);

// Set up associations


Product.belongsTo(Category, { foreignKey: "category_id", as: "categories" });
Category.hasMany(Product, { foreignKey: "category_id", as: "products" });


Cart.belongsTo(Product, { foreignKey: "product_id", as: "product" });
Product.hasMany(Cart, { foreignKey: "product_id", as: "carts" });


Order.hasMany(OrderItem, {
  foreignKey: "order_id",
  as: "items",
  onDelete: "CASCADE",
});
OrderItem.belongsTo(Order, {
  foreignKey: "order_id",
  as: "order",
});


OrderItem.belongsTo(Product, {
  foreignKey: "product_id",
  as: "product",
});
Product.hasMany(OrderItem, {
  foreignKey: "product_id",
  as: "order_items",
});


sequelize.authenticate().then(
  () => console.info(`DB ${DB_DIALECT} connected.`),
  (err) => console.error("DB connection failed:", err)
);


export const DB = {
  sequelize,
  Sequelize,
  Product,
  Category,
  Cart,
  Order,
  OrderItem,
};
