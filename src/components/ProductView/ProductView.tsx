import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { fetchProducts } from '../../store/productSlice';
import { Product } from '../../types';
import { CommentSection } from './CommentSection';
import { EditProductModal } from './EditProductModal';

export const ProductView: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const products = useSelector((state: RootState) => state.products.items) as Product[];
  const status = useSelector((state: RootState) => state.products.status);
  const product = products.find(p => Number(p.id) === Number(id));

  console.log(products, product);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return (
      <div className="section">
        <div className="container">
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="section">
        <div className="container">
          <p>Product not found</p>
          <button 
            className="button is-primary"
            onClick={() => navigate('/')}
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        <nav className="level">
          <div className="level-left">
            <div className="level-item">
              <button 
                className="button is-info" 
                onClick={() => navigate(-1)}
              >
                Back
              </button>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <button 
                className="button is-primary" 
                onClick={() => setIsEditModalOpen(true)}
              >
                Edit Product
              </button>
            </div>
          </div>
        </nav>

        <div className="columns">
          <div className="column is-half">
            <figure className="image is-4by3">
              <img src={product.imageUrl} alt={product.name} />
            </figure>
          </div>
          <div className="column is-half">
            <h1 className="title">{product.name}</h1>
            <div className="content">
              <p><strong>Count:</strong> {product.count}</p>
              <p><strong>Size:</strong> {product.size.width}x{product.size.height}</p>
              <p><strong>Weight:</strong> {product.weight}</p>
            </div>
          </div>
        </div>

        <CommentSection product={product} />

        <EditProductModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          product={product}
        />
      </div>
    </div>
  );
};
