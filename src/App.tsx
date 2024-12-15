import React, { useState } from 'react';
import { Box } from '@mui/material';
import NavigationBar from './components/NavigationBar/NavigationBar.tsx';
import ProductList from './components/ProductList/ProductList.tsx';
import Sidebar from './components/Sidebar/Sidebar.tsx';
import products from './data/products.json';
import { IProductProps } from './components/ProductList/types.ts';

const App: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isInStock, setIsInStock] = useState(false);

    const categories = getUniqueCategories(products);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleToggleInStock = (checked: boolean) => {
        setIsInStock(checked);
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
    };

    const applyFilters = () => {
        let filtered = products;

        if (searchQuery) {
            const regex = new RegExp(searchQuery, 'i');
            filtered = filtered.filter((product) => regex.test(product.name));
        }

        if (isInStock) {
            filtered = filtered.filter((product) => product.quantity > 0);
        }

        if (selectedCategory && selectedCategory !== '') {
            filtered = filtered.filter((product) => product.category === selectedCategory);
        }

        setFilteredProducts(filtered);
    };

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedCategory('');
        setIsInStock(false);
        setFilteredProducts(products);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#101022', overflow: 'hidden', width: '100vw' }}>
            <NavigationBar toggleSidebar={toggleSidebar} />

            <Box sx={{ display: 'flex', flex: 1, marginTop: '64px', overflow: 'hidden', width: '100%' }}>
                <Sidebar
                    isOpen={isSidebarOpen}
                    onSearch={handleSearchChange}
                    onToggleInStock={handleToggleInStock}
                    onCategoryChange={handleCategoryChange}
                    onApplyFilters={applyFilters}
                    onResetFilters={resetFilters}
                    categories={categories}
                />

                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 2,
                    marginLeft: isSidebarOpen ? '240px' : '0',
                    transition: 'margin-left 0.3s ease',
                    backgroundColor: '#101022',
                    overflow: 'hidden'
                }}>
                    <ProductList products={filteredProducts} />
                </Box>
            </Box>
        </Box>
    );
};

const getUniqueCategories = (products: IProductProps[]) => {
    const categoryCount: Record<string, number> = {};

    products.forEach((product) => {
        categoryCount[product.category] = (categoryCount[product.category] || 0) + 1;
    });

    return Object.entries(categoryCount)
        .sort(([, countA], [, countB]) => countB - countA)
        .map(([category]) => category);
};

export default App;



