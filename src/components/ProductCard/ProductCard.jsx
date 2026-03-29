import { useState, useContext } from 'react';
import AppContext from '../../context/AppContext';
import Stars from '../Stars/Stars';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, onNavigate }) {
  const { addToCart, addToast } = useContext(AppContext);
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
    addToast(`"${product.name.split(' ').slice(0, 3).join(' ')}…" added to cart`, 'success');
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className={styles.card} onClick={() => onNavigate('product-detail', { productId: product.id })}>
      <div className={styles.imageWrapper}>
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.badge && <span className={styles.badge}>{product.badge}</span>}
        <button className={styles.wishlist} onClick={(e) => e.stopPropagation()}>♡</button>
      </div>
      <div className={styles.info}>
        <div className={styles.category}>{product.category}</div>
        <div className={styles.name}>{product.name}</div>
        <div className={styles.rating}>
          <Stars rating={product.rating} />
          <span className={styles.reviewCount}>({product.reviews})</span>
        </div>
        <div className={styles.priceRow}>
          <div>
            <span className={styles.price}>${product.price}</span>
            {product.originalPrice > product.price && (
              <span className={styles.original}>${product.originalPrice}</span>
            )}
          </div>
          <button className={`${styles.addBtn} ${added ? styles.added : ''}`} onClick={handleAdd}>
            {added ? '✓ Added' : '+ Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}