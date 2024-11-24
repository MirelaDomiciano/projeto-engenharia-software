import React from 'react'; 
import {    
  Typography,
  Grid,
  Button,
  Paper,
  Box
} from '@mui/material';   

const ProductDetailComponent = ({ product }) => {
  return (
    
      <Grid  spacing={4}>
        <Grid item xs={12} md={6} sx={{ 
          justifyContent: 'center', 
          alignItems: 'center' 
        }}>
          <Box sx={{
            width: '100%',
            height: { xs: 300, sm: 400, md: 500 }, 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            borderRadius: 2,
            boxShadow: 2
          }}>
            <img
              src={`/public/${product.emailUser}/${product.imageName}`}
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover', 
                objectPosition: 'center', // Centraliza a imagem
                borderRadius: '8px' // Bordas arredondadas
              }}
            />
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6} mt={5}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          
          <Typography variant="body1" color="text.secondary" paragraph>
            {product.description}
          </Typography>
          
          <Typography variant="h5" color="primary" sx={{ mt: 2, mb: 2 }}>
            R$ {parseFloat(product.price).toFixed(2)}
          </Typography>
          
        </Grid>
      </Grid>
    
  ); 
};

export default ProductDetailComponent;