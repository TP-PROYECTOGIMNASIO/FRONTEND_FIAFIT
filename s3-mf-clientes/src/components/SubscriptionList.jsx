import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SubscriptionList = () => {
  const [, setSubscriptions] = useState([]);
  const [activeSubscription, setActiveSubscription] = useState(null);
  const [pastSubscriptions, setPastSubscriptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Obtener las suscripciones desde la API
  useEffect(() => {
    fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/membresias/hu-tp-21?client_id=1')
      .then(response => response.json())
      .then(data => {
        const active = data.find(sub => sub.status === 'activo');
        const past = data.filter(sub => sub.status === 'cancelado');
        setSubscriptions(data);
        setActiveSubscription(active);
        setPastSubscriptions(past);
      })
      .catch(error => console.error('Error al obtener suscripciones:', error));
  }, []);

  // Manejar el click en el botón de actualizar suscripción
  const handleUpdateClick = () => {
    if (activeSubscription) {
      setShowModal(true); // Mostrar modal si hay una suscripción activa
    } else {
      navigate('/update-subscription'); // Redirigir si no hay suscripción activa
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      {/* Botón de regresar */}
      <button
        onClick={() => navigate(-1)}
        className="text-gray-600 font-bold flex items-center mb-4"
      >
        <span className="ml-2">Regresar</span>
      </button>

      {/* Encabezado y botón de actualización */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-red-600">Mi Suscripción</h2>
        <button
          onClick={handleUpdateClick}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Actualizar suscripción
        </button>
      </div>

      {/* Suscripción activa */}
      {activeSubscription && (
        <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
          <p className="text-lg font-bold text-gray-800">Membresía Black Sede Santa Anita</p>
          <div className="grid grid-cols-4 gap-4 text-sm text-gray-600 mt-4">
            <div>
              <p className="font-bold">Fecha de inicio:</p>
              <p>{new Date(activeSubscription.membership_start_date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="font-bold">Fecha de vencimiento:</p>
              <p>{new Date(activeSubscription.membership_end_date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="font-bold">Fecha de pago:</p>
              <p>{new Date(activeSubscription.created_at).toLocaleString()}</p>
            </div>
            <div className="flex flex-col justify-between">
              <p className="font-bold">Estado:</p>
              <p className="text-green-600 font-semibold">Activo</p>
              <button className="mt-2 text-gray-600 font-medium hover:text-red-800">Descargar Comprobante</button>
            </div>
          </div>
        </div>
      )}

      {/* Título de suscripciones pasadas */}
      <h3 className="text-2xl font-semibold text-red-600 mb-4">Mis Suscripciones Pasadas</h3>

      {/* Lista de suscripciones pasadas */}
      <ul className="space-y-4">
        {pastSubscriptions.map(sub => (
          <li key={sub.client_membership_id} className="p-4 bg-white rounded-lg shadow-md">
            <p className="text-lg font-bold text-gray-800">Membresía Black Sede Santa Anita</p>
            <div className="grid grid-cols-4 gap-4 text-sm text-gray-600 mt-4">
              <div>
                <p className="font-bold">Fecha de inicio:</p>
                <p>{new Date(sub.membership_start_date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="font-bold">Fecha de vencimiento:</p>
                <p>{new Date(sub.membership_end_date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="font-bold">Fecha de pago:</p>
                <p>{new Date(sub.created_at).toLocaleString()}</p>
              </div>
              <div className="flex flex-col justify-between">
                <p className="font-bold">Estado:</p>
                <p className="text-red-600 font-semibold">Cancelado</p>
                <button className="mt-2 text-gray-600 font-medium hover:text-red-800">Descargar Comprobante</button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal de advertencia */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <p className="text-red-500">No puedes actualizar tu suscripción mientras esté activa.</p>
            <button onClick={() => setShowModal(false)} className="mt-4 bg-red-500 text-white p-2 rounded-lg">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionList;