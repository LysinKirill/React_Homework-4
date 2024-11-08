import React from 'react';
import './styles.css';
import { IProductProps } from '../Card/types'; // Import the correct type

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: IProductProps | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, product }) => {
    if (!isOpen || !product) return null;  // Don't render modal if no product is selected

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <div className="modal-header">
                    <h2>Project Name</h2>
                </div>
                <div className="modal-body">
                    <img src={product.image} alt={product.name} className="modal-image" />
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    <p><strong>Quantity:</strong> {product.quantity} {product.unit}</p>
                </div>
            </div>
        </div>
    );
};

export default Modal;
