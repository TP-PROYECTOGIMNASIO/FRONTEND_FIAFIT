import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const RegistroEntrenamiento = () => {
  const [ejercicios, setEjercicios] = useState([]);
  const [NdiaSeleccionado, setDiaSeleccionado] = useState('');
  const [diaSeleccionado, DiasetDiaSeleccionado] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const diaGuardado = localStorage.getItem('NdiaSeleccionado');
    setDiaSeleccionado(diaGuardado);
    const diaSeleccionado = localStorage.getItem('diaSeleccionado');
    DiasetDiaSeleccionado(diaSeleccionado);
    const storedEjercicios = JSON.parse(localStorage.getItem('ejercicios')) || [];
    setEjercicios(storedEjercicios);

  }, []);

  const trainingPlanId = 11;  
  const focus = "Espalda";  
  const handleSave = async () => {
    const payload = {
      plan_day_id: NdiaSeleccionado,
      training_plan_id: trainingPlanId,
      day: parseInt(NdiaSeleccionado, 10),  
      focus: focus,
      exercises: ejercicios.map(ejercicio => ({
          day_exercise_id: ejercicio.id || null,  
          plan_day_id: NdiaSeleccionado,
          exercise_id: ejercicio.id,  
          sets: ejercicio.series,  
          reps: ejercicio.repeticiones  
        }))
    };
   
    try {
      const response = await fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/plan-de-entrenamiento/hu-tp-28', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Plan de entrenamiento guardado con éxito:', result);
        alert('Plan de entrenamiento guardado con éxito!');
        localStorage.setItem('diaSeleccionado', NdiaSeleccionado);
        navigate('/');

      } else {
        console.error('Error al guardar el plan de entrenamiento:', response.statusText);
        alert('Error al guardar el plan de entrenamiento.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor.');
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center relative">
      <button
        className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
        onClick={() => window.history.back()}
      >
        &lt; Regresar
      </button>

      <button
        className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700"
        onClick={handleSave}
      >
        GUARDAR
      </button>

      <h1 className="text-red-600 text-xl font-bold mt-16">Registro de Entrenamiento</h1>
      <h2 className="text-gray-700 text-lg mb-4">Nombre del Alumno</h2>

     
      <h3 className="text-red-600 text-lg font-semibold">  {diaSeleccionado} </h3>

      <div className="w-full max-w-4xl bg-gray-400 shadow-md rounded-lg p-4 mt-4">
        <table className="w-full text-center text-white">
          <thead>
            <tr>
              <th className="p-2 text-gray-600">Espalda</th>
              <th className="p-2 text-gray-600">Ejercicio</th>
              <th className="p-2 text-gray-600">Repeticiones</th>
              <th className="p-2 text-gray-600">Series</th>
              <th className="p-2 text-gray-600">Acción</th>
            </tr>
          </thead>
          <tbody>
            {ejercicios.map((item, index) => (
              <tr key={index}>
                <td className="p-2 flex justify-center items-center">
                  <img
                    src={`/espalda${index + 1}.png`}
                    alt="Ejercicio"
                    className="w-auto h-auto max-w-full max-h-16 object-cover"
                  />
                </td>
                <td className="p-2">
                  <div className="bg-white h-16 flex justify-center items-center p-2 rounded-lg">
                    <span className="text-gray-800">{item.nombre}</span>
                  </div>
                </td>
                <td className="p-2">
                  <div className="bg-white h-16 flex justify-center items-center p-2 rounded-lg">
                    <span className="text-gray-800">{item.repeticiones}</span>
                  </div>
                </td>
                <td className="p-2">
                  <div className="bg-white h-16 flex justify-center items-center p-2 rounded-lg">
                    <span className="text-gray-800">{item.series}</span>
                  </div>
                </td>
                <td className="p-2">
                  <div className="bg-white h-16 flex justify-center items-center p-2 rounded-lg">
                    <button className="text-red-600 hover:text-red-800">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegistroEntrenamiento;
