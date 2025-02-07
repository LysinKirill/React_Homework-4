import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProductProps } from '../../components/ProductList/types';
import products from '../../data/products.json';

interface ProductState {
    products: IProductProps[];
    filteredProducts: IProductProps[];
}

const initialState: ProductState = {
    products: products,
    filteredProducts: products,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<IProductProps>) => {
            action.payload.id = Math.max(...state.products.map(o => o.id)) + 1;
            state.products.push(action.payload);
        },
        updateProduct: (state, action: PayloadAction<IProductProps>) => {
            const index = state.products.findIndex((p) => p.id === action.payload.id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },
        deleteProduct: (state, action: PayloadAction<number>) => {
            state.products = state.products.filter((p) => p.id !== action.payload);
            state.filteredProducts = state.filteredProducts.filter((p) => p.id !== action.payload);
        },
        setProducts: (state, action: PayloadAction<IProductProps[]>) => {
            state.products = action.payload;
        },
        setFilteredProducts: (state, action: PayloadAction<IProductProps[]>) => {
            state.filteredProducts = action.payload;
        },
    },
});

export const { addProduct, updateProduct, deleteProduct, setProducts, setFilteredProducts } = productSlice.actions;
export default productSlice.reducer;
