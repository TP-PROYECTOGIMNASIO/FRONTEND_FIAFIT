import React, { useState, useEffect } from 'react';

const NutritionPlan = () => {
  const [plan, setPlan] = useState(null);

  // Función para obtener los datos de la API
  useEffect(() => {
    fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/plan-de-nutricion/hu-tp-13?clientId=1')
      .then(response => response.json())
      .then(data => setPlan(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Función para convertir el número de día en el nombre del día de la semana
  const getDayName = (dayNumber) => {
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    return days[dayNumber - 1]; // Restamos 1 porque el índice del array comienza en 0
  };

  if (!plan) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <button 
        onClick={() => window.history.back()} 
        className="text-left mb-4 text-sm text-gray-600">
        &#8592; Regresar
      </button>
      <h2 className="text-center text-xl font-bold mb-4 text-red-600">Cronograma</h2>
      <table className="w-full text-center border border-collapse border-red-600">
        <thead>
          <tr className="bg-red-600 text-white">
            <th className="p-2 border border-red-600">Día</th>
            <th className="p-2 border border-red-600">Desayuno</th>
            <th className="p-2 border border-red-600">Almuerzo</th>
            <th className="p-2 border border-red-600">Cena</th>
            <th className="p-2 border border-red-600">Notas</th>
          </tr>
        </thead>
        <tbody>
          {plan.days.map(day => (
            <tr key={day.diet_plan_day_id}>
              <td className="p-2 border border-red-600 text-red-600">{getDayName(day.day_number)}</td>
              <td className="p-2 border border-red-600">{day.breakfast}</td>
              <td className="p-2 border border-red-600">{day.lunch}</td>
              <td className="p-2 border border-red-600">{day.dinner}</td>
              <td className="p-2 border border-red-600">{day.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NutritionPlan;
