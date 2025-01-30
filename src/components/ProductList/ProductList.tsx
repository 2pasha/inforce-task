import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { Product } from '../../types';
import { fetchProducts, deleteProduct } from '../../store/productSlice';
import { ProductModal } from './ProductModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { ProductCard } from './ProductCard';

export const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.items);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'count'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch]);

  const handleDelete = async (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  }

  const confirmDelete = async () => {
    if (selectedProduct) {
      await dispatch(deleteProduct(selectedProduct.id));
      setIsDeleteModalOpen(false);
      setSelectedProduct(null);
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    const sortValue = sortOrder === 'asc' ? 1 : -1;

    if (sortBy === 'name') {
      return a.name.localeCompare(b.name) * sortValue;
    }

    return (a.count - b.count) * sortValue;
  })

  return (
    <>
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <button
              className="button is-primary"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add Product
            </button>
          </div>
          <div className="level-item">
            <div className="select">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'count')}
              >
                <option value="name">Sort by Name</option>
                <option value="count">Sort by Count</option>
              </select>
            </div>
          </div>
          <div className="level-item">
            <div className="select">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="columns is-multiline">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <ProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        productName={selectedProduct?.name || ''}
      />
    </>
  );
};
