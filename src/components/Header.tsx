import type { CartItem } from '../types';

interface HeaderProps {
  cartItems: CartItem[];
  onCartClick: () => void;
}

export default function Header({ cartItems, onCartClick }: HeaderProps) {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">SHOPPING</div>
        <nav className="nav">
          <a href="#home" className="nav-link">Home</a>
          <a href="#products" className="nav-link">Products</a>
          <a href="#about" className="nav-link">About</a>
          <button className="cart-button" onClick={onCartClick}>
            <svg 
              className="cart-icon" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Cart
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}

