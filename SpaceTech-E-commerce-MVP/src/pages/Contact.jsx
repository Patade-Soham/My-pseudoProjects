import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, submitting, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="bg-space-black min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="font-heading font-black text-4xl md:text-5xl text-star-white uppercase mb-4 tracking-wider">
            Establish Comms
          </h1>
          <p className="text-moon-silver text-lg">Send a transmission to our mission control center.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 xl:gap-20 animate-fade-in-up">
          
          {/* Info */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h3 className="font-heading font-bold text-2xl text-star-white uppercase mb-8 tracking-wider">Mission Control</h3>
              <div className="space-y-8">
                <div className="flex items-start gap-5 group">
                  <div className="p-4 bg-deep-space border border-white/5 rounded-xl text-cosmic-cyan group-hover:border-cosmic-cyan transition-colors">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-star-white font-bold text-sm mb-2 uppercase tracking-widest">Base Coordinates</h4>
                    <p className="text-moon-silver/70 text-sm leading-relaxed">123 Rocket Way<br/>Houston, TX<br/>Earth 77058</p>
                  </div>
                </div>
                <div className="flex items-start gap-5 group">
                  <div className="p-4 bg-deep-space border border-white/5 rounded-xl text-cosmic-cyan group-hover:border-cosmic-cyan transition-colors">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-star-white font-bold text-sm mb-2 uppercase tracking-widest">Subspace Relay</h4>
                    <p className="text-moon-silver/70 text-sm leading-relaxed">comms@spacetech.store</p>
                  </div>
                </div>
                <div className="flex items-start gap-5 group">
                  <div className="p-4 bg-deep-space border border-white/5 rounded-xl text-cosmic-cyan group-hover:border-cosmic-cyan transition-colors">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-star-white font-bold text-sm mb-2 uppercase tracking-widest">Direct Frequency</h4>
                    <p className="text-moon-silver/70 text-sm leading-relaxed">+1 (800) 555-ORBIT</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-deep-space border border-white/5 rounded-2xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-cosmic-cyan/10 blur-[100px] rounded-full pointer-events-none" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <label className="block text-moon-silver text-xs uppercase tracking-widest mb-3 font-bold">Crew Member Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-space-black border border-white/10 rounded-xl px-5 py-4 text-star-white focus:border-cosmic-cyan outline-none transition-colors" placeholder="John Glenn" />
                </div>
                <div>
                  <label className="block text-moon-silver text-xs uppercase tracking-widest mb-3 font-bold">Return Frequency (Email)</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-space-black border border-white/10 rounded-xl px-5 py-4 text-star-white focus:border-cosmic-cyan outline-none transition-colors" placeholder="john@nasa.gov" />
                </div>
              </div>
              
              <div className="mb-8">
                <label className="block text-moon-silver text-xs uppercase tracking-widest mb-3 font-bold">Mission Subject</label>
                <input required type="text" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full bg-space-black border border-white/10 rounded-xl px-5 py-4 text-star-white focus:border-cosmic-cyan outline-none transition-colors" placeholder="Order Inquiry" />
              </div>
              
              <div className="mb-10">
                <label className="block text-moon-silver text-xs uppercase tracking-widest mb-3 font-bold">Transmission Log</label>
                <textarea required rows="6" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-space-black border border-white/10 rounded-xl px-5 py-4 text-star-white focus:border-cosmic-cyan outline-none transition-colors resize-none" placeholder="Your message here..." />
              </div>
              
              <button 
                type="submit" 
                disabled={status !== 'idle'} 
                className={`w-full md:w-auto px-12 py-4 font-heading font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-3 ${
                  status === 'success' ? 'bg-success-green text-space-black' : 'bg-gradient-cosmic text-star-white hover:opacity-90 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] hover:-translate-y-1'
                }`}
              >
                {status === 'submitting' ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : status === 'success' ? (
                  <>Transmission Sent ✓</>
                ) : (
                  <>Transmit Message <Send size={18} /></>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
