import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { addProduct } from '../../store/productSlice';
import { FormErrors } from '../../types';
import { validateForm } from '../../utils/validationForm';

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
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errors } = validateForm(formData);

    if (!isValid) {
      setErrors(errors);
      
      return;
    }

    const productData = {
      name: formData.name.trim(),
      imageUrl: formData.imageUrl,
      count: Number(formData.count),
      size: {
        width: Number(formData.width),
        height: Number(formData.height),
      },
      weight: Number(formData.weight),
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
    setErrors({});
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
              {errors.name && <p className="help is-danger">{errors.name}</p>}
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
                />
              </div>
              {errors.count && <p className="help is-danger">{errors.count}</p>}
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
                    />
                  </div>
                  {errors.width && <p className="help is-danger">{errors.width}</p>}
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
                    />
                  </div>
                  {errors.height && <p className="help is-danger">{errors.height}</p>}
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
                />
              </div>
              {errors.weight && <p className="help is-danger">{errors.weight}</p>}
            </div>
          </section>
          <footer className="modal-card-foot buttons">
            <button type="submit" className="button is-primary">Add Product</button>
            <button type="button" className="button" onClick={onClose}>Cancel</button>
          </footer>
        </form>
      </div>
    </div>
  );
}