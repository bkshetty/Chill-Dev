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
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${
        isActive(to)
          ? 'bg-white/30 text-white shadow-lg backdrop-blur-sm'
          : 'text-white/90 hover:text-white hover:bg-white/20 hover:shadow-md backdrop-blur-sm'
      }`}
      onClick={() => setIsMenuOpen(false)}
    >
      {icon}
      <span className="font-medium">{children}</span>
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/20 backdrop-blur-md border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-7 h-7 bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-white/40 group-hover:scale-110">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white group-hover:text-white/90 transition-colors duration-300">Safe Route</span>
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
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{userProfile?.displayName}</p>
                  {isVerifiedWoman && (
                    <p className="text-xs text-white/80 flex items-center">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified Woman
                    </p>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 text-white/90 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 backdrop-blur-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 backdrop-blur-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-white/30 text-white rounded-lg hover:bg-white/40 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 backdrop-blur-sm font-medium"
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
              className="text-white/90 hover:text-white hover:bg-white/20 rounded-lg p-2 transition-all duration-300 ease-in-out transform hover:scale-110 backdrop-blur-sm"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-fadeIn">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/20 backdrop-blur-md border-t border-white/20 rounded-b-xl mx-2 mb-2">
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
                <div className="pt-4 border-t border-white/20">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-white">{userProfile?.displayName}</p>
                    {isVerifiedWoman && (
                      <p className="text-xs text-white/80 flex items-center mt-1">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified Woman
                      </p>
                    )}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-white/90 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-300 ease-in-out backdrop-blur-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-white/20 space-y-2">
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-white/90 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-300 ease-in-out backdrop-blur-sm font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 bg-white/30 text-white rounded-lg hover:bg-white/40 hover:shadow-lg transition-all duration-300 ease-in-out text-center font-medium backdrop-blur-sm"
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
