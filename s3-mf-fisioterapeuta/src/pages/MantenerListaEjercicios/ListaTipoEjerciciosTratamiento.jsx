
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate

const exercises = [
  {
    tipo: 'Fortalecimiento',
    descripcion: 'Ejercicios para aumentar la fuerza muscular y la estabilidad articular.',
  },
  {
    tipo: 'Estiramiento',
    descripcion: 'Ejercicios para mejorar la flexibilidad y aliviar la tensión muscular.',
  },
  {
    tipo: 'Equilibrio',
    descripcion: 'Ejercicios para mejorar la estabilidad y prevenir caídas.',
  },
  {
    tipo: 'Movilidad',
    descripcion: 'Ejercicios que incrementan el rango de movimiento de las articulaciones.',
  },
];

function ListaTipoEjerciciosTratamiento() {
  const navigate = useNavigate(); // Define el hook useNavigate

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header */}
      <header className="bg-white shadow w-full max-w-5xl">
        <div className="flex justify-between items-center py-4 px-6">

        <button
      className="text-gray-700 font-medium"
      onClick={() => window.history.back()}
    >
      &lt; Regresar
    </button> 
          <h1 className="text-2xl font-bold text-red-700 text-center w-full ml-[-50px]">
            LISTA DE TIPOS DE EJERCICIOS DE TRATAMIENTO
          </h1>
        </div>

        {/* Filtro y botón */}
        <div className="flex justify-between items-center px-6 py-4 bg-white">
          <select className="bg-red-700 text-white p-2 rounded-lg">
            <option>Activos</option>
            <option>Inactivos</option>
          </select>

          <Link to="/RegistroTipoEjerciciosTratamiento" className="bg-red-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center">
            <span className="mr-2 text-xl">+</span> Registrar Nuevo Tipo
          </Link>
        </div>
      </header>

      {/* Tabla */}
      <div className="overflow-x-auto mt-6 w-full max-w-5xl">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left py-3 px-6 font-semibold text-gray-700">TIPO</th>
              <th className="text-left py-3 px-6 font-semibold text-gray-700">Descripción</th>
              <th className="text-left py-3 px-6 font-semibold text-gray-700">ACCIÓN</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((exercise, index) => (
              <tr key={index} className="border-t">
                <td className="py-3 px-6 text-gray-700">{exercise.tipo}</td>
                <td className="py-3 px-6 text-gray-500">{exercise.descripcion}</td>
                <td className="py-3 px-6">
                  <button className="bg-red-700 text-white py-2 px-4 rounded-lg">DESACTIVAR</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListaTipoEjerciciosTratamiento;
