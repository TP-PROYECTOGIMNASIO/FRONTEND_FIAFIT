import React, { useState, useEffect } from 'react';
import EmployeeForm from '../EmployeeForm/EmployeeForm';
import Modal from '../Modal/Modal';
import './EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    sede: '',
    rol: '',
    estado: ''
  });
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const mapRol = {
    entrenador: "Entrenador",
    encargado: "Encargado",
  };

  const mapSede = {
    la_molina: "La Molina",
    san_isidro: "San Isidro",
  };

  useEffect(() => {
    // Fetching employees from the API
    const fetchEmployees = async () => {
      try {
        const response = await fetch('https://q7qttgu4qi.execute-api.us-east-2.amazonaws.com/v0/api');
        const data = await response.json();
        const mappedData = data.map((employee) => ({
          ...employee,
          rol: mapRol[employee.rol] || employee.rol,
          sede: mapSede[employee.sede] || employee.sede,
        }));
        setEmployees(mappedData);
        setFilteredEmployees(mappedData);
      } catch (error) {
        alert('Error al cargar la lista de empleados.');
      }
    };
    fetchEmployees();
  }, []);

  const handleAddEmployeeClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const addEmployee = (newEmployee) => {
    const mappedEmployee = {
      ...newEmployee,
      rol: mapRol[newEmployee.rol] || newEmployee.rol,
      sede: mapSede[newEmployee.sede] || newEmployee.sede,
    };
    setEmployees([...employees, mappedEmployee]);
    setFilteredEmployees([...employees, mappedEmployee]);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    const filtered = employees.filter(
      (employee) =>
        employee.dni.includes(value) || 
        `${employee.nombres} ${employee.primerApellido} ${employee.segundoApellido}`.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  useEffect(() => {
    const filtered = employees.filter((employee) => {
      const matchSede = filters.sede ? employee.sede === filters.sede : true;
      const matchRol = filters.rol ? employee.rol === filters.rol : true;
      const matchEstado = filters.estado
        ? (filters.estado === 'Activo' && employee.estado === 'Activo') || 
          (filters.estado === 'Inactivo' && employee.estado === 'Inactivo')
        : true;
      return matchSede && matchRol && matchEstado;
    });

    setFilteredEmployees(filtered);
  }, [filters, employees]);

  const toggleEmployeeStatus = (employee) => {
    setShowConfirmPopup(true);
    setSelectedEmployee(employee);
  };

  const confirmToggleStatus = () => {
    const updatedEmployees = employees.map((emp) =>
      emp.dni === selectedEmployee.dni
        ? { ...emp, estado: emp.estado === 'Activo' ? 'Inactivo' : 'Activo' }
        : emp
    );
    setEmployees(updatedEmployees);
    setFilteredEmployees(updatedEmployees);
    setShowConfirmPopup(false);
    setSelectedEmployee(null);
  };

  const closePopup = () => {
    setShowConfirmPopup(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="employee-list-page">
      <div className="employee-list-header">
        <button className="back-button">← Regresar</button>
        <h1>Lista de Empleados</h1>
        <button className="add-employee-btn" onClick={handleAddEmployeeClick}>
          + Registrar Nuevo Empleado
        </button>
      </div>

      <div className="filters">
        <select name="sede" className="filter" onChange={handleFilterChange}>
          <option value="">Agrupar por sedes</option>
          <option value="La Molina">La Molina</option>
          <option value="San Isidro">San Isidro</option>
        </select>
        <select name="rol" className="filter" onChange={handleFilterChange}>
          <option value="">Agrupar por roles</option>
          <option value="Entrenador">Entrenador</option>
          <option value="Encargado">Encargado</option>
        </select>
        <select name="estado" className="filter" onChange={handleFilterChange}>
          <option value="">Agrupar por estado</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
        <input
          type="text"
          placeholder="Buscar por DNI o Nombre..."
          className="search-bar"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {showModal && (
        <Modal onClose={handleCloseModal}>
          <EmployeeForm onClose={handleCloseModal} addEmployee={addEmployee} />
        </Modal>
      )}

      <div className="employee-table">
        <table>
          <thead>
            <tr>
              <th>DNI</th>
              <th>Foto del empleado</th>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Sede</th>
              <th>Contrato</th>
              <th>Actualizar estado</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.dni}</td>
                <td>
                  <img src={employee.foto || 'default-image.jpg'} alt="Foto del empleado" className="employee-photo" />
                </td>
                <td>{`${employee.nombres} ${employee.primerApellido} ${employee.segundoApellido}`}</td>
                <td>{employee.rol}</td>
                <td>{employee.sede}</td>
                <td>
                  <button className="view-button">Ver</button>
                </td>
                <td>
                  <button
                    className={`status-button ${employee.estado === 'Activo' ? 'active' : 'inactive'}`}
                    onClick={() => toggleEmployeeStatus(employee)}
                  >
                    {employee.estado === 'Activo' ? 'Desactivar' : 'Activar'} empleado
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showConfirmPopup && (
        <div className="confirm-popup">
          <div className="popup-content">
            <p>
              ¿Seguro que quieres{' '}
              {selectedEmployee?.estado === 'Activo' ? 'desactivar' : 'activar'}{' '}
              este empleado?
            </p>
            <button onClick={confirmToggleStatus}>Sí</button>
            <button onClick={closePopup}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
