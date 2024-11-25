// src/pages/TrackingDetailsPage/TrackingDetailsPage.jsx
import React from 'react';
import { 
  Typography,
  Box,
  Paper,
  Grid,
  Chip,
  Divider,
  Button
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import UpdateStatusComponent from '../../Components/ProductDetail/UpdateStatusComponent';

const TrackingView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tracking = location.state?.tracking;

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');

      return `${day}/${month}/${year} ${hours}:${minutes}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 0: return 'Processing';
      case 1: return 'In Transit';
      case 2: return 'Delivered';
      default: return 'Unknown';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 0: return 'warning';
      case 1: return 'info';
      case 2: return 'success';
      default: return 'default';
    }
  };

  const handleBack = () => {
    navigate("/home", { 
      state: { 
        email: tracking.emailUser,
        type: location.state?.type 
      } 
    });
  };
  if (!tracking) {
    return (
      <Typography align="center">
        No tracking information available
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2, width: '100%', maxWidth: 800, margin: '0 auto' }}>
        <Typography variant="h4" gutterBottom color="primary">
          Tracking Information
        </Typography>

        {/* Tracking Details Section */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography variant="h6">Current Status:</Typography>
                <Chip 
                  label={getStatusText(tracking.status)}
                  color={getStatusColor(tracking.status)}
                  sx={{ fontWeight: 'bold' }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon color="primary" />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Current Location
                  </Typography>
                  <Typography variant="body1">
                    {tracking.location}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarTodayIcon color="primary" />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Last Update
                  </Typography>
                  <Typography variant="body1">
                    {formatDate(tracking.lastUpdate)}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocalShippingIcon color="primary" />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Estimated Delivery
                  </Typography>
                  <Typography variant="body1">
                    {tracking.forecast ? formatDate(tracking.forecast) : 'N/A'}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Quantity
                </Typography>
                <Typography variant="body1">
                  {tracking.quantity} units
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Product Code
                </Typography>
                <Typography variant="body1">
                  {tracking.productCode}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Customer Email
                </Typography>
                <Typography variant="body1">
                  {tracking.emailUser}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Update Status Section */}
        <UpdateStatusComponent 
            code={tracking.productCode}
            emailUser= {tracking.emailUser} 
        />

        {/* Back Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="outlined"
            onClick={handleBack}
            size="large"
          >
            Back to Tracking List
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default TrackingView;