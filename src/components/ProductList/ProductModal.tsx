import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { addProduct } from '../../store/productSlice';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = (
  { 
    isOpen,
    onClose
  }
) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    name: '',
    imageUrl: '',
    count: 0,
    width: 0,
    height: 0,
    weight: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      name: formData.name,
      imageUrl: formData.imageUrl,
      count: formData.count,
      size: {
        width: formData.width,
        height: formData.height,
      },
      weight: formData.weight,
      comments: []
    };

    await dispatch(addProduct(productData));
    onClose();
    setFormData({
      name: '',
      imageUrl: '',
      count: 0,
      width: 0,
      height: 0,
      weight: 0,
    });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Add New Product</p>
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
            <button type="submit" className="button is-primary">Add Product</button>
            <button type="button" className="button" onClick={onClose}>Cancel</button>
          </footer>
        </form>
      </div>
    </div>
  );
}