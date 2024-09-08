// src/pages/inventario/GenerarNuevoInventario.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/GenerarNuevoInventario.css';
import Modal from './Modal';
import ConfirmeInventarioAsignarSede from './ConfirmeInventarioAsignarSede';
import { fetchSedes } from '../../services/apiService'; // Importa la función de servicio

const inputClasses = "border border-border rounded-lg p-3 w-full placeholder-custom";
const labelClasses = "block text-muted-foreground";
const buttonClasses = "bg-red-600 text-white hover:bg-red-700 rounded-lg p-3 w-full";

const GenerarNuevoInventario = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sedes, setSedes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSedes = async () => {
      try {
        const data = await fetchSedes();
        setSedes(data);
      } catch (error) {
        console.error('Error loading sedes:', error);
      }
    };

    loadSedes();
  }, []);

  const handleGuardar = () => {
    setIsModalOpen(true);
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
            {sedes.map(sede => (
              <option key={sede.location_id} value={sede.location_id}>
                {sede.c_name}
              </option>
            ))}
          </select>
        </div>
        <button className={buttonClasses} onClick={handleGuardar}>GUARDAR</button>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ConfirmeInventarioAsignarSede />
      </Modal>
    </div>
  );
};

export default GenerarNuevoInventario;
