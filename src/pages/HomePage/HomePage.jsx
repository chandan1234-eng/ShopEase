import useFetchProducts from '../../hooks/useFetchProducts';
import ProductCard from '../../components/ProductCard/ProductCard';
import FeaturesSection from '../../components/FeaturesSection/FeaturesSection';
import TestimonialsSection from '../../components/TestimonialsSection/TestimonialsSection';
import FAQSection from '../../components/FAQSection/FAQSection';
import NewsletterSection from '../../components/NewsletterSection/NewsletterSection';
import styles from './HomePage.module.css';

const categoryCards = [
  { label: 'Electronics', icon: '💻', count: '5 products' },
  { label: 'Accessories', icon: '👜', count: '4 products' },
  { label: 'Home & Living', icon: '🏠', count: '4 products' },
  { label: 'Sale Items', icon: '🏷️', count: 'Special deals' },
];

export default function HomePage({ onNavigate }) {
  const { data: products, loading } = useFetchProducts();

  // Safe handling of products
  const bestSellers = (products || [])
    .filter((p) => p?.badge)
    .slice(0, 4);

  return (
    <div className={styles.container}>
      
           {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroEyebrow}>
            <span className={styles.heroBadge}>New Season 2024</span>
            <span>✦ Free shipping on orders $50+</span>
          </div>
          <h1 className={styles.heroTitle}>
            Shop <em>Smarter</em>,<br />Live Better
          </h1>
          <p className={styles.heroDesc}>
            Discover our curated collection of premium essentials — from cutting‑edge electronics to timeless accessories and cozy home goods.
          </p>
          <div className={styles.heroActions}>
            <button className="btn btn-primary btn-lg" onClick={() => onNavigate('products')}>
              Shop Now →
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => onNavigate('about')}>
              Our Story
            </button>
          </div>
          <div className={styles.heroStats}>
            <div><div className={styles.statNum}>12,000+</div><div>Happy Customers</div></div>
            <div><div className={styles.statNum}>500+</div><div>Products</div></div>
            <div><div className={styles.statNum}>4.9★</div><div>Average Rating</div></div>
          </div>
        </div>
        <div className={styles.heroImages}>
          <div className={styles.imgTall}>
            <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=600&fit=crop" alt="Watch" />
          </div>
          <div className={styles.imgStack}>
            <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=280&fit=crop" alt="Headphones" />
            <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=220&fit=crop" alt="Coffee" />
          </div>
        </div>
      </section>


      {/* CATEGORY SECTION */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Find Your Style</h2>
        </div>

        <div className={styles.categoryGrid}>
          {categoryCards.map((c) => (
            <div
              key={c.label}
              className={styles.categoryCard}
              onClick={() => onNavigate('products')}
            >
              <span>{c.icon}</span>
              <h3>{c.label}</h3>
              <p>{c.count}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <FeaturesSection />

      {/* BEST SELLERS */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Best Sellers</h2>
        </div>

        {loading ? (
          <div className={styles.loadingGrid}>
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={`skeleton-${idx}`} className="skeleton skeleton-card" />
            ))}
          </div>
        ) : (
          <div className={styles.productGrid}>
            {bestSellers.map((product, index) => (
              <ProductCard
                key={product.id || `product-${index}`}
                product={product}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        )}
      </section>

      {/* OTHER SECTIONS */}
      <TestimonialsSection />
      <NewsletterSection />
      <FAQSection />

    </div>
  );
}