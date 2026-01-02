/**
 * Utility functions to download product data in various formats
 * Run these in browser console or create a simple page to use them
 */

import { exportProductsAsJSON, exportProductsAsSQL, exportProductsForBackend } from './exportProducts';

/**
 * Download products as JSON file
 */
export function downloadProductsAsJSON() {
  const json = exportProductsAsJSON();
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'products.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  console.log('✓ Products downloaded as products.json');
}

/**
 * Download products as SQL file
 */
export function downloadProductsAsSQL() {
  const sql = exportProductsAsSQL();
  const blob = new Blob([sql], { type: 'text/sql' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'products.sql';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  console.log('✓ Products downloaded as products.sql');
}

/**
 * Copy products JSON to clipboard
 */
export async function copyProductsToClipboard() {
  const json = exportProductsAsJSON();
  try {
    await navigator.clipboard.writeText(json);
    console.log('✓ Products copied to clipboard!');
    alert('Products data copied to clipboard!');
  } catch (err) {
    console.error('Failed to copy:', err);
    alert('Failed to copy to clipboard');
  }
}

/**
 * Log products to console (for easy inspection)
 */
export function logProducts() {
  const products = exportProductsForBackend();
  console.table(products);
  console.log('Full JSON:', JSON.stringify(products, null, 2));
}


