import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import DashboardLayout from './components/layout/DashboardLayout';
import AppRoutes from './routes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DashboardLayout>
          <AppRoutes />
        </DashboardLayout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;