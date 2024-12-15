import React from "react";
import { Dialog, DialogContent, CardMedia, Typography, Button } from "@mui/material";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    name: string;
    image: string;
    description: string;
    category: string;
    quantity: number;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, name, image, description, category, quantity }) => {
    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
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
                <Button onClick={onClose} sx={{ mt: 2 }} variant="contained">
                    Close
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
