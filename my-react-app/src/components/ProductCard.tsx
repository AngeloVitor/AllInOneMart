import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  Box,
  Rating,
} from '@mui/material';
import { Product } from '../types/Product';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CheckIcon from '@mui/icons-material/Check';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => theme.shadows[4],
        },
        bgcolor: 'background.paper',
        borderRadius: 2,
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.images[0]}
        alt={product.product_name}
        sx={{
          objectFit: 'contain',
          p: 2,
          backgroundColor: 'background.paper',
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: 1.2,
            height: '2.4em',
          }}
        >
          {product.product_name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            mb: 1,
          }}
        >
          {product.description}
        </Typography>
        <Box sx={{ mt: 'auto' }}>
          <Typography variant="subtitle1" color="primary" component="div">
            ${product.discounted_price.toFixed(2)}
            {product.discounted_price < product.retail_price && (
              <Typography
                component="span"
                sx={{
                  textDecoration: 'line-through',
                  color: 'text.secondary',
                  ml: 1,
                }}
              >
                ${product.retail_price.toFixed(2)}
              </Typography>
            )}
          </Typography>
          <Typography
            variant="caption"
            display="block"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {product.brand} • {product.product_category_tree[0]}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Rating value={product.overall_rating} readOnly size="small" />
            <Typography variant="caption" sx={{ ml: 1 }}>
              ({product.product_rating})
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant={addedToCart ? 'contained' : 'contained'}
          startIcon={addedToCart ? <CheckIcon /> : <AddShoppingCartIcon />}
          onClick={handleAddToCart}
          fullWidth
          aria-label={`Add ${product.product_name} to cart`}
        >
          {addedToCart ? 'Added!' : 'Add to Cart'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
