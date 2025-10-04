import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { signOutUser } from '../../firebase/auth';
import { Menu, X, Map, Plus, User, LogOut, Shield, Home } from 'lucide-react';
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
    <Link
      to={to}
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${
        isActive(to)
          ? 'bg-primary-600 text-white shadow-lg'
          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 hover:shadow-md'
      }`}
      onClick={() => setIsMenuOpen(false)}
    >
      {icon}
      <span className="font-medium">{children}</span>
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-white/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-primary-700 group-hover:scale-110">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-800 group-hover:text-gray-700 transition-colors duration-300">Safe Route</span>
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
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">{userProfile?.displayName}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg p-2 transition-all duration-300 ease-in-out transform hover:scale-110"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-fadeIn">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md border-t border-gray-200 rounded-b-xl mx-2 mb-2 shadow-lg">
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
                <div className="pt-4 border-t border-gray-200">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-gray-800">{userProfile?.displayName}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-300 ease-in-out"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-300 ease-in-out font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 hover:shadow-lg transition-all duration-300 ease-in-out text-center font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
