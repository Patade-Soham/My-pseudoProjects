import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Rocket } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

const Navbar = ({ onCartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItemCount = useCartStore(state => state.getItemCount());
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? 'bg-space-black/90 backdrop-blur-md border-b border-white/5 shadow-lg py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-2 group">
          <Rocket className="text-cosmic-cyan transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={28} />
          <span className="font-heading font-black text-xl tracking-wider text-star-white hidden sm:block">SPACE TECH</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`font-heading font-bold text-sm uppercase tracking-wider relative py-2 transition-colors ${
                location.pathname === link.path ? 'text-cosmic-cyan' : 'text-moon-silver hover:text-cosmic-cyan'
              } before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-cosmic-cyan before:scale-x-0 before:origin-right before:transition-transform before:duration-300 hover:before:scale-x-100 hover:before:origin-left ${location.pathname === link.path ? 'before:scale-x-100 before:origin-left' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onCartClick}
            className="relative p-2 text-moon-silver hover:text-cosmic-cyan transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-mars-orange text-star-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border border-space-black animate-scale-in">
                {cartItemCount}
              </span>
            )}
          </button>
          
          <button 
            className="p-2 md:hidden text-moon-silver hover:text-cosmic-cyan"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-space-black border-b border-white/5 shadow-2xl animate-fade-in-up">
          <div className="flex flex-col p-4 space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`font-heading font-bold p-3 rounded-lg text-center uppercase ${
                  location.pathname === link.path ? 'bg-cosmic-cyan/10 text-cosmic-cyan' : 'text-moon-silver hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
