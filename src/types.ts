export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: number | null;
}

export interface CartItem {
  product: Product;
  quantity: number;
}


