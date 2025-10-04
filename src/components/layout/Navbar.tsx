import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { signOutUser } from '../../firebase/auth';
import { Menu, X, Map, Plus, User, LogOut, Shield, Home } from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar: React.FC = () => {
  const { user, userProfile, isVerifiedWoman } = useAuth();
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
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
        isActive(to)
          ? 'bg-primary-100 text-primary-700'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
      onClick={() => setIsMenuOpen(false)}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Safe Route</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/" icon={<Home className="w-4 h-4" />}>
              Home
            </NavLink>
            <NavLink to="/map" icon={<Map className="w-4 h-4" />}>
              Map
            </NavLink>
            {user && isVerifiedWoman && (
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
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{userProfile?.displayName}</p>
                  {isVerifiedWoman && (
                    <p className="text-xs text-primary-600 flex items-center">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified Woman
                    </p>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
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
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              <NavLink to="/" icon={<Home className="w-4 h-4" />}>
                Home
              </NavLink>
              <NavLink to="/map" icon={<Map className="w-4 h-4" />}>
                Map
              </NavLink>
              {user && isVerifiedWoman && (
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
                    <p className="text-sm font-medium text-gray-900">{userProfile?.displayName}</p>
                    {isVerifiedWoman && (
                      <p className="text-xs text-primary-600 flex items-center mt-1">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified Woman
                      </p>
                    )}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-center"
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
