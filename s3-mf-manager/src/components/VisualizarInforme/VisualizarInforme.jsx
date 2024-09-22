import "./VisualizarI.css";
import { useState, useEffect } from "react";
import Modal from "../Modal/VisualInfo/Modal";
import AgregarP from "../AgregarProducto/AgregarP";
import DetalleInforme from "../DetalleInforme/DetalleInforme";
import { Link } from "react-router-dom";

export default function VisualizarInforme() {
  const [showModal, setShowModal] = useState(false);
  const [showModalV, setShowModalV] = useState(false);
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  

  const handleAddEmployeeClick = async () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModalV = async (report) => {
    setSelectedReport(report);
    setShowModalV(true);

   
  };

  const handleCloseModalV = () => {
    setShowModalV(false);
    setSelectedReport(null);
  };

  return (
    <div className="containerVI min-h-[90vh]">
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <AgregarP reportId={selectedReport ? selectedReport.report_id : null} />
        </Modal>
      )}
      {showModalV && (
        <Modal onClose={handleCloseModalV}>
          <DetalleInforme report={selectedReport} />
        </Modal>
      )}
      <header>
        <div className="buttonHead">
          <Link to={"/"} href="#" className="back-buttonVI">
             - Regresar
          </Link>
          <button className="add-buttonVI" onClick={handleAddEmployeeClick}>
            + Registrar Nueva Compra
          </button>
        </div>
        <div className="order-options">
          <span>Ordenar por </span>
          <button>Día</button>
          <button>Mes</button>
          <button>Año</button>
        </div>
        <div className="gasto-buttons">
          <button className="max-gasto">Máximo gasto realizado</button>
          <button className="min-gasto">Mínimo gasto realizado</button>
        </div>
      </header>
      <div className="informeCompraB">
      <h6>Informe Compra</h6>
      <input type="text" placeholder="" />
      </div>
      <div className="cTabla">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha de asignación</th>
              <th>Gasto realizado</th>
              <th>Ver Informe</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.report_id}>
                <td>{`Informe ${report.report_id}`}</td>
                <td>{new Date(report.created_at).toLocaleDateString()}</td>
                <td>{report.importe_total} soles</td>
                <td>
                  <button className="view-button" onClick={() => handleOpenModalV(report)}>
                    Visualizar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
