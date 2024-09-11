// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/index.css";  // Actualización de la ruta al CSS
import App from "./pages/App";  // Actualización de la ruta


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
)
