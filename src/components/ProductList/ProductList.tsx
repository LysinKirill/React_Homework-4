import React, { useState } from 'react';
import './styles.css';
import products from '../../data/products.json';
import { IProductProps } from "../Card/types.ts";
import Card from "../Card/Card.tsx";
import Modal from "../Modal/Modal.tsx";

const ProductList: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<IProductProps | null>(null);

    const openModal = (product: IProductProps) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <div className="card-field">
            <div className="card-container">
                {products.map((product: IProductProps) => (
                    <Card
                        key={product.id}
                        {...product}
                        onClick={() => openModal(product)}
                    />
                ))}
            </div>

            {/* Modal component */}
            <Modal isOpen={isModalOpen} onClose={closeModal} product={selectedProduct} />
        </div>
    );
};

export default ProductList;
