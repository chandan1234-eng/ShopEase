import { useState, useEffect, useContext } from 'react';
import AppContext, { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ToastContainer from './components/ToastContainer/ToastContainer';
import HomePage from './pages/HomePage/HomePage';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import CartPage from './pages/CartPage/CartPage';
import AboutPage from './pages/AboutPage/AboutPage';
import ContactPage from './pages/ContactPage/ContactPage';

// Main app component that uses context and handles routing/navigation
function ShopEaseApp() {
  const { toasts } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState('home');
  const [pageParams, setPageParams] = useState({});

  // Navigation helper
  const navigate = (page, params = {}) => {
    setCurrentPage(page);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render the correct page based on currentPage
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigate} />;
      case 'products':
        return <ProductsPage onNavigate={navigate} params={pageParams} />;
      case 'product-detail':
        return <ProductDetailPage productId={pageParams.productId} onNavigate={navigate} />;
      case 'cart':
        return <CartPage onNavigate={navigate} />;
      case 'about':
        return <AboutPage onNavigate={navigate} />;
      case 'contact':
        return <ContactPage onNavigate={navigate} />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div>
      <Navbar currentPage={currentPage} onNavigate={navigate} />
      <main>{renderPage()}</main>
      <Footer onNavigate={navigate} />
      <ToastContainer toasts={toasts} />
    </div>
  );
}

// Root App component wrapped with provider
function App() {
  return (
    <AppProvider>
      <ShopEaseApp />
    </AppProvider>
  );
}

export default App;