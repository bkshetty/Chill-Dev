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
import { motion } from 'framer-motion';

function App() {
  return (
    <AuthProvider>
      <Router>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full min-h-screen bg-dark-900 text-white overflow-hidden"
        >
          <Navbar />
          <main className="w-full h-full pt-16">
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
                background: '#2D2D44',
                color: '#fff',
                border: '1px solid #3E3E5B',
                borderRadius: '12px',
                backdropFilter: 'blur(4px)',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </motion.div>
      </Router>
    </AuthProvider>
  );
}

export default App;
