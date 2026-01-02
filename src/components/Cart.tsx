import type { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  cartItems: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
}

export default function Cart({
  isOpen,
  cartItems,
  onClose,
  onUpdateQuantity,
  onRemoveItem
}: CartProps) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <>
      <div
        className={`overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />
      <div className={`cart-modal ${isOpen ? 'open' : 'closed'}`}>
        <div className="cart-header">
          <h2 className="cart-title">Shopping Cart</h2>
          <button className="close-cart" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                Add some products to get started!
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.product.id} className="cart-item">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.product.name}</div>
                  <div className="cart-item-price">
                    ${item.product.price.toFixed(2)}
                  </div>
                  <div className="cart-item-quantity">
                    <button
                      className="quantity-btn"
                      onClick={() =>
                        onUpdateQuantity(
                          item.product.id,
                          Math.max(0, item.quantity - 1)
                        )
                      }
                    >
                      −
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() =>
                        onUpdateQuantity(item.product.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                    <button
                      className="remove-item"
                      onClick={() => onRemoveItem(item.product.id)}
                      style={{ marginLeft: 'auto' }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span style={{ background: 'var(--gradient-1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                ${total.toFixed(2)}
              </span>
            </div>
            <button className="checkout-btn">Checkout</button>
          </div>
        )}
      </div>
    </>
  );
}

