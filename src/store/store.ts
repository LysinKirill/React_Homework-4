import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice';
import categoryReducer from '../features/categories/categorySlice';
import modalReducer from '../features/modal/modalSlice';
import sidebarReducer from '../features/sidebar/sidebarSlice';
import filterReducer from '../features/filter/filterSlice';

export const store = configureStore({
    reducer: {
        products: productReducer,
        categories: categoryReducer,
        modal: modalReducer,
        sidebar: sidebarReducer,
        filter: filterReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;