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