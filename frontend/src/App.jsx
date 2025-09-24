import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastProvider } from './components/ui/Toast';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

const App = () => {
  return (
    <Router>
      <ToastProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </ToastProvider>
    </Router>
  );
};

export default App;
