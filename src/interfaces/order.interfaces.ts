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