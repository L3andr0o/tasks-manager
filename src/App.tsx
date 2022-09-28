import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DataProvider from './context/dataContext';
import ModalsProvider from './context/modalsContext';
import Home from './pages/home';


function App() {

  return (
    <BrowserRouter>
    <DataProvider>
      <ModalsProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:board' element={<Home />} />
      </Routes>
    </ModalsProvider>
    </DataProvider>
    </BrowserRouter>
  );
}

export default App;
