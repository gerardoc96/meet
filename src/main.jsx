import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import * as atatus from 'atatus-spa';
//atatus.config('6557eb38cd5e4c0fb77189f8a3470817').install();

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
serviceWorkerRegistration.register();