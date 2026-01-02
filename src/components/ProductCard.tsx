import { useState } from 'react';
import type { Product } from '../types';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

// 占位符图片（使用 data URI 创建一个简单的占位图）
const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect width="300" height="300" fill="%231e293b"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%2364748b" font-family="Arial" font-size="16"%3EImage%3C/text%3E%3C/svg%3E';

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageError(true);
    setImageLoading(false);
    const target = e.target as HTMLImageElement;
    target.src = PLACEHOLDER_IMAGE;
  };

  return (
    <div className="product-card animate-fadeIn">
      <div className="product-image-container">
        {imageLoading && (
          <div className="image-skeleton"></div>
        )}
        <img
          src={imageError ? PLACEHOLDER_IMAGE : product.image}
          alt={product.name}
          className={`product-image ${imageLoading ? 'loading' : 'loaded'}`}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button
            className="add-to-cart-btn"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

