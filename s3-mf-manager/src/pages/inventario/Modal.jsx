import React from 'react';
import './styles/Modal.css'; // Asegúrate de que la ruta sea correcta

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button className="modal-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default Modal;
