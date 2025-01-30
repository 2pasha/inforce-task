import React from 'react';
import { ProductList } from '../components/ProductList/ProductList';

export const ProductListPage: React.FC = () => {
  return (
    <div className="container">
      <div className="title">Products</div>
      <ProductList />
    </div>
  )
};