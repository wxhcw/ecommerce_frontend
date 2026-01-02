import { useState, useMemo, useEffect } from 'react';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductCardSkeleton from './components/ProductCardSkeleton';
import Cart from './components/Cart';
import CategoryFilter from './components/CategoryFilter';
import { api } from './utils/api';
import type { Product, CartItem, Category } from './types';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  // 写死只显示 Electronics 和 Accessories 两个分类
  const [categories] = useState<Category[]>([
    { id: 7, name: 'Electronics' },
    { id: 8, name: 'Accessories' },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 获取产品数据（根据选中的分类）
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProducts = await api.getProducts(selectedCategoryId || undefined);
        setProducts(fetchedProducts);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategoryId]);

  const filteredProducts = useMemo(() => {
    return products;
  }, [products]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  return (
    <AuthProvider>
      <div className="app">
        <Header cartItems={cartItems} onCartClick={() => setIsCartOpen(true)} />
        
        <section id="home" className="hero">
          <div className="hero-content">
            <h1 className="animate-fadeIn">Welcome to the Future of Shopping</h1>
            <p className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              Discover premium products with cutting-edge design and exceptional quality
            </p>
          </div>
        </section>

        <section id="products" className="products-section">
          <h2 className="section-title">Featured Products</h2>
          <CategoryFilter
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onCategoryChange={setSelectedCategoryId}
          />
          {error ? (
            <div className="no-products">
              <p style={{ color: '#fca5a5' }}>{error}</p>
            </div>
          ) : (
            <div className="products-grid">
              {loading ? (
                // 显示骨架屏
                Array.from({ length: 6 }).map((_, index) => (
                  <ProductCardSkeleton key={`skeleton-${index}`} />
                ))
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProductCard
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  </div>
                ))
              ) : (
                <div className="no-products">
                  <p>No products found in this category.</p>
                </div>
              )}
            </div>
          )}
        </section>

        <Cart
          isOpen={isCartOpen}
          cartItems={cartItems}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
        />
      </div>
    </AuthProvider>
  );
}

export default App;
