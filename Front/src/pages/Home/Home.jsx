import React from "react";
import Drawer from '@mui/material/Drawer';
import { Box, Typography, IconButton, AppBar, Toolbar, Divider } from "@mui/material";
import { List, ListItemText, ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CssBaseline from '@mui/material/CssBaseline';
import { blue } from '@mui/material/colors';
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import NewProduct from "../NewProduct/NewProduct";
const drawerWidth = 240;

const Home = () => {
    const [showNewProduct, setShowNewProduct] = useState(false);

    const handleNewProductClick = () => {
        setShowNewProduct(true);
    };
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Home
                    </Typography>
                </Toolbar>
            </AppBar>
            <IconButton size='large' edge='start' color='inherit' aria-label="logo" onClick={() => setIsDrawOpen(true)}>
                <MenuIcon />
            </IconButton>
            <Drawer 
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    },
                }}
                anchor='left'
                variant="permanent"
            >
                <Toolbar />
        <Divider />
                <List>
                    {['Novo Produto'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton onClick={handleNewProductClick}>
                                <ListItemIcon>
                                    <AddCircleIcon sx={{ color: blue[600]}}/> 
                                </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box sx={{ p: 3, transition: 'margin-left 0.2s' }}>
                {showNewProduct ? <NewProduct /> : <Typography variant="h6">Selecione um produto.</Typography>}
            </Box>
        </Box>
    );
};

export default Home;
