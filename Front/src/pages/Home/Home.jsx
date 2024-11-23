import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LogoutIcon from '@mui/icons-material/Logout';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); // Limpa os dados do usuário
    navigate('/'); // Volta para a tela de login
  };

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', bgcolor: '#f0f2f5' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Store
          </Typography>
          
          <Button
            color="inherit"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => navigate('new_product')}
            sx={{ mx: 1 }}
          >
            New Product
          </Button>
          
          <Button
            color="inherit"
            startIcon={<FormatListBulletedIcon />}
            onClick={() => navigate('/home/list-products')}
            sx={{ mx: 1 }}
          >
            List Products
          </Button>
          
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ mx: 1 }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default Home;