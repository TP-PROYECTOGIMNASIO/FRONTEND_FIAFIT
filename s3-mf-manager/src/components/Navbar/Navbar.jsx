import React from 'react';
import './Navbar.css'; // Asegúrate de que este archivo CSS exista
import logo from '../../assets/logo.png'; // Logo principal
import profileImage from '../../assets/profile.jpg'; // Imagen de perfil

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="navbar-links">
        <a href="/">Inicio</a>
        <img src={profileImage} alt="Perfil" className="navbar-profile" />
      </div>
    </nav>
  );
};

export default Navbar;
