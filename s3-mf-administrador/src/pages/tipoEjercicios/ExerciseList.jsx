import React, { useState, useEffect } from "react";
import ExerciseForm from "./ExerciseForm";
import ExerciseSidebar from "./ExerciseSidebar";
import Modal from "./Modal"; // Modal reutilizable
import { Link, useLocation } from "react-router-dom";

function ExerciseList() {
  const apiUrl30 = import.meta.env.VITE_APP_API_URL_30;

  const location = useLocation(); // Obtener la ubicación actual

  // Obtener los parámetros de búsqueda de la ubicación actual
  const params = new URLSearchParams(location.search);
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en Lista de Ejercicios:", role);
  console.log("token recibido en Lista de Ejercicios:", token);
  console.log("username recibido en Lista de Ejercicios:", username);

  // Construir la URL con los parámetros
  const baseUrl = "/";
  const paramsString = `?role=${role}&token=${token}&username=${username}`;

  const [exercises, setExercises] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("todos");
  const [selectedExercise, setSelectedExercise] = useState(null); // Ejercicio seleccionado para habilitar/deshabilitar
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false); // Modal de confirmación

  useEffect(() => {
    fetchExercises();
  }, [selectedFilters, filterStatus]);

  const fetchExercises = async () => {
    try {
      const filterQuery = selectedFilters.length
        ? selectedFilters.map((id) => `exercise_type_id=${id}`).join("&")
        : "";

      const statusQuery =
        filterStatus === "habilitados"
          ? "active=true"
          : filterStatus === "deshabilitados"
          ? "active=false"
          : "";

      const response = await fetch(
        `${apiUrl30}?${filterQuery}${statusQuery ? "&" + statusQuery : ""}`
      );

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const result = await response.json();
      const data = result.ejercicios || [];
      setExercises(data);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  const handleFilterClick = (typeId) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(typeId)
        ? prevFilters.filter((id) => id !== typeId)
        : [...prevFilters, typeId]
    );
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Abrir modal de confirmación para habilitar/deshabilitar
  const confirmToggleExercise = (exercise) => {
    console.log(
      "Ejercicio seleccionado para habilitar/deshabilitar:",
      exercise
    ); // Log para ver el ejercicio
    setSelectedExercise(exercise);
    setConfirmationModalOpen(true); // Abre el modal de confirmación
  };

  // Habilitar o deshabilitar el ejercicio seleccionado
  const toggleExerciseStatus = async () => {
    if (!selectedExercise) return;

    console.log(
      "Ejercicio seleccionado antes de la actualización:",
      selectedExercise
    ); // Log para verificar

    const updatedStatus = !selectedExercise.active; // Cambiamos el estado actual
    const requestBody = {
      exercise_id: selectedExercise.exercise_id, // Asegurarse de que este campo esté correctamente mapeado
      active: updatedStatus, // Valor booleano (true o false)
    };

    console.log(
      "Enviando solicitud PUT con los siguientes datos:",
      requestBody
    ); // Log para verificar los datos

    try {
      const response = await fetch(`${apiUrl30}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody), // Convertimos el objeto a JSON
      });

      const data = await response.json();
      console.log("Respuesta de la API:", data);

      if (response.ok) {
        console.log("Estado del ejercicio actualizado correctamente:", data);
        fetchExercises(); // Refrescar la lista
      } else {
        console.log("Error en la solicitud:", data); // Manejar el error devuelto por la API
      }

      setConfirmationModalOpen(false); // Cerrar el modal de confirmación
      setSelectedExercise(null); // Limpiar selección
    } catch (error) {
      console.error("Error updating exercise status:", error);
    }
  };

  // Imagen por defecto en caso de que no exista una URL de imagen
  const defaultImage = "/logoFondoNegro.png"; // Reemplazar por la ruta de tu imagen por defecto

  return (
    <div className="container mx-auto flex">
      <ExerciseSidebar onSelectType={handleFilterClick} />

      <div className="flex-1 ml-4">
        <h1 className="text-[#aa1f1d] text-3xl font-bold text-center mb-4">
          EJERCICIOS REGISTRADOS
        </h1>

        <div className="flex justify-end items-center mb-4 space-x-2">
          <button
            onClick={toggleModal}
            className="bg-[#aa1f1d] text-white px-4 py-2 rounded"
          >
            + Registrar nuevo ejercicio
          </button>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#aa1f1d] text-white px-4 py-2 rounded"
          >
            <option value="todos">Todos</option>
            <option value="habilitados">Habilitados</option>
            <option value="deshabilitados">Deshabilitados</option>
          </select>
        </div>

        {isModalOpen && (
          <Modal onClose={toggleModal}>
            <ExerciseForm
              fetchExercises={fetchExercises}
              closeModal={toggleModal}
            />
          </Modal>
        )}

        {/* Modal de confirmación */}
        {confirmationModalOpen && (
          <Modal onClose={() => setConfirmationModalOpen(false)}>
            <div className="p-6 text-center">
              <p>
                ¿Está seguro de que desea{" "}
                {selectedExercise?.active ? "deshabilitar" : "habilitar"} este
                ejercicio?
              </p>
              <div className="mt-4 flex justify-center space-x-4">
                <button
                  onClick={toggleExerciseStatus}
                  className="bg-[#ac3c34] text-white py-2 px-4 rounded"
                >
                  Confirmar
                </button>
                <button
                  onClick={() => setConfirmationModalOpen(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </Modal>
        )}

        {/* Renderiza los ejercicios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {exercises.length > 0 ? (
            exercises.map((exercise) => {
              // Define la URL de la imagen para cada ejercicio
              const imageUrl = exercise.image_url || defaultImage;

              return (
                <div
                  key={exercise.exercise_id}
                  className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
                >
                  {imageUrl.endsWith(".mp4") ? (
                    <video width="320" height="240" controls>
                      <source src={imageUrl} type="video/mp4" />
                      Tu navegador no soporta el elemento de video.
                    </video>
                  ) : (
                    <img
                      src={imageUrl}
                      alt={exercise.name}
                      className="w-full h-36 object-cover rounded-md mb-4"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-bold mb-2">{exercise.name}</h3>
                    <p className="text-gray-700 mb-4">{exercise.description}</p>
                  </div>
                  <button
                    onClick={() => confirmToggleExercise(exercise)} // Llama al modal de confirmación
                    className="mt-auto bg-[#ac3c34] text-white px-4 py-2 rounded"
                  >
                    {exercise.active ? "Deshabilitar" : "Habilitar"}{" "}
                    {/* Cambia el texto según el estado */}
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-700">
              No hay ejercicios disponibles.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExerciseList;
