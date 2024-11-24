// src/Components/PurchasedProducts/PurchasedProducts.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import axios from 'axios';

const PurchasedProducts = ({ email }) => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/tracking`, {
          params: {
            emailUser: email
          }
        });
        setPurchases(response.data);
      } catch (err) {
        setError('Error fetching purchased products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [email]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" m={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }

  if (purchases.length === 0) {
    return (
      <Alert severity="info" sx={{ m: 2 }}>
        No purchases found
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom color="primary">
        My Purchases
      </Typography>
      <Grid container spacing={3}>
        {purchases.map((purchase) => (
          <Grid item xs={12} sm={6} md={4} key={purchase.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {purchase.productName}
                </Typography>
                <Typography color="text.secondary">
                  Order Code: {purchase.code}
                </Typography>
                <Typography color="text.secondary">
                  Price: R$ {parseFloat(purchase.price).toFixed(2)}
                </Typography>
                <Typography color="text.secondary">
                  Quantity: {purchase.quantity}
                </Typography>
                <Typography color="text.secondary">
                  Status: {purchase.status}
                </Typography>
                <Typography color="text.secondary">
                  Location: {purchase.location}
                </Typography>
                <Typography color="text.secondary">
                  Purchase Date: {new Date(purchase.purchaseDate).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PurchasedProducts;