import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DataProvider from './context/dataContext';
import ModalsProvider from './context/modalsContext';
import Home from './pages/home';
import AuthProvider from './context/authContext';
import ProtectedRoute from './components/protectedRoute';
import Login from './pages/login';
import ThemeProvider from './context/themeContext';

function App() {

  return (
    <BrowserRouter>
    <AuthProvider>
      <DataProvider>
        <ModalsProvider>
        <ThemeProvider>
        <Routes>
            <Route path='/' element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }/>
            <Route path='/:board' element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }/>
            <Route path='/login' element={<Login />} />
        </Routes>
        </ThemeProvider>
      </ModalsProvider>
      </DataProvider>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
