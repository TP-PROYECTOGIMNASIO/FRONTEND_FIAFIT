import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import './index.css'

import HUVISUALLIZARINICIOSEGN from './pages/HUVISUALLIZARINICIOSEGN';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ListaEjercicios from './pages/ListaEjercicios';



function App() {

  return (
    <>
      <Router>
        <>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HUVISUALLIZARINICIOSEGN />} />
          <Route path="/ListaEjercicios" element={<ListaEjercicios />} />

        </Routes>
        <Footer/>
        </>

      </Router>

    </>
  )
}

export default App
