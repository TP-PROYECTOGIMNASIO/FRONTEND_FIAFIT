import React, { useState } from 'react';
import NewMembershipForm from '../components/newMembershipForm';
import ConfirmPopup from '../components/confirmPopup';
import MembershipDetailPopup from '../components/membershipDetailPopup';
import './MembershipPage.css'; // Archivo de estilos
import logo from '../assets/Logo.png';
import user from '../assets/User.png';
import fb from '../assets/facebook.png';
import ig from '../assets/instagram.png';
import x from '../assets/X.avif';

const MembershipPage = () => {
  const [memberships, setMemberships] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [newMembershipData, setNewMembershipData] = useState(null);
  const [selectedMembership, setSelectedMembership] = useState(null);

  const handleAddMembership = (newMembership) => {
    setMemberships([...memberships, { ...newMembership, active: true }]);
    setShowConfirmPopup(false); // Cierra el pop-up de confirmación después de añadir la membresía
    setNewMembershipData(null); // Limpia los datos de membresía
  };

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleConfirm = () => {
    if (newMembershipData) {
      handleAddMembership(newMembershipData);
    }
  };

  const handleCancel = () => {
    setShowConfirmPopup(false);
    setShowPopup(false); // Cierra el pop-up de creación de membresía sin hacer cambios
  };

  const handleShowDetailPopup = (membership) => {
    setSelectedMembership(membership);
    setShowDetailPopup(true);
  };

  const handleCloseDetailPopup = () => {
    setShowDetailPopup(false);
    setSelectedMembership(null);
  };

  const handleToggleStatus = (membership) => {
    setMemberships(memberships.map(m =>
      m === membership ? { ...m, active: !m.active } : m
    ));
    handleCloseDetailPopup();
  };

  // Añadir una función para actualizar la membresía seleccionada
const handleUpdateMembership = (updatedMembership) => {
    setMemberships(
      memberships.map((m) =>
        m.name === updatedMembership.name ? updatedMembership : m
      )
    );
    handleCloseDetailPopup(); // Cierra el pop-up después de guardar cambios
  };
  
  // Pasa la función de actualización como prop al pop-up de detalle
  {showDetailPopup && selectedMembership && (
    <MembershipDetailPopup
      membership={selectedMembership}
      onClose={handleCloseDetailPopup}
      onToggleStatus={handleToggleStatus}
      onUpdateMembership={handleUpdateMembership} // Añadir esta línea
    />
  )}
  
  return (
    <div className="membership-container">
      <header className="header">
        <img src={logo} alt="FIA FIT Logo" className="logo" />
        <div className="header-right">
          <button className="inicio-button">Inicio</button>
          <img src={user} alt="User" className="user-avatar" />
        </div>
      </header>

      <main className="main-content">
        <div className="top-buttons">
          <button className="back-button">&larr; Regresar</button>
          <button className="register-button" onClick={handleShowPopup}>
            + Registrar Nueva Membresía
          </button>
        </div>

        <div className="order-section">
          <button className="order-button">Ordenar por</button>
          <select className="order-select">
            <option value="activas">Activas</option>
            <option value="inactivas">Inactivas</option>
          </select>
        </div>

        <div className="membership-buttons">
          {memberships.map((membership, index) => (
            <div 
              key={index} 
              className={`membership-item ${membership.active ? '' : 'inactive'}`}
              onClick={() => handleShowDetailPopup(membership)}
            >
              {membership.name} - {membership.price} - {membership.details}
            </div>
          ))}
        </div>
      </main>

      <footer className="footer">
        <p>Copyright © Gimnasio 2024</p>
        <div className="social-media-icons">
          <img src={fb} alt="Facebook" />
          <img src={ig} alt="Instagram" />
          <img src={x} alt="Twitter" />
          <img src="/assets/youtube.png" alt="YouTube" />
        </div>
      </footer>

      {showPopup && (
        <div className="popup">
          <NewMembershipForm 
            onAddMembership={(membership) => {
              setNewMembershipData(membership);
              setShowConfirmPopup(true);
              setShowPopup(false); // Cierra el pop-up de formulario
            }}
            onClose={handleClosePopup} // Añadir la función para cerrar el pop-up
          />
        </div>
      )}

      {showConfirmPopup && (
        <ConfirmPopup 
          onConfirm={handleConfirm} 
          onCancel={handleCancel} 
        />
      )}

      {showDetailPopup && selectedMembership && (
        <MembershipDetailPopup 
          membership={selectedMembership}
          onClose={handleCloseDetailPopup}
          onToggleStatus={handleToggleStatus}
        />
      )}
    </div>
  );
};

export default MembershipPage;












