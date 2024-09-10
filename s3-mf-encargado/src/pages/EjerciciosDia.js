import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';

const EjerciciosDia = () => {
  const { day } = useParams();
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/plan-de-entrenamiento/hu-tp-11')
      .then(response => response.json())
      .then(data => setExercises(data[day]?.exercises || []))
      .catch(error => console.error('Error fetching exercises:', error));
  }, [day]);

  return (
    <div className="min-h-screen bg-white text-gray-700 flex flex-col">
      <Navbar />
      <div className="container mx-auto p-4 flex-grow">
        <button className="text-red-500 mb-4" onClick={() => window.history.back()}>Regresar</button>
        <h1 className="text-3xl mb-4">Día {day}</h1>
        <ul>
          {exercises.map((exercise, index) => (
            <li key={index} className="bg-gray-200 p-4 mb-2 rounded">
              <img src={exercise.image} alt={exercise.name} className="w-full h-32 object-cover mb-2" />
              <p>{exercise.name}</p>
              <p>{exercise.reps}</p>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default EjerciciosDia;
