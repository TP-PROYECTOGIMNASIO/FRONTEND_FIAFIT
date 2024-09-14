import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PlanEntrenamientoDia from "./pages/PlanEntrenamientoDia/PlanEntrenamientoDia";
import RegistrarEntrenamientoDia from "./pages/RegistrarEntrenamientoDia/RegistrarEntrenamientoDia";
import RegistroEntrenamiento from "./pages/RegistroEntrenamiento/RegistroEntrenamiento";



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
        title = "";
        metaDescription = "";
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
          <PlanEntrenamientoDia/>
          <Footer/>
        </>
      } />
      <Route path="/registrar-entrenamiento" element={
        <>
          <Navbar/>
          <RegistrarEntrenamientoDia/>
          <Footer/>
        </>
      } />

      <Route path="/registro-entrenamiento" element={
        <>
          <Navbar/>
          <RegistroEntrenamiento/>
          <Footer/>
        </>
      } />
    </Routes>

    
  );
}
export default App;
