import { products } from '../data/products';
import { formatProductForBackend } from './exportProducts';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

/**
 * Send a single product to backend
 */
export async function createProduct(productData: ReturnType<typeof formatProductForBackend>) {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

/**
 * Send all products to backend (one by one)
 */
export async function syncAllProducts() {
  const results = [];
  const formattedProducts = products.map(formatProductForBackend);

  for (const product of formattedProducts) {
    try {
      const result = await createProduct(product);
      results.push({ success: true, product: product.name, data: result });
      console.log(`✓ Created product: ${product.name}`);
    } catch (error) {
      results.push({ success: false, product: product.name, error });
      console.error(`✗ Failed to create product: ${product.name}`, error);
    }
  }

  return results;
}

/**
 * Send all products in batch (if backend supports batch insert)
 */
export async function syncAllProductsBatch() {
  try {
    const formattedProducts = products.map(formatProductForBackend);
    
    const response = await fetch(`${API_BASE_URL}/products/batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ products: formattedProducts }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error syncing products:', error);
    throw error;
  }
}


