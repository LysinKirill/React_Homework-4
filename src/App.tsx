import React, { useState } from 'react';
import { Box } from '@mui/material';
import NavigationBar from './components/NavigationBar/NavigationBar.tsx';
import ProductList from './components/ProductList/ProductList.tsx';
import Sidebar from './components/Sidebar/Sidebar.tsx';

const App: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#101022' }}>
            <NavigationBar toggleSidebar={toggleSidebar} />
            <Box sx={{ display: 'flex', flex: 1, marginTop: '64px' }}>
                <Sidebar isOpen={isSidebarOpen} />

                <Box
                    sx={{
                        flex: 1,
                        padding: 2,
                        marginLeft: isSidebarOpen ? '240px' : '0',
                        transition: 'margin-left 0.3s ease',
                        backgroundColor: '#101022',
                    }}
                >
                    <ProductList />
                </Box>
            </Box>
        </Box>
    );
};

export default App;
