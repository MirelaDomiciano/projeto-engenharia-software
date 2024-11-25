import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  IconButton,
  Tooltip
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PurchasedProducts = ({ email }) => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderBy, setOrderBy] = useState('lastUpdate');
  const [direction, setDirection] = useState('desc');
  const [selectedColumn, setSelectedColumn] = useState('lastUpdate');
  const [isAsc, setIsAsc] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        // Buscar trackings
        const trackingResponse = await axios.get('http://localhost:8081/tracking', {
          params: { emailUser: email }
        });

        // Buscar produtos
        const productsResponse = await axios.get('http://localhost:8081/products', {
          params: { 
            type: 0,
            emailUser: email 
          }
        });

        // Combinar dados
        const combinedData = trackingResponse.data.map(tracking => {
          const product = productsResponse.data.find(p => p.code === tracking.productCode) || {};
          return {
            ...tracking,
            ...product, // Incluir todos os dados do produto
            productName: product.name || 'Product not found',
            price: product.price || 0,
            description: product.description || ''
          };
        });

        setPurchases(combinedData);
      } catch (err) {
        setError('Error fetching purchase data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [email]);

  const handleSort = () => {
    const sortedPurchases = [...purchases].sort((a, b) => {
      let aValue = a[selectedColumn];
      let bValue = b[selectedColumn];

      if (selectedColumn === 'lastUpdate' || selectedColumn === 'forecast') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      } else if (typeof aValue === 'string') {
        aValue = aValue.trim().toLowerCase();
        bValue = bValue.trim().toLowerCase();
      }

      if (aValue < bValue) return isAsc ? -1 : 1;
      if (aValue > bValue) return isAsc ? 1 : -1;
      return 0;
    });

    setPurchases(sortedPurchases);
    setOrderBy(selectedColumn);
    setDirection(isAsc ? 'asc' : 'desc');
  };

  const handleViewProduct = (purchase) => {
    navigate(`/home/tracking-detail/${purchase.code}`, {
      state: {
        product: purchase,
        email: email,
        type: 0 // tipo buyer
      }
    });
  };

  const getStatusText = (status) => {
    switch(status) {
      case 0: return 'Processing';
      case 1: return 'In Transit';
      case 2: return 'Delivered';
      default: return 'Unknown';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" m={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }

  if (purchases.length === 0) {
    return (
      <Alert severity="info" sx={{ m: 2 }}>
        No purchases found
      </Alert>
    );
  }

  return (
    <Box sx={{ 
      width: '100%', 
      maxWidth: '100%', 
      overflow: 'hidden' }}
    >
      <Grid   
                spacing={4} 
                sx={{ 
                width: '100%', 
                maxWidth: '100%', 
                margin: 0,
                padding: '40px',
                paddingRight: '80px',
                justifyContent: 'center',
                }}
            >
      <Typography variant="h4" gutterBottom color="primary">
        My Purchases
      </Typography>

      <Paper sx={{ mb: 2, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Sort by:
        </Typography>
        <FormGroup row>
          <FormControlLabel 
            control={<Checkbox checked={selectedColumn === 'productName'} onChange={() => setSelectedColumn('productName')} />} 
            label="Product Name" 
          />
          <FormControlLabel 
            control={<Checkbox checked={selectedColumn === 'status'} onChange={() => setSelectedColumn('status')} />} 
            label="Status" 
          />
          <FormControlLabel 
            control={<Checkbox checked={selectedColumn === 'lastUpdate'} onChange={() => setSelectedColumn('lastUpdate')} />} 
            label="Last Update" 
          />
        </FormGroup>
        <FormGroup row>
          <FormControlLabel 
            control={<Checkbox checked={isAsc} onChange={() => setIsAsc(true)} />} 
            label="Ascending" 
          />
          <FormControlLabel 
            control={<Checkbox checked={!isAsc} onChange={() => setIsAsc(false)} />} 
            label="Descending" 
          />
        </FormGroup>
        <Button variant="contained" onClick={handleSort}>
          Apply Sort
        </Button>
      </Paper>

      <TableContainer component={Paper}>
        <Table aria-label="purchases table">
          <TableHead>
            <TableRow>
              <TableCell>Actions</TableCell>
              <TableCell>Product {orderBy === 'productName' && (direction === 'asc' ? '🔼' : '🔽')}</TableCell>
              <TableCell>Quantity {orderBy === 'quantity' && (direction === 'asc' ? '🔼' : '🔽')}</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status {orderBy === 'status' && (direction === 'asc' ? '🔼' : '🔽')}</TableCell>
              <TableCell>Location {orderBy === 'location' && (direction === 'asc' ? '🔼' : '🔽')}</TableCell>
              <TableCell>Last Update {orderBy === 'lastUpdate' && (direction === 'asc' ? '🔼' : '🔽')}</TableCell>
              <TableCell>Forecast {orderBy === 'forecast' && (direction === 'asc' ? '🔼' : '🔽')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {purchases.map((purchase) => (
              <TableRow key={`${purchase.productCode}-${purchase.lastUpdate}`}>
                <TableCell>
                  <Tooltip title="View Product Details">
                    <IconButton
                      color="primary"
                      onClick={() => handleViewProduct(purchase)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>{purchase.productName}</TableCell>
                <TableCell>{purchase.quantity}</TableCell>
                <TableCell>R$ {parseFloat(purchase.price).toFixed(2)}</TableCell>
                <TableCell>{getStatusText(purchase.status)}</TableCell>
                <TableCell>{purchase.location}</TableCell>
                <TableCell>{new Date(purchase.lastUpdate).toLocaleString()}</TableCell>
                <TableCell>{purchase.forecast ? new Date(purchase.forecast).toLocaleString() : 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
    </Box>
  );
};

export default PurchasedProducts;