import React, { useState } from 'react';
import EventCard from './EventCard';
import EventDetailModal from './EventDetailModal';

const events = [
  {
    title: "Reto Fitness Total",
    location: "Sede Santa Anita",
    slots: "15",
    img: "ruta/de/imagen1.png"
  },
  {
    title: "Maratón de Spinning",
    location: "Sede La Molina",
    slots: "20",
    img: "ruta/de/imagen2.png"
  },
  {
    title: "Clase Magistral de Yoga",
    location: "Sede Santa Anita",
    slots: "15",
    img: "ruta/de/imagen3.png"
  }
  // Puedes agregar más eventos aquí
];

const EventList = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null); // Nuevo estado para manejar el modal

  const nextEvent = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === events.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevEvent = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    );
  };

  const openModal = (event) => {
    setSelectedEvent(event); // Abrir el modal con el evento seleccionado
  };

  const closeModal = () => {
    setSelectedEvent(null); // Cerrar el modal
  };

  return (
    <section className="relative p-4">
      {/* Botón para ir al evento anterior */}
      <button 
        onClick={prevEvent} 
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        {"<"}
      </button>

      {/* Evento actual mostrado */}
      <div className="flex justify-center">
        <div onClick={() => openModal(events[currentIndex])}>
          <EventCard 
            title={events[currentIndex].title} 
            location={events[currentIndex].location} 
            slots={events[currentIndex].slots} 
            img={events[currentIndex].img} 
          />
        </div>
      </div>

      {/* Botón para ir al siguiente evento */}
      <button 
        onClick={nextEvent} 
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        {">"}
      </button>

      {/* Modal de Detalles del Evento */}
      <EventDetailModal event={selectedEvent} onClose={closeModal} />
    </section>
  );
};

export default EventList;





