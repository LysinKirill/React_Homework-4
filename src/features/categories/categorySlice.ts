
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICategoryProps {
    id: number;
    name: string;
}

interface CategoryState {
    categories: ICategoryProps[];
}

const initialState: CategoryState = {
    categories: [],
};

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<ICategoryProps[]>) => {
            state.categories = action.payload;
        },
    },
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;
