import React from 'react';

const EventCard = ({ title, location, slots, img }) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg cursor-pointer">
      <img className="w-full h-48 object-cover" src={img} alt={title} />
      <div className="px-6 py-4">
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <p className="text-gray-700 text-base">
          <strong>Ubicación:</strong> {location}
        </p>
        <p className="text-gray-700 text-base">
          <strong>Cupos Disponibles:</strong> {slots}
        </p>
      </div>
    </div>
  );
};

export default EventCard;




