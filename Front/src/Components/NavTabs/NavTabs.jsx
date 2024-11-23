// src/NavTabs.js
import React from 'react';
import { Box, Tabs, Tab, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LogoutIcon from '@mui/icons-material/Logout';

const NavTabs = ({ currentTab, handleTabChange, handleLogout }) => {
  return (
    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        aria-label="navigation tabs"
        textColor="inherit"
        indicatorColor="secondary"
      >
        <Tab
          label="New Product"
          icon={<AddCircleOutlineIcon />}
          iconPosition="start"
          id="tab-0"
          aria-controls="tabpanel-0"
        />
        <Tab
          label="List Products"
          icon={<FormatListBulletedIcon />}
          iconPosition="start"
          id="tab-1"
          aria-controls="tabpanel-1"
        />
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