import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-sm py-3'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
              <img 
                src="/kuber-cab-sb.png" 
                alt="Kuber.cab" 
                className="h-10 w-auto md:h-12"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => handleNavigation('/services')} className="text-gray-800 hover:text-purple-700 font-medium transition-colors">Services</button>
            <button onClick={() => handleNavigation('/rental-booking')} className="text-gray-800 hover:text-purple-700 font-medium transition-colors">Rentals</button>
            <button onClick={() => handleNavigation('/drive-with-us')} className="text-gray-800 hover:text-purple-700 font-medium transition-colors">Drive with us</button>
            <button onClick={() => handleNavigation('/cities')} className="text-gray-800 hover:text-purple-700 font-medium transition-colors">Cities</button>
            <button onClick={() => handleNavigation('/faq')} className="text-gray-800 hover:text-purple-700 font-medium transition-colors">FAQ</button>
            <div className="relative group">
              <button className="flex items-center text-gray-800 hover:text-purple-700 font-medium transition-colors">
                More <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <button onClick={() => handleNavigation('/about')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700">About Us</button>
                <button onClick={() => handleNavigation('/contact')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700">Contact</button>
              </div>
            </div>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#download"
              className="px-4 py-2 text-purple-700 font-medium hover:text-purple-800 transition-colors"
            >
              Download App
            </a>
            <a
              href="#book"
              className="px-6 py-2 bg-purple-700 text-white rounded-full font-medium hover:bg-purple-800 transition-colors"
            >
              Book a Ride
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-800 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-6 shadow-lg absolute top-full left-0 right-0">
          <nav className="flex flex-col space-y-4">
            <button onClick={() => handleNavigation('/services')} className="text-gray-800 hover:text-purple-700 font-medium py-2 transition-colors text-left">Services</button>
            <button onClick={() => handleNavigation('/rental-booking')} className="text-gray-800 hover:text-purple-700 font-medium py-2 transition-colors text-left">Rentals</button>
            <button onClick={() => handleNavigation('/drive-with-us')} className="text-gray-800 hover:text-purple-700 font-medium py-2 transition-colors text-left">Drive with us</button>
            <button onClick={() => handleNavigation('/cities')} className="text-gray-800 hover:text-purple-700 font-medium py-2 transition-colors text-left">Cities</button>
            <button onClick={() => handleNavigation('/faq')} className="text-gray-800 hover:text-purple-700 font-medium py-2 transition-colors text-left">FAQ</button>
            <button onClick={() => handleNavigation('/about')} className="text-gray-800 hover:text-purple-700 font-medium py-2 transition-colors text-left">About Us</button>
            <button onClick={() => handleNavigation('/contact')} className="text-gray-800 hover:text-purple-700 font-medium py-2 transition-colors text-left">Contact</button>
            <button onClick={() => handleNavigation('/admin/login')} className="text-gray-800 hover:text-purple-700 font-medium py-2 transition-colors text-left">Admin</button>
            <div className="pt-4 border-t border-gray-200">
              <a
                href="#download"
                className="block w-full py-3 text-center text-purple-700 font-medium border border-purple-700 rounded-full hover:bg-purple-50 transition-colors mb-3"
                onClick={() => setIsMenuOpen(false)}
              >
                Download App
              </a>
              <a
                href="#book"
                className="block w-full py-3 text-center bg-purple-700 text-white rounded-full font-medium hover:bg-purple-800 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Book a Ride
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;