import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex items-center">
        {/* Logo */}
        <img src="ruta/de/tu/logo.png" alt="FIA Fit" className="h-10 w-auto"/>
      </div>
      <nav className="flex space-x-6">
        <a href="#" className="text-gray-700">Inicio</a>
        <a href="#" className="text-gray-700">Eventos</a>
        <a href="#" className="text-gray-700">Productos</a>
      </nav>
      <div className="flex items-center space-x-4">
        {/* Icons (Cart and User) */}
        <button className="text-gray-700">
          <i className="fas fa-shopping-cart"></i>
        </button>
        <button className="text-gray-700">
          <i className="fas fa-user"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;


