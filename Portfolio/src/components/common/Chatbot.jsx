import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend, FiCpu } from 'react-icons/fi';

const qaPairList = [
  { keywords: ['hello', 'hi', 'hey'], answer: "Hello there! I'm Soham's AI assistant. How can I help you today?" },
  { keywords: ['skills', 'tech', 'stack'], answer: "Soham's core skills are in Python, Machine Learning, Robotics (ROS/C++), and Web Development (React/Node.js). You can see more on the About page!" },
  { keywords: ['project', 'mars', 'rover', 'work'], answer: "His flagship project is an autonomous Mars Rover simulation with pathfinding and CV. He's also built ML models and web dashboards. Check out the Projects page!" },
  { keywords: ['contact', 'hire', 'email', 'available'], answer: "Soham is currently open to internships and collaborations! You can email him at soham.patade@example.com or use the Contact page form." },
  { keywords: ['who', 'about', 'background'], answer: "Soham is a Computer Engineering student passionate about the intersection of AI, Robotics, and Aerospace technologies, with a vision to contribute to cutting-edge research." },
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi! I'm Soham's AI assistant. Ask me about his projects, skills, or how to contact him!" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 50);
    }
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      let response = "I'm a simple AI, so I might not understand everything. Try asking about Soham's skills, projects, or contact info!";
      
      const lowerInput = userMsg.toLowerCase();
      
      for (const pair of qaPairList) {
        if (pair.keywords.some(kw => lowerInput.includes(kw))) {
          response = pair.answer;
          break;
        }
      }

      setMessages(prev => [...prev, { sender: 'bot', text: response }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[100]">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full bg-gradient-primary shadow-[0_0_20px_rgba(0,212,255,0.4)] flex items-center justify-center text-white relative group cursor-pointer border-0"
            >
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <FiMessageSquare size={24} />
              
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent-magenta border-2 border-bg-space animate-pulse"></span>
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9, originX: 1, originY: 1 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: "spring", bounce: 0.3 }}
              className="absolute bottom-0 right-0 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] bg-[#131830]/95 backdrop-blur-xl border border-accent-cyan/20 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-primary px-6 py-4 flex justify-between items-center text-white shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <FiCpu size={20} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg leading-tight">AI Assistant</h3>
                    <div className="flex items-center gap-1.5 text-xs text-white/80">
                      <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                      Online
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors border-0 cursor-pointer"
                >
                  <FiX />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-grow p-6 overflow-y-auto space-y-4 custom-scrollbar">
                {messages.map((msg, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'bot' && (
                      <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex shrink-0 items-center justify-center text-accent-cyan mr-3 self-end mb-1">
                        <FiCpu size={14} />
                      </div>
                    )}
                    <div 
                      className={`max-w-[75%] px-4 py-3 text-sm md:text-base ${
                        msg.sender === 'user' 
                          ? 'bg-accent-purple text-white rounded-2xl rounded-br-sm' 
                          : 'bg-white/10 text-text-secondary rounded-2xl rounded-bl-sm border border-white/5'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start items-end"
                  >
                    <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex shrink-0 items-center justify-center text-accent-cyan mr-3 mb-1">
                      <FiCpu size={14} />
                    </div>
                    <div className="bg-white/10 px-4 py-4 rounded-2xl rounded-bl-sm border border-white/5 flex gap-1.5">
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-2 h-2 rounded-full bg-text-muted"></motion.div>
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 rounded-full bg-text-muted"></motion.div>
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 rounded-full bg-text-muted"></motion.div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} className="h-1" />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-bg-space/80 border-t border-white/10 shrink-0">
                <form onSubmit={handleSend} className="relative flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me something..."
                    className="w-full bg-white/5 border border-white/10 rounded-full pl-5 pr-12 py-3 text-white text-sm focus:outline-none focus:border-accent-cyan/50"
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="absolute right-2 w-8 h-8 rounded-full bg-accent-cyan flex items-center justify-center text-bg-space hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-0 cursor-pointer"
                  >
                    <FiSend size={14} className="ml-[2px] mt-[1px]" />
                  </button>
                </form>
              </div>
              
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}} />
    </>
  );
};

export default Chatbot;
