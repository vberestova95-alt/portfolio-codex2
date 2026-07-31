import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.jsx';
import { enableReveal } from './lib/reveal.js';
import './styles/global.css';

enableReveal();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
