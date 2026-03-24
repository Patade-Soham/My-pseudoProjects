import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Rocket, Globe, GraduationCap, ArrowDown } from 'lucide-react';
import ProductCard from '../components/common/ProductCard';
import { products } from '../data/products';
import { useCartStore } from '../store/cartStore';

const featuredProducts = products.filter(p => p.isFeatured);

const categories = [
  { id: 'mars-rovers', name: 'Mars Rovers', icon: '🚗', count: '3 Products', bgImage: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=800', color: 'group-hover:border-rover-red group-hover:shadow-[0_0_30px_rgba(255,71,87,0.3)]' },
  { id: 'astronaut-gear', name: 'Astronaut Gear', icon: '👨‍🚀', count: '8 Products', bgImage: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800', color: 'group-hover:border-astronaut-gold group-hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]' },
  { id: 'posters', name: 'Posters & Art', icon: '🖼️', count: '6 Products', bgImage: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=800', color: 'group-hover:border-poster-teal group-hover:shadow-[0_0_30px_rgba(0,217,163,0.3)]' },
  { id: 'telescopes', name: 'Telescopes', icon: '🔭', count: '5 Products', bgImage: 'https://images.unsplash.com/photo-1518066540608-410a62d53bf1?auto=format&fit=crop&q=80&w=800', color: 'group-hover:border-telescope-purple group-hover:shadow-[0_0_30px_rgba(162,139,255,0.3)]' }
];

const Home = () => {
  const addItem = useCartStore(state => state.addItem);

  // Parallax stars
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      document.querySelectorAll('.parallax-star').forEach((star, i) => {
        const speed = 0.1 + (i % 5) * 0.05;
        star.style.transform = `translateY(${scrolled * speed}px)`;
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stars = Array.from({ length: 50 }).map((_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    size: Math.random() > 0.8 ? 'w-1.5 h-1.5' : 'w-1 h-1'
  }));

  return (
    <div className="bg-space-black relative min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex border-b flex-col justify-center items-center overflow-hidden border-white/5 bg-space-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-space opacity-80" />
          {stars.map((star, i) => (
            <div 
              key={i}
              className={`parallax-star absolute bg-white rounded-full opacity-60 animate-glow-pulse ${star.size}`}
              style={{ left: star.left, top: star.top, animationDelay: star.animationDelay }}
            />
          ))}
        </div>

        {/* Rocket Animation */}
        <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 z-10 animate-rocket-launch">
          <Rocket size={100} className="text-cosmic-cyan filter drop-shadow-[0_0_20px_rgba(0,212,255,0.8)]" />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-32 bg-gradient-to-t from-transparent via-mars-orange to-warning-yellow blur-xl animate-pulse" />
        </div>

        <div className="relative z-20 text-center px-4 mt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30, letterSpacing: '-0.1em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '-0.02em' }}
            transition={{ duration: 1.5, delay: 2.5 }}
            className="font-heading font-black text-5xl md:text-7xl lg:text-[96px] text-star-white uppercase leading-none drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] mb-6"
          >
            Bring The Universe<br/><span className="text-transparent bg-clip-text bg-gradient-cosmic">Home</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.5 }}
            className="font-body text-lg md:text-2xl text-moon-silver max-w-2xl mx-auto mb-10"
          >
            Premium space tech products, replicas, and educational kits for enthusiasts globally.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/shop" className="px-8 py-4 bg-gradient-cosmic text-star-white font-heading font-bold uppercase tracking-widest rounded-lg hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,212,255,0.5)] transition-all">
              Explore Products
            </Link>
            <Link to="/about" className="px-8 py-4 bg-transparent border-2 border-cosmic-cyan text-cosmic-cyan font-heading font-bold uppercase tracking-widest rounded-lg hover:bg-cosmic-cyan/10 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all">
              Our Mission
            </Link>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 5.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cosmic-cyan animate-bounce-soft"
        >
          <ArrowDown size={32} />
        </motion.div>
      </section>

      {/* 2. FEATURED PRODUCTS */}
      <section className="py-24 relative z-10 bg-space-black overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-star-white uppercase mb-4">Featured Selection</h2>
            <div className="h-1 w-24 bg-gradient-cosmic mx-auto rounded-full mb-4" />
            <p className="text-moon-silver text-lg">Curated collection of our best selling space tech</p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="px-2"
          >
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 }
              }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true, dynamicBullets: true }}
              navigation
              className="!pb-16"
            >
              {featuredProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} onAddToCart={() => addItem(product)} />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </section>

      {/* 3. CATEGORY TILES */}
      <section className="py-24 bg-deep-space relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-star-white uppercase mb-4">Explore Categories</h2>
            <div className="h-1 w-24 bg-gradient-cosmic mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {categories.map((cat, i) => (
              <motion.div 
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link 
                  to={`/shop?category=${cat.id}`} 
                  className={`group relative block h-[300px] rounded-2xl overflow-hidden cursor-pointer border border-white/5 transition-all duration-500 ${cat.color}`}
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{ backgroundImage: `url(${cat.bgImage})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-space-black via-space-black/80 to-transparent transition-all duration-500 group-hover:from-space-black/95" />
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <span className="text-4xl mb-4 transform transition-transform duration-500 group-hover:-translate-y-2">{cat.icon}</span>
                    <h3 className="font-heading font-bold text-3xl text-star-white uppercase mb-2 transform transition-transform duration-500 group-hover:-translate-y-2">{cat.name}</h3>
                    <p className="text-cosmic-cyan font-mono text-sm tracking-widest uppercase transform transition-all duration-500 group-hover:-translate-y-2">{cat.count}</p>
                    
                    <div className="absolute bottom-8 right-8 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      <span className="px-4 py-2 bg-white/10 backdrop-blur text-white rounded-full font-heading text-sm uppercase font-bold border border-white/20">
                        Shop Now
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="py-24 bg-space-black border-y border-white/5">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Rocket, title: "Space-Quality", desc: "Authentic replicas and high-quality models built to precise dimensions." },
              { icon: Globe, title: "Worldwide Shipping", desc: "Fast, reliable, and insured delivery to anywhere on the planet." },
              { icon: GraduationCap, title: "Educational Value", desc: "Learn while you collect. Every item comes with detailed space facts." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="text-center p-8 rounded-2xl bg-nebula-blue/10 border border-white/5 hover:border-cosmic-cyan/30 transition-colors"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-cosmic p-0.5 mb-8">
                  <div className="w-full h-full bg-space-black flex items-center justify-center rounded-full">
                    <feature.icon size={36} className="text-cosmic-cyan" />
                  </div>
                </div>
                <h3 className="font-heading font-bold text-xl text-star-white uppercase mb-4 tracking-wider">{feature.title}</h3>
                <p className="text-moon-silver/80 leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
