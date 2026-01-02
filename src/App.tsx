import { useState, useMemo } from 'react';
import './App.css';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import CategoryFilter from './components/CategoryFilter';
import ProductExporter from './components/ProductExporter';
import { products } from './data/products';
import { categories } from './data/categories';
import type { Product, CartItem } from './types';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const filteredProducts = useMemo(() => {
    if (selectedCategoryId === null) {
      return products;
    }
    return products.filter((product) => product.categoryId === selectedCategoryId);
  }, [selectedCategoryId]);

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
        <ProductExporter />
        <CategoryFilter
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onCategoryChange={setSelectedCategoryId}
        />
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
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
      </section>

      <Cart
        isOpen={isCartOpen}
        cartItems={cartItems}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}

export default App;
