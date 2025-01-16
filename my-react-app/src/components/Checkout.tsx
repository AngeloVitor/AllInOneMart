import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Alert,
  CircularProgress,
  Link,
} from '@mui/material';
import {
  CheckoutInputBody,
  CheckoutOutputBody,
  CartItemInput,
} from '../types/api';

interface CheckoutProps {
  open: boolean;
  onClose: () => void;
  cartItems: CartItemInput[];
}

const Checkout: React.FC<CheckoutProps> = ({ open, onClose, cartItems }) => {
  const [email, setEmail] = useState('prova@forestoken.com.br');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<CheckoutOutputBody | null>(null);

  const handleCheckout = async () => {
    if (!email) {
      setError('Please enter your email');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const checkoutData: CheckoutInputBody = {
        Cart: cartItems,
        EmailContact: email,
      };

      const response = await fetch('http://localhost:8888/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Checkout failed');
      }

      const data: CheckoutOutputBody = await response.json();
      setSuccess(data);
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (success) {
      setEmail('');
      setSuccess(null);
      setError('');
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Checkout</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success ? (
          <Alert severity="success" sx={{ mb: 2 }}>
            <div>Order placed successfully!</div>
            <div>Order number: {success.order_number}</div>
            <div>
              Check your email confirmation at:{' '}
              <Link
                href={success.test_email_app_url}
                target="_blank"
                rel="noopener"
              >
                Email Viewer
              </Link>
            </div>
          </Alert>
        ) : (
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            error={!!error}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isLoading}>
          {success ? 'Close' : 'Cancel'}
        </Button>
        {!success && (
          <Button
            onClick={handleCheckout}
            variant="contained"
            color="primary"
            disabled={isLoading}
            startIcon={isLoading && <CircularProgress size={20} />}
          >
            {isLoading ? 'Processing...' : 'Place Order'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Checkout;
