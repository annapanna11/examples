import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { CartProvider } from './CartProvider';

const root = createRoot(document.getElementById('root'));

root.render(
  <CartProvider>
    <App />
  </CartProvider>,
);
