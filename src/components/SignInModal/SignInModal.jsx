import { useState } from 'react';
import styles from './SignInModal.module.css';

export default function SignInModal({ onClose, onSignIn }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (isSignUp && !form.name.trim()) e.name = 'Name is required';
    if (!form.email.includes('@')) e.email = 'Enter a valid email';
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    onSignIn({ name: form.name || form.email.split('@')[0], email: form.email });
  };

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>✕</button>
        <div className={styles.tag}>{isSignUp ? 'Create Account' : 'Welcome Back'}</div>
        <h2>{isSignUp ? 'Join ShopEase' : 'Sign In'}</h2>
        <p>{isSignUp ? 'Create your account to start shopping' : 'Sign in to your account'}</p>

        {isSignUp && (
          <div className={styles.formGroup}>
            <label>Full Name</label>
            <input
              placeholder="Jane Smith"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>
        )}

        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            placeholder="jane@example.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          />
          {errors.password && <span className={styles.error}>{errors.password}</span>}
        </div>

        <button className={styles.submitBtn} onClick={handleSubmit}>
          {isSignUp ? 'Create Account' : 'Sign In'} →
        </button>

        <p className={styles.switch}>
          {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          <span onClick={() => { setIsSignUp(!isSignUp); setErrors({}); }}>
            {isSignUp ? 'Sign In' : 'Create one'}
          </span>
        </p>
      </div>
    </div>
  );
}