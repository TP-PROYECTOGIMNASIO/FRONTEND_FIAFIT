import React from 'react';

const ConfirmeInventarioAsignarSede = ({ onConfirm, onClose }) => {
  return (
    <div className="modal-content">
      <h2 className="text-xl font-bold">Confirme el Inventario</h2>
      <p className="text-center mb-4">Asignar a su Sede</p>
      <div className="flex justify-center gap-4">
        <button 
          className="bg-red-600 text-white hover:bg-red-700 p-2 rounded" 
          onClick={onConfirm}
        >
          Sí
        </button>
        <button 
          className="bg-gray-400 text-white hover:bg-gray-500 p-2 rounded" 
          onClick={onClose}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmeInventarioAsignarSede;
