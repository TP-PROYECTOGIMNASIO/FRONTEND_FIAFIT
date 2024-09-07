import React, { useState, useEffect } from 'react';
import EmployeeForm from '../EmployeeForm/EmployeeForm';
import Modal from '../Modal/Modal';
import ConfirmationPopup from '../Modal/ConfirmationPopup'; // Importa el componente de confirmación
import './EmployeeList.css';

const EmployeeList = () => {
  // Estado para almacenar la lista de empleados
  const [employees, setEmployees] = useState([]);
  // Estado para almacenar la lista de empleados filtrada
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  // Estado para controlar la visibilidad del modal
  const [showModal, setShowModal] = useState(false);
  // Estado para almacenar la consulta de búsqueda
  const [searchQuery, setSearchQuery] = useState('');
  // Estado para almacenar los filtros seleccionados
  const [filters, setFilters] = useState({
    sede: '',
    rol: '',
    estado: '',
  });
  // Estado para controlar la visibilidad del popup de confirmación
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  // Estado para almacenar el empleado seleccionado para cambiar su estado
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // useEffect para cargar la lista de empleados al montar el componente
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        console.log('Fetching employees...');
        const response = await fetch('https://cxdt2lrhdb.execute-api.us-east-2.amazonaws.com/desarrollo/staff/visualize');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Employees data:', data);

        // Verifica si la respuesta es un array y actualiza el estado
        if (Array.isArray(data)) {
          setEmployees(data);
          setFilteredEmployees(data);
        } else {
          throw new Error('Received data is not an array');
        }
      } catch (error) {
        console.error('Error al cargar la lista de empleados:', error);
        alert('Error al cargar la lista de empleados.');
      }
    };
    fetchEmployees();
  }, []);

  // Maneja el clic en el botón para agregar un nuevo empleado
  const handleAddEmployeeClick = () => {
    console.log('Opening employee form modal...');
    setShowModal(true);
  };

  // Maneja el cierre del modal
  const handleCloseModal = () => {
    console.log('Closing employee form modal...');
    setShowModal(false);
  };

  // Función para agregar un nuevo empleado a la lista
  const addEmployee = (newEmployee) => {
    console.log('Adding new employee:', newEmployee);
    const employeeWithDefaultStatus = { ...newEmployee, estado: 'Activo' };
    const updatedEmployees = [...employees, employeeWithDefaultStatus];
    setEmployees(updatedEmployees);
    setFilteredEmployees(updatedEmployees);
  };

  // Maneja la búsqueda por DNI o nombre
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    filterEmployees(filters, value);
  };

  // Maneja los cambios en los filtros de sede, rol y estado
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    filterEmployees(updatedFilters, searchQuery);
  };

  // Filtra la lista de empleados basada en los filtros y la búsqueda
  const filterEmployees = (filters, searchQuery) => {
    const filtered = employees.filter((employee) => {
      const matchSede = filters.sede ? employee.location_id === filters.sede : true;
      const matchRol = filters.rol ? employee.rol_id === filters.rol : true;
      const matchEstado = filters.estado ? employee.estado === filters.estado : true;
      const matchSearch =
        employee.c_document.includes(searchQuery) ||
        `${employee.c_names} ${employee.father_last_name} ${employee.mother_last_name}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      return matchSede && matchRol && matchEstado && matchSearch;
    });
    setFilteredEmployees(filtered);
  };

  // Función para alternar el estado del empleado entre activo/inactivo
  const toggleEmployeeStatus = (employee) => {
    setShowConfirmPopup(true);
    setSelectedEmployee(employee);
  };

  // Función para actualizar el estado del empleado en el servidor
  const updateEmployeeStatus = async (staffId, newStatus) => {
    try {
      const response = await fetch('https://cxdt2lrhdb.execute-api.us-east-2.amazonaws.com/desarrollo/staff/actualizacion?staff_id=1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          staff_id: staffId,
          status: newStatus,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log('Update result:', result);
      return result;
    } catch (error) {
      console.error('Error al actualizar el estado del empleado:', error);
      alert('Error al actualizar el estado del empleado.');
    }
  };

  // Confirma la acción de alternar el estado del empleado
  const confirmToggleStatus = async () => {
    const newStatus = selectedEmployee.estado === 'Activo' ? 'Inactivo' : 'Activo';
    const updateResult = await updateEmployeeStatus(selectedEmployee.c_document, newStatus);
    
    if (updateResult) {
      const updatedEmployees = employees.map((emp) =>
        emp.c_document === selectedEmployee.c_document
          ? { ...emp, estado: newStatus }
          : emp
      );
      setEmployees(updatedEmployees);
      setFilteredEmployees(updatedEmployees);
      setShowConfirmPopup(false);
      setSelectedEmployee(null);
    }
  };

  // Cierra el popup de confirmación sin hacer cambios
  const closePopup = () => {
    setShowConfirmPopup(false);
    setSelectedEmployee(null);
  };

  // Abre el contrato del empleado en una nueva pestaña
  const viewContract = (contractUrl) => {
    window.open(contractUrl, '_blank'); 
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
        <select
          name="sede"
          className="filter"
          value={filters.sede}
          onChange={handleFilterChange}
        >
          <option value="">Agrupar por sedes</option>
          <option value="1">La Molina</option>
          <option value="2">San Isidro</option>
        </select>
        <select
          name="rol"
          className="filter"
          value={filters.rol}
          onChange={handleFilterChange}
        >
          <option value="">Agrupar por roles</option>
          <option value="1">Entrenador</option>
          <option value="2">Encargado</option>
        </select>
        <select
          name="estado"
          className="filter"
          value={filters.estado}
          onChange={handleFilterChange}
        >
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
                <td>{employee.c_document}</td>
                <td>
                  <img
                    src={employee.photo_url || 'default-image.jpg'}
                    alt="Foto del empleado"
                    className="employee-photo"
                  />
                </td>
                <td>{`${employee.c_names} ${employee.father_last_name} ${employee.mother_last_name}`}</td>
                <td>{employee.rol_id === '1' ? 'Entrenador' : 'Encargado'}</td>
                <td>{employee.location_id === '1' ? 'La Molina' : 'San Isidro'}</td>
                <td>
                  <button className="view-button" onClick={() => viewContract(employee.contract_url)}>Ver</button>
                </td>
                <td>
                  <button
                    className={`status-button ${
                      employee.estado === 'Activo' ? 'active' : 'inactive'
                    }`}
                    onClick={() => toggleEmployeeStatus(employee)}
                  >
                    {employee.estado === 'Activo' ? 'Desactivar' : 'Activar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showConfirmPopup && (
        <ConfirmationPopup
          onClose={closePopup}
          onConfirm={confirmToggleStatus}
          message={`¿Está seguro que desea ${selectedEmployee?.estado === 'Activo' ? 'desactivar' : 'activar'} a ${selectedEmployee?.c_names}?`}
        />
      )}
    </div>
  );
};

export default EmployeeList;
