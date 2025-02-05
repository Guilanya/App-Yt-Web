import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa desde 'react-dom/client' si usas React 18+
import './index.css';
import App from './App';

// Usando createRoot en lugar de render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
