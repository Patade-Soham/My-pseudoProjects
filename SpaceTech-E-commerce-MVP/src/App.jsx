import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import CartSidebar from './components/cart/CartSidebar';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';

// Placeholder content pages
const About = () => <div className="min-h-screen pt-32 pb-20 px-4 text-center"><h1 className="text-4xl text-star-white font-heading">About</h1></div>;
const Contact = () => <div className="min-h-screen pt-32 pb-20 px-4 text-center"><h1 className="text-4xl text-star-white font-heading">Contact</h1></div>;

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col selection:bg-cosmic-cyan/30 selection:text-white relative bg-space-black">
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
