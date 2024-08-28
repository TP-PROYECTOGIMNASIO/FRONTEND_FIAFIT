import React from 'react';
import AddProductButton from './components/AddProductButton';
import ProductTable from './components/ProductTable';
import logo from './assets/Logo.png';
import './styles.css';

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <img src={logo} alt="FIA Fit Logo" className="logo" />
        <a href="#" className="home-link">INICIO</a>
      </header>
      <div className="main-content">
        <h1 className="page-title">TIPOS DE PRODUCTOS</h1>
        <div className="top-buttons">
          <a href="#" className="back-link">← Regresar</a>
          <AddProductButton />
        </div>
        <div className="search-container">
          <input type="text" placeholder="Buscar..." />
        </div>
      </div>
      <ProductTable />
      <footer>
        Copyright © Gimnasio 2024
      </footer>
    </div>
  );
}

export default App;


