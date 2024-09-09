// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/index.css";  // Actualización de la ruta al CSS
import App from "./pages/App";  // Actualización de la ruta

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);