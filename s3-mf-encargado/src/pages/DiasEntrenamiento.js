import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const DiasEntrenamiento = () => {
  return (
    <div className="min-h-screen bg-white text-gray-700 flex flex-col">
      <Navbar />
      <div className="container mx-auto p-4 flex-grow">
        <button className="text-red-500 mb-4" onClick={() => window.history.back()}>Regresar</button>
        <h1 className="text-3xl">Mi Plan de Entrenamiento</h1>
        <div className="grid grid-cols-4 gap-4 mt-4">
          {Array.from({ length: 7 }, (_, i) => (
            <Link key={i} to={`/ejercicios/${i + 1}`}>
              <button className="bg-gray-200 text-gray-700 p-4 rounded">Día {i + 1}</button>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DiasEntrenamiento;
