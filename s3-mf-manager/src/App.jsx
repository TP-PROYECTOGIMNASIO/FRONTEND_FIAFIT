import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MembershipPage from './pages/membershipPage'; // Asegúrate de que la ruta y el nombre sean correctos

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MembershipPage />} />
      </Routes>
    </Router>
  );
}

export default App;


