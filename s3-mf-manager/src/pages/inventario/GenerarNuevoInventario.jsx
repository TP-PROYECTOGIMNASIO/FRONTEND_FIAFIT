import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/GenerarNuevoInventario.css'; // Importa el archivo de estilos CSS para el componente

import Modal from './Modal';
import ConfirmeInventarioAsignarSede from './ConfirmeInventarioAsignarSede'; // Asegúrate de que la ruta sea correcta

const inputClasses = "border border-border rounded-lg p-3 w-full placeholder-custom"; // Clases para los inputs del formulario
const labelClasses = "block text-muted-foreground"; // Clases para las etiquetas de los inputs
const buttonClasses = "bg-red-600 text-white hover:bg-red-700 rounded-lg p-3 w-full"; // Clases para el botón de guardar, con fondo rojo y texto blanco

const GenerarNuevoInventario = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleGuardar = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    navigate('/ConfirmeInventarioAsignarSede'); // Redirige al usuario a la página de confirmación
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col modal-container bg-background p-6 rounded-lg shadow-lg max-w relative max-h-[500px]">
      <div className="modal-header mb-4 flex items-start justify-end">
        {/* Aquí puedes agregar elementos adicionales si es necesario */}
      </div>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-primary">Generar Nuevo Inventario</h2>
      </div>

      <div className="form-grid mb-4">
        <div className="form-item">
          <label className={labelClasses} htmlFor="producto">Producto</label>
          <input type="text" id="producto" className={inputClasses} placeholder=" " />
        </div>
        <div className="form-item">
          <label className={labelClasses} htmlFor="precio-venta">Precio de venta</label>
          <input type="text" id="precio-venta" className={inputClasses} placeholder=" " />
        </div>
        <div className="form-item">
          <label className={labelClasses} htmlFor="cantidad">Cantidad</label>
          <input type="number" id="cantidad" className={inputClasses} placeholder=" " />
        </div>
      </div>

      <div className="mb-4 flex flex-col">
        <div className="form-item">
          <label className={labelClasses} htmlFor="asignar">Asignar a:</label>
          <select id="asignar" className={inputClasses}>
            <option value="la-molina">La Molina</option>
            <option value="miraflores">Miraflores</option>
            <option value="santa-anita">Santa Anita</option>
          </select>
        </div>
        <button className={buttonClasses} onClick={handleGuardar}>GUARDAR</button>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ConfirmeInventarioAsignarSede 
          onConfirm={handleConfirm} 
          onClose={handleCloseModal} 
        />
      </Modal>
    </div>
  );
};

export default GenerarNuevoInventario;
