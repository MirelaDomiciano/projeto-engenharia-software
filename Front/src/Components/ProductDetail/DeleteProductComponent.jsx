import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Typography,
  Alert,
  Snackbar,
  CircularProgress,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteProductComponent = ({ product, email }) => {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const navigate = useNavigate();

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleDelete = async () => {
    setLoading(true);
    setOpenDialog(false);

    const requestData = {
      productCode: Number(product.code)
    };

    console.log('Sending delete request with data:', requestData);

    try {
      const response = await axios.delete('http://localhost:8081/products', {
        data: requestData,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Delete response:', response);

      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: 'Product deleted successfully!',
          severity: 'success'
        });

        // Aguarda a mensagem de sucesso antes de navegar
        setTimeout(() => {
          navigate('/home', { 
            state: { 
              email: email,
              type: 3 // Admin type
            } 
          });
        }, 2000);
      }
    } catch (error) {
      console.error('Delete request failed:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        error: error.message
      });

      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to delete product',
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
          Delete Product
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" gutterBottom>
            Product Code: {product.code}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Name: {product.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Price: R$ {parseFloat(product.price).toFixed(2)}
          </Typography>
        </Box>

        <Button 
          variant="contained" 
          color="error"
          onClick={() => setOpenDialog(true)}
          disabled={loading}
          fullWidth
        >
          Delete Product
        </Button>
      </Paper>

      <Dialog
        open={openDialog}
        onClose={() => !loading && setOpenDialog(false)}
      >
        <DialogTitle>
          Confirm Product Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product? This action cannot be undone.
          </DialogContentText>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Product Details:
            </Typography>
            <Typography variant="body2">
              Code: {product.code}
            </Typography>
            <Typography variant="body2">
              Name: {product.name}
            </Typography>
            <Typography variant="body2">
              Price: R$ {parseFloat(product.price).toFixed(2)}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenDialog(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Deleting...' : 'Confirm Delete'}
          </Button>
        </DialogActions>
      </Dialog>

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

export default DeleteProductComponent;