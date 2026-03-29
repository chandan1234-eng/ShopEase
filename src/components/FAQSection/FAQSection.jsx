import { useState } from 'react';
import { FAQS } from '../../services/mockData';
import styles from './FAQSection.module.css';

export default function FAQSection() {
  const [open, setOpen] = useState(null);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.tag}>FAQ</div>
        <h2>Frequently Asked Questions</h2>
        <p>Got questions? We've got answers.</p>
      </div>
      <div className={styles.list}>
        {FAQS.map((item, idx) => (
          <div key={idx} className={styles.item}>
            <button className={styles.question} onClick={() => setOpen(open === idx ? null : idx)}>
              {item.q}
              <span className={`${styles.icon} ${open === idx ? styles.open : ''}`}>+</span>
            </button>
            {open === idx && <div className={styles.answer}>{item.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}