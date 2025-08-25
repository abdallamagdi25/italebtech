// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Root from './App'; // Import Root instead of App
// ...

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

// ...