// src/Home.js
import React from 'react';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import NavTabs from '../../Components/NavTabs/NavTabs';
import NewProduct from '../NewProduct/NewProduct';
import ProductList from '../ProductList/ProductList';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [currentTab, setCurrentTab] = React.useState(0);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Limpa os dados do usuário
    navigate('/'); // Retorna para a tela de login
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* AppBar Fixa na Parte Superior */}
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

      {/* Espaço para compensar a altura do AppBar fixo */}
      <Toolbar />

      {/* Conteúdo Principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: '#f0f2f5',
          overflow: 'auto',
        }}
      >
        {currentTab === 0 && <NewProduct />}
        {currentTab === 1 && <ProductsList />}
      </Box>
    </Box>
  );
};

export default Home;