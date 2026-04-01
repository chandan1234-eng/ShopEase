import { useState, useEffect, useContext } from 'react';
import { useFetchProducts } from '../../hooks/useFetchProducts';
import AppContext from '../../context/AppContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import Stars from '../../components/Stars/Stars';
import TestimonialsSection from '../../components/TestimonialsSection/TestimonialsSection';
import FAQSection from '../../components/FAQSection/FAQSection';
import NewsletterSection from '../../components/NewsletterSection/NewsletterSection';
import styles from './ProductDetailPage.module.css';

function discountPct(orig, curr) {
  return Math.round(((orig - curr) / orig) * 100);
}

export default function ProductDetailPage({ productId, onNavigate }) {
  const { addToCart, addToast } = useContext(AppContext);
  const { data: products, loading: productsLoading } = useFetchProducts();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  // Fix: Convert both IDs to string for reliable matching
  useEffect(() => {
    if (!productsLoading && products.length) {
      const found = products.find((p) => String(p.id) === String(productId));
      setProduct(found || null);
    }
  }, [products, productsLoading, productId]);

  if (productsLoading) return <div className={styles.loader}><div className="spinner" /></div>;
  if (!product) return <div className={styles.error}>Product not found.</div>;

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    addToast(`${qty}× "${product.name.split(' ').slice(0, 3).join(' ')}…" added!`, 'success');
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.detailLayout}>
        <div className={styles.image}>
          <img src={product.image} alt={product.name} />
        </div>
        <div className={styles.info}>
          <div className={styles.breadcrumb}>
            <span onClick={() => onNavigate('home')}>Home</span> ›
            <span onClick={() => onNavigate('products')}>Products</span> ›
            <span>{product.category}</span>
          </div>
          {product.badge && <div className={styles.tag}>{product.badge}</div>}
          <h1>{product.name}</h1>
          <div className={styles.ratingRow}>
            <Stars rating={product.rating} />
            <span>{product.rating} ({product.reviews} reviews)</span>
          </div>
          <div className={styles.priceRow}>
            <span className={styles.price}>${product.price}</span>
            {product.originalPrice > product.price && (
              <>
                <span className={styles.original}>${product.originalPrice}</span>
                <span className={styles.discount}>-{discountPct(product.originalPrice, product.price)}%</span>
              </>
            )}
          </div>
          <p className={styles.description}>{product.description}</p>

          <div className={styles.quantity}>
            <label>Quantity</label>
            <div className={styles.qtySelector}>
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
          </div>

          <div className={styles.actions}>
            <button
              className={`btn btn-primary btn-lg ${added ? styles.added : ''}`}
              onClick={handleAddToCart}
            >
              {added ? '✓ Added to Cart!' : 'Add to Cart'}
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => onNavigate('cart')}>
              View Cart 🛒
            </button>
          </div>

          <div className={styles.features}>
            <div>🚚 <strong>Free Shipping</strong><br />Orders over $50</div>
            <div>🔄 <strong>Free Returns</strong><br />30-day policy</div>
            <div>✅ <strong>In Stock</strong><br />Ships within 24h</div>
            <div>🔒 <strong>Secure Pay</strong><br />SSL encrypted</div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className={styles.related}>
          <div className={styles.sectionHeader}>
            <div className={styles.tag}>You May Also Like</div>
            <h2>Related Products</h2>
          </div>
          <div className={styles.productGrid}>
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
            ))}
          </div>
        </section>
      )}

      <TestimonialsSection />
      <FAQSection />
      <NewsletterSection />
    </div>
  );
}