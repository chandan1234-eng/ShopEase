import styles from './FeaturesSection.module.css';

const features = [
  { icon: '🚚', title: 'Free Shipping', desc: 'Free on all orders over $50. Fast 2-5 day delivery worldwide.' },
  { icon: '🔄', title: 'Easy Returns', desc: '30-day hassle-free returns. No questions asked, full refund guaranteed.' },
  { icon: '🔒', title: 'Secure Payment', desc: '256-bit SSL encryption. Your payment info is always safe with us.' },
  { icon: '💬', title: '24/7 Support', desc: 'Our team is here around the clock to help with any questions.' },
];

export default function FeaturesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.tag}>Why ShopEase</div>
        <h2>Shopping Made Simple</h2>
        <p>Everything you need for a seamless shopping experience</p>
      </div>
      <div className={styles.grid}>
        {features.map((f) => (
          <div key={f.title} className={styles.card}>
            <span className={styles.icon}>{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}