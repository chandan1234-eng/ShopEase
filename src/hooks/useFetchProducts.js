import { useState, useEffect } from 'react';
import { fetchProducts, delay } from '../services/api';
import { MOCK_PRODUCTS } from '../services/mockData';

export function useFetchProducts(useDelay = true) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      let products = await fetchProducts();
      if (useDelay) await delay(600);
      setData(products);
    } catch (err) {
      console.error('useFetchProducts error:', err);
      setError('Failed to load products. Please try again later.');
      setData(MOCK_PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, loading, error, refetch };
}

export default useFetchProducts;