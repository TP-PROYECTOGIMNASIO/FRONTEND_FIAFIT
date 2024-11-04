import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/ListaProductos/product-list";
import CartDetails from "./components/shopping-cart/cartDetails";
import Inicio from "./context/inicio";
import Footer from "./components/Footer";
import PlanesEntrenamiento from "./components/PlanEntrenamiento/PlanesEntrenamiento";
import Planes from "./components/PlanEntrenamiento/PlanesPage";
import VerPlan from "./components/PlanNutricion/VerPlan";
import VerEjercicios from "./components/PlanEntrenamiento/VerEjercicios";
import VerNutricion from "./components/PlanNutricion/VerNutricion";
import VerMetricas from "./components/VerMetricas/VerMetricas";
import PagoExitoso from "./components/shopping-cart/PagoExitoso";
import UpdateSubscriptionForm from "./components/ActualizarSub/UpdateSubscriptionForm"
import SubscriptionList from "./components/ActualizarSub/SubscriptionList"

function App() {
  return (
    <Router>
      <div className="w-full min-h-screen">
        <Navbar />
        {/* Definir las rutas aquí */}
        <Routes>
        <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<ProductList />} />
          <Route path="/cart" element={<CartDetails />} />
          <Route path="/ver-planes" element={<PlanesEntrenamiento />} />
          <Route path="/planes" element={<Planes />} />
          <Route path="/ver-plan/:planId" element={<VerPlan />} />
          <Route path="/ver-ejercicios/:diaId" element={<VerEjercicios />} />
          <Route path="/ver-nutricion" element={<VerNutricion />} />
          <Route path="/ver-metricas" element={<VerMetricas />} />
          <Route path="/payment-success" element={<PagoExitoso />} />
          <Route path="/sub-update" element={<UpdateSubscriptionForm />} />
          <Route path="/sub-list" element={<SubscriptionList />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
