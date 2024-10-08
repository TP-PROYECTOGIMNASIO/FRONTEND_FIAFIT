import { Link } from "react-router-dom";

const HUVISUALLIZARINICIOSEGN = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-end p-10 relative">
      <img
        src="/assets/fondo.png"
        alt="Imagen de fondo"
        className="absolute left-0 bottom-0 w-full h-full object-cover z-0"
      />

      <div className="w-full max-w-4xl relative z-10"> {/* Añado relative y z-10 */}
        <h1 className="text-4xl font-bold mb-12 text-red-600 text-center">
          Bienvenido Admin!
        </h1>

        <div className="grid grid-cols-2 gap-12">
          <div className="text-left">
            <div className="flex flex-col gap-4 bg-white p-4 rounded-b-lg shadow-lg">
              <Link to={"/"} className="bg-white text-gray-600 border border-red-600 font-semibold py-2 px-4 rounded-lg">
                <h3 className="text-lg text-center">Administrar</h3>
                <h1 className="text-3xl text-center">EMPLEADOS →</h1>
              </Link>
              <Link to={"/tproductos"} className="bg-white text-gray-600 border border-red-600 font-semibold py-2 px-4 rounded-lg">
                <h3 className="text-lg text-center">Administrar</h3>
                <h1  className="text-3xl text-center">
                  T.PRODUCTOS →
                </h1>
              </Link>
              <Link to={"/Lista_Productos"} className="bg-white text-gray-600 border border-red-600 font-semibold py-2 px-4 rounded-lg">
                <h3 className="text-lg text-center">Administrar</h3>
                <h1 className="text-3xl text-center">PRODUCTOS →</h1>
              </Link>
            </div>
          </div>

          <div className="text-left">
            <div className="flex flex-col gap-4 bg-white p-4 rounded-b-lg shadow-lg">
              <Link to={"/"} className="bg-white text-gray-600 border border-red-600 font-semibold py-2 px-4 rounded-lg">
                <h3 className="text-lg text-center">Administrar</h3>
                <h1 className="text-3xl text-center">CLIENTES →</h1>
              </Link>
              <Link to={"/tejercicios"}className="bg-white text-gray-600 border border-red-600 font-semibold py-2 px-4 rounded-lg">
                <h3 className="text-lg text-center">Administrar</h3>
                <h1 className="text-3xl text-center">T.EJERCICIOS →</h1>
              </Link>
              <Link to={"/"} className="bg-white text-gray-600 border border-red-600 font-semibold py-2 px-4 rounded-lg">
                <h3 className="text-lg text-center">Administrar</h3>
                <h1 className="text-3xl text-center">OTRO →</h1>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HUVISUALLIZARINICIOSEGN;
