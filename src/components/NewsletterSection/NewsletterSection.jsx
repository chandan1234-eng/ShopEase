import { useState } from 'react';
import styles from './NewsletterSection.module.css';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = () => {
    if (email.includes('@')) setDone(true);
  };

  return (
    <section className={styles.section}>
      <div className={styles.tag}>Newsletter</div>
      <h2>Stay in the Loop</h2>
      <p>Get exclusive deals, new arrivals, and style tips delivered straight to your inbox.</p>
      {done ? (
        <p className={styles.success}>🎉 You're subscribed! Check your inbox for a welcome gift.</p>
      ) : (
        <div className={styles.form}>
          <input
            type="email"
            placeholder="Enter your email address…"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className={styles.btn} onClick={handleSubmit}>Subscribe</button>
        </div>
      )}
      <p className={styles.note}>No spam, ever. Unsubscribe anytime.</p>
    </section>
  );
}