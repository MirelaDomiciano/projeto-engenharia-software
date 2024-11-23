import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    CircularProgress,
    Alert,
    IconButton,
    CardActions,
    Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

let baseURL = import.meta.env.VITE_API_URL;

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Função para buscar os produtos
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${baseURL}products`);
            setProducts(response.data);
            setError(null);
        } catch (err) {
            setError('Erro ao carregar os produtos: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    // Carregar produtos quando o componente montar
    useEffect(() => {
        fetchProducts();
    }, []);

    // Função para formatar o preço
    const formatPrice = (price) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    };

    // Função para deletar produto
    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este produto?')) {
            try {
                await axios.delete(`${baseURL}products/${id}`);
                setProducts(products.filter(product => product.id !== id));
            } catch (err) {
                setError('Erro ao deletar o produto: ' + err.message);
            }
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box m={2}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" gutterBottom component="div">
                Produtos Disponíveis
            </Typography>
            
            {products.length === 0 ? (
                <Typography variant="h6" color="textSecondary">
                    Nenhum produto encontrado.
                </Typography>
            ) : (
                <Grid container spacing={3}>
                    {products.map((product) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                            <Card 
                                sx={{ 
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    '&:hover': {
                                        boxShadow: 6
                                    }
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={`${baseURL}images/${product.image}`}
                                    alt={product.name}
                                    sx={{ objectFit: 'cover' }}
                                    onError={(e) => {
                                        e.target.src = 'caminho/para/imagem/padrao.jpg'; // Defina uma imagem padrão
                                    }}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {product.description}
                                    </Typography>
                                    <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                                        {formatPrice(product.price)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Quantidade: {product.quantity}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Localização: {product.location}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <IconButton 
                                        aria-label="editar"
                                        onClick={() => {
                                            console.log('Editar produto:', product.id);
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton 
                                        aria-label="deletar"
                                        onClick={() => handleDelete(product.id)}
                                        sx={{ color: 'error.main' }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Botão para atualizar a lista */}
            <Button
                variant="contained"
                onClick={fetchProducts}
                sx={{ mt: 3 }}
            >
                Atualizar Lista
            </Button>
        </Box>
    );
};

export default ProductList;