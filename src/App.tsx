import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DataProvider from './context/dataContext';
import ModalsProvider from './context/modalsContext';
import Home from './pages/home';


function App() {

  return (
    <DataProvider>
      <ModalsProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
    </ModalsProvider>
    </DataProvider>
  );
}

export default App;
