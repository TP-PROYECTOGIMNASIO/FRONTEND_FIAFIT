import { useState } from "react";
import Modal from "../../components/Modal";

export default function Inicio() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState("asignar"); // Estado para controlar la vista

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setView("asignar"); // Reiniciar vista al cerrar
  };

  const handleSearch = () => {
    // Cambiar a la vista de cliente y entrenador
    setView("cliente");
  };

  const handleAssign = () => {
    // Cambiar a la vista de asignación terminada
    setView("terminada");
  };

  return (
    <main className="min-h-[84vh]">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={toggleModal}
      >
        Asignar Alumno
      </button>

      <Modal isOpen={isModalOpen} onClose={toggleModal} title="Asignar Alumno">
        {view === "asignar" ? (
          <div className="bg-white p-6 rounded">
            <h3 className="text-3xl font-bold text-red-600 text-center mb-4">
              Asignar Alumno
            </h3>
            <p className="text-gray-700 mb-4 text-center">
              Por favor ingresar el DNI del cliente a asignar
            </p>
            <input
              type="text"
              placeholder="Ingrese el DNI"
              className="border border-gray-300 bg-gray-100 text-black p-2 rounded w-full mb-4"
            />
            <button
              className="bg-red-600 text-white px-4 py-2 rounded w-full"
              onClick={handleSearch}
            >
              BUSCAR
            </button>
          </div>
        ) : view === "cliente" ? (
          <div className="flex justify-between bg-white p-6 rounded">
            <div className="w-1/2 pr-2">
              <h3 className="text-2xl font-bold text-red-600 mb-2">Cliente</h3>
              <p className="text-gray-700">DNI:</p>
              <p className="text-gray-700">73259298</p>
              <p className="text-gray-700">Nombre:</p>
              <p className="text-gray-700">Giancarlo Farfan</p>
            </div>
            <div className="w-1/2 pl-2">
              <h3 className="text-2xl font-bold text-red-600 mb-2">Entrenador</h3>
              <input
                type="text"
                placeholder="DNI del Entrenador"
                className="border border-gray-300 bg-gray-100 text-black p-2 rounded w-full mb-4"
              />
              <button
                className="bg-red-600 text-white px-4 py-2 rounded w-full"
                onClick={handleAssign}
              >
                ASIGNAR
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded text-center">
            <h3 className="text-2xl font-bold text-red-600 mb-4">
              Asignación Terminada
            </h3>
            <p className="text-gray-700">DNI:</p>
            <p className="text-gray-700">73259298</p>
            <p className="text-gray-700">Nombre:</p>
            <p className="text-gray-700">Giancarlo Farfan</p>
            <p className="text-gray-700">Entrenador:</p>
            <p className="text-gray-700">Tómas Schuler</p>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded mt-4"
              onClick={toggleModal} // Opción para cerrar el modal
            >
              VOLVER
            </button>
          </div>
        )}
      </Modal>
    </main>
  );
}