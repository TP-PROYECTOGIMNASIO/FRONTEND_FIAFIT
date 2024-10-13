import React, { useState } from 'react';

function Lista_Productos() {
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Estado para mostrar/ocultar la ventana de éxito
  const [formData, setFormData] = useState({
    tipoProducto: '',
    nombre: '',
    descripcion: '',
    precio: '',
    imagen: '',
  });
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'MANCUERNAS 3KG',
      imageUrl: 'https://via.placeholder.com/150',
      descripcion: 'Peso ideal para entrenamiento básico',
      precio: '50',
    },
    {
      id: 2,
      name: 'MANCUERNA 20 KG',
      imageUrl: 'https://via.placeholder.com/150',
      descripcion: 'Peso avanzado para gimnasio',
      precio: '150',
    },
    {
      id: 3,
      name: 'PACK GIMNASIO EN CASA',
      imageUrl: 'https://via.placeholder.com/150',
      descripcion: 'Paquete completo de entrenamiento en casa',
      precio: '300',
    },
  ]);

  // Manejar cambio en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validación del precio (no negativo, no cero)
  const isPriceValid = (price) => {
    const parsedPrice = parseFloat(price);
    return !isNaN(parsedPrice) && parsedPrice > 0;
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que todos los campos estén completos
    if (!formData.tipoProducto || !formData.nombre || !formData.descripcion || !formData.precio || !formData.imagen) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    // Validar el campo de precio
    if (!isPriceValid(formData.precio)) {
      alert('Por favor, ingrese un precio válido en Soles (S/.), mayor a 0.');
      return;
    }

    // Agregar el nuevo producto a la lista
    const newProduct = {
      id: products.length + 1,
      name: formData.nombre,
      imageUrl: URL.createObjectURL(formData.imagen),
      descripcion: formData.descripcion,
      precio: `S/. ${parseFloat(formData.precio).toFixed(2)}`, // Formato S/. xxx.xx
    };
    setProducts([...products, newProduct]);

    // Limpiar los campos del formulario después de la inscripción
    setFormData({
      tipoProducto: '',
      nombre: '',
      descripcion: '',
      precio: '',
      imagen: '',
    });

    // Mostrar ventana de éxito y cerrar el formulario
    setShowModal(false);
    setShowSuccessModal(true); // Mostrar ventana flotante de éxito
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Main layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md">
          <div className="p-4">
            <button className="mb-4 text-gray-600 text-lg">&lt; Regresar</button>
            <h2 className="mb-2 text-lg font-semibold text-gray-700">SELECCIONAR</h2>
            <button className="w-full py-3 text-white bg-red-700 rounded-lg">TODAS</button>
            <nav className="mt-6 space-y-2">
              <button className="mb-2 py-3 text-gray-700 bg-gray-300 rounded-lg">ACCESORIOS DEPORTIVOS</button>
            </nav>
            <nav className="mt-6 space-y-2">
              <button className="mb-2 py-3 text-gray-700 bg-gray-300 rounded-lg">MÁQUINA</button>
            </nav>
            <nav className="mt-6 space-y-2">
              <button className="mb-2 py-3 text-gray-700 bg-gray-300 rounded-lg">EQUIPO DE EJERCICIOS</button>
            </nav>
            <nav className="mt-6 space-y-2">
              <button className="mb-2 py-3 text-gray-700 bg-gray-300 rounded-lg">ROPA DEPORTIVA</button>
            </nav>
            <nav className="mt-6 space-y-2">
              <button className="mb-2 py-3 text-gray-700 bg-gray-300 rounded-lg">SUPLEMENTOS</button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-red-700">LISTA DE PRODUCTOS</h1>
            <div className="flex flex-col space-y-4">
              <button onClick={() => setShowModal(true)} className="flex items-center px-4 py-2 text-white bg-red-700 rounded-lg">
                <span className="mr-2 text-lg">+</span> Registrar Nuevo Producto
              </button>
              <select className="px-3 py-2 bg-red-700 text-white rounded-lg">
                <option>Activos</option>
                <option>Inactivos</option>
              </select>
            </div>
          </div>

          {/* Product List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {products.map((product) => (
              <div key={product.id} className="p-6 bg-white rounded-lg shadow-md">
                <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover mb-4" />
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600">{product.descripcion}</p>
                <p className="text-gray-800 font-bold">{product.precio}</p>
                <button className="w-full py-2 mt-4 text-white bg-red-700 rounded-lg">
                  DESHABILITAR
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 shadow-lg w-96 relative">
            <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
              X
            </button>
            <h2 className="text-2xl text-red-700 font-bold text-center mb-6">REGISTRAR PRODUCTO</h2>
            <form className="space-y-4 text-center" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700">Tipo de Producto:</label>
                <select name="tipoProducto" className="w-full p-2 border border-gray-300 rounded-lg" value={formData.tipoProducto} onChange={handleChange}>
                  <option value="">Seleccionar</option>
                  <option value="Accesorios Deportivos">Accesorios Deportivos</option>
                  <option value="Máquina">Máquina</option>
                  <option value="Equipo de Ejercicio">Equipo de Ejercicio</option>
                  <option value="Ropa Deportiva">Ropa Deportiva</option>
                  <option value="Suplementos">Suplementos</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700">Nombre:</label>
                <input type="text" name="nombre" className="w-full p-2 border border-gray-300 rounded-lg" value={formData.nombre} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-gray-700">Descripción:</label>
                <input type="text" name="descripcion" className="w-full p-2 border border-gray-300 rounded-lg" value={formData.descripcion} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-gray-700">Precio:</label>
                <input type="number" name="precio" className="w-full p-2 border border-gray-300 rounded-lg" value={formData.precio} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-gray-700">Imagen:</label>
                <input type="file" name="imagen" className="w-full p-2 border border-gray-300 rounded-lg" onChange={(e) => setFormData({ ...formData, imagen: e.target.files[0] })} />
              </div>
              <button type="submit" className="w-full py-2 mt-4 text-white bg-red-700 rounded-lg">
                Guardar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 shadow-lg w-96 text-center relative">
            <h2 className="text-2xl text-red-700 font-bold mb-4">PRODUCTO AGREGADO CON ÉXITO</h2>
            <button onClick={() => setShowSuccessModal(false)} className="py-2 px-4 bg-red-700 text-white rounded-lg">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Lista_Productos;
