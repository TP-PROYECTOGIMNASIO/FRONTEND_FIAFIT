import React, { useState } from 'react';
import './App.css';
import logo from './img/LOGO.png';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [stateChangeModalVisible, setStateChangeModalVisible] = useState(false);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [tipo, setTipo] = useState('Personal');
  const [formaDePago, setFormaDePago] = useState('Mensual');
  const [membresias, setMembresias] = useState([
    { nombre: 'PRO', precio: '50', tipo: 'Personal', formaDePago: 'Mensual', estado: 'Activa' },
    { nombre: 'BÁSICA', precio: '30', tipo: 'Familiar', formaDePago: 'Semestral', estado: 'Inactiva' }
  ]);
  const [selectedMembership, setSelectedMembership] = useState(null);
  const [filter, setFilter] = useState('activas');

  const handleCreateMembership = () => {
    setConfirmModalVisible(true);
  };

  const handleConfirmCreation = () => {
    setMembresias([...membresias, { nombre, precio, tipo, formaDePago, estado: 'Activa' }]);
    setConfirmModalVisible(false);
    setModalVisible(false);
    setNombre('');
    setPrecio('');
    setTipo('Personal');
    setFormaDePago('Mensual');
  };

  const handleShowInfo = (membership) => {
    setSelectedMembership(membership);
    setInfoModalVisible(true);
  };

  const handleUpdateMembership = () => {
    setMembresias(membresias.map(m => m.nombre === selectedMembership.nombre ? selectedMembership : m));
    setInfoModalVisible(false);
  };

  const handleStateChange = () => {
    setStateChangeModalVisible(true);
  };

  const confirmStateChange = () => {
    setMembresias(membresias.map(m => 
      m.nombre === selectedMembership.nombre 
        ? { ...m, estado: m.estado === 'Activa' ? 'Inactiva' : 'Activa' } 
        : m
    ));
    setStateChangeModalVisible(false);
    setInfoModalVisible(false);
  };

  const filteredMembresias = membresias.filter(m => filter === 'activas' ? m.estado === 'Activa' : m.estado === 'Inactiva');

  return (
    <div className="container">
      <div className="header">
        <img src={logo} alt="" className='logo' />
        <div className="header-buttons">
          <button className="header-button">INICIO</button>
        </div>
      </div>

      <div className="body">
        <div className="actions-container">
          <button className="regresar-button">Regresar</button>
          <button className="create-button" onClick={() => setModalVisible(true)}>Crear nueva Membresía</button>
        </div>

        <div className="sort-container">
          <label>Ordenar por</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="picker">
            <option value="activas">Activas</option>
            <option value="inactivas">Inactivas</option>
          </select>
        </div>

        <div className="membership-container">
          {filteredMembresias.map((membership, index) => (
            <button
              key={index}
              className="membership-button"
              onClick={() => handleShowInfo(membership)}
            >
              {membership.nombre}
            </button>
          ))}
        </div>
      </div>

      {/* Modal para crear nueva membresía */}
      {modalVisible && (
        <div className="modal-container">
          <div className="modal-view">
            <h2>Crear Nueva Membresía</h2>

            <input
              type="text"
              placeholder="Nombre"
              className="input"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />

            <input
              type="text"
              placeholder="Precio"
              className="input"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />

            <label>Tipo</label>
            <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="picker">
              <option value="Personal">Personal</option>
              <option value="Familiar">Familiar</option>
            </select>

            <label>Forma de Pago</label>
            <select value={formaDePago} onChange={(e) => setFormaDePago(e.target.value)} className="picker">
              <option value="Mensual">Mensual</option>
              <option value="Bimestral">Bimestral</option>
              <option value="Trimestral">Trimestral</option>
              <option value="Semestral">Semestral</option>
              <option value="Anual">Anual</option>
            </select>

            <div className="modal-buttons">
              <button className="create-button-modal" onClick={handleCreateMembership}>AGREGAR</button>
              <button className="cancel-button-modal" onClick={() => setModalVisible(false)}>CANCELAR</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación */}
      {confirmModalVisible && (
        <div className="modal-container">
          <div className="modal-view">
            <h2>¿Seguro que deseas agregar la membresía?</h2>
            <div className="modal-buttons">
              <button className="create-button-modal" onClick={handleConfirmCreation}>SÍ</button>
              <button className="cancel-button-modal" onClick={() => setConfirmModalVisible(false)}>NO</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para mostrar y editar información de membresía */}
      {infoModalVisible && selectedMembership && (
        <div className="modal-container">
          <div className="modal-view">
            <h2>Detalles de la Membresía</h2>
            <p>Nombre: {selectedMembership.nombre}</p>
            <input
              type="text"
              placeholder="Precio"
              className="input"
              value={selectedMembership.precio}
              onChange={(e) => setSelectedMembership({ ...selectedMembership, precio: e.target.value })}
            />

            <label>Tipo</label>
            <select value={selectedMembership.tipo} onChange={(e) => setSelectedMembership({ ...selectedMembership, tipo: e.target.value })} className="picker">
              <option value="Personal">Personal</option>
              <option value="Familiar">Familiar</option>
            </select>

            <label>Forma de Pago</label>
            <select value={selectedMembership.formaDePago} onChange={(e) => setSelectedMembership({ ...selectedMembership, formaDePago: e.target.value })} className="picker">
              <option value="Mensual">Mensual</option>
              <option value="Bimestral">Bimestral</option>
              <option value="Trimestral">Trimestral</option>
              <option value="Semestral">Semestral</option>
              <option value="Anual">Anual</option>
            </select>
      
            <button
              className="toggle-state-button"
              onClick={handleStateChange}
            >
              {selectedMembership.estado === 'Activa' ? 'Desactivar' : 'Activar'} Membresía
            </button>

            <div className="modal-buttons">
              <button className="cancel-button-modal" onClick={() => setInfoModalVisible(false)}>REGISTRAR</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación para cambiar estado */}
      {stateChangeModalVisible && (
        <div className="modal-container">
          <div className="modal-view">
            <h2>
              ¿Seguro que deseas {selectedMembership?.estado === 'Activa' ? 'desactivar' : 'activar'} esta membresía?
            </h2>
            <div className="modal-buttons">
              <button className="create-button-modal" onClick={confirmStateChange}>SÍ</button>
              <button className="cancel-button-modal" onClick={() => setStateChangeModalVisible(false)}>NO</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
