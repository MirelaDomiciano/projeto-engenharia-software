import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Typography,
  Box,
  Paper,
  Button,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Chip
} from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ProductDetailComponent from '../../Components/ProductDetail/ProductDetailComponent';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const TrackingDetails = () => {
  const location = useLocation();
  const email = location.state?.email;
  const type = location.state?.type;
  const navigate = useNavigate();
  const { code } = useParams();
  
  const [product, setProduct] = useState(location.state?.product);

  const steps = [
    'Processing',
    'In Transit',
    'Delivered'
  ];

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

  useEffect(() => {
    if (!product) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:8081/products/${code}`);
          setProduct(response.data);
        } catch (error) {
          console.error('Error fetching product', error);
          navigate("/home", {
            replace: true, 
            state: { email, type }
          });
        }
      };
      fetchProduct();
    }
  }, [code, product, navigate, email, type]);

  const handleBack = () => {
    navigate("/home", { 
      state: { 
        email, 
        type 
      } 
    });
  };
  
  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ 
      width: '100%', 
      height: 'auto', 
      padding: 2,
      display: 'flex',
      justifyContent: 'center',
    }}>
      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2, width: '100%', maxWidth: 800 }} >
        {/* Product Details */}
        <Typography variant="h4" gutterBottom color="primary">
          Product Details
        </Typography>
        
        <ProductDetailComponent product={product} />

        <Divider sx={{ my: 4 }} />

        {/* Status Section */}
        <Typography variant="h4" gutterBottom color="primary">
          Order Status
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Stepper activeStep={product.status} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Tracking Details */}
        <Paper elevation={1} sx={{ p: 3, mb: 4, bgcolor: 'background.default' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip 
                  label={getStatusText(product.status)}
                  color={getStatusColor(product.status)}
                  sx={{ fontWeight: 'bold' }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon color="primary" />
                <Typography>
                  <strong>Current Location:</strong><br />
                  {product.location}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarTodayIcon color="primary" />
                <Typography>
                  <strong>Last Update:</strong><br />
                  {formatDate(product.lastUpdate)}
                </Typography>
              </Box>
            </Grid>

            {product.forecast && (
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocalShippingIcon color="primary" />
                  <Typography>
                    <strong>Estimated Delivery:</strong><br />
                    {formatDate(product.forecast)}
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Paper>

        {/* Back Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="outlined"
            onClick={handleBack}
            size="large"
          >
            Back to Purchases
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default TrackingDetails;