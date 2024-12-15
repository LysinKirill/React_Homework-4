import React, { useState } from 'react';
import { Box } from '@mui/material';
import NavigationBar from './components/NavigationBar/NavigationBar.tsx';
import ProductList from './components/ProductList/ProductList.tsx';
import Sidebar from './components/Sidebar/Sidebar.tsx';
import products from './data/products.json'



const App: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [, setShowInStock] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleToggleInStock = (checked: boolean) => {
        setShowInStock(checked);

        if (checked) {
            setFilteredProducts(products.filter((product) => product.quantity > 0));
        } else {
            setFilteredProducts(products);
        }
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#101022' }}>
            <NavigationBar toggleSidebar={toggleSidebar} />

            <Box sx={{ display: 'flex', flex: 1, marginTop: '64px' }}>
                <Sidebar
                    isOpen={isSidebarOpen}
                    onSearch={(query) => console.log(query)}
                    onToggleInStock={handleToggleInStock}
                    onCategoryChange={(category) => console.log(category)}
                    onResetFilters={() => setFilteredProducts(products)}
                />

                <Box
                    sx={{
                        flex: 1,
                        padding: 2,
                        marginLeft: isSidebarOpen ? '240px' : '0',
                        transition: 'margin-left 0.3s ease',
                        backgroundColor: '#101022',
                    }}
                >
                    <ProductList products={filteredProducts} />
                </Box>
            </Box>
        </Box>
    );
};

export default App;
