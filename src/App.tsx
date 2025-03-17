import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar/NavigationBar.tsx';
import ProductList from './components/ProductList/ProductList.tsx';
import Sidebar from './components/Sidebar/Sidebar.tsx';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setFilteredProducts } from './features/products/productSlice';
import { setCategories } from './features/categories/categorySlice';
import {ICategoryProps, IProductProps} from "./components/ProductList/types.ts";
import ProductDetails from "./components/ProductDetails/ProductDetails.tsx";
import CategoriesPage from "./components/CategoriesPage.tsx";
import UserProfile from "./components/UserProfile/UserProfile.tsx";

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const { categories, products, filteredProducts } = useAppSelector((state) => ({
        products: state.products.products,
        filteredProducts: state.products.filteredProducts,
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

        dispatch(setFilteredProducts(filteredProducts));
    };

    const handleResetFilters = () => {
        setSearchQuery('');
        setIsInStock(false);
        setSelectedCategory('');
        dispatch(setFilteredProducts(products));
    };

    useEffect(() => {
        dispatch(setCategories(getUniqueCategories(products)));
    }, [dispatch, products, filteredProducts]);

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
                    categories={categories.map(x => x.name)}
                />
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', padding: 2, backgroundColor: '#101022', overflow: 'hidden' }}>
                    <Routes>
                        <Route path="/products/:id" element={<ProductDetails />} />
                        <Route path="/products" element={<ProductList />} />
                        <Route path="/" element={<ProductList />} />
                        <Route path="/categories" element={<CategoriesPage />} />
                        <Route path="/user" element={<UserProfile name="Sample fullname" email="sample_email@gmail.com" group="sample group" avatarUrl="/src/assets/priemlemo.png" />} />
                    </Routes>
                </Box>
            </Box>
        </Box>
    );
};

const getUniqueCategories = (products: IProductProps[]) => {
    const uniqueCategories = new Set<ICategoryProps>();

    products.forEach((product) => {
        uniqueCategories.add({id: 0, name: product.category, });
    });

    return Array.from(uniqueCategories);
};

export default App;
