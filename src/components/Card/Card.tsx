import './styles.css';
import { IProductProps } from './types.ts';
import imagePlaceholder from '../../assets/empty_image_placeholder.png';

const Card = ({ name, description, category, quantity, unit, image, onClick }: IProductProps & { onClick: () => void }) => {
    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        event.currentTarget.src = imagePlaceholder;
    };

    return (
        <div className="card" onClick={onClick}>
            <img
                src={image || imagePlaceholder}
                alt={name}
                className="card-image"
                onError={handleImageError}
            />
            <div className="card-details">
                <h3 className="card-title">{name}</h3>
                <p className="card-category">Category: {category}</p>
                <p className="card-quantity">Quantity: {quantity} {unit}</p>
                <hr/>
                <p className="card-description">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default Card;
