import React, { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Tooltip, Dialog, DialogContent, Button } from "@mui/material";
import { styled } from "@mui/system";
import { IProductProps } from "./types.ts";


const StyledCard = styled(Card)(() => ({
    width: 300,
    margin: 16,
    overflow: "hidden",
    transition: "transform 0.3s ease-in-out",
    backgroundColor: "#256c6a",
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    "&:hover": {
        transform: "scale(1.1)",
        cursor: "pointer",
    },
}));

const TruncatedText = styled(Typography)(() => ({
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
}));

const ProductCard: React.FC<IProductProps> = ({ name, image, description, category, quantity }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const toggleModal = () => setModalOpen(!isModalOpen);

    return (
        <>
            <Tooltip title={<Typography sx={{ display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis" }}>{description}</Typography>} arrow placement="top">
                <StyledCard onClick={toggleModal}>
                    {/* CardMedia with the requested image styling */}
                    <CardMedia
                        component="img"
                        image={image}
                        alt={name}
                        sx={{
                            width: "50%",
                            height: "auto",
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
                    <CardMedia
                        component="img"
                        height="300"
                        image={image}
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
