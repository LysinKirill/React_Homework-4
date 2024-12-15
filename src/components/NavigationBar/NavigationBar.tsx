import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';

interface NavigationBarProps {
    toggleSidebar: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ toggleSidebar }) => {
    return (
        <AppBar
            position="fixed"
            sx={{
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 10,
                height: '60px',
                backgroundColor: '#333',
                padding: '0 16px',
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '100%',
                    padding: 0,
                }}
            >

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-evenly', // Evenly space the navigation buttons
                        flexGrow: 1, // Make this container take all available space
                    }}
                >
                    <Button
                        onClick={toggleSidebar}
                        sx={{
                            backgroundColor: 'transparent',
                            color: 'white',
                            fontSize: '16px',
                            width: 'auto', // Ensures it does not take more space than needed
                            '&:hover': {
                                color: '#ddd',
                                backgroundColor: 'transparent',
                            },
                            textTransform: 'none',
                        }}
                    >
                        Menu
                    </Button>
                    <Button
                        sx={{
                            backgroundColor: 'transparent',
                            color: 'white',
                            fontSize: '16px',
                            '&:hover': {
                                color: '#ddd',
                                backgroundColor: 'transparent',
                            },
                            textTransform: 'none',
                        }}
                    >
                        Products
                    </Button>
                    <Button
                        sx={{
                            backgroundColor: 'transparent',
                            color: 'white',
                            fontSize: '16px',
                            '&:hover': {
                                color: '#ddd',
                                backgroundColor: 'transparent',
                            },
                            textTransform: 'none',
                        }}
                    >
                        Warehouses
                    </Button>
                    <Button
                        sx={{
                            backgroundColor: 'transparent',
                            color: 'white',
                            fontSize: '16px',
                            '&:hover': {
                                color: '#ddd',
                                backgroundColor: 'transparent',
                            },
                            textTransform: 'none',
                        }}
                    >
                        About
                    </Button>
                    <Button
                        sx={{
                            backgroundColor: 'transparent',
                            color: 'white',
                            fontSize: '16px',
                            '&:hover': {
                                color: '#ddd',
                                backgroundColor: 'transparent',
                            },
                            textTransform: 'none',
                        }}
                    >
                        User
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;
