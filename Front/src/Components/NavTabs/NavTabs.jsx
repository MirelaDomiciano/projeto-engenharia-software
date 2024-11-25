import React from 'react';
import { Box, Tabs, Tab, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

const NavTabs = ({ currentTab, handleTabChange, handleLogout, userType }) => {
  const renderTabs = () => {
    console.log('Current tab in NavTabs:', currentTab); // Debug

    switch (userType) {
      case 0: // Buyer
        return [
          <Tab
            key="home"
            label="Home"
            icon={<HomeIcon />}
            iconPosition="start"
          />,
          <Tab
            key="products"
            label="Products"
            icon={<FormatListBulletedIcon />}
            iconPosition="start"
          />,
          <Tab
            key="purchases"
            label="My Purchases"
            icon={<ShoppingBasketIcon />}
            iconPosition="start"
          />
        ];

      case 1: // Seller
        return [
          <Tab
            key="home"
            label="Home"
            icon={<HomeIcon />}
            iconPosition="start"
          />,
          <Tab
            key="newProduct"
            label="New Product"
            icon={<AddCircleOutlineIcon />}
            iconPosition="start"
          />,
          <Tab
            key="products"
            label="Products"
            icon={<FormatListBulletedIcon />}
            iconPosition="start"
          />
        ];

      case 2: // Deliverer
        return [
          <Tab
            key="home"
            label="Home"
            icon={<HomeIcon />}
            iconPosition="start"
          />,
          <Tab
            key="trackings"
            label="Trackings"
            icon={<FormatListBulletedIcon />}
            iconPosition="start"
          />
        ];

      case 3: // Admin
        return [
          <Tab
            key="home"
            label="Home"
            icon={<HomeIcon />}
            iconPosition="start"
          />,
          <Tab
            key="products"
            label="Products"
            icon={<FormatListBulletedIcon />}
            iconPosition="start"
          />
        ];

      default:
        return [];
    }
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        aria-label="navigation tabs"
        textColor="inherit"
        indicatorColor="secondary"
      >
        {renderTabs()}
      </Tabs>
      <Button
        color="inherit"
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
        sx={{ marginLeft: 'auto' }}
      >
        Logout
      </Button>
    </Box>
  );
};
export default NavTabs;