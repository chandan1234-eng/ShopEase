import { useState } from 'react';
import styles from './Footer.module.css';

export default function Footer({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.includes('@')) setSubscribed(true);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.brand}>
          <div className={styles.logo}>Shop<span>Ease</span></div>
          <p>Curated essentials for modern living. Quality products, effortless shopping.</p>
          <div className={styles.socials}>
            {['𝕏', '📘', '📸', '▶'].map((icon, i) => (
              <button key={i} className={styles.socialBtn}>{icon}</button>
            ))}
          </div>
        </div>

        <div className={styles.col}>
          <h4>Shop</h4>
          {['All Products', 'Electronics', 'Accessories', 'Home & Living', 'New Arrivals', 'Sale'].map((l) => (
            <a key={l} href="#" onClick={(e) => { e.preventDefault(); onNavigate('products'); }}>{l}</a>
          ))}
        </div>

        <div className={styles.col}>
          <h4>Company</h4>
          {[['About Us', 'about'], ['Contact', 'contact'], ['Careers', 'about'], ['Press', 'about']].map(([l, p]) => (
            <a key={l} href="#" onClick={(e) => { e.preventDefault(); onNavigate(p); }}>{l}</a>
          ))}
        </div>

        <div className={styles.col}>
          <h4>Support</h4>
          {['FAQ', 'Shipping Info', 'Returns & Refunds', 'Track Order', 'Size Guide'].map((l) => (
            <a key={l} href="#" onClick={(e) => e.preventDefault()}>{l}</a>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2024 ShopEase. All rights reserved.</p>
        <div className={styles.cards}>
          {['VISA', 'MC', 'PayPal', 'GPay'].map((c) => (
            <span key={c} className={styles.card}>{c}</span>
          ))}
        </div>
        <p>Made with ♥ for demo purposes</p>
      </div>
    </footer>
  );
}