import "../ListaC.css";

export default function ListaCompras(props) {
  const { vista, setVista, productData, setProductData } = props;

  const resetVista = () => {
    setVista(false);
  };

  const handleEdit = () => {
    // Agregar lógica para editar el producto
  };

  const handleDelete = () => {
    // Agregar lógica para eliminar el producto
  };

  return (
    <div >
      <h3 className="title">Lista de Compras</h3>
      <div className="d-flex justify-content-end">
      <button className="btn btn-secondary" onClick={resetVista}>
          + Agregar Nuevo Producto
        </button>
        </div>
        <br></br>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Fecha</th>
            <th>Tipo Producto</th>
            <th>Nombre Producto</th>
            <th>Cantidad</th>
            <th>Precio Venta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productData && (
            <><tr>
              <td>1</td>
              <td>2024-08-20</td>
              <td>Otro</td>
              <td>Banda Elastica</td>
              <td>5</td>
              <td>150</td>
              {/* <td>
       <button className="btn btn-primary btn-sm" onClick={handleEdit}>
         Editar
       </button>
       <button className="btn btn-danger btn-sm" onClick={handleDelete}>
         Eliminar
       </button>
     </td>*/}
            </tr>
            <tr>
              <td>2</td>
              <td>2024-08-20</td>
              <td>Otro</td>
              <td>Tomatodo</td>
              <td>1</td>
              <td>45</td>
              {/* <td>
       <button className="btn btn-primary btn-sm" onClick={handleEdit}>
         Editar
       </button>
       <button className="btn btn-danger btn-sm" onClick={handleDelete}>
         Eliminar
       </button>
     </td>*/}
            </tr>
            <tr>
              <td>3</td>
              <td>2024-08-20</td>
              <td>Otro</td>
              <td>Polo</td>
              <td>1</td>
              <td>55</td>
              {/* <td>
       <button className="btn btn-primary btn-sm" onClick={handleEdit}>
         Editar
       </button>
       <button className="btn btn-danger btn-sm" onClick={handleDelete}>
         Eliminar
       </button>
     </td>*/}
            </tr><tr>
                <td>4</td>
                <td>{productData.fechaCompra}</td>
                <td>{productData.tipoProducto}</td>
                <td>{productData.nombreProducto}</td>
                <td>{productData.cantidadComprada}</td>
                <td>{productData.precioTotal}</td>
                {/* <td>
       <button className="btn btn-primary btn-sm" onClick={handleEdit}>
         Editar
       </button>
       <button className="btn btn-danger btn-sm" onClick={handleDelete}>
         Eliminar
       </button>
     </td>*/}
              </tr></>
          )}
        </tbody>
      </table>
      <br></br>
      <div className="d-flex justify-content-end">
        
        <button className="btn btn-secondary">
          Guardar
        </button>
      </div>
    </div>
  );
}