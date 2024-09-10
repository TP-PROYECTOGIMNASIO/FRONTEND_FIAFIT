import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const PlanGenerado = () => {
  const [month, setMonth] = React.useState('Marzo');

  return (
    <div className="min-h-screen bg-white text-gray-700 flex flex-col">
      <Navbar />
      <div className="container mx-auto p-4 flex-grow">
        <button className="text-red-500 mb-4" onClick={() => window.history.back()}>Regresar</button>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl">Plan de entrenamiento</h1>
          <select value={month} onChange={(e) => setMonth(e.target.value)} className="bg-gray-200 text-gray-700 p-2 rounded">
            <option value="Marzo">Marzo</option>
            <option value="Abril">Abril</option>
            <option value="Mayo">Mayo</option>
          </select>
        </div>
        <div className="bg-gray-200 p-4 mt-4 rounded flex items-center justify-between">
          <p>Plan generado: 15/07/2024</p>
          <button className="bg-red-500 text-white p-2 rounded">
            <i className="fas fa-eye"></i>
          </button>
        </div>
        <Link to="/dias">
          <button className="mt-4 bg-red-500 text-white p-4 rounded">Ver Plan</button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default PlanGenerado;
