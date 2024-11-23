import { useState } from 'react';
import axios from 'axios';
import { Button, Typography, Input, Box, Snackbar, Alert, TextField } from '@mui/material';

let baseURL = import.meta.env.VITE_API_URL;
const userCookie = window.localStorage.getItem('user');
const cityGroup = window.localStorage.getItem('cityGroup');
const clientID = window.localStorage.getItem('clientID');
const serviceToken = window.localStorage.getItem('serviceToken');

const NewProduct = (props) => {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [location, setLocation] = useState('');
    const [file, setFile] = useState({ name: 'Example.pdf' });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessages, setSnackbarMessages] = useState([]);
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [currentMessage, setCurrentMessage] = useState('');

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
        if (snackbarMessages.length > 0) {
            const nextMessage = snackbarMessages.shift();
            setCurrentMessage(nextMessage);
            setSnackbarOpen(true);
        }
    };

    const enqueueSnackbar = (message, severity = 'success') => {
        setSnackbarMessages((prevMessages) => [...prevMessages, message]);
        setSnackbarSeverity(severity);
        if (!snackbarOpen) {
            const nextMessage = snackbarMessages.shift() || message;
            setCurrentMessage(nextMessage);
            setSnackbarOpen(true);
        }
    };

    const resetForm = () => {
        setProductName('');
        setDescription('');
        setPrice('');
        setQuantity('');
        setLocation('');
        setFile({ name: 'Example.pdf' });
    };

    const send = (event) => {
        event.preventDefault();
        let formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", file.name);

        axios
            .post(`${baseURL}uploadImage`, formData)
            .then(() => {
                axios
                    .post(`${baseURL}products`, {
                        name: productName,
                        price: parseFloat(price),
                        image: file.name,
                        description: description,
                        quantity: parseInt(quantity),
                        location: location,
                    })
                    .then(() => {
                        resetForm();
                        enqueueSnackbar("Product successfully registered!", "success");
                    })
                    .catch(() => {
                        enqueueSnackbar("Image uploaded, but product registration failed.", "error");
                    });
            })
            .catch(() => {
                enqueueSnackbar("Image upload failed.", "error");
            });
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom color='#616161'>
                New Product
            </Typography>
            <form onSubmit={send}>
                <TextField
                    label="Product Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <TextField
                    label="Price"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    type="number"
                    inputProps={{
                        step: "0.01",
                        min: "0",
                    }}
                />
                <TextField
                    label="Quantity"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    type="number"
                    inputProps={{
                        min: "0",
                        step: "1"
                    }}
                />
                <TextField
                    label="Location"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    placeholder="Enter product location"
                />
                <Box display="flex" alignItems="center" gap={2} sx={{ mt: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        component="label"
                        style={{
                            backgroundColor: '#2196F3',
                            color: '#FFFFFF',
                            textTransform: 'none',
                            padding: '10px 20px',
                            fontSize: '16px'
                        }}
                    >
                        Select
                        <Input 
                            type="file" 
                            style={{ display: 'none' }} 
                            onChange={(e) => setFile(e.target.files[0])}
                            inputProps={{
                                accept: "image/*"
                            }}
                        />
                    </Button>
                    {file && (
                        <Typography variant="body2" color='#616161' style={{ fontStyle: 'italic' }}>
                            Selected File: {file.name}
                        </Typography>
                    )}
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ mt: 2 }}
                    style={{
                        backgroundColor: '#2196F3',
                        color: '#FFFFFF',
                        textTransform: 'none',
                        padding: '10px 20px',
                        fontSize: '16px'
                    }}
                >
                    Add Product
                </Button>
            </form>
            <Snackbar 
                open={snackbarOpen} 
                autoHideDuration={6000} 
                onClose={handleSnackbarClose} 
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert 
                    onClose={handleSnackbarClose} 
                    severity={snackbarSeverity} 
                    sx={{ width: '100%' }}
                >
                    {currentMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default NewProduct;