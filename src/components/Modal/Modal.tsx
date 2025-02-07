import React from "react";
import { Dialog, DialogContent, CardMedia, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { closeModal } from "../../features/modal/modalSlice";

const Modal: React.FC = () => {
    const dispatch = useDispatch();
    const { isOpen, name, image, description, category, quantity } = useSelector(
        (state: RootState) => state.modal
    );

    const handleClose = () => {
        dispatch(closeModal());
    };

    return (
        <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogContent>
                <Typography variant="h4" gutterBottom>
                    {name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Category: {category}
                </Typography>
                <Typography variant="body1" color="text.primary">
                    Quantity: {quantity}
                </Typography>
                <CardMedia
                    component="img"
                    height="300"
                    image={image}
                    alt={name}
                    sx={{ objectFit: "contain", width: "100%" }}
                />
                <Button onClick={handleClose} sx={{ mt: 2 }} variant="contained">
                    Close
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
