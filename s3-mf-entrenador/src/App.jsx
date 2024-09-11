import { useEffect } from "react";
import { Routes, Route, useNavigationType, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio/Inicio";
import Visualizar from "./pages/VisualizarMetricasAlumno/VisualizarMetricasAlumno";
import ListarAlumnos from "./pages/VisualizarMetricasAlumno/ListarMetricas/ListaAlumnos";
import RegistrarMetricas from "./pages/RegistrarMetricasAlumno/registrarMetricas/RegistrarMetricasAlumno";
import AlumnoCheckin from "./pages/VisualizarMetricasAlumno/Checking-Metricas/AlumnoCheckin";
import VistaNoRegisrado from "./pages/RegistrarMetricasAlumno/VistaNoRegistradoMetricas/Ir-Registrar-Metrica";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "Inicio";
        metaDescription = "Welcome to Fia Fit";
        break;
      case "/list-students":
        title = "Lista de Alumnos";
        metaDescription = "Lista de todos los alumnos registrados.";
        break;
      // Agrega casos adicionales si es necesario
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/visualizar" element={<Visualizar />} />
        <Route path="/listar-alumnos" element={<ListarAlumnos />} />
        <Route path="/registrar-metricas" element={<RegistrarMetricas />} />
        <Route path="/alumno-checkin" element={<AlumnoCheckin />} />
        <Route path="/vista-no-registrado" element={<VistaNoRegisrado />} />
        {/* Agrega otras rutas aquí */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
