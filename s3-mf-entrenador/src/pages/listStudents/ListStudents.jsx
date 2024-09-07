
const ListStudents = () => {
  return (
    <div className="bg-white shadow-md rounded p-8 m-8">
      <div className="text-center mb-6">
        <h2 className="text-red-600 text-4xl font-semibold">Lista de Alumnos</h2>
      </div>
      <div className="flex justify-end mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar..."
            className="p-3 pl-10 w-96 bg-gray-200 border border-gray-300 rounded-none text-black"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 111.35-1.35 7.5 7.5 0 01-1.35 1.35z"
            />
          </svg>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="py-2 px-4 text-left text-black">Nombres</th>
              <th className="py-2 px-4 text-left text-black">Entrenador</th>
              <th className="py-2 px-4 text-left text-black">Sede</th>
              <th className="py-2 px-4 text-left text-black">Membresía</th>
              <th className="py-2 px-4 text-left text-black">Rango</th>
              <th className="py-2 px-4 text-left text-black">Detalles</th>
            </tr>
          </thead>
          <tbody>
            {/* Aquí irían las filas con datos */}
            <tr>
              <td className="border-t py-2 px-4 text-black">Juan Pérez</td>
              <td className="border-t py-2 px-4 text-black">Carlos López</td>
              <td className="border-t py-2 px-4 text-black">Sede Central</td>
              <td className="border-t py-2 px-4 text-black">Premium</td>
              <td className="border-t py-2 px-4 text-black">Avanzado</td>
              <td className="border-t py-2 px-4">
                <button className="text-white p-2" style={{ backgroundColor: '#3c4862' }}>
                  Expandir
                </button>
              </td>
            </tr>
            {/* Más filas si es necesario */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListStudents;
