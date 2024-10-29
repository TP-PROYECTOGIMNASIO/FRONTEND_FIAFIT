import React from 'react';

const Banner = () => {
  return (
    <section className="relative">
      {}
      <img 
        src="ruta/de/tu/imagen-de-fondo.png" 
        alt="Fondo" 
        className="w-full h-[300px] object-cover" 
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-4xl font-bold">BUILD YOUR BODY STRONG</h1>
          <p className="text-white mt-2">INSCRIBETE EN NUESTROS EVENTOS HECHOS PARA TI</p>
        </div>
      </div>
    </section>
  );
};

export default Banner;


