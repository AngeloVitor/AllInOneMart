import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types/Product';
import { ListProductsOutputBody, CartItemInput } from '../types/api';
import { API_CONFIG, PAGINATION } from '../constants';

const MIN_LOADING_TIME = 800;

export default function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    const startTime = Date.now();

    try {
      const queryParams = new URLSearchParams({
        skip: ((page - 1) * PAGINATION.ITEMS_PER_PAGE).toString(),
        take: PAGINATION.ITEMS_PER_PAGE.toString(),
        ...(searchQuery && { query: searchQuery }),
      });

      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCTS}?${queryParams}`,
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: ListProductsOutputBody = await response.json();

      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < MIN_LOADING_TIME) {
        await new Promise((resolve) =>
          setTimeout(resolve, MIN_LOADING_TIME - elapsedTime),
        );
      }

      setProducts(data.items || []);
      setTotalPages(
        Math.ceil((data.total_items || 0) / PAGINATION.ITEMS_PER_PAGE),
      );
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  }, [page, searchQuery]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, PAGINATION.DEBOUNCE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [fetchProducts]);

  const searchProducts = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const addToCart = (product: Product) => {
    const cartItems: CartItemInput[] = JSON.parse(
      localStorage.getItem('cart') || '[]',
    );
    const existingItem = cartItems.find((item) => item.pid === product.pid);

    if (existingItem) {
      existingItem.amount += 1;
    } else {
      cartItems.push({
        pid: product.pid,
        product_name: product.product_name,
        amount: 1,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return {
    products,
    page,
    totalPages,
    isLoading,
    setPage,
    searchProducts,
    addToCart,
  };
}
