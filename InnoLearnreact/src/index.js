import React from 'react';
import ReactDOM from 'react-dom/client';
import Apptest from './App';
export * from './AuthContext';
export * from './CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Apptest />
  </React.StrictMode>
);