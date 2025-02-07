import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import NavigationBar from './components/NavigationBar/NavigationBar.tsx';
import ProductList from './components/ProductList/ProductList.tsx';
import Sidebar from './components/Sidebar/Sidebar.tsx';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setProducts } from './features/products/productSlice';
import { setCategories } from './features/categories/categorySlice';
import products from './data/products.json';
import { IProductProps } from "./components/ProductList/types.ts";

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const { products: reduxProducts, categories } = useAppSelector((state) => ({
        products: state.products.products,
        categories: state.categories.categories,
    }));

    // Local state for managing sidebar and search
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isInStock, setIsInStock] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        // Initialize products and categories from JSON data
        dispatch(setProducts(products));
        dispatch(setCategories(getUniqueCategories(products)));
    }, [dispatch]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        // You can filter products based on the search query here if needed
    };

    const handleToggleInStock = (checked: boolean) => {
        setIsInStock(checked);
        // You can filter products based on inStock here if needed
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        // You can filter products based on category here if needed
    };

    const handleApplyFilters = () => {
        // Apply filters like inStock, category, etc.
    };

    const handleResetFilters = () => {
        setSearchQuery('');
        setIsInStock(false);
        setSelectedCategory('');
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#101022', overflow: 'hidden', width: '100vw' }}>
            <NavigationBar />
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
                    <ProductList />
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
