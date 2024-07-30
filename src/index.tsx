import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const router = 
  <BrowserRouter> 
    <Routes> 
      <Route/> 
    </Routes>
  </BrowserRouter>



root.render(router);
