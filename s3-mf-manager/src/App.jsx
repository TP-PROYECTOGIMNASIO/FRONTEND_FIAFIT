import React from 'react';
import EmployeeList from '../src/components/EmployeeList/EmployeeList';
import Navbar from '../src/components/Navbar/Navbar';  // Importamos el nuevo componente Navbar
import './App.css'; // Importamos el CSS global para asegurarnos de que los estilos se apliquen correctamente

const App = () => {
  return (
    <div className="App">
      <Navbar />  {/* Agregamos el navbar */}
      <EmployeeList />
    </div>
  );
};

export default App;
