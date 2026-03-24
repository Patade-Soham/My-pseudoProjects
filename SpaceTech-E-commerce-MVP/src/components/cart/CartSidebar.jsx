import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Minus, Plus } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

const CartSidebar = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] animate-[fadeIn_0.3s_ease]"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-deep-space border-l border-white/5 shadow-2xl z-[120] flex flex-col animate-[slideInRight_0.4s_cubic-bezier(0.4,0,0.2,1)]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-space-black/50">
          <h2 className="font-heading font-bold text-xl text-star-white uppercase tracking-wider">Your Cart</h2>
          <button onClick={onClose} className="p-2 text-moon-silver hover:text-cosmic-cyan transition-colors hover:rotate-90">
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-nebula-blue/30 flex items-center justify-center">
                <span className="text-4xl animate-slow-float">👨‍🚀</span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-star-white mb-2">Cart is empty</h3>
                <p className="text-moon-silver/60 text-sm">Looks like you haven't added any gear.</p>
              </div>
              <button 
                onClick={() => { onClose(); navigate('/shop'); }} 
                className="mt-4 px-6 py-3 bg-gradient-cosmic text-star-white rounded-lg font-heading font-bold text-sm tracking-widest hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all"
              >
                EXPLORE NOW
              </button>
            </div>
          ) : (
            items.map((item, i) => (
              <div key={item.product.id} className="flex gap-4 animate-scale-in" style={{ animationDelay: `${i * 100}ms` }}>
                <Link to={`/product/${item.product.id}`} onClick={onClose} className="shrink-0">
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name} 
                    className="w-20 h-20 rounded-xl object-cover border border-white/5 hover:border-cosmic-cyan transition-colors"
                  />
                </Link>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <Link to={`/product/${item.product.id}`} onClick={onClose}>
                      <h4 className="font-heading font-bold text-sm text-star-white line-clamp-2 hover:text-cosmic-cyan transition-colors">{item.product.name}</h4>
                    </Link>
                    <button 
                      onClick={() => removeItem(item.product.id)} 
                      className="text-moon-silver/50 hover:text-error-red transition-colors p-1 shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-nebula-blue/50 rounded-lg p-1">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)} 
                        className="p-1 hover:text-cosmic-cyan text-moon-silver disabled:opacity-50 transition-colors bg-space-black rounded"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="font-mono text-sm w-6 text-center text-star-white">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)} 
                        className="p-1 hover:text-cosmic-cyan text-moon-silver bg-space-black rounded transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="font-mono font-bold text-cosmic-cyan">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {items.length > 0 && (
          <div className="p-6 border-t border-white/5 bg-space-black/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-moon-silver text-sm">Subtotal</span>
              <span className="font-mono text-star-white text-sm">₹{getTotalPrice().toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-moon-silver text-sm">Shipping</span>
              <span className="font-mono text-success-green text-sm tracking-widest uppercase font-bold">Free</span>
            </div>
            <div className="flex items-center justify-between mb-6 pt-4 border-t border-white/5">
              <span className="font-heading font-bold text-lg text-star-white uppercase tracking-wider">Total</span>
              <span className="font-mono font-bold text-2xl text-cosmic-cyan">₹{getTotalPrice().toLocaleString()}</span>
            </div>
            
            <button 
              onClick={() => { onClose(); navigate('/checkout'); }}
              className="w-full py-4 bg-gradient-cosmic border border-transparent hover:border-cosmic-cyan text-star-white rounded-lg font-heading font-bold tracking-widest hover:opacity-90 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all flex justify-center uppercase"
            >
              Checkout
            </button>
            <button 
              onClick={onClose}
              className="w-full mt-4 py-2 text-moon-silver/70 text-xs hover:text-star-white transition-colors uppercase font-bold tracking-widest"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
