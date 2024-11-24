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

const Home = () => {
  const location = useLocation();
  const {email, type} = location.state || {};

  const [currentTab, setCurrentTab] = React.useState(0);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  // Verifica se está na rota de detalhes do produto
  const isProductDetailRoute = location.pathname.includes('/home/product-detail/');

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
            My Store
          </Typography>
          <NavTabs
            currentTab={currentTab}
            handleTabChange={handleTabChange}
            handleLogout={handleLogout}
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
        {/* Outlet para renderizar rotas aninhadas */}
        <Outlet />

        {/* Conteúdo original condicional */}
        {!isProductDetailRoute && (
          <>
            {currentTab === 0 && <NewProduct email={email} />}
            {currentTab === 1 && <ProductList email={email} type={type} />}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Home;