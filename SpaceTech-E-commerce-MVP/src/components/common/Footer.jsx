import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Twitter, Instagram, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-deep-space border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-star-white">
              <Rocket className="text-cosmic-cyan" size={24} />
              <span className="font-heading font-black text-xl tracking-wider">SPACE TECH</span>
            </Link>
            <p className="text-moon-silver/70 leading-relaxed text-sm">
              Bringing the universe home. Premium space tech products, replicas, and educational kits for enthusiasts globally.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="p-2 bg-nebula-blue/50 rounded-full text-moon-silver hover:text-cosmic-cyan hover:bg-cosmic-cyan/10 transition-all hover:scale-110">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 bg-nebula-blue/50 rounded-full text-moon-silver hover:text-cosmic-cyan hover:bg-cosmic-cyan/10 transition-all hover:scale-110">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 bg-nebula-blue/50 rounded-full text-moon-silver hover:text-cosmic-cyan hover:bg-cosmic-cyan/10 transition-all hover:scale-110">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 bg-nebula-blue/50 rounded-full text-moon-silver hover:text-cosmic-cyan hover:bg-cosmic-cyan/10 transition-all hover:scale-110">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg text-star-white mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3 flex flex-col">
              <Link to="/about" className="text-moon-silver/70 hover:text-cosmic-cyan hover:translate-x-1 transition-all text-sm w-fit">About Us</Link>
              <Link to="/contact" className="text-moon-silver/70 hover:text-cosmic-cyan hover:translate-x-1 transition-all text-sm w-fit">Contact</Link>
              <Link to="/faq" className="text-moon-silver/70 hover:text-cosmic-cyan hover:translate-x-1 transition-all text-sm w-fit">FAQs</Link>
              <Link to="/shipping" className="text-moon-silver/70 hover:text-cosmic-cyan hover:translate-x-1 transition-all text-sm w-fit">Shipping Policy</Link>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading font-bold text-lg text-star-white mb-6 uppercase tracking-wider">Categories</h4>
            <ul className="space-y-3 flex flex-col">
              <Link to="/shop?category=mars-rovers" className="text-moon-silver/70 hover:text-cosmic-cyan hover:translate-x-1 transition-all text-sm w-fit">Mars Rovers</Link>
              <Link to="/shop?category=astronaut-gear" className="text-moon-silver/70 hover:text-cosmic-cyan hover:translate-x-1 transition-all text-sm w-fit">Astronaut Gear</Link>
              <Link to="/shop?category=posters" className="text-moon-silver/70 hover:text-cosmic-cyan hover:translate-x-1 transition-all text-sm w-fit">Space Posters</Link>
              <Link to="/shop?category=telescopes" className="text-moon-silver/70 hover:text-cosmic-cyan hover:translate-x-1 transition-all text-sm w-fit">Telescopes</Link>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-bold text-lg text-star-white mb-6 uppercase tracking-wider">Newsletter</h4>
            <p className="text-moon-silver/70 text-sm mb-4">Join the Space Community for updates and exclusive facts.</p>
            <form className="flex group" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="Your email..." className="bg-nebula-blue/30 border border-white/10 border-r-0 rounded-l-lg px-4 py-2 text-sm text-star-white w-full focus:outline-none focus:border-cosmic-cyan transition-colors group-hover:border-white/20" />
              <button className="bg-gradient-cosmic text-star-white px-4 py-2 rounded-r-lg font-bold text-sm hover:opacity-90 transition-opacity border-none">
                JOIN
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-xs text-moon-silver/50">
          <p>© {new Date().getFullYear()} Space Tech Store. All rights reserved. Designed for space enthusiasts.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
