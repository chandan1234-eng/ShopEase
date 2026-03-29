import { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import FeaturesSection from '../../components/FeaturesSection/FeaturesSection';
import styles from './CartPage.module.css';

export default function CartPage({ onNavigate }) {
  const { cart, removeFromCart, updateQty, clearCart, addToast } = useContext(AppContext);
  const [checkoutDone, setCheckoutDone] = useState(false);

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal >= 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    clearCart();
    setCheckoutDone(true);
    addToast('Order placed successfully! 🎉', 'success');
  };

  if (checkoutDone) {
    return (
      <div className={styles.orderConfirmed}>
        <div className={styles.confetti}>🎉</div>
        <h1>Order Confirmed!</h1>
        <p>Thank you for your purchase! You'll receive a confirmation email with tracking information shortly.</p>
        <button className="btn btn-primary btn-lg" onClick={() => onNavigate('home')}>
          Continue Shopping →
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <div className={styles.emptyIcon}>🛒</div>
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <button className="btn btn-primary btn-lg" onClick={() => onNavigate('products')}>
          Start Shopping →
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <div className={styles.breadcrumb}>
          <span onClick={() => onNavigate('home')}>Home</span> ›
          <span>Cart</span>
        </div>
        <h1>Shopping Cart</h1>
        <p>{cart.reduce((s, i) => s + i.qty, 0)} items</p>
      </div>

      <div className={styles.cartLayout}>
        <div className={styles.itemsSection}>
          <div className={styles.itemsHeader}>
            <h3>Items ({cart.length})</h3>
            <button className={styles.clearAll} onClick={clearCart}>🗑 Clear All</button>
          </div>
          <div className={styles.cartItems}>
            {cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemImage} onClick={() => onNavigate('product-detail', { productId: item.id })}>
                  <img src={item.image} alt={item.name} />
                </div>
                <div className={styles.itemDetails}>
                  <div className={styles.itemCategory}>{item.category}</div>
                  <div className={styles.itemName} onClick={() => onNavigate('product-detail', { productId: item.id })}>
                    {item.name}
                  </div>
                  <div className={styles.itemPrice}>${(item.price * item.qty).toFixed(2)}</div>
                  <div className={styles.itemActions}>
                    <div className={styles.qtySelector}>
                      <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                    </div>
                    <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>
                      🗑 Remove
                    </button>
                  </div>
                </div>
                <div className={styles.itemTotal}>
                  <div>${(item.price * item.qty).toFixed(2)}</div>
                  <div className={styles.eachPrice}>${item.price} each</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.summary}>
          <h3>Order Summary</h3>
          <div className={styles.summaryRow}>
            <span>Subtotal ({cart.reduce((s, i) => s + i.qty, 0)} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span className={shipping === 0 ? styles.free : ''}>
              {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
            </span>
          </div>
          <div className={styles.summaryRow}>
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.totalRow}`}>
            <span className={styles.totalLabel}>Total</span>
            <span className={styles.totalAmount}>${total.toFixed(2)}</span>
          </div>
          {shipping > 0 && (
            <p className={styles.shippingNote}>
              Add ${(50 - subtotal).toFixed(2)} more for FREE shipping!
            </p>
          )}
          <button className={styles.checkoutBtn} onClick={handleCheckout}>
            Checkout — ${total.toFixed(2)} →
          </button>
          <button className={styles.continueBtn} onClick={() => onNavigate('products')}>
            ← Continue Shopping
          </button>
          <div className={styles.paymentBadges}>
            <span>🔒 Secure</span>
            <span>↩ Free Returns</span>
            <span>✓ SSL</span>
          </div>
        </div>
      </div>

      <FeaturesSection />
    </div>
  );
}