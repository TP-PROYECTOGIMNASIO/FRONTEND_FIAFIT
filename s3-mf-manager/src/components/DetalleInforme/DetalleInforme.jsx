import React, { useState, useEffect } from 'react';

export default function DetalleInforme({ report }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    if (report && report.productos && Array.isArray(report.productos.data)) {
      setProductos(report.productos.data); // Almacena los productos en el estado
    } else {
      setProductos([]); // Limpiar el estado si no hay productos
    }
  }, [report]);

  // Verifica si se ha seleccionado un informe
  if (!report) {
    return <div>No se ha seleccionado ningún informe.</div>;
  }

  // Verificar si 'productos' es un array y tiene elementos
  if (productos.length === 0) {
    return <div>No hay productos en este informe.</div>;
  }

  return (
    <div className="containerDetalleI">
      <h3 className="titleDI">Detalles del Informe {report.report_id}</h3>

      {productos.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Nombre de Compra</th>
              <th>Fecha de Compra</th>
              <th>Precio Total</th>
              <th>Cantidad</th>
              <th>Recibo de Compra</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((product, index) => (
              <tr key={index}> {/* Usar index como clave solo si no hay un ID único */}
                <td>{product.product_name || 'No disponible'}</td>
                <td>{new Date(product.purchase_date).toLocaleDateString()}</td>
                <td>{product.total_price} soles</td>
                <td>{product.purchase_quantity}</td>
                <td>
                  {product.purchase_receipt ? (
                    <a href={product.purchase_receipt} target="_blank" rel="noopener noreferrer">
                      <img src="/detalleInforme.png" alt="boleta" />
                    </a>
                  ) : (
                    'Sin recibo'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay productos en este informe.</p>
      )}

      <br />
      <div className="montoTotal">
        <p>MONTO TOTAL: S/. {report.importe_total || 'No disponible'}</p>
      </div>
    </div>
  );
}
