/**
 * This is the entry file where you start your magic.
 *
 * It's currently a .js-file but feel free to use TypeScript
 * instead if you're comfortable with it.
 *
 * To transpile you just need to type `$ npm start` or `$ yarn start`. This
 * will start the mocked API server and bundling.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
//import { Provider } from 'react-redux';
//import { store } from './app/store';
import App from './App';
//import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
