import { useState } from 'react';
import FeaturesSection from '../../components/FeaturesSection/FeaturesSection';
import FAQSection from '../../components/FAQSection/FAQSection';
import NewsletterSection from '../../components/NewsletterSection/NewsletterSection';
import styles from './ContactPage.module.css';

const contactInfo = [
  { icon: '📧', title: 'Email Us', info: 'hello@shopease.com', sub: 'We reply within 24 hours' },
  { icon: '📞', title: 'Call Us', info: '+1 (555) 123-4567', sub: 'Mon–Fri, 9am–6pm EST' },
  { icon: '📍', title: 'Visit Us', info: '123 Commerce St, NYC', sub: 'New York, NY 10001' },
];

export default function ContactPage({ onNavigate }) {
  const [form, setForm] = useState({ first: '', last: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.first) e.first = 'Required';
    if (!form.email.includes('@')) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Please enter a message';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setSent(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <div className={styles.breadcrumb}>
          <span onClick={() => onNavigate('home')}>Home</span> ›
          <span>Contact</span>
        </div>
        <h1>Get in Touch</h1>
        <p>We'd love to hear from you. Send us a message and we'll respond within 24 hours.</p>
      </div>

      <div className={styles.contactLayout}>
        <div>
          <div className={styles.tag}>Contact Info</div>
          <h2>We're Here to Help</h2>
          <p className={styles.contactDesc}>
            Have a question about your order, a product, or just want to say hello? Our team is always happy to help.
          </p>
          {contactInfo.map((c) => (
            <div key={c.title} className={styles.infoItem}>
              <div className={styles.infoIcon}>{c.icon}</div>
              <div>
                <strong>{c.title}</strong>
                <p>{c.info}</p>
                <p className={styles.infoSub}>{c.sub}</p>
              </div>
            </div>
          ))}
          <div className={styles.trackBox}>
            <h3>📦 Track Your Order</h3>
            <p>Already placed an order? Check your email for a tracking link, or sign into your account.</p>
          </div>
        </div>

        <div className={styles.formCard}>
          {sent && (
            <div className={styles.successMsg}>
              ✓ Message sent! We'll get back to you within 24 hours.
            </div>
          )}
          <h3>Send a Message</h3>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>First Name *</label>
              <input
                placeholder="Jane"
                value={form.first}
                onChange={(e) => setForm((f) => ({ ...f, first: e.target.value }))}
              />
              {errors.first && <span className={styles.error}>{errors.first}</span>}
            </div>
            <div className={styles.formGroup}>
              <label>Last Name</label>
              <input
                placeholder="Smith"
                value={form.last}
                onChange={(e) => setForm((f) => ({ ...f, last: e.target.value }))}
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>Email *</label>
            <input
              type="email"
              placeholder="jane@example.com"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>
          <div className={styles.formGroup}>
            <label>Subject</label>
            <select
              value={form.subject}
              onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
            >
              <option value="">Select a topic…</option>
              <option>Order Inquiry</option>
              <option>Product Question</option>
              <option>Returns & Refunds</option>
              <option>Shipping Issue</option>
              <option>Other</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Message *</label>
            <textarea
              rows="4"
              placeholder="How can we help you?"
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            />
            {errors.message && <span className={styles.error}>{errors.message}</span>}
          </div>
          <button className={styles.submitBtn} onClick={handleSubmit}>
            Send Message →
          </button>
        </div>
      </div>

      <FeaturesSection />
      <FAQSection />
      <NewsletterSection />
    </div>
  );
}