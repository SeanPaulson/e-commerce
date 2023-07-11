import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('product') as HTMLElement).render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>,
)