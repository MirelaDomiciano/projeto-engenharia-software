import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  TextField,
  CircularProgress 
} from '@mui/material';
import axios from 'axios';

const UpdateStockComponent = ({ product }) => {
  const [quantity, setQuantity] = useState(0);
  const [currentStock, setCurrentStock] = useState({ quantity: 0 });
  const [loading, setLoading] = useState(true);

  // Fetch current stock information
  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await axios.get('http://localhost:8081/stock/list');
        const stockInfo = response.data.find(
          stock => stock.productCode === product.code
        ) || { quantity: 0 };
        setCurrentStock(stockInfo);
      } catch (error) {
        console.error('Error fetching stock:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStock();
  }, [product.code]);

  const handleUpdateStock = async () => {
    try {
      const response = await axios.put('http://localhost:8081/stock', {
        productCode: product.code,
        quantity: quantity
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        alert('Stock updated successfully!');
        // Update the displayed stock quantity
        setCurrentStock(prev => ({
          ...prev,
          quantity: prev.quantity + quantity
        }));
        setQuantity(0); // Reset the input
      }
    } catch (error) {
      console.error('Error updating stock:', error);
      alert('Error updating stock');
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 2,
      mt: 2 
    }}>
      <Typography variant="h6">
        Update Stock
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        {loading ? (
          <CircularProgress size={20} />
        ) : (
          <Typography variant="body2" color="text.secondary">
            Current stock: {currentStock.quantity} units
          </Typography>
        )}
      </Box>

      <TextField 
        label="Quantity to add to stock" 
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        inputProps={{ min: 0 }}
        fullWidth
      />

      <Button 
        variant="contained" 
        color="primary"
        onClick={handleUpdateStock}
        disabled={quantity <= 0}
      >
        Update Stock
      </Button>
    </Box>
  );
};

export default UpdateStockComponent;