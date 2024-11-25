import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Typography,
  TextField,
  Alert,
  Snackbar,
  CircularProgress,
  Paper,
  Divider
} from '@mui/material';
import axios from 'axios';

const BuyProductComponent = ({ product, email }) => { // Adicionado email como prop
  const [loading, setLoading] = useState(false);
  const [loadingStock, setLoadingStock] = useState(true);
  const [stockInfo, setStockInfo] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [endereco, setEndereco] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await axios.get('http://localhost:8081/stock/list');
        const productStock = response.data.find(
          stock => stock.productCode === product.code
        );
        setStockInfo(productStock);
      } catch (error) {
        console.error('Erro ao buscar stock:', error);
        setSnackbar({
          open: true,
          message: 'Erro ao carregar informações de estoque',
          severity: 'error'
        });
      } finally {
        setLoadingStock(false);
      }
    };

    fetchStock();
  }, [product.code]);

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleComprar = async () => {
    if (!endereco.trim()) {
      setSnackbar({
        open: true,
        message: 'Por favor, insira o endereço de entrega',
        severity: 'error'
      });
      return;
    }

    if (quantidade <= 0 || (stockInfo && quantidade > stockInfo.quantity)) {
      setSnackbar({
        open: true,
        message: 'Quantidade inválida',
        severity: 'error'
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8081/products/buy', {
        productCode: product.code,
        emailUser: email,
        location: endereco,
        quantity: quantidade
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: 'Compra realizada com sucesso!',
          severity: 'success'
        });
        // Reset dos campos após compra bem-sucedida
        setQuantidade(1);
        setEndereco('');
        
        // Atualiza o stock
        const updatedStockResponse = await axios.get('http://localhost:8081/stock/list');
        const updatedStock = updatedStockResponse.data.find(
          stock => stock.productCode === product.code
        );
        setStockInfo(updatedStock);
      }
    } catch (error) {
      console.error('Erro ao realizar compra:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Erro ao realizar compra',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  if (loadingStock) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!stockInfo || stockInfo.quantity === 0) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        Produto indisponível no momento
      </Alert>
    );
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 2,
      mt: 2
    }}>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" color="primary" gutterBottom>
          Comprar Produto
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Disponível em estoque: {stockInfo.quantity} unidades
          </Typography>
        </Box>

        <TextField
          type="number"
          fullWidth
          label="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(Number(e.target.value))}
          inputProps={{ 
            min: 1,
            max: stockInfo.quantity
          }}
          error={quantidade > stockInfo.quantity}
          helperText={quantidade > stockInfo.quantity ? 'Quantidade maior que disponível' : ''}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Endereço de Entrega"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          multiline
          rows={2}
          error={!endereco.trim()}
          helperText={!endereco.trim() ? 'Endereço é obrigatório' : ''}
          sx={{ mb: 2 }}
        />

        <Divider sx={{ my: 2 }} />

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Box>
            <Typography variant="body1" gutterBottom>
              Valor unitário: R$ {parseFloat(product.price).toFixed(2)}
            </Typography>
            <Typography variant="h6" color="primary">
              Total: R$ {(quantidade * parseFloat(product.price)).toFixed(2)}
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={handleComprar}
            disabled={loading || 
                     quantidade <= 0 || 
                     quantidade > stockInfo.quantity || 
                     !endereco.trim()}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Processando...' : 'Finalizar Compra'}
          </Button>
        </Box>
      </Paper>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleClose} 
          severity={snackbar.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BuyProductComponent;