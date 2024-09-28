import React, { useEffect, useState } from 'react';
 
export default function DetalleInforme({ reportId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchReportProducts = async () => {
      try {
        const response = await fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/compras/hu-tp-62', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'mostrarProductosEnInforme',
            reporteId: reportId, // Enviamos el ID del reporte
          }),
        });
 
        if (!response.ok) {
          throw new Error('Error al obtener los productos del informe.');
        }
 
        const data = await response.json();
        setProducts(data.data); // Asigna los productos obtenidos de la respuesta
        setLoading(false);
      } catch (err) {
        setError(err.message); // Captura cualquier error de la API
        setLoading(false);
      }
    };
 
    if (reportId) {
      fetchReportProducts();
    }
  }, [reportId]);
 
  if (loading) {
    return <div>Cargando detalles del informe...</div>;
  }
 
  if (error) {
    return <div>Error: {error}</div>;
  }
 
  return (
<div className="containerDetalleI">
<h3 className="titleDI">Detalles del Informe {reportId}</h3>
 
      {products && products.length > 0 ? (
<table>
<thead>
<tr>
<th>Número de Compra</th>
<th>Nombre</th>
<th>Fecha de Compra</th>
<th>Cantidad</th>
<th>Precio Total</th>
</tr>
</thead>
<tbody>
            {products.map((product) => (
<tr key={product.number_purchase}>
<td>{product.number_purchase}</td>
<td>{product.product_name}</td>
<td>{new Date(product.purchase_date).toLocaleDateString()}</td>
<td>{product.purchase_quantity}</td>
<td>{product.total_price} soles</td>
</tr>
            ))}
</tbody>
</table>
      ) : (
<p>No hay productos en este informe.</p>
      )}
 
      <br />
<div className="montoTotal">
<p>MONTO TOTAL: S/. {products.reduce((acc, product) => acc + product.total_price, 0)}</p>
</div>
</div>
  );
}