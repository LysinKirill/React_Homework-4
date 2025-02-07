import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
    isOpen: boolean;
    name: string;
    image: string;
    description: string;
    category: string;
    quantity: number;
}

const initialState: ModalState = {
    isOpen: false,
    name: "",
    image: "",
    description: "",
    category: "",
    quantity: 0,
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (_state, action: PayloadAction<Omit<ModalState, "isOpen">>) => {
            return { ...action.payload, isOpen: true };
        },
        closeModal: () => initialState,
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
