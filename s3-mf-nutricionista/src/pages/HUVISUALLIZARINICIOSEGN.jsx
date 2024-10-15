import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const HUVISUALLIZARINICIOSEGN = () => {

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/empleados/hu-tp-35');
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
        setClients([]); // Establecer array vacío en caso de error
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handlePlanClick = () => {
    if (clients.length === 0) {
      alert('No hay clientes disponibles.');
    } else {
      navigate('/listar-clientes');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-end p-10 relative">
      <img
        src="/wasa.jpeg"
        alt="Imagen de fondo"
        className="absolute left-0 bottom-0 w-full h-full object-cover z-0"
      />

      <div className="w-full max-w-4xl relative z-10"> {/* Añado relative y z-10 */}

        <div className="grid grid-cols-2 gap-12">
          <div className="text-left">
            
          </div>

          <div className="text-left">
            <div className="absolute top-4 right-4">
            <button 
                onClick={handlePlanClick}
              
              >
                <h3 className="bg-white text-red-500 text-2xl font-bold py-3 px-6 rounded-lg shadow-md hover:bg-red-500 hover:text-white transition duration-300 font-poppins">EMPEZAR PLAN ALIMENTICIO</h3>
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HUVISUALLIZARINICIOSEGN;
