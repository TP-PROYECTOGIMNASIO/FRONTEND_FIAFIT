import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Inicio from "./pages/inicio/Inicio";
import ListStudents from "./pages/listStudents/ListStudents";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
    <Routes>
      <Route path="/" element={
        <>
          <Navbar/>
          <Inicio/>
          <Footer/>
        </>
      } />
      <Route path="/list-students" element={
        <>
          <Navbar/>
          <ListStudents/>
          <Footer/>
        </>
      } />
    </Routes>
  );
}
export default App;
