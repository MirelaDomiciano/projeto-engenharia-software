import React from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  Grid,
  Card,
  CardContent,
  Icon
} from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const HomeComponent = ({ userType }) => {
  const getUserTypeText = () => {
    switch(userType) {
      case 0:
        return "Buyer";
      case 1:
        return "Seller";
      case 2:
        return "Deliverer";
      case 3:
        return "Administrator";
      default:
        return "User";
    }
  };

  return (
    <Box  sx={{ 
        width: '100%', 
        maxWidth: '100%', 
        overflow: 'hidden' }}
    >
        <Grid   
            spacing={4} 
            sx={{ 
                width: '100%', 
                maxWidth: '100%', 
                margin: 0,
                padding: '40px',
                paddingRight: '80px',
                justifyContent: 'center',
            }}
        >
      <Paper elevation={3} sx={{ p: 4, mb: 4, background: 'linear-gradient(145deg, #ffffff 0%, #f4f8ff 100%)' }}>
        <Typography 
          variant="h2" 
          gutterBottom 
          sx={{ 
            color: 'primary.main',
            fontWeight: 'bold',
            mb: 1
          }}
        >
          ViaTech
        </Typography>
        
        <Typography 
          variant="h5" 
          sx={{ 
            color: 'text.secondary',
            mb: 3 
          }}
        >
          Connecting People through Technology
        </Typography>

        <Typography variant="h6" gutterBottom color="primary">
          Welcome, {getUserTypeText()}!
        </Typography>

        <Typography variant="body1" paragraph sx={{ mt: 3 }}>
          ViaTech is an innovative e-commerce platform that leverages technology to create seamless 
          connections between buyers, sellers, and delivery partners. Our platform provides a secure, 
          efficient, and user-friendly environment for all your trading needs.
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom color="primary">
                Platform Features
              </Typography>
              <Box sx={{ pl: 2 }}>
                <Typography paragraph>
                  • Smart product management system
                </Typography>
                <Typography paragraph>
                  • Real-time tracking technology
                </Typography>
                <Typography paragraph>
                  • Secure transaction processing
                </Typography>
                <Typography paragraph>
                  • Integrated delivery management
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom color="primary">
                User Roles
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <ShoppingBasketIcon color="primary" />
                  <Typography>Buyers: Access to our marketplace</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <StorefrontIcon color="primary" />
                  <Typography>Sellers: Product management tools</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <LocalShippingIcon color="primary" />
                  <Typography>Deliverers: Logistics management</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <AdminPanelSettingsIcon color="primary" />
                  <Typography>Administrators: System oversight</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper 
        elevation={1} 
        sx={{ 
          p: 3, 
          mt: 4, 
          bgcolor: 'primary.main',
          borderRadius: 2
        }}
      >
        <Typography variant="body1" color="white" align="center">
          Experience the future of trading with ViaTech. Navigate through the tabs above to explore our features.
        </Typography>
      </Paper>
      </Grid>
    </Box>
  );
};

export default HomeComponent;