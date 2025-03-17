import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store/hooks';
import {
    Box, Grid, Pagination, IconButton, Button, Modal, TextField, FormControl, InputLabel, Select, MenuItem, Snackbar
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete';
import ProductCard from '../Card/Card';
import { RootState } from '../../store/store';
import { deleteProduct, addProduct } from '../../features/products/productSlice';
import { IProductProps } from "./types.ts";

const ProductList: React.FC = () => {
    const products = useSelector((state: RootState) => state.products.filteredProducts);
    const categories = useSelector((state: RootState) => state.categories.categories); // Fetch categories
    const dispatch = useAppDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        quantity: '',
        category: '',
        price: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        quantity: '',
        category: '',
        price: ''
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar

    const itemsPerPage = 8;

    const handleChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const handleDeleteProduct = (id: number) => {
        dispatch(deleteProduct(id));
    };

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => {
        setModalOpen(false);
        setErrors({ name: '', description: '', quantity: '', category: '', price: '' }); // Reset errors on modal close
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewProduct({ ...newProduct, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Clear error when user starts typing
    };

    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
        setNewProduct({ ...newProduct, category: event.target.value });
        setErrors({ ...errors, category: '' }); // Clear error when user selects a category
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = { name: '', description: '', quantity: '', category: '', price: '' };

        if (!newProduct.name.trim()) {
            newErrors.name = 'Product name is required';
            isValid = false;
        }
        if (!newProduct.description.trim()) {
            newErrors.description = 'Description is required';
            isValid = false;
        }
        if (!newProduct.quantity || parseInt(newProduct.quantity) < 0) {
            newErrors.quantity = 'Quantity must be a non-negative number';
            isValid = false;
        }
        if (!newProduct.category) {
            newErrors.category = 'Category is required';
            isValid = false;
        }
        if (!newProduct.price || parseFloat(newProduct.price) < 0) {
            newErrors.price = 'Price must be a non-negative number';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleAddProduct = () => {
        if (validateForm()) {
            const product: IProductProps = {
                id: 0,
                name: newProduct.name,
                description: newProduct.description,
                quantity: parseInt(newProduct.quantity),
                category: newProduct.category,
                price: parseFloat(newProduct.price)
            };
            dispatch(addProduct(product));
            setNewProduct({
                name: '',
                description: '',
                quantity: '',
                category: '',
                price: ''
            });
            setSnackbarOpen(true); // Show Snackbar notification
            handleCloseModal();
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false); // Close Snackbar
    };

    const paginatedProducts = products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const isFormValid = newProduct.name.trim() && newProduct.description.trim() &&
        newProduct.quantity && parseInt(newProduct.quantity) >= 0 &&
        newProduct.category &&
        newProduct.price && parseFloat(newProduct.price) >= 0;

    return (
        <Box sx={{ width: '100%', padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                <Button variant="contained" color="primary" onClick={handleOpenModal}>
                    Add Product
                </Button>
            </Box>

            <Grid container spacing={0.5} justifyContent={products.length > 0 ? 'flex-start' : 'center'}>
                {paginatedProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={3} key={product.id}>
                        <Box sx={{
                            position: 'relative',
                            transition: "transform 0.3s ease-in-out",
                            "&:hover": {
                                transform: "scale(1.05)",
                                cursor: "pointer",
                            },
                        }}>
                            <ProductCard {...product} />
                            <IconButton
                                onClick={() => handleDeleteProduct(product.id)}
                                sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 50,
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 0, 0, 0.8)',
                                    },
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            {products.length === 0 && (
                <Box sx={{ textAlign: 'center', width: '100%', color: '#fff', fontSize: '1.2rem' }}>
                    No products available.
                </Box>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Pagination
                    count={Math.ceil(products.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handleChangePage}
                    color="primary"
                />
            </Box>

            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        padding: 4,
                        borderRadius: 2,
                        boxShadow: 24,
                        width: 400,
                    }}
                >
                    <h2>Add New Product</h2>
                    <TextField
                        fullWidth
                        label="Product Name"
                        name="name"
                        value={newProduct.name}
                        onChange={handleInputChange}
                        margin="normal"
                        error={!!errors.name}
                        helperText={errors.name}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={newProduct.description}
                        onChange={handleInputChange}
                        margin="normal"
                        error={!!errors.description}
                        helperText={errors.description}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Quantity"
                        name="quantity"
                        type="number"
                        value={newProduct.quantity}
                        onChange={handleInputChange}
                        margin="normal"
                        error={!!errors.quantity}
                        helperText={errors.quantity}
                        required
                        inputProps={{ min: 0 }} // Ensure quantity is non-negative
                    />
                    <FormControl fullWidth margin="normal" error={!!errors.category}>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={newProduct.category}
                            onChange={handleCategoryChange}
                            label="Category"
                            required
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.name}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.category && <Box sx={{ color: 'red', fontSize: '0.75rem', marginTop: '8px' }}>{errors.category}</Box>}
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Price"
                        name="price"
                        value={newProduct.price}
                        onChange={handleInputChange}
                        margin="normal"
                        error={!!errors.price}
                        helperText={errors.price}
                        required
                        inputProps={{ min: 0 }} // Ensure price is non-negative
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddProduct}
                        sx={{ marginTop: 2 }}
                        disabled={!isFormValid} // Disable button if form is invalid
                    >
                        Add Product
                    </Button>
                </Box>
            </Modal>

            {/* Snackbar for success notification */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000} // Auto-close after 3 seconds
                onClose={handleCloseSnackbar}
                message="Product added successfully!"
            />
        </Box>
    );
};

export default ProductList;