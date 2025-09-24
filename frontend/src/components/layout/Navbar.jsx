import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  User,
  LogOut,
  ChevronDown,
  Grid,
  AlertTriangle,
  MapPin
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const publicNavLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
];

const privateNavLinks = [
  { name: 'Dashboard', path: '/dashboard', icon: Grid },
  { name: 'Report Issue', path: '/report', icon: AlertTriangle },
  { name: 'Track Issues', path: '/track', icon: MapPin },
];

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', newMode);
      return newMode;
    });
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  }, []);

  return (
    <header className="fixed w-full top-0 left-0 z-50 backdrop-blur-lg bg-glassWhite dark:bg-glassDark shadow-md transition-all duration-300">
      <div className="flex items-center justify-between px-6 md:px-12 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Hydro360
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {/* Public Links */}
          {publicNavLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-medium transition duration-300 ${
                location.pathname === link.path
                  ? 'text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
          {/* Dark Mode Toggle */}
          <button onClick={toggleDarkMode} className="ml-4 text-gray-600 dark:text-gray-200 hover:text-blue-500">
            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleDarkMode} className="text-gray-600 dark:text-gray-200">
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button onClick={toggleMenu} className="text-gray-700 dark:text-gray-200">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden md:hidden bg-glassWhite dark:bg-glassDark backdrop-blur-md px-6 pb-4 rounded-b-lg"
          >
            <div className="flex flex-col space-y-3 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`text-gray-800 dark:text-gray-200 font-medium ${
                    location.pathname === link.path
                      ? 'text-blue-600 dark:text-blue-400 font-semibold'
                      : ''
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
