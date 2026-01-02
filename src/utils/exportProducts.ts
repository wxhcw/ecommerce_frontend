import { products } from '../data/products';
import type { Product } from '../types';

/**
 * Convert product data to backend format (matching database schema)
 * Removes frontend-specific fields like 'id' if needed for insertion
 */
export function formatProductForBackend(product: Product, includeImageUrl = true) {
  const base = {
    name: product.name,
    price: product.price.toString(), // Convert to string for decimal(10,2)
    description: product.description,
    category_id: product.categoryId,
  };
  
  if (includeImageUrl) {
    return {
      ...base,
      image_url: product.image, // Store image URL in database
    };
  }
  
  return base;
}

/**
 * Export all products in backend format
 */
export function exportProductsForBackend(includeImageUrl = true) {
  return products.map(product => formatProductForBackend(product, includeImageUrl));
}

/**
 * Export products as JSON string (for copying/pasting)
 */
export function exportProductsAsJSON() {
  return JSON.stringify(exportProductsForBackend(), null, 2);
}

/**
 * Export products as SQL INSERT statements
 * @param includeImageUrl - Whether to include image_url field (requires ALTER TABLE if false)
 */
export function exportProductsAsSQL(includeImageUrl = true) {
  const formattedProducts = exportProductsForBackend(includeImageUrl);
  
  return formattedProducts.map((product) => {
    const name = product.name.replace(/'/g, "''"); // Escape single quotes
    const description = product.description.replace(/'/g, "''");
    const categoryId = product.category_id !== null ? product.category_id : 'NULL';
    
    if (includeImageUrl && 'image_url' in product) {
      const imageUrl = (product.image_url as string).replace(/'/g, "''");
      return `INSERT INTO products (name, price, description, category_id, image_url) 
VALUES ('${name}', ${product.price}, '${description}', ${categoryId}, '${imageUrl}');`;
    } else {
      return `INSERT INTO products (name, price, description, category_id) 
VALUES ('${name}', ${product.price}, '${description}', ${categoryId});`;
    }
  }).join('\n');
}

