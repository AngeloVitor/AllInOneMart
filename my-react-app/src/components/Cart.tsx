import React, { useState, useEffect } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Button,
  Divider,
  ButtonGroup,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CartItemInput } from '../types/api';
import Checkout from './Checkout';
import { EmptyState } from '../common/EmptyState';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

interface CartProps {
  open: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ open, onClose }) => {
  const [items, setItems] = useState<CartItemInput[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    setItems(cartItems);
  }, [open]);

  const updateItemQuantity = (pid: string, change: number) => {
    const newItems = items.map((item) => {
      if (item.pid === pid) {
        const newAmount = item.amount + change;
        if (newAmount <= 0) return null; // Retorna null para itens que serão removidos
        return { ...item, amount: newAmount };
      }
      return item;
    });

    // Filtra os itens nulos (removidos)
    const filteredItems = newItems.filter(
      (item): item is CartItemInput => item !== null,
    );

    localStorage.setItem('cart', JSON.stringify(filteredItems));
    setItems(filteredItems);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (pid: string) => {
    const newItems = items.filter((item) => item.pid !== pid);
    localStorage.setItem('cart', JSON.stringify(newItems));
    setItems(newItems);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const total = items.reduce((sum, item) => sum + (item.amount || 0), 0);

  return (
    <>
      <Drawer anchor="right" open={open} onClose={onClose}>
        <Box
          sx={{
            width: 350,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="h6">Shopping Cart</Typography>
          </Box>

          {/* Content */}
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: items.length === 0 ? 'center' : 'flex-start',
              p: 2,
            }}
          >
            {items.length === 0 ? (
              <EmptyState
                message="Your cart is empty"
                icon={
                  <ShoppingCartOutlinedIcon
                    sx={{ fontSize: 48, color: 'text.secondary' }}
                  />
                }
              />
            ) : (
              <List>
                {items.map((item) => (
                  <ListItem
                    key={item.pid}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'stretch',
                      gap: 1,
                      py: 2,
                    }}
                  >
                    <Box sx={{ width: '100%' }}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          lineHeight: 1.2,
                          mb: 0.5,
                        }}
                      >
                        {item.product_name}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                      }}
                    >
                      <ButtonGroup size="small" variant="outlined">
                        <IconButton
                          onClick={() => updateItemQuantity(item.pid, -1)}
                          size="small"
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Box
                          sx={{
                            px: 2,
                            minWidth: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: 1,
                            borderColor: 'divider',
                          }}
                        >
                          {item.amount}
                        </Box>
                        <IconButton
                          onClick={() => updateItemQuantity(item.pid, 1)}
                          size="small"
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </ButtonGroup>
                      <IconButton
                        onClick={() => removeItem(item.pid)}
                        size="small"
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    <Divider sx={{ mt: 2 }} />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>

          {/* Footer */}
          {items.length > 0 && (
            <Paper
              elevation={4}
              sx={{
                p: 2,
                borderTop: 1,
                borderColor: 'divider',
                backgroundColor: 'background.paper',
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Order Summary
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography>Total Items:</Typography>
                  <Typography fontWeight="bold">{total}</Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={() => setIsCheckoutOpen(true)}
              >
                Proceed to Checkout
              </Button>
            </Paper>
          )}
        </Box>
      </Drawer>
      <Checkout
        open={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          onClose();
        }}
        cartItems={items}
      />
    </>
  );
};

export default Cart;
