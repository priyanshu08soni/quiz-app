import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Award, LogOut, User, Menu, X } from 'lucide-react';
import { toast } from 'sonner';

const Navbar = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (user) setLoggedInUser(user);
  }, []);

  const toggleMobileMenu = () =>{
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }
  const handleLogout = () => {
    setIsMobileMenuOpen(false);
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('userId');
    toast.success('Successfully logged out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-3 animate-slideIn">
              <Award className="h-8 w-8 text-primary" />
              <span className="text-xl font-semibold text-gray-900">QuizTopia</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link 
                to="/quizzes" 
                className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Quizzes
              </Link>
              <Link 
                to="/dashboard" 
                className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </Link>
          
            </div>
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {loggedInUser ? (
              <>
                <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-secondary/50">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">{loggedInUser}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-primary hover:bg-primary/90 text-white transition-colors duration-200"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-primary hover:bg-primary/90 text-white transition-colors duration-200"
                >
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
          >
            Home
          </Link>
          <Link
            to="/quizzes"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
          >
            Quizzes
          </Link>
          
          {loggedInUser && (
            <>
              <Link
                to="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              >
                Dashboard
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              >
                About
              </Link>
              <div className="px-3 py-2">
                <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-secondary/50">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">{loggedInUser}</span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Logout
              </button>
            </>
          )}
          
          {!loggedInUser && (
            <>
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:text-primary/90 hover:bg-gray-50"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;