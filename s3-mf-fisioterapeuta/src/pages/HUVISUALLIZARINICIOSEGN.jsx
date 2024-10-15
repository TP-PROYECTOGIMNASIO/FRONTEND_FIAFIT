import { Link } from "react-router-dom";

const HUVISUALLIZARINICIOSEGN = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-end p-10 relative">
      <img
        src="/wasa.jpeg"
        alt="Imagen de fondo"
        className="absolute left-0 bottom-0 w-full h-full object-cover z-0"
      />

      <div className="w-full max-w-4xl relative z-10"> {/* Añado relative y z-10 */}

        <div className="grid grid-cols-2 gap-12">
          <div className="text-left">
          </div>

          <div className="flex flex-col bg-white p-4 rounded-b-lg shadow-lg">
  <div className="text-left mb-6"> {/* Aumentar el mb para más espacio */}
    <Link to={"/"} className="bg-white text-red-600 font-semibold py-2 px-4 rounded-lg">
      <h3 className="text-3xl text-center">EMPEZAR PLAN</h3>
      <h1 className="text-3xl text-center">ENTRENAMIENTO</h1>
    </Link>
  </div>

  <div className="text-left">
    <Link to={"/"} className="bg-white text-red-600 font-semibold py-2 px-4 rounded-lg">
      <h3 className="text-3xl text-center">REGISTRAR</h3>
      <h1 className="text-3xl text-center">EJERCICIOS</h1>
    </Link>
  </div>
</div>


        </div>
      </div>
    </div>
  );
};


export default HUVISUALLIZARINICIOSEGN;
