import { useState, useEffect, useMemo } from 'react';
import useFetchProducts from '../../hooks/useFetchProducts';
import ProductCard from '../../components/ProductCard/ProductCard';
import FeaturesSection from '../../components/FeaturesSection/FeaturesSection';
import FAQSection from '../../components/FAQSection/FAQSection';
import NewsletterSection from '../../components/NewsletterSection/NewsletterSection';
import styles from './ProductsPage.module.css';

const CATEGORIES = ['All', 'Electronics', 'Accessories', 'Home'];

export default function ProductsPage({ onNavigate, params }) {
  const { data: allProducts = [], loading, error } = useFetchProducts();

  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('default');
  const [searchTerm, setSearchTerm] = useState(params?.search || '');

  // Sync search from navbar
  useEffect(() => {
    if (params?.search !== undefined) {
      setSearchTerm(params.search);
    }
  }, [params?.search]);

  // Optimized filtering + sorting
  const filtered = useMemo(() => {
    let result = [...allProducts];

    // Category filter
    if (category !== 'All') {
      result = result.filter((p) => p.category === category);
    }

    // Search filter
    if (searchTerm) {
      result = result.filter((p) =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sorting
    if (sort === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [allProducts, category, searchTerm, sort]);

  const clearFilters = () => {
    setCategory('All');
    setSearchTerm('');
    setSort('default');
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.breadcrumb}>
          <span onClick={() => onNavigate('home')}>Home</span> ›
          <span>Products</span>
        </div>
        <h1>All Products</h1>
        <p>{filtered.length} products available</p>
      </div>

      {/* Filters */}
      <div className={styles.filtersBar}>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`${styles.filterBtn} ${category === c ? styles.active : ''}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}

        <div className={styles.rightFilters}>
          <input
            className={styles.searchInput}
            placeholder="🔍 Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className={styles.sortSelect}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Products Section */}
      <section className={styles.productsSection}>
        {/* Loading */}
        {loading && (
          <div className={styles.loadingGrid}>
            {[...Array(8)].map((_, i) => (
              <div key={i} className="skeleton skeleton-card" />
            ))}
          </div>
        )}

        {/* Error */}
        {error && <div className={styles.errorBanner}>⚠️ {error}</div>}

        {/* Empty State */}
        {!loading && !error && filtered.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔍</div>
            <h3>No products found</h3>
            <p>Try adjusting your filters or search term</p>
            <button className="btn btn-primary" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className={styles.productGrid}>
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        )}
      </section>

      {/* Sections */}
      <FeaturesSection />
      <NewsletterSection />
      <FAQSection />
    </div>
  );
}