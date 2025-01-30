import React from 'react';
import { Product } from '../../types';
import { Link, useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onDelete: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onDelete,
}) => {
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    if (!target.closest('.card-footer')) {
      navigate(`/product/${product.id}`);
    }
  };

  return (
    <div className="column is-one-third">
      <div 
        className="card"
        onClick={handleCardClick}
        style={{ cursor: 'pointer' }}
      >
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={product.imageUrl} alt={product.name} />
          </figure>
        </div>
        <div className="card-content">
          <div className="content">
            <h4>{product.name}</h4>
            <p>Count: {product.count}</p>
            <p>Size: {product.size.width}x{product.size.height}</p>
            <p>Weight: {product.weight}</p>
          </div>
        </div>
        <footer className="card-footer">
          <Link to={`/product/${product.id}`} className="card-footer-item">
            View
          </Link>
          <button
            className="card-footer-item has-text-danger"
            onClick={(e) => {
              e.preventDefault();
              onDelete(product);
            }}
          >
            Delete
          </button>
        </footer>
      </div>
    </div>
  );
};
