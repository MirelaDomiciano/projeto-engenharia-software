import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Typography,
  Alert,
  Snackbar,
  CircularProgress,
  Paper 
} from '@mui/material';
import axios from 'axios';

const ValidateProductComponent = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleValidate = async () => {
    setLoading(true);
    try {
      const response = await axios.patch('http://localhost:8081/products/validate', {
        productCode: product.code
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: 'Produto validado com sucesso!',
          severity: 'success'
        });
      }
    } catch (error) {
      console.error('Erro ao validar produto:', error);
      setSnackbar({
        open: true,
        message: 'Erro ao validar produto: ' + (error.response?.data?.message || error.message),
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 2,
      mt: 2
    }}>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" color="primary" gutterBottom>
          Validar Produto
        </Typography>

        <Typography variant="body1" gutterBottom>
          Código do Produto: {product.code}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Clique no botão abaixo para validar este produto.
        </Typography>

        <Button 
          variant="contained" 
          color="primary"
          onClick={handleValidate}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
          fullWidth
        >
          {loading ? 'Validando...' : 'Validar Produto'}
        </Button>
      </Paper>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleClose} 
          severity={snackbar.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ValidateProductComponent;