import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar/NavigationBar.tsx';
import ProductList from './components/ProductList/ProductList.tsx';
import Sidebar from './components/Sidebar/Sidebar.tsx';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setProducts } from './features/products/productSlice';
import { setCategories } from './features/categories/categorySlice';
import { IProductProps } from "./components/ProductList/types.ts";
import ProductDetails from "./components/ProductDetails/ProductDetails.tsx";

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const { categories, products } = useAppSelector((state) => ({
        products: state.products.products,
        categories: state.categories.categories,
    }));

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isInStock, setIsInStock] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        handleApplyFilters();
    };

    const handleToggleInStock = (checked: boolean) => {
        setIsInStock(checked);
        handleApplyFilters();
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        handleApplyFilters();
    };

    const handleApplyFilters = () => {
        let filteredProducts = products;

        if (searchQuery) {
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (isInStock) {
            filteredProducts = filteredProducts.filter(product => product.quantity > 0);
        }

        if (selectedCategory) {
            filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
        }

        dispatch(setProducts(filteredProducts));
    };

    const handleResetFilters = () => {
        setSearchQuery('');
        setIsInStock(false);
        setSelectedCategory('');
        dispatch(setProducts(products));
    };

    useEffect(() => {
        dispatch(setProducts(products));
        dispatch(setCategories(getUniqueCategories(products)));
    }, [dispatch, products]);

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#101022', overflow: 'hidden', width: '100vw' }}>
            <NavigationBar toggleSidebar={toggleSidebar} />
            <Box sx={{ display: 'flex', flex: 1, marginTop: '64px', overflow: 'hidden', width: '100%' }}>
                <Sidebar
                    isOpen={isSidebarOpen}
                    onSearch={handleSearch}
                    onToggleInStock={handleToggleInStock}
                    onCategoryChange={handleCategoryChange}
                    onApplyFilters={handleApplyFilters}
                    onResetFilters={handleResetFilters}
                    categories={categories}
                />
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', padding: 2, backgroundColor: '#101022', overflow: 'hidden' }}>
                    <Routes>
                        <Route path="/products/:id" element={<ProductDetails />} />
                        <Route path="/products" element={<ProductList />} />
                    </Routes>
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
