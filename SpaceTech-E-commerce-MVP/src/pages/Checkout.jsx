import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check, CreditCard, Smartphone, Banknote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/cartStore';

const steps = ['Shipping', 'Payment', 'Review'];

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shippingData, setShippingData] = useState({ firstName: '', lastName: '', email: '', address: '', city: '', state: '', zip: '' });
  const [paymentMethod, setPaymentMethod] = useState('card');

  if (items.length === 0 && currentStep === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 text-center bg-space-black flex flex-col items-center justify-center">
        <h2 className="text-3xl text-star-white font-heading mb-4">Your cart is empty</h2>
        <button onClick={() => navigate('/shop')} className="px-8 py-3 bg-gradient-cosmic text-star-white rounded-lg font-bold">Start Shopping</button>
      </div>
    );
  }

  const handleNext = (e) => {
    if (e) e.preventDefault();
    if (currentStep < 2) setCurrentStep(c => c + 1);
  };
  
  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(c => c - 1);
  };

  const handlePlaceOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      clearCart();
      const orderId = `SPACE-${Math.floor(10000 + Math.random() * 90000)}`;
      navigate(`/order-success?id=${orderId}`);
    }, 1500);
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-12">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div className={`relative flex flex-col items-center`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold tracking-widest text-sm transition-colors duration-300 ${
              index < currentStep ? 'bg-success-green text-space-black' : index === currentStep ? 'bg-cosmic-cyan text-space-black shadow-[0_0_15px_rgba(0,212,255,0.5)]' : 'bg-nebula-blue border border-white/20 text-moon-silver'
            }`}>
              {index < currentStep ? <Check size={20} /> : index + 1}
            </div>
            <span className={`absolute top-12 whitespace-nowrap text-sm font-heading tracking-widest uppercase ${index <= currentStep ? 'text-star-white' : 'text-moon-silver/50'}`}>{step}</span>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-16 sm:w-24 h-1 mx-2 rounded-full transition-colors duration-300 ${index < currentStep ? 'bg-success-green' : 'bg-white/10'}`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-space-black min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <h1 className="font-heading font-black text-3xl md:text-5xl text-star-white uppercase text-center mb-12 tracking-wider">Checkout</h1>
        <StepIndicator />

        <div className="bg-deep-space rounded-2xl border border-white/5 p-6 md:p-10 mt-16 overflow-hidden relative min-h-[400px] shadow-2xl">
          <AnimatePresence mode="wait">
            
            {/* Step 1: Shipping */}
            {currentStep === 0 && (
              <motion.form 
                key="step1" 
                initial={{ opacity: 0, x: 50 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleNext} 
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-moon-silver text-sm mb-2">First Name</label>
                    <input required type="text" value={shippingData.firstName} onChange={e => setShippingData({...shippingData, firstName: e.target.value})} className="w-full bg-nebula-blue/30 border border-white/10 rounded-lg px-4 py-3 text-star-white focus:border-cosmic-cyan outline-none" />
                  </div>
                  <div>
                    <label className="block text-moon-silver text-sm mb-2">Last Name</label>
                    <input required type="text" value={shippingData.lastName} onChange={e => setShippingData({...shippingData, lastName: e.target.value})} className="w-full bg-nebula-blue/30 border border-white/10 rounded-lg px-4 py-3 text-star-white focus:border-cosmic-cyan outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-moon-silver text-sm mb-2">Email Address</label>
                  <input required type="email" value={shippingData.email} onChange={e => setShippingData({...shippingData, email: e.target.value})} className="w-full bg-nebula-blue/30 border border-white/10 rounded-lg px-4 py-3 text-star-white focus:border-cosmic-cyan outline-none" />
                </div>
                <div>
                  <label className="block text-moon-silver text-sm mb-2">Shipping Address</label>
                  <input required type="text" value={shippingData.address} onChange={e => setShippingData({...shippingData, address: e.target.value})} className="w-full bg-nebula-blue/30 border border-white/10 rounded-lg px-4 py-3 text-star-white focus:border-cosmic-cyan outline-none" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-moon-silver text-sm mb-2">City</label>
                    <input required type="text" value={shippingData.city} onChange={e => setShippingData({...shippingData, city: e.target.value})} className="w-full bg-nebula-blue/30 border border-white/10 rounded-lg px-4 py-3 text-star-white focus:border-cosmic-cyan outline-none" />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-moon-silver text-sm mb-2">State</label>
                    <input required type="text" value={shippingData.state} onChange={e => setShippingData({...shippingData, state: e.target.value})} className="w-full bg-nebula-blue/30 border border-white/10 rounded-lg px-4 py-3 text-star-white focus:border-cosmic-cyan outline-none" />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-moon-silver text-sm mb-2">ZIP Code</label>
                    <input required type="text" value={shippingData.zip} onChange={e => setShippingData({...shippingData, zip: e.target.value})} className="w-full bg-nebula-blue/30 border border-white/10 rounded-lg px-4 py-3 text-star-white focus:border-cosmic-cyan outline-none" />
                  </div>
                </div>
                <div className="pt-6 flex justify-end">
                  <button type="submit" className="px-8 py-3 bg-gradient-cosmic text-star-white font-bold tracking-widest uppercase rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]">Continue to Payment</button>
                </div>
              </motion.form>
            )}

            {/* Step 2: Payment */}
            {currentStep === 1 && (
              <motion.div 
                key="step2" 
                initial={{ opacity: 0, x: 50 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { id: 'card', name: 'Credit / Debit Card', icon: <CreditCard /> },
                    { id: 'upi', name: 'UPI', icon: <Smartphone /> },
                    { id: 'cod', name: 'Cash on Delivery', icon: <Banknote /> }
                  ].map(method => (
                    <label key={method.id} className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === method.id ? 'border-cosmic-cyan bg-cosmic-cyan/10 ring-1 ring-cosmic-cyan' : 'border-white/10 bg-nebula-blue/20 hover:border-white/30'}`}>
                      <input type="radio" name="payment" checked={paymentMethod === method.id} onChange={() => setPaymentMethod(method.id)} className="hidden" />
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-4 ${paymentMethod === method.id ? 'border-cosmic-cyan' : 'border-white/50'}`}>
                        {paymentMethod === method.id && <div className="w-2.5 h-2.5 rounded-full bg-cosmic-cyan" />}
                      </div>
                      <div className={`mr-4 ${paymentMethod === method.id ? 'text-cosmic-cyan' : 'text-moon-silver'}`}>{method.icon}</div>
                      <span className="font-heading font-bold uppercase tracking-wider text-sm text-star-white">{method.name}</span>
                    </label>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 p-6 bg-space-black rounded-xl border border-white/5 mt-4">
                    <div>
                      <label className="block text-moon-silver text-sm mb-2">Card Number</label>
                      <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-nebula-blue/30 border border-white/10 rounded-lg px-4 py-3 text-star-white focus:border-cosmic-cyan outline-none font-mono tracking-widest" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-moon-silver text-sm mb-2">Expiry Date</label>
                        <input type="text" placeholder="MM/YY" className="w-full bg-nebula-blue/30 border border-white/10 rounded-lg px-4 py-3 text-star-white focus:border-cosmic-cyan outline-none font-mono" />
                      </div>
                      <div>
                        <label className="block text-moon-silver text-sm mb-2">CVV</label>
                        <input type="password" placeholder="123" maxLength="3" className="w-full bg-nebula-blue/30 border border-white/10 rounded-lg px-4 py-3 text-star-white focus:border-cosmic-cyan outline-none font-mono tracking-widest" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-8 flex justify-between">
                  <button onClick={handleBack} className="px-8 py-3 bg-transparent border border-moon-silver/30 text-moon-silver font-bold tracking-widest uppercase rounded-lg hover:border-moon-silver hover:text-star-white transition-colors">Back</button>
                  <button onClick={handleNext} className="px-8 py-3 bg-gradient-cosmic text-star-white font-bold tracking-widest uppercase rounded-lg hover:opacity-90 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all">Review Order</button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Review */}
            {currentStep === 2 && (
              <motion.div 
                key="step3" 
                initial={{ opacity: 0, x: 50 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="font-heading font-bold text-lg text-star-white uppercase mb-4 tracking-wider border-b border-white/10 pb-2">Order Summary</h3>
                  <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                    {items.map(item => (
                      <div key={item.product.id} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-3">
                          <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-12 rounded object-cover border border-white/5" />
                          <div>
                            <p className="text-star-white font-bold truncate max-w-[200px]">{item.product.name}</p>
                            <p className="text-moon-silver/50">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-mono text-cosmic-cyan">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-space-black p-6 rounded-xl border border-white/5">
                  <div>
                    <h4 className="font-heading font-bold text-sm text-moon-silver uppercase mb-2 tracking-wider">Shipping To</h4>
                    <p className="text-star-white text-sm leading-relaxed">
                      {shippingData.firstName} {shippingData.lastName}<br/>
                      {shippingData.address}<br/>
                      {shippingData.city}, {shippingData.state} {shippingData.zip}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-moon-silver uppercase mb-2 tracking-wider">Payment Method</h4>
                    <p className="text-star-white text-sm uppercase font-bold">
                      {paymentMethod === 'card' ? 'Credit Card' : paymentMethod === 'upi' ? 'UPI' : 'Cash on Delivery'}
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6 space-y-3">
                  <div className="flex justify-between text-moon-silver"><span>Subtotal:</span><span className="font-mono">₹{getTotalPrice().toLocaleString()}</span></div>
                  <div className="flex justify-between text-moon-silver"><span>Shipping:</span><span className="font-mono text-success-green font-bold tracking-widest uppercase">FREE</span></div>
                  <div className="flex justify-between text-xl font-bold pt-4 border-t border-white/10">
                    <span className="text-star-white font-heading tracking-widest uppercase">Total</span>
                    <span className="font-mono text-cosmic-cyan text-2xl">₹{getTotalPrice().toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-between">
                  <button onClick={handleBack} disabled={isSubmitting} className="order-2 sm:order-1 px-8 py-3 bg-transparent border border-moon-silver/30 text-moon-silver font-bold tracking-widest uppercase rounded-lg hover:border-moon-silver hover:text-star-white transition-colors disabled:opacity-50">Back</button>
                  <button 
                    onClick={handlePlaceOrder} 
                    disabled={isSubmitting}
                    className="order-1 sm:order-2 flex items-center justify-center min-w-[200px] px-8 py-3 bg-gradient-cosmic text-star-white font-bold tracking-widest uppercase rounded-lg hover:opacity-90 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Place Order"}
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
