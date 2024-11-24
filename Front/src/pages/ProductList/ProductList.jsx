import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';

const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Estado de erro

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8081/products',
          {
            params: {
              type: props.type,
              emailUser: props.email,
            },
          }
        );
        setProducts(response.data);
        //console.log(response.data);
      } catch (err) {
        setError('Erro ao buscar os produtos.');
        //console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Grid container justifyContent="center" style={{ marginTop: '2rem' }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Alert severity="error" style={{ marginTop: '2rem' }}>
        {error}
      </Alert>
    );
  }

  if (products.length === 0) {
    return (
      <Typography variant="h6" align="center" color='#616161' style={{ marginTop: '2rem' }}>
        Nenhum produto encontrado.
      </Typography>
    );
  }

  return (
    <Box sx={{ 
      width: '100%', 
      maxWidth: '100%', 
      overflow: 'hidden' 
    }}>    
      <Grid container spacing={4} sx={{ 
        width: '100%', 
        maxWidth: '100%', 
        margin: 0,
        paddingRight: '80px',
        paddingTop: '20px',
      }}>
        {products.map((product) => (
          <Grid item key={product.code} xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
            <Card sx={{borderRadius: 4, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",}}>
              <CardMedia
                component="img"
                height="200"
                image={ "/public" + '/' + product.emailUser + '/' + product.imageName}
                onError={(e) => {
                  console.error('Erro ao carregar imagem', {
                    product,
                    imagePath: "/public" + '/' + product.emailUser + '/' + product.imageName
                  });
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary" style={{ marginTop: '0.5rem' }}>
                  R${parseFloat(product.price).toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductList;

