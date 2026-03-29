import TestimonialsSection from '../../components/TestimonialsSection/TestimonialsSection';
import NewsletterSection from '../../components/NewsletterSection/NewsletterSection';
import FAQSection from '../../components/FAQSection/FAQSection';
import styles from './AboutPage.module.css';

const team = [
  { name: 'Emma Clarke', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
  { name: 'David Park', role: 'Head of Product', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
  { name: 'Priya Sharma', role: 'Lead Designer', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop' },
];

export default function AboutPage({ onNavigate }) {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <div>
            <div className={styles.tag}>Our Story</div>
            <h1>We Make Shopping a Delight</h1>
            <p>
              ShopEase was born from a simple belief: shopping for quality products shouldn't be complicated.
              We started in 2020 with a small team and a big dream — to build the most enjoyable online shopping experience.
            </p>
            <p>
              Today, we serve thousands of happy customers with a curated selection of electronics, accessories, and home goods — all chosen for quality, value, and style.
            </p>
            <button className="btn btn-primary" onClick={() => onNavigate('products')}>
              Shop Our Collection →
            </button>
          </div>
          <div className={styles.heroImage}>
            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=500&fit=crop" alt="About Us" />
          </div>
        </div>
      </div>

      <section className={styles.values}>
        <div className={styles.sectionHeader}>
          <div className={styles.tag}>What We Stand For</div>
          <h2>Our Values</h2>
          <p>The principles that guide everything we do</p>
        </div>
        <div className={styles.valuesGrid}>
          {[
            ['🌱', 'Sustainability', 'We partner with eco-conscious brands and use minimal, recyclable packaging.'],
            ['⭐', 'Quality First', 'Every product is hand-selected and tested before it appears in our store.'],
            ['❤️', 'Customer Love', 'Your satisfaction is our top priority. We stand behind every purchase.'],
          ].map(([icon, title, desc]) => (
            <div key={title} className={styles.valueCard}>
              <div className={styles.valueIcon}>{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.stats}>
        <div className={styles.sectionHeader}>
          <div className={styles.tag}>By the Numbers</div>
          <h2>ShopEase at a Glance</h2>
        </div>
        <div className={styles.statsGrid}>
          {[
            ['12,000+', 'Happy Customers'],
            ['500+', 'Products'],
            ['40+', 'Countries Shipped'],
            ['4.9/5', 'Average Rating'],
          ].map(([num, label]) => (
            <div key={label} className={styles.statCard}>
              <div className={styles.statNumber}>{num}</div>
              <p>{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.team}>
        <div className={styles.sectionHeader}>
          <div className={styles.tag}>The Team</div>
          <h2>Meet the People Behind ShopEase</h2>
          <p>A small but mighty team passionate about great products and better shopping</p>
        </div>
        <div className={styles.teamGrid}>
          {team.map((m) => (
            <div key={m.name} className={styles.teamCard}>
              <div className={styles.teamImg}>
                <img src={m.img} alt={m.name} />
              </div>
              <div className={styles.teamInfo}>
                <div className={styles.teamName}>{m.name}</div>
                <div className={styles.teamRole}>{m.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <TestimonialsSection />
      <NewsletterSection />
      <FAQSection />
    </div>
  );
}