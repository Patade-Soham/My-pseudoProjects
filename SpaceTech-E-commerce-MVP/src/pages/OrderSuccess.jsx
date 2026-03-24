import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Check, ShoppingBag, Download } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('id');

  useEffect(() => {
    if (!orderId) {
      navigate('/shop');
      return;
    }

    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#00d4ff', '#ff6b35', '#ffffff'] }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#00d4ff', '#ff6b35', '#ffffff'] }));
    }, 250);

    return () => clearInterval(interval);
  }, [orderId, navigate]);

  if (!orderId) return null;

  return (
    <div className="min-h-screen bg-space-black pt-32 pb-20 px-4 flex justify-center items-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-deep-space border border-white/5 rounded-2xl p-8 md:p-12 text-center max-w-lg w-full shadow-2xl relative overflow-hidden"
      >
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cosmic-cyan/10 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10">
          <div className="w-24 h-24 mx-auto bg-success-green/10 border-2 border-success-green rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,255,136,0.3)]">
            <Check size={48} className="text-success-green animate-[scaleIn_0.5s_ease-out]" />
          </div>

          <h1 className="font-heading font-black text-3xl md:text-4xl text-star-white uppercase tracking-wider mb-2">Order Confirmed!</h1>
          <p className="text-moon-silver text-sm tracking-widest uppercase mb-8">Mission Accomplished</p>

          <div className="bg-space-black border border-white/5 rounded-xl p-6 mb-8 text-left shadow-inner">
            <p className="text-moon-silver text-sm mb-1 uppercase tracking-widest">Order Number</p>
            <p className="font-mono font-bold text-cosmic-cyan text-xl mb-4">{orderId}</p>
            <p className="text-moon-silver text-sm mb-1 uppercase tracking-widest">Estimated Delivery</p>
            <p className="text-star-white font-bold">5 - 7 Earth Days</p>
          </div>

          <p className="text-moon-silver/80 text-sm leading-relaxed mb-8">
            Thank you for your transmission. We have received your order coordinates and will initiate the launch sequence shortly. Check your comms (email) for tracking details.
          </p>

          <div className="space-y-4">
            <button className="w-full flex items-center justify-center gap-2 py-3 bg-nebula-blue/30 text-star-white border border-white/10 rounded-lg hover:border-cosmic-cyan hover:text-cosmic-cyan hover:shadow-[0_0_15px_rgba(0,212,255,0.2)] transition-all tracking-widest uppercase text-sm font-bold">
              <Download size={18} /> Download Invoice
            </button>
            <Link to="/shop" className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-cosmic text-star-white rounded-lg hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all tracking-widest uppercase text-sm font-bold border-none hover:-translate-y-0.5">
              <ShoppingBag size={18} /> Continue Exploring
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
