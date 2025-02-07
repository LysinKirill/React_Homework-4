import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
    categories: string[];
}

const initialState: CategoryState = {
    categories: [],
};

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addCategory: (state, action: PayloadAction<string>) => {
            state.categories.push(action.payload);
        },
        deleteCategory: (state, action: PayloadAction<string>) => {
            state.categories = state.categories.filter((cat) => cat !== action.payload);
        },
        setCategories: (state, action: PayloadAction<string[]>) => {
            state.categories = action.payload;
        },
    },
});

export const { addCategory, deleteCategory, setCategories } = categorySlice.actions;
export default categorySlice.reducer;