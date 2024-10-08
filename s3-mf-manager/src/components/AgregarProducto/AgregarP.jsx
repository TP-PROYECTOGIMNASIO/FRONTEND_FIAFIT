import './AgregarP.css';
import { useState, useEffect } from 'react';
import ListaCompras from '../ListaCompras/ListaCompras';
export default function AgregarP({ reportId }) {
  const [nombreProducto, setNombreProducto] = useState("");
  const [tipoProducto, setTipoProducto] = useState("");
  const [fechaCompra, setFechaCompra] = useState("");
  const [precioTotal, setPrecioTotal] = useState("");
  const [cantidadComprada, setCantidadComprada] = useState("");
  const [boletaCompra, setBoletaCompra] = useState("");
  const [sede, setSede] = useState("");
  const [vista, setVista] = useState(false);
  const [productData, setProductData] = useState([]);

  const [tiposProducto, setTiposProducto] = useState([]);
  const [productos, setProductos] = useState([]);
  const [sedes, setSedes] = useState([]);

  // Función para obtener los tipos de productos
  const obtenerTiposProducto = async () => {
    try {
      const response = await fetch("https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/compras/hu-tp-61", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "fetchProductTypes" }),
      });
      const result = await response.json();
      setTiposProducto(result.map((tipo) => ({
        id: tipo.product_type_id,
        name: tipo.product_type_name,
      })));
    } catch (error) {
      console.error("Error al obtener tipos de productos:", error);
    }
  };

  // Función para obtener productos según el tipo seleccionado
  const obtenerProductosPorTipo = async (tipoId) => {
    try {
      const response = await fetch("https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/compras/hu-tp-61", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "fetchProductsByType", productTypeId: tipoId }),
      });
      const result = await response.json();
      setProductos(result.map((producto) => ({
        id: producto.product_id,
        name: producto.product_name,
      })));
    } catch (error) {
      console.error("Error al obtener productos por tipo:", error);
    }
  };

  // Función para obtener las sedes con los atributos correctos
  const obtenerSedes = async () => {
    try {
      const response = await fetch("https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/compras/hu-tp-61", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "fetchLocations" }),
      });
      const result = await response.json();
      setSedes(result.map((sede) => ({
        id: sede.location_id,
        name: sede.name,
      })));
    } catch (error) {
      console.error("Error al obtener sedes:", error);
    }
  };

  useEffect(() => {
    obtenerTiposProducto();
    obtenerSedes();
  }, []);

  useEffect(() => {
    if (tipoProducto) {
      obtenerProductosPorTipo(tipoProducto);
    }
  }, [tipoProducto]);

  const handleNombreChange = (event) => {
    setNombreProducto(event.target.value);
  };

  const handleTipoChange = (event) => {
    setTipoProducto(event.target.value);
  };

  const handleFechaChange = (event) => {
    setFechaCompra(event.target.value);
  };

  const handlePrecioChange = (event) => {
    setPrecioTotal(event.target.value);
  };

  const handleCantidadChange = (event) => {
    setCantidadComprada(event.target.value);
  };

  const handleBoletaChange = (event) => {
    setBoletaCompra(event.target.files[0]?.name || "");
  };

  const handleSedeChange = (event) => {
    setSede(event.target.value);
  };

  const handleGuardar = async () => {
    const productDataToSend = {
      action: "almacenarTemporalmente",
      products: [
        {
          product_id: parseInt(nombreProducto, 10),
          purchase_date: fechaCompra,
          purchase_quantity: parseInt(cantidadComprada, 10),
          total_price: parseFloat(precioTotal),
          purchase_receipt_url: boletaCompra,
          location_id: parseInt(sede, 10),
        },
      ],
    };

    try {
      const response = await fetch("https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/compras/hu-tp-61", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productDataToSend),
      });

      const result = await response.json();
      if (response.ok) {
        setVista(true);
        setProductData((prevData) => [...prevData, { ...productDataToSend, report_product_id: result.report_product_id }]);
      } else {
        console.error("Error al guardar productos temporalmente:", result);
        alert(`Error al guardar productos: ${result.error}`);
      }
    } catch (error) {
      console.error("Error en la llamada a la API:", error);
      alert("Error en la llamada a la API. Por favor, intente nuevamente.");
    }
  };

  const guardarP = async () => {
    handleGuardar();
  };

  return (
    <div className="containerGenerarAP">
      <div className="app">
        {vista ? (
          <ListaCompras
            vista={vista}
            setVista={setVista}
            productData={productData}
            setProductData={setProductData}
          />
        ) : (
          <div className="form-containerAP">
            <h2>Agregar Producto</h2>
            <div className="form-groupAP">
              <div className="row">
                <div className="column">
                  <label htmlFor="tipoProducto">Tipo de Producto</label>
                  <select id="tipoProducto" value={tipoProducto} onChange={handleTipoChange}>
                    <option value="">Selecciona un tipo</option>
                    {tiposProducto.map((tipo) => (
                      <option key={tipo.id} value={tipo.id}>
                        {tipo.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="column">
                  <label htmlFor="nombreProducto">Nombre del Producto</label>
                  <select id="nombreProducto" value={nombreProducto} onChange={handleNombreChange}>
                    <option value="">Selecciona un producto</option>
                    {productos.map((producto) => (
                      <option key={producto.id} value={producto.id}>
                        {producto.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="form-groupAP">
              <div className="row">
                <div className="column">
                  <label htmlFor="fechaCompra">Fecha de Compra</label>
                  <input
                    type="date"
                    id="fechaCompra"
                    value={fechaCompra}
                    onChange={handleFechaChange}
                  />
                </div>
                <div className="column">
                  <label htmlFor="cantidadComprada">Cantidad Comprada</label>
                  <input
                    type="number"
                    id="cantidadComprada"
                    placeholder="Cantidad"
                    value={cantidadComprada}
                    onChange={handleCantidadChange}
                  />
                </div>
              </div>
            </div>
            <div className="form-groupAP">
              <div className="row">
                <div className="column">
                  <label htmlFor="precioTotal">Precio Total</label>
                  <input
                    type="number"
                    id="precioTotal"
                    placeholder="Precio"
                    value={precioTotal}
                    onChange={handlePrecioChange}
                  />
                </div>
                <div className="column">
                  <label htmlFor="boletaCompra">Boleta de Compra</label>
                  <input type="file" id="boletaCompra" onChange={handleBoletaChange} />
                </div>
              </div>
            </div>
            <div className="form-groupAS">
              <div className="row">
                <div className="column">
                  <label htmlFor="sede">Sede</label>
                  <select id="sede" value={sede} onChange={handleSedeChange}>
                    <option value="">Seleccionar sede</option>
                    {sedes.map((sede) => (
                      <option key={sede.id} value={sede.id}>
                        {sede.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <button type="button" className="btn-guardar" onClick={guardarP}>
              Guardar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
