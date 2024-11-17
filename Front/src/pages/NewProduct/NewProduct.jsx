import React, { useState, useRef } from 'react';
import { Box, Button, TextField, Typography, Snackbar, Input } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { grey } from '@mui/material/colors';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NewProduct = () => {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [open, setOpen] = useState(false);
    const imageInputRef = useRef(null); // Referência para o input de arquivo

    const handleSubmit = (event) => {
        event.preventDefault();

        const productData = {
            name: productName,
            description: description,
            price: parseFloat(price),
            image: image,
        };

        console.log("Dados do produto:", productData);
        setOpen(true);

        // Resetar campos do formulário
        setProductName('');
        setDescription('');
        setPrice('');
        setImage(null);
        if (imageInputRef.current) {
            imageInputRef.current.value = ''; // Resetar o input de arquivo
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Novo Produto
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Nome do Produto"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                />
                <TextField
                    label="Descrição"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <TextField
                    label="Preço"
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
                    label="Selecionar Imagem"
                    type="file"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        inputProps: {
                            ref: imageInputRef, 
                            accept: "image/*",
                            sx: { color: grey[700]},
                            
                        },
                    }}
                    onChange={handleImageChange}
                />
                {image && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        Imagem selecionada: {image.name}
                    </Typography>
                )}
                <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                    Adicionar Produto
                </Button>
            </form>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Produto cadastrado com sucesso!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default NewProduct;