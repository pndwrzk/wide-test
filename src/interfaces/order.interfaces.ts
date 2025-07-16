import { Product } from "./product.interfaces";

export interface Cart {
  id: number;
  product_id: number;
  quantity: number;
  created_at?: string;
  updated_at?: string;
  product?: Product;
}

export interface CartRequestAttributes {
  product_id: number;
  quantity: number;
}

export interface ItemsCart {
  id: number;
  quantity: number;
  type: string;
  price: number;
  name: string;
  total: number;
}

export interface CartWithProductAndCategory {
  id: number;
  product_id: number;
  quantity: number;
  created_at: string;
  updated_at: string;
  product: Product;
}

export interface CartResponseAttributes {
  items: ItemsCart[];
  sub_total: number;
}

export interface Order {
  id?: number;
  name_customer: string;
  address_customer: string;
  sub_total: number;
  created_at?: string;
  updated_at?: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  created_at?: string;
  updated_at?: string;
}

export interface OrderItemCreationAttributes {
  name: string;
  address: string;
  ids_cart: number[];
}
