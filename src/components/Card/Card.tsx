import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Tooltip,
    Dialog,
    DialogContent,
    Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { IProductProps } from "../ProductList/types";

const PlaceholderImagePath = "/src/assets/empty_image_placeholder.png";

const StyledCard = styled(Card)(() => ({
    width: '100%',
    maxWidth: 300,
    margin: 16,
    overflow: "hidden",
    backgroundColor: "#256c6a",
    padding: 8,
    borderRadius: 8,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
}));

const TruncatedText = styled(Typography)(() => ({
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
}));

const ProductCard: React.FC<IProductProps> = ({ name, image, description, category, quantity, price }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [validatedImage, setValidatedImage] = useState<string>(PlaceholderImagePath);

    const toggleModal = () => setModalOpen(!isModalOpen);

    useEffect(() => {
        const validateImage = async () => {
            if (!image) return;
            try {
                const img = new Image();
                img.src = image;
                await img.decode();
                setValidatedImage(image);
            } catch {
                setValidatedImage(PlaceholderImagePath);
            }
        };

        validateImage();
    }, [image]);

    return (
        <>
            <Tooltip
                title={
                    <Typography
                        sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {description}
                    </Typography>
                }
                arrow
                placement="top"
            >
                <StyledCard onClick={toggleModal}>
                    <CardMedia
                        component="img"
                        image={validatedImage}
                        alt={name}
                        sx={{
                            width: "100%",
                            maxHeight: 150,
                            objectFit: "contain",
                            margin: "10px auto",
                        }}
                    />
                    <CardContent>
                        <TruncatedText gutterBottom variant="h6">
                            {name}
                        </TruncatedText>
                        <Typography variant="body2" color="text.secondary">
                            {category}
                        </Typography>
                        <Typography variant="body1" color="text.primary">
                            In stock: {quantity}
                        </Typography>
                        <Typography variant="body1" color="text.primary">
                            Price: {price} USD
                        </Typography>
                    </CardContent>
                </StyledCard>
            </Tooltip>

            <Dialog open={isModalOpen} onClose={toggleModal} maxWidth="md" fullWidth>
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
                    <Typography variant="body1" color="text.primary">
                        Price: {price} USD
                    </Typography>
                    <CardMedia
                        component="img"
                        height="300"
                        image={validatedImage}
                        alt={name}
                        sx={{ objectFit: "contain", width: "100%" }}
                    />
                    <Button onClick={toggleModal} sx={{ mt: 2 }} variant="contained">
                        Close
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ProductCard;
