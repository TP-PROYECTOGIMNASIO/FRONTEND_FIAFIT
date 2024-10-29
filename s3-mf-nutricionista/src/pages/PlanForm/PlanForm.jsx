import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const PlanForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [registeredDays, setRegisteredDays] = useState({
    'Lunes': false,
    'Martes': false,
    'Miércoles': false,
    'Jueves': false,
    'Viernes': false,
  });
  const [message, setMessage] = useState('');

  const [namePlan, setNamePlan] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [proteinGr, setProteinGr] = useState('');
  const [carbohydratesGr, setCarbohydratesGr] = useState('');
  const [dailyCaloriesKcal, setDailyCaloriesKcal] = useState('');

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const clientId = params.get('client_id');

  const [daysData, setDaysData] = useState({
    'Lunes': { breakfast: '', lunch: '', dinner: '', notes: '' },
    'Martes': { breakfast: '', lunch: '', dinner: '', notes: '' },
    'Miércoles': { breakfast: '', lunch: '', dinner: '', notes: '' },
    'Jueves': { breakfast: '', lunch: '', dinner: '', notes: '' },
    'Viernes': { breakfast: '', lunch: '', dinner: '', notes: '' },
  });

  const openModal = (day) => {
    setSelectedDay(day);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDay('');
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (
      !daysData[selectedDay].breakfast ||
      !daysData[selectedDay].lunch ||
      !daysData[selectedDay].dinner ||
      !daysData[selectedDay].notes
    ) {
      alert('Debe completar los campos');
      return;
    }

    // Marcar el día seleccionado como registrado
    setRegisteredDays((prevDays) => ({
      ...prevDays,
      [selectedDay]: true,
    }));

    closeModal();
  };

  const handleDayChange = (field, value) => {
    setDaysData((prevDays) => ({
      ...prevDays,
      [selectedDay]: { ...prevDays[selectedDay], [field]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clientId) {
      alert('No se encontró el ID del cliente en la URL.');
      return;
    }

    const allRegistered = Object.values(registeredDays).every((isRegistered) => isRegistered);

    if (!allRegistered) {
      setMessage('Aún no has registrado todos los días.');
      setTimeout(() => setMessage(''), 5000);
      return;
    }

    const confirmRegister = window.confirm('¿Seguro que deseas registrar este plan?');
    if (confirmRegister) {
      try {
        const response = await fetch(
          'https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/plan-de-nutricion/hu-tp-34',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              client_id: clientId,
              name_plan: namePlan,
              start_date: startDate,
              end_date: endDate,
              protein_gr: parseFloat(proteinGr),
              carbohydrates_gr: parseFloat(carbohydratesGr),
              daily_calories_kcal: parseInt(dailyCaloriesKcal, 10),
              days: Object.keys(registeredDays)
                .filter((day) => registeredDays[day])
                .map((day, index) => ({
                  day_number: index + 1,
                  breakfast: daysData[day].breakfast,
                  lunch: daysData[day].lunch,
                  dinner: daysData[day].dinner,
                  notes: daysData[day].notes,
                })),
            }),
          }
        );

        if (response.ok) {
          alert('Plan registrado con éxito!');
          setNamePlan('');
          setStartDate('');
          setEndDate('');
          setProteinGr('');
          setCarbohydratesGr('');
          setDailyCaloriesKcal('');
          setRegisteredDays({
            Lunes: false,
            Martes: false,
            Miércoles: false,
            Jueves: false,
            Viernes: false,
          });
          setDaysData({
            Lunes: { breakfast: '', lunch: '', dinner: '', notes: '' },
            Martes: { breakfast: '', lunch: '', dinner: '', notes: '' },
            Miércoles: { breakfast: '', lunch: '', dinner: '', notes: '' },
            Jueves: { breakfast: '', lunch: '', dinner: '', notes: '' },
            Viernes: { breakfast: '', lunch: '', dinner: '', notes: '' },
          });
          setShowModal(false);
          setSelectedDay('');
        } else {
          alert('Hubo un problema al registrar el plan.');
        }
      } catch (error) {
        console.error('Error al hacer la solicitud POST:', error);
        alert('Error al conectar con la API.');
      }
    }
  };

  return (
    <div className="min-h-[82.25vh] bg-gray-100 flex flex-col items-center justify-center py-4 relative">
      {/* Botón Regresar */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-4 left-4 text-gray-600 text-2xl hover:text-black"
      >
        <span>&lt; Regresar</span>
      </button>

      {/* Contenedor Principal */}
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-8 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold mb-2 text-[#8c1c13] text-[24px]">SOBRE EL PLAN</h2>
          <button
            className="bg-[#b5121c] text-white py-0 px-4 rounded hover:bg-red-700 text-[24px]"
            onClick={handleSubmit}
          >
            REGISTRAR
          </button>
        </div>

        {/* Campos del Formulario */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="col-span-3 md:col-span-1">
            <label className="block text-gray-700 font-bold mb-2" style={{ fontSize: '20px' }}>
              Nombre del Plan:
            </label>
            <input
              type="text"
              value={namePlan}
              onChange={(e) => setNamePlan(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-800 focus:outline-none"
            />
          </div>

          <div className="col-span-3 md:col-span-1">
            <label className="block text-gray-700 font-bold mb-2" style={{ fontSize: '20px' }}>
              Fecha de Inicio:
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-800 focus:outline-none"
            />
          </div>

          <div className="col-span-3 md:col-span-1">
            <label className="block text-gray-700 font-bold mb-2" style={{ fontSize: '20px' }}>
              Fecha de Fin:
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-800 focus:outline-none"
            />
          </div>
        </div>

        {/* Macronutrientes */}
        <h3 className="font-semibold mb-2 text-[#8c1c13] text-[24px]">Distribución de Macronutrientes:</h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-[#4b4f57] font-bold mb-2" style={{ fontSize: '20px' }}>
              Proteínas
            </label>
            <input
              type="text"
              value={proteinGr}
              onChange={(e) => setProteinGr(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-800 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#4b4f57] font-bold mb-2" style={{ fontSize: '20px' }}>
              Carbohidratos
            </label>
            <input
              type="text"
              value={carbohydratesGr}
              onChange={(e) => setCarbohydratesGr(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-800 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#4b4f57] font-bold mb-2" style={{ fontSize: '20px' }}>
              Calorías Diarias
            </label>
            <input
              type="text"
              value={dailyCaloriesKcal}
              onChange={(e) => setDailyCaloriesKcal(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-800 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Mensaje de error */}
      {message && (
        <div className="bg-red-200 text-red-700 p-4 rounded mt-4">
          {message}
        </div>
      )}

      {/* Espacio de separación */}
      <div className="my-1"></div>

      {/* Contenedor de Botones de Días */}
      <div className="bg-white w-full max-w-3xl p-4 rounded-lg mx-auto shadow-md">
        <div className="flex justify-center gap-4 mb-4">
          {['Lunes', 'Martes', 'Miércoles'].map((day) => (
            <button
              key={day}
              onClick={() => openModal(day)}
              className={`text-white font-semibold text-[24px] py-2 rounded hover:bg-[#8c1c13]`}
              style={{
                backgroundColor: registeredDays[day] ? '#b5121c' : '#4b4f57',
                width: '200px',
              }}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          {['Jueves', 'Viernes'].map((day) => (
            <button
              key={day}
              onClick={() => openModal(day)}
              className={`text-white font-semibold text-[24px] py-2 rounded hover:bg-[#8c1c13]`}
              style={{
                backgroundColor: registeredDays[day] ? '#b5121c' : '#4b4f57',
                width: '200px',
              }}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Modal de Registro de Comidas */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">Comidas para {selectedDay}</h2>
            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Desayuno:</label>
                <input
                  type="text"
                  value={daysData[selectedDay].breakfast}
                  onChange={(e) => handleDayChange('breakfast', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-800 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Almuerzo:</label>
                <input
                  type="text"
                  value={daysData[selectedDay].lunch}
                  onChange={(e) => handleDayChange('lunch', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-800 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Cena:</label>
                <input
                  type="text"
                  value={daysData[selectedDay].dinner}
                  onChange={(e) => handleDayChange('dinner', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-800 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Notas:</label>
                <textarea
                  value={daysData[selectedDay].notes}
                  onChange={(e) => handleDayChange('notes', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-800 focus:outline-none"
                />
              </div>
              <div className="flex justify-between">
                <button type="submit" className="bg-[#b5121c] text-white py-2 px-4 rounded hover:bg-red-700">
                  Agregar
                </button>
                <button type="button" onClick={closeModal} className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanForm;
