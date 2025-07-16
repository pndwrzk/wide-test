import { Category } from "./category.interfaces";

export interface Product {
  id?: number;
  name: string;
  price: number;
  stock: number;
  category_id: number;
  created_at?: string;
  updated_at?: string;
  categories?: Category;
}

export interface ProductWithCategoryName  {
  id?: number;
  name: string;
  price: number;
  stock: number;
  created_at?: string;
  updated_at?: string;
  category_name: string | null;
}


interface Meta {
  page_size: number;
  page: number;
  total_page: number;
}

export interface ResponseGetProducts {
  items: ProductWithCategoryName[];
  meta: Meta;
}

export interface ProductRequestAttributes {
  name: string;
  price: number;
  stock: number;
  category_id: number;
}
