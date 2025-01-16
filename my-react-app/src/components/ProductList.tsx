import React from 'react';
import {
  Grid,
  Container,
  Pagination,
  Box,
  CircularProgress,
} from '@mui/material';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import { EmptyState } from '../common/EmptyState';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { LoadingSpinner } from '../common/LoadingSpinner'
import useProducts from '../hooks/useProducts';

const ProductList: React.FC = () => {
  const {
    products,
    page,
    totalPages,
    isLoading,
    setPage,
    searchProducts,
    addToCart,
  } = useProducts();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          minHeight: 'calc(100vh - 200px)', // Altura mínima para manter footer no fim
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header com SearchBar */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mb: 3,
          }}
        >
          <SearchBar onSearch={searchProducts} />
        </Box>

        {/* Conteúdo Principal */}
        <Box sx={{ flex: 1 }}>
          {isLoading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50vh',
              }}
            >
              <LoadingSpinner />
            </Box>
          ) : products.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50vh',
              }}
            >
              <EmptyState
                message="No products found. Try a different search."
                icon={
                  <SearchOffIcon
                    sx={{ fontSize: 48, color: 'text.secondary' }}
                  />
                }
              />
            </Box>
          ) : (
            <Grid
              container
              spacing={{ xs: 2, sm: 3 }}
              sx={{
                mt: { xs: 2, sm: 3 },
                px: { xs: 2, sm: 0 },
              }}
            >
              {products.map((product) => (
                <Grid
                  item
                  key={product.pid}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  sx={{
                    display: 'flex',
                  }}
                >
                  <ProductCard product={product} onAddToCart={addToCart} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Footer com Paginação */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default ProductList;
