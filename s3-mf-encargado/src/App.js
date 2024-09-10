import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlanGenerado from './pages/PlanGenerado';
import DiasEntrenamiento from './pages/DiasEntrenamiento';
import EjerciciosDia from './pages/EjerciciosDia';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlanGenerado />} />
        <Route path="/dias" element={<DiasEntrenamiento />} />
        <Route path="/ejercicios/:day" element={<EjerciciosDia />} />
      </Routes>
    </Router>
  );
};

export default App;