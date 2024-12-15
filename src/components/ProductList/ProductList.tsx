import React, { useState } from 'react';
import { Box, Grid, Pagination } from '@mui/material';
import ProductCard from '../Card/Card';
import {ProductListProps} from "./types.ts";


const ProductList: React.FC<ProductListProps> = ({ products }) => {
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
        <Box sx={{ padding: 2 }}>
            <Grid container spacing={2} justifyContent="center">
                {paginatedProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={3} key={product.id}>
                        <ProductCard {...product} />
                    </Grid>
                ))}
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
