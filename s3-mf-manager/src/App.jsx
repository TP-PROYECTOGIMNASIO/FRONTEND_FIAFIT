// src/App.jsx
import React from 'react';
import MembershipPage from './pages/membershipPage'; // Importa la página de membresías
import './App.css'; // Importa el archivo de estilos globales si es necesario

const App = () => {
  return (
    <div className="App">
      {/* Renderiza la página de membresías */}
      <MembershipPage />
    </div>
  );
};

export default App;

