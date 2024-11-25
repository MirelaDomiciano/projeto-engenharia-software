import React from 'react';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  Typography 
} from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import NavTabs from '../../Components/NavTabs/NavTabs';
import NewProduct from '../NewProduct/NewProduct';
import ProductList from '../ProductList/ProductList';
import HomeComponent from '../../Components/Home/HomeComponent';
import PurchasedProducts from '../PurchasedProducts/PurchasedProducts';
import TrackingList from '../TrackingList/TrackingList';

const Home = () => {
  const location = useLocation();
  const {email, type} = location.state || {};
  const [currentTab, setCurrentTab] = React.useState(0);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    console.log('New tab value:', newValue); // Debug
    setCurrentTab(newValue);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const renderContent = () => {
    console.log('Current tab:', currentTab); // Debug
    console.log('User type:', type); // Debug

    // Seller (type 1)
    if (type === 1) {
      if (currentTab === 0) return <HomeComponent userType={type}/>;
      if (currentTab === 1) return <NewProduct email={email} />;
      if (currentTab === 2) return <ProductList email={email} type={type} />;
    }

    // Buyer (type 0)
    if (type === 0) {
      if (currentTab === 0) return <HomeComponent userType={type}/>;
      if (currentTab === 1) return <ProductList email={email} type={type} />;
      if (currentTab === 2) return <PurchasedProducts email={email} />;
    }

    // Deliverer (type 2)
    if (type === 2) {
      if (currentTab === 0) return <HomeComponent userType={type}/>;
      if (currentTab === 1) return <TrackingList />;
    }

    // Admin (type 3)
    if (type === 3) {
      if (currentTab === 0) return <HomeComponent userType={type}/>;
      if (currentTab === 1) return <ProductList email={email} type={type} />;
    }

    return <HomeComponent />;
  };

  // Se estiver na rota de detalhes do produto, renderiza o Outlet
  if (location.pathname.includes('/home/product-detail/') || location.pathname.includes('/home/tracking-detail/')|| location.pathname.includes('/home/tracking-view/')){
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100vh', 
        width: '100vw', 
        overflow: 'hidden' 
      }}>
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ marginRight: 2 }}>
             ViaTech
            </Typography>
            <NavTabs
              currentTab={currentTab}
              handleTabChange={handleTabChange}
              handleLogout={handleLogout}
              userType={type}
            />
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: '100%',
            maxWidth: '100%',
            height: 'calc(100vh - 64px)', 
            overflow: 'auto',
            bgcolor: '#f0f2f5',
            px: { xs: 2, sm: 2, md: 3 },
            position: 'relative'
          }}
        >
          <Outlet />
        </Box>
      </Box>
    );
  }

  // Renderização normal
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      width: '100vw', 
      overflow: 'hidden' 
    }}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ marginRight: 2 }}>
             ViaTech
          </Typography>
          <NavTabs
            currentTab={currentTab}
            handleTabChange={handleTabChange}
            handleLogout={handleLogout}
            userType={type}
          />
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          maxWidth: '100%',
          height: 'calc(100vh - 64px)', 
          overflow: 'auto',
          bgcolor: '#f0f2f5',
          px: { xs: 2, sm: 2, md: 3 },
          position: 'relative'
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
};

export default Home;