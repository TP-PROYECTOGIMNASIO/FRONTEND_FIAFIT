// src/TrainingPlan.jsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importa useNavigate y Link
import PlanEntrenamientoDia from '../pages/PlanEntrenamientoDia/PlanEntrenamientoDia';

const TrainingPlan = () => {
  const navigate = useNavigate(); // Hook para redirección

  // Función para manejar la redirección
  const handleGeneratePlan = () => {
    navigate('/PlanEntrenamientoDia'); // Redirige a /plandeentrenamientodia
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 relative max-w-md w-full">
        {/* Botón de cerrar como un Link */}
        <Link 
          to="/" 
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-xl font-bold"
        >
          X
        </Link>

        {/* Título principal */}
        <h2 className="text-2xl font-semibold text-center mb-4" style={{ color: '#8c1c13' }}>
          Plan de Entrenamiento
        </h2>

        {/* Nombre del alumno */}
        <p className="text-lg text-gray-600 mb-4 text-center">
          Nombre del Alumno
        </p>

        {/* Mensaje principal */}
        <div className="text-center text-gray-600 bg-gray-100 p-4 rounded-lg mb-6">
          No se encuentra plan de entrenamiento asignado
        </div>

        {/* Botón de acción */}
        <button 
          className="w-full text-white py-2 rounded-lg hover:bg-red-800 transition-colors"
          style={{ backgroundColor: '#b5121c' }}
          onClick={handleGeneratePlan} // Llama a la función que redirige
        >
          GENERAR PLAN DE ENTRENAMIENTO
        </button>
      </div>
    </div>
  );
};

export default TrainingPlan;
