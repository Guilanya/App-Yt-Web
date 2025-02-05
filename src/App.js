import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screen/Home'; // Página de inicio
import AddVideo from './screen/AddVideo'; // Página de añadir video
import Login from './screen/Login'; // Página de login
import Register from './screen/Register'; // Página de registro
import Video from './screen/Video'; // Página de video

function App() {
  return (
    <Router>
      <Routes>
        {/* Cambié la ruta raíz para que apunte a Home.js */}
        <Route path="/" element={<Home />} />  {/* Página principal */}
        <Route path="/login" element={<Login />} />  {/* Página de login */}
        <Route path="/register" element={<Register />} />  {/* Página de registro */}
        <Route path="/home" element={<Home />} />  {/* Página de inicio (si la necesitas en /home) */}
        <Route path="/add-video" element={<AddVideo />} />  {/* Página de añadir video */}
        <Route path="/video/:id" element={<Video />} />  {/* Página de video */}
      </Routes>
    </Router>
  );
}

export default App;
