import { TESTIMONIALS } from '../../services/mockData';
import Stars from '../Stars/Stars';
import styles from './TestimonialsSection.module.css';

export default function TestimonialsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.tag}>Customer Love</div>
        <h2>What Our Shoppers Say</h2>
        <p>Real reviews from real customers who love ShopEase</p>
      </div>
      <div className={styles.grid}>
        {TESTIMONIALS.map((t) => (
          <div key={t.id} className={styles.card}>
            <div className={styles.stars}>
              <Stars rating={t.rating} />
            </div>
            <p className={styles.text}>"{t.text}"</p>
            <div className={styles.author}>
              <div className={styles.avatar}>{t.avatar}</div>
              <div>
                <div className={styles.name}>{t.name}</div>
                <div className={styles.verified}>Verified Buyer</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
    
  );
}