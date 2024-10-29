import React, { useState } from 'react';

const EventDetailModal = ({ event, onClose }) => {
  const [isRegistered, setIsRegistered] = useState(false); // Estado para controlar la inscripción exitosa

  // Función que se ejecuta al hacer clic en "INSCRIBIRSE"
  const handleRegister = () => {
    // Aquí podrías agregar la lógica de validación si es necesario
    setIsRegistered(true); // Cambiamos el estado para mostrar el modal de confirmación
  };

  // Función que cierra tanto el modal de evento como el modal de confirmación
  const handleClose = () => {
    setIsRegistered(false); // Reseteamos el estado de inscripción
    onClose(); // Cerramos el modal principal
  };

  if (!event) return null; // Si no hay evento, no mostramos el modal

  return (
    <>
      {/* Modal de detalles del evento */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg max-w-xl w-full relative">
          {/* Botón de cierre */}
          <button 
            onClick={onClose} 
            className="absolute top-2 right-2 text-white bg-red-600 rounded-full p-1"
          >
            X
          </button>

          {/* Contenido del Modal */}
          <div className="flex">
            {/* Imagen del evento */}
            <div className="w-1/2">
              <img 
                src={event.img} 
                alt={event.title} 
                className="w-full h-auto rounded-lg" 
              />
            </div>

            {/* Detalles del evento */}
            <div className="w-1/2 pl-4">
              <h2 className="text-2xl font-bold mb-2">{event.title}</h2>

              <p className="text-red-600 font-bold mb-2">Descripción:</p>
              <p className="text-gray-700 mb-4">
                Un reto de varias semanas en el que los participantes tienen que superar diferentes desafíos de entrenamiento. Ideal para incrementar el compromiso y la motivación.
              </p>

              <p className="text-gray-700 mb-2">
                <strong>Ubicación:</strong> {event.location}
              </p>

              <p className={`mb-2 ${event.slots <= 5 ? 'text-red-600' : 'text-green-600'}`}>
                <strong>Cupo disponible:</strong> {event.slots}
              </p>

              <p className="text-gray-700 mb-4">
                <strong>Fecha y hora:</strong> 26/10/2024 2:00 PM
              </p>

              {/* Botón de Inscribirse */}
              <button 
                onClick={handleRegister} 
                className="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold w-full"
              >
                INSCRIBIRSE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Confirmación de Inscripción */}
      {isRegistered && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold mb-4">¡INSCRIPCIÓN REALIZADA!</h2>
            <p className="text-green-600 font-semibold mb-4">Inscripción realizada correctamente.</p>
            <button 
              onClick={handleClose} 
              className="bg-green-600 text-white py-2 px-4 rounded-lg font-semibold"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EventDetailModal;

