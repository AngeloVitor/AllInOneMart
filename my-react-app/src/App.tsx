import { useEffect, useState } from 'react';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  ThemeProvider,
  createTheme,
  Box,
  Container,
} from '@mui/material';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { CartItemInput } from './types/api';
import { Footer } from './common/Footer';

const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
    body1: {
      fontWeight: 400,
    },
    body2: {
      fontWeight: 400,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  palette: {
    background: {
      default: '#f5f5f7',
    },
    primary: {
      main: '#1976d2',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cartItems: CartItemInput[] = JSON.parse(
        localStorage.getItem('cart') || '[]',
      );
      const totalItems = cartItems.reduce((sum, item) => sum + item.amount, 0);
      setCartItemCount(totalItems);
    };

    // Atualiza contagem inicial
    updateCartCount();

    // Adiciona listener para o evento customizado
    window.addEventListener('cartUpdated', updateCartCount);

    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <AppBar position="fixed">
          <Container maxWidth="lg">
            <Toolbar disableGutters>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              AllInOneMart
              </Typography>
              <IconButton color="inherit" onClick={() => setIsCartOpen(true)}>
                <Badge badgeContent={cartItemCount} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
        <Toolbar />
        <ProductList />
        <Footer />
        <Cart open={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
