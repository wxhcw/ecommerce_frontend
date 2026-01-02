export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string; // 前端使用 image，后端返回 imageUrl，API 层会转换
  imageUrl?: string; // 可选，用于向后兼容
  categoryId: number | null;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

