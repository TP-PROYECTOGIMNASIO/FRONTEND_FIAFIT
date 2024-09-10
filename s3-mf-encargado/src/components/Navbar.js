import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-red-500 p-4 flex justify-between">
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo" className="h-10" />
        <span className="ml-2 text-white text-xl">FIA FIT</span>
      </div>
      <div>
        <button className="text-white mr-4">Inicio</button>
        <button className="text-white mr-4">Productos</button>
        <button className="text-white mr-4">Carrito</button>
        <button className="text-white mr-4">Perfil</button>
      </div>
    </nav>
  );
};

export default Navbar;
