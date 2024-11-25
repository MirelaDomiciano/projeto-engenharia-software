import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  TextField,
  MenuItem,
  Alert,
  Snackbar,
  CircularProgress 
} from '@mui/material';
import axios from 'axios';

const UpdateStatusComponent = ({ code, emailUser }) => {
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const statusOptions = [
    { value: 0, label: 'Processing' },
    { value: 1, label: 'In Transit' },
    { value: 2, label: 'Delivered' }
  ];

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleUpdateStatus = async () => {
    // Check for empty fields
    if (status === '' || !location.trim()) {
      setSnackbar({
        open: true,
        message: 'Please fill in all fields',
        severity: 'error'
      });
      return;
    }

    setLoading(true);

    // Create object to send in the request
    const requestData = {
      productCode: code,
      status: Number(status),
      location: location.trim(),
      emailUser: emailUser
    };

    console.log('Sending data:', requestData); // Debug log

    try {
      const response = await axios.patch('http://localhost:8081/tracking', requestData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Response:', response); // Debug log

      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: 'Status updated successfully!',
          severity: 'success'
        });
        // Reset fields
        setStatus('');
        setLocation('');
      }
    } catch (error) {
      console.error('Error updating status:', error);

      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Error updating status',
        severity: 'error'
      });

      // Additional error information
      console.log('Error response data:', error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 2,
      mt: 2,
      p: 2,
      borderRadius: 1,
      bgcolor: 'background.paper',
      boxShadow: 1
    }}>
      <Typography variant="h6" color="primary">
        Update Product Status
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Product Code: {code}
      </Typography>
      <TextField
        select
        required
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        fullWidth
        helperText="Select new status"
        error={status === ''}
      >
        {statusOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField 
        required
        label="Location" 
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        fullWidth
        helperText="Enter current location"
        error={!location.trim()}
      />
      <Button 
        variant="contained" 
        color="primary"
        onClick={handleUpdateStatus}
        disabled={loading || status === '' || !location.trim()}
        startIcon={loading ? <CircularProgress size={20} /> : null}
        sx={{ mt: 1 }}
      >
        {loading ? 'Updating...' : 'Update Status'}
      </Button>
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

export default UpdateStatusComponent;