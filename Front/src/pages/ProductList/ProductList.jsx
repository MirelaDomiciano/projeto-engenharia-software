import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Chip
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import PendingIcon from '@mui/icons-material/Pending';

const ProductList = (props) => {
  const navigate = useNavigate();
  
  const handleProductClick = (product) => {
    navigate(`product-detail/${product.code}`, {
      state: {
        product: product,
        email: props.email,
        type: props.type,
      }
    });
  };

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      } catch (err) {
        setError('Erro ao buscar os produtos.');
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
      <Grid
        container
        spacing={4}
        sx={{
          width: '100%',
          maxWidth: '100%',
          margin: 0,
          paddingRight: '80px',
          paddingTop: '20px',
        }}
      >
        {products.map((product) => (
          <Grid
            item
            key={product.code}
            xs={12}
            sm={6}
            md={3}
            sx={{
              display: 'flex',
              width: '100%'
            }}
          >
            <Card
              sx={{
                width: '100%',
                borderRadius: 4,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                position: 'relative', // Para posicionar o Chip
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.2)",
                }
              }}
              onClick={() => handleProductClick(product)}
            >
              {/* Status Chip */}
              <Chip
                icon={product.valid ? <VerifiedIcon /> : <PendingIcon />}
                label={product.valid ? "Validated" : "Pending"}
                color={product.valid ? "success" : "warning"}
                sx={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  zIndex: 1
                }}
              />

              <CardMedia
                component="img"
                height="200"
                image={"/public" + '/' + product.emailUser + '/' + product.imageName}
                onError={(e) => {
                  console.error('Erro ao carregar imagem', {
                    product,
                    imagePath: "/public" + '/' + product.emailUser + '/' + product.imageName
                  });
                }}
                sx={{
                  filter: !product.validated ? 'grayscale(30%)' : 'none',
                }}
              />
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary" style={{ marginTop: '0.5rem' }}>
                  R${parseFloat(product.price).toFixed(2)}
                </Typography>
                {!product.valid && (
                  <Typography 
                    variant="caption" 
                    color="warning.main" 
                    sx={{ display: 'block', mt: 1 }}
                  >
                    This product is pending validation
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductList;