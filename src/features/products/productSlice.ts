import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProductProps } from '../../components/ProductList/types';

interface ProductState {
    products: IProductProps[];
}

const initialState: ProductState = {
    products: [],
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<IProductProps>) => {
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
        },
        setProducts: (state, action: PayloadAction<IProductProps[]>) => {
            state.products = action.payload;
        },
    },
});

export const { addProduct, updateProduct, deleteProduct, setProducts } = productSlice.actions;
export default productSlice.reducer;