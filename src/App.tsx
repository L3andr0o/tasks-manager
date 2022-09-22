import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ModalsProvider from './context/modalsContext';
import Home from './pages/home';


function App() {

  return (
    <ModalsProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
    </ModalsProvider>
  );
}

export default App;
