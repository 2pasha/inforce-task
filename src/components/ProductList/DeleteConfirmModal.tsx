import React from 'react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  productName,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Confirm Delete</p>
          <button className="delete" onClick={onClose}></button>
        </header>
        <section className="modal-card-body">
          <p>Are you sure you want to delete "{productName}"?</p>
        </section>
        <footer className="modal-card-foot buttons">
          <button className="button is-danger" onClick={onConfirm}>Delete</button>
          <button className="button" onClick={onClose}>Cancel</button>
        </footer>
      </div>
    </div>
  );
};
