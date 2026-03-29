import { useState, useEffect, useRef, useContext } from 'react';
import AppContext from '../../context/AppContext';
import SignInModal from '../SignInModal/SignInModal';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'Home', page: 'home' },
  { label: 'Products', page: 'products' },
  { label: 'About', page: 'about' },
  { label: 'Contact', page: 'contact' },
];

export default function Navbar({ currentPage, onNavigate }) {
  const { cart, user, setUser, showSignIn, setShowSignIn } = useContext(AppContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState('');
  const profileRef = useRef(null);

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      onNavigate('products', { search: search.trim() });
      setSearch(''); // clear input after navigation
    }
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo} onClick={() => onNavigate('home')}>
          Shop<span>Ease</span>
        </div>

        <div className={styles.desktopLinks}>
          {navLinks.map((link) => (
            <button
              key={link.page}
              className={currentPage === link.page ? styles.active : ''}
              onClick={() => onNavigate(link.page)}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className={styles.actions}>
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              className={styles.searchInput}
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>

          <div className={styles.cartBtn}>
            <button className={styles.iconBtn} onClick={() => onNavigate('cart')}>
              🛒
              {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
            </button>
          </div>

          {user ? (
            <div className={styles.profileDropdown} ref={profileRef}>
              <button className={styles.avatar} onClick={() => setProfileOpen(!profileOpen)}>
                {user.name.charAt(0).toUpperCase()}
              </button>
              {profileOpen && (
                <div className={styles.dropdownMenu}>
                  <div className={styles.userInfo}>
                    Signed in as<br /><strong>{user.name}</strong>
                  </div>
                  <div className={styles.divider} />
                  <button onClick={() => { onNavigate('cart'); setProfileOpen(false); }}>
                    🛒 My Cart ({cartCount})
                  </button>
                  <button onClick={() => { onNavigate('products'); setProfileOpen(false); }}>
                    🛍️ Browse Products
                  </button>
                  <div className={styles.divider} />
                  <button onClick={() => { setUser(null); setProfileOpen(false); }}>
                    ← Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className={styles.signInBtn} onClick={() => setShowSignIn(true)}>
              Sign In
            </button>
          )}

          <button className={styles.hamburger} onClick={() => setMobileOpen(!mobileOpen)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ''}`}>
        {navLinks.map((link) => (
          <button key={link.page} onClick={() => { onNavigate(link.page); setMobileOpen(false); }}>
            {link.label}
          </button>
        ))}
        <button onClick={() => { onNavigate('cart'); setMobileOpen(false); }}>🛒 Cart ({cartCount})</button>
        {!user && <button onClick={() => { setShowSignIn(true); setMobileOpen(false); }}>Sign In</button>}
      </div>

      {showSignIn && (
        <SignInModal onClose={() => setShowSignIn(false)} onSignIn={(u) => { setUser(u); setShowSignIn(false); }} />
      )}
    </>
  );
}