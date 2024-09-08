import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/GenerarNuevoInventario.css'; // Importa el archivo de estilos CSS para el componente

import Modal from './Modal';
import ConfirmeInventarioAsignarSede from './ConfirmeInventarioAsignarSede'; // Asegúrate de que la ruta sea correcta

const inputClasses = "border border-border rounded-lg p-3 w-full placeholder-custom"; // Clases para los inputs del formulario
const labelClasses = "block text-muted-foreground"; // Clases para las etiquetas de los inputs
const buttonClasses = "bg-red-600 text-white hover:bg-red-700 rounded-lg p-3 w-full"; // Clases para el botón de guardar, con fondo rojo y texto blanco

const GenerarNuevoInventario = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sedes, setSedes] = useState([]); // Estado para almacenar las sedes
  const navigate = useNavigate();

  useEffect(() => {
    // Función para obtener los datos de la API
    const fetchSedes = async () => {
      try {
        const response = await fetch('https://cxdt2lrhdb.execute-api.us-east-2.amazonaws.com/desarrollo/typeproduct/locations');
        const data = await response.json();
        setSedes(data); // Guarda los datos en el estado
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSedes(); // Llama a la función para obtener los datos
  }, []); // Se ejecuta solo una vez cuando el componente se monta

  // Maneja el clic en el botón de guardar
  const handleGuardar = () => {
      setIsModalOpen(true);
  };

  // Maneja el cierre del modal
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
