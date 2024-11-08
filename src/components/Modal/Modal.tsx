import React from 'react';
import './styles.css';
import {IProductProps} from '../Card/types';
import imagePlaceholder from "../../assets/empty_image_placeholder.png";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: IProductProps | null;
}

const Modal: React.FC<ModalProps> = ({isOpen, onClose, product}) => {
    if (!isOpen || !product) return null;

    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        event.currentTarget.src = imagePlaceholder;
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <div className="modal-header">
                    <h2>Product card</h2>
                </div>
                <div className="modal-body">
                    <img src={product.image} alt={product.name} className="modal-image" onError={handleImageError}/>
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
