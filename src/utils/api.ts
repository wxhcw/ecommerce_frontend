import type { User, Product } from '../types';

// 在开发环境中使用 Vite 代理，生产环境使用环境变量或直接 URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.DEV ? '/api' : 'http://localhost:8080');

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface ApiError {
  message?: string;
  email?: string;
  [key: string]: string | undefined;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = localStorage.getItem('token');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let error: ApiError = {};
      try {
        error = await response.json();
      } catch {
        error.message = response.statusText || 'An error occurred';
      }
      throw error;
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  async register(data: RegisterRequest): Promise<User> {
    return this.request<User>('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>('/auth/me');
  }

  async refreshToken(): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    });
  }

  // Products API
  async getProducts(categoryId?: number): Promise<Product[]> {
    const url = categoryId 
      ? `/products?categoryId=${categoryId}`
      : '/products';
    const products = await this.request<Array<{
      id: number;
      name: string;
      description: string;
      price: number;
      categoryId: number | null;
      imageUrl: string;
    }>>(url);
    
    // 转换 imageUrl 为 image 以匹配前端类型
    return products.map(p => ({
      ...p,
      image: p.imageUrl,
    }));
  }

  async getProduct(id: number): Promise<Product> {
    const product = await this.request<{
      id: number;
      name: string;
      description: string;
      price: number;
      categoryId: number | null;
      imageUrl: string;
    }>(`/products/${id}`);
    
    return {
      ...product,
      image: product.imageUrl,
    };
  }
}

export const api = new ApiClient(API_BASE_URL);

