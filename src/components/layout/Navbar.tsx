import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { signOutUser } from '../../firebase/auth';
import { Menu, X, Map, Plus, User, LogOut, Shield, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Navbar: React.FC = () => {
  const { user, userProfile } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOutUser();
      toast.success('Successfully logged out');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Failed to log out');
    }
  };

  const isActive = (path: string) => location.pathname === path;

  const NavLink: React.FC<{ to: string; children: React.ReactNode; icon?: React.ReactNode }> = ({
    to,
    children,
    icon
  }) => (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link
        to={to}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ease-in-out ${
          isActive(to)
            ? 'bg-primary-600 text-white font-semibold shadow-lg shadow-primary-600'
            : 'text-gray-300 hover:bg-dark-700 hover:bg-opacity-80 hover:text-white border border-transparent hover:border-gray-700 hover:border-opacity-50'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        {icon}
        <span>{children}</span>
      </Link>
    </motion.div>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="glass sticky top-0 z-50 border-b border-gray-700 border-opacity-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div 
              className="w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Shield className="w-4 h-4 text-white" />
            </motion.div>
            <span className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors duration-300">Safe Route</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/" icon={<Home className="w-4 h-4" />}>
              Home
            </NavLink>
            <NavLink to="/map" icon={<Map className="w-4 h-4" />}>
              Map
            </NavLink>
            {user && (
              <NavLink to="/add-report" icon={<Plus className="w-4 h-4" />}>
                Add Report
              </NavLink>
            )}
            {user && (
              <NavLink to="/my-reports" icon={<User className="w-4 h-4" />}>
                My Reports
              </NavLink>
            )}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <motion.div 
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{userProfile?.displayName}</p>
                </div>
                <motion.button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 text-gray-300 hover:text-white bg-dark-700 bg-opacity-50 hover:bg-opacity-80 rounded-lg border border-gray-700 border-opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-medium">Logout</span>
                </motion.button>
              </motion.div>
            ) : (
              <div className="flex items-center space-x-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-gray-300 hover:text-white bg-dark-700 bg-opacity-50 hover:bg-opacity-80 rounded-lg border border-gray-700 border-opacity-50 font-medium transition-all duration-300"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600 font-medium transition-all duration-300"
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white bg-dark-700 bg-opacity-50 hover:bg-opacity-80 rounded-lg p-2 border border-gray-700 border-opacity-50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-dark-700 bg-opacity-80 backdrop-blur-md border-t border-gray-700 border-opacity-50 rounded-b-xl mx-2 mb-2 shadow-lg shadow-dark-800">
                <NavLink to="/" icon={<Home className="w-4 h-4" />}>
                  Home
                </NavLink>
                <NavLink to="/map" icon={<Map className="w-4 h-4" />}>
                  Map
                </NavLink>
                {user && (
                  <NavLink to="/add-report" icon={<Plus className="w-4 h-4" />}>
                    Add Report
                  </NavLink>
                )}
                {user && (
                  <NavLink to="/my-reports" icon={<User className="w-4 h-4" />}>
                    My Reports
                  </NavLink>
                )}
                
                {user ? (
                  <div className="pt-4 border-t border-gray-700 border-opacity-50">
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium text-white">{userProfile?.displayName}</p>
                    </div>
                    <motion.button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white bg-dark-700 bg-opacity-50 hover:bg-opacity-80 rounded-lg border border-gray-700 border-opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="font-medium">Logout</span>
                    </motion.button>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-gray-700 border-opacity-50 space-y-2">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        to="/login"
                        className="block px-3 py-2 text-gray-300 hover:text-white bg-dark-700 bg-opacity-50 hover:bg-opacity-80 rounded-lg border border-gray-700 border-opacity-50 font-medium transition-all duration-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Login
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        to="/signup"
                        className="block px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600 text-center font-medium transition-all duration-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
