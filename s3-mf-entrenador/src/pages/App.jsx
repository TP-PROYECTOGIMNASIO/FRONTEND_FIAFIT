import React, { useState } from 'react';
import TrainingPlan from "../components/TrainingPlan";  // Asegúrate de que los nombres de archivo coincidan con el sistema operativo (TrainingPlan.jsx)
import TrainingPlanSelection from "../components/TrainingPlanSelection";
import "../styles/index.css";  
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function App() {
  const [step, setStep] = useState('initial');

  const handleGeneratePlan = () => {
    setStep('selection');
  };

  const handleBack = () => {
    setStep('initial');
  };

  return (
    <div>
      {/* Navbar siempre visible */}
      <Navbar />

      {/* Renderizar los componentes según el estado */}
      <main className="flex justify-center items-center h-[80vh]">
        {step === 'initial' && <TrainingPlan onGeneratePlan={handleGeneratePlan} />}
        {step === 'selection' && <TrainingPlanSelection onBack={handleBack} />}
      </main>
      
      {/* Footer siempre visible */}
      <Footer />
    </div>
  );
}

export default App;
