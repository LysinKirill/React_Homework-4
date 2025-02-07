import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Grid, Pagination } from '@mui/material';
import ProductCard from '../Card/Card';
import { RootState } from '../../store/store';  // Adjust the path as needed


const ProductList: React.FC = () => {
    const products = useSelector((state: RootState) => state.products.products);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const handleChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const paginatedProducts = products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );


    return (
        <Box
            sx={{
                width: "100%",
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 2,
            }}
        >
            <Grid
                container
                spacing={0.5}
                justifyContent={products.length > 0 ? 'flex-start' : 'center'}
                sx={{
                    flexGrow: 1,
                    minHeight: 0,
                }}
            >
                {paginatedProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={3} key={product.id}>
                        <ProductCard {...product} />
                    </Grid>
                ))}
                {products.length === 0 && (
                    <Box
                        sx={{
                            textAlign: 'center',
                            width: '100%',
                            color: '#fff',
                            fontSize: '1.2rem',
                        }}
                    >
                        No products available.
                    </Box>
                )}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Pagination
                    count={Math.ceil(products.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handleChangePage}
                    color="primary"
                />
            </Box>
        </Box>
    );
};

export default ProductList;
