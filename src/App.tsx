import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Map from './pages/Map';
import AddReport from './pages/AddReport';
import MyReports from './pages/MyReports';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="w-full h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-auto">
          <Navbar />
          <main className="w-full h-full pt-14">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/map" element={<Map />} />
              <Route path="/add-report" element={<AddReport />} />
              <Route path="/my-reports" element={<MyReports />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </main>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
