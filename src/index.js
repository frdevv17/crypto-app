import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// import { AppProvider } from './ContextProvider';
// import reducer, { initialState } from './reducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <AppProvider reducer={reducer} initialState={initialState}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
    // </AppProvider> 
);
