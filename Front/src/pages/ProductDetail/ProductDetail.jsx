import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Typography,
  Box,
  Paper,
  Button
} from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ProductDetailComponent from '../../Components/ProductDetail/ProductDetailComponent';
import BuyProductComponent from '../../Components/ProductDetail/BuyProductComponent';
import UpdateStockComponent from '../../Components/ProductDetail/UpdateStockComponent';
import UpdateStatusComponent from '../../Components/ProductDetail/UpdateStatusComponent';
import ValidateProductComponent from '../../Components/ProductDetail/ValidateProductComponent';
import DeleteProductComponent from '../../Components/ProductDetail/DeleteProductComponent';

const ProductDetail = () => {
  const location = useLocation();
  const email = location.state?.email;
  const type = location.state?.type;
  console.log(email);
  console.log(type);
  const navigate = useNavigate();
  const { code } = useParams();
  
  const [product, setProduct] = useState(location.state?.product);

  useEffect(() => {
    if (!product) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:8081/products/${code}`);
          setProduct(response.data);
        } catch (error) {
          console.error('Erro ao buscar produto', error);
          navigate("/home", {
            replace: true, 
            state: { email, type }
          });
        }
      };
      fetchProduct();
    }
  }, [code, product, navigate, email, type]);

  const handleBack = () => {
    navigate("/home", { state: { email, type } });
  };

  const renderActionComponent = () => {
    switch(type) {
      case 0: 
        return <BuyProductComponent product={product} email={email} />;
      case 1: 
        return <UpdateStockComponent product={product} />;
      case 2: 
        return <UpdateStatusComponent product={product} email={email}/>;
      case 3: 
        return(
        <>
            <ValidateProductComponent product={product} />
            <DeleteProductComponent product={product} />
        </> 
        );   
    }
  };

  if (!product) {
    return <Typography>Carregando...</Typography>;
  }

  return (
    <Box sx={{ 
      width: '100%', 
      height: 'auto', 
      padding: 2,
      display: 'flex',
      justifyContent: 'center',
    }}>
      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2, width: '100%', maxWidth: 800 }} >
        <ProductDetailComponent product={product} />
        <Box sx={{ mt: 4 }}>
          {renderActionComponent()}
        </Box>

        {/* Botão de voltar */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="outlined"
            onClick={handleBack}
          >
            Voltar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProductDetail;