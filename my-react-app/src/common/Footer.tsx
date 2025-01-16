import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        py: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              AllInOneMart
            </Typography>
            <Typography variant="body2">
              Your ultimate destination for diverse essentials. Simplifying your
              shopping experience with everything you need in one place.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2">
              Email: contact@allinonemart.com
            </Typography>
            <Typography variant="body2">Phone: (11) 1234-5678</Typography>
            <Typography variant="body2">São Paulo, Brazil</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Link href="#" color="inherit" sx={{ mr: 2 }}>
              Instagram
            </Link>
            <Link href="#" color="inherit" sx={{ mr: 2 }}>
              Twitter
            </Link>
            <Link href="#" color="inherit">
              LinkedIn
            </Link>
          </Grid>
        </Grid>
        <Typography variant="body2" align="center" sx={{ mt: 4, opacity: 0.7 }}>
          © {new Date().getFullYear()} AllInOneMart. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};
