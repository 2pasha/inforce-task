import React, { useEffect, useState } from 'react';
import { Product } from '../../types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { updateProduct } from '../../store/productSlice';

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    name: '',
    imageUrl: '',
    count: 0,
    width: 0,
    height: 0,
    weight: 0,
  });

  useEffect(() => {
    setFormData({
      name: product.name,
      imageUrl: product.imageUrl,
      count: product.count,
      width: product.size.width,
      height: product.size.height,
      weight: product.weight,
    });
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProduct: Product = {
      ...product,
      name: formData.name,
      imageUrl: formData.imageUrl,
      count: formData.count,
      size: {
        width: formData.width,
        height: formData.height,
      },
      weight: formData.weight,
    };

    await dispatch(updateProduct(updatedProduct));
    onClose();
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Edit Product</p>
          <button className="delete" onClick={onClose}></button>
        </header>
        <form onSubmit={handleSubmit}>
          <section className="modal-card-body">
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Image URL</label>
              <div className="control">
                <input
                  className="input"
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Count</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  value={formData.count}
                  onChange={(e) => setFormData({ ...formData, count: Number(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div className="columns">
              <div className="column">
                <div className="field">
                  <label className="label">Width</label>
                  <div className="control">
                    <input
                      className="input"
                      type="number"
                      value={formData.width}
                      onChange={(e) => setFormData({ ...formData, width: Number(e.target.value) })}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="field">
                  <label className="label">Height</label>
                  <div className="control">
                    <input
                      className="input"
                      type="number"
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Weight</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                  required
                />
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button type="submit" className="button is-primary">Save Changes</button>
            <button type="button" className="button" onClick={onClose}>Cancel</button>
          </footer>
        </form>
      </div>
    </div>
  );
};
