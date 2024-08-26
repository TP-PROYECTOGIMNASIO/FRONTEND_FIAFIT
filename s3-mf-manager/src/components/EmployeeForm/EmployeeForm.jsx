import React, { useState } from 'react';
import './EmployeeForm.css';

const EmployeeForm = ({ onClose, addEmployee }) => {
  const [formData, setFormData] = useState({
    dni: '',
    nombres: '',
    primerApellido: '',
    segundoApellido: '',
    genero: '',
    ciudad: '',
    distrito: '',
    direccion: '',
    sede: '',
    rol: '',
    contrato: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { dni, nombres, primerApellido, segundoApellido } = formData;

    if (dni && nombres && primerApellido && segundoApellido) {
      addEmployee(formData);
      alert('Empleado agregado con éxito');
      onClose();
    } else {
      alert('No se han completado los datos correctamente');
    }
  };

  const handleSearchSUNAT = async () => {
    if (formData.dni) {
      try {
        const response = await fetch(`https://km60tf0wo7.execute-api.us-east-2.amazonaws.com/v0/api?dni=${formData.dni}`);
        const data = await response.json();
        setFormData({
          ...formData,
          nombres: data.nombres,
          primerApellido: data.apellido_paterno,
          segundoApellido: data.apellido_materno,
          direccion: data.direccion,
          genero: data.genero,
          ciudad: data.ciudad,
          distrito: data.distrito
        });
      } catch (error) {
        alert('No se encontraron datos para el DNI proporcionado.');
      }
    } else {
      alert('Por favor, ingrese un DNI.');
    }
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <h2>Agregar Empleado</h2>
      <div className="dni-section">
        <input
          type="text"
          name="dni"
          placeholder="DNI"
          value={formData.dni}
          onChange={handleChange}
        />
        <button type="button" className="search-sunat-btn" onClick={handleSearchSUNAT}>
          Buscar por SUNAT
        </button>
      </div>
      <input
        type="text"
        name="nombres"
        placeholder="Nombres"
        value={formData.nombres}
        onChange={handleChange}
      />
      <input
        type="text"
        name="primerApellido"
        placeholder="Primer Apellido"
        value={formData.primerApellido}
        onChange={handleChange}
      />
      <input
        type="text"
        name="segundoApellido"
        placeholder="Segundo Apellido"
        value={formData.segundoApellido}
        onChange={handleChange}
      />

      {/* Género (Desplegable) */}
      <select name="genero" value={formData.genero} onChange={handleChange}>
        <option value="">Selecciona Género</option>
        <option value="masculino">Masculino</option>
        <option value="femenino">Femenino</option>
      </select>

      {/* Ciudad */}
      <input
        type="text"
        name="ciudad"
        placeholder="Ciudad"
        value={formData.ciudad}
        onChange={handleChange}
      />

      {/* Distrito */}
      <input
        type="text"
        name="distrito"
        placeholder="Distrito"
        value={formData.distrito}
        onChange={handleChange}
      />

      {/* Dirección */}
      <input
        type="text"
        name="direccion"
        placeholder="Dirección"
        value={formData.direccion}
        onChange={handleChange}
      />

      {/* Sede (Desplegable) */}
      <select name="sede" value={formData.sede} onChange={handleChange}>
        <option value="">Selecciona Sede</option>
        <option value="la_molina">La Molina</option>
        <option value="san_isidro">San Isidro</option>
      </select>

      {/* Rol (Desplegable) */}
      <select name="rol" value={formData.rol} onChange={handleChange}>
        <option value="">Selecciona Rol</option>
        <option value="entrenador">Entrenador</option>
        <option value="encargado">Encargado</option>
      </select>

      {/* Contrato (Archivo) */}
      <input
        type="file"
        name="contrato"
        onChange={(e) => setFormData({ ...formData, contrato: e.target.files[0] })}
      />

      <button type="submit">Agregar</button>
      <button type="button" onClick={onClose}>Volver</button>
    </form>
  );
};

export default EmployeeForm;
