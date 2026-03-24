import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/common/ProductCard';
import { products } from '../data/products';
import { useCartStore } from '../store/cartStore';

const CATEGORIES = [
  { id: 'all', name: 'All Categories' },
  { id: 'mars-rovers', name: 'Mars Rovers' },
  { id: 'astronaut-gear', name: 'Astronaut Gear' },
  { id: 'posters', name: 'Posters & Art' },
  { id: 'telescopes', name: 'Telescopes' },
  { id: 'gadgets', name: 'Gadgets' }
];

const Shop = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'all';

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState(15000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('newest');
  
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const addItem = useCartStore(state => state.addItem);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (search) {
      result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category !== 'all') {
      result = result.filter(p => p.category === category);
    }
    result = result.filter(p => p.price <= priceRange);
    if (minRating > 0) {
      result = result.filter(p => p.rating >= minRating);
    }

    switch (sortBy) {
      case 'price-low':
        return result.sort((a, b) => a.price - b.price);
      case 'price-high':
        return result.sort((a, b) => b.price - a.price);
      case 'rating':
        return result.sort((a, b) => b.rating - a.rating);
      case 'newest':
      default:
        // Mock newest simply by original list order
        return result;
    }
  }, [search, category, priceRange, minRating, sortBy]);

  const clearFilters = () => {
    setSearch('');
    setCategory('all');
    setPriceRange(15000);
    setMinRating(0);
  };

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Search */}
      <div>
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-moon-silver/50" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-nebula-blue/20 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-star-white focus:outline-none focus:border-cosmic-cyan transition-colors"
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <h4 className="font-heading font-bold text-star-white uppercase mb-4 tracking-wider text-sm">Category</h4>
        <div className="space-y-3">
          {CATEGORIES.map(c => (
            <label key={c.id} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" 
                name="category"
                checked={category === c.id}
                onChange={() => setCategory(c.id)}
                className="w-4 h-4 bg-transparent border border-moon-silver/50 rounded-full checked:bg-cosmic-cyan checked:border-cosmic-cyan transition-all appearance-none flex items-center justify-center relative before:content-[''] before:w-2 before:h-2 before:bg-space-black before:rounded-full before:opacity-0 checked:before:opacity-100"
              />
              <span className={`text-sm transition-colors ${category === c.id ? 'text-cosmic-cyan font-bold' : 'text-moon-silver group-hover:text-star-white'}`}>
                {c.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-heading font-bold text-star-white uppercase tracking-wider text-sm">Max Price</h4>
          <span className="font-mono text-cosmic-cyan text-sm">₹{priceRange.toLocaleString()}</span>
        </div>
        <input 
          type="range" 
          min="500" 
          max="15000" 
          step="500"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-cosmic-cyan h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Rating */}
      <div>
        <h4 className="font-heading font-bold text-star-white uppercase mb-4 tracking-wider text-sm">Minimum Rating</h4>
        <div className="space-y-3">
          {[4, 3, 2].map(rating => (
            <label key={rating} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" 
                name="rating"
                checked={minRating === rating}
                onChange={() => setMinRating(rating)}
                className="w-4 h-4 bg-transparent border border-moon-silver/50 rounded-full checked:bg-cosmic-cyan checked:border-cosmic-cyan transition-all appearance-none flex items-center justify-center relative before:content-[''] before:w-2 before:h-2 before:bg-space-black before:rounded-full before:opacity-0 checked:before:opacity-100"
              />
              <span className={`text-sm flex items-center gap-1 transition-colors ${minRating === rating ? 'text-star-white font-bold' : 'text-moon-silver group-hover:text-star-white'}`}>
                <span className="w-3">{rating}</span> <span className="text-warning-yellow tracking-widest text-lg">{'★'.repeat(rating)}{'☆'.repeat(5-rating)}</span> & Up
              </span>
            </label>
          ))}
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="radio" 
              name="rating"
              checked={minRating === 0}
              onChange={() => setMinRating(0)}
              className="w-4 h-4 bg-transparent border border-moon-silver/50 rounded-full checked:bg-cosmic-cyan checked:border-cosmic-cyan transition-all appearance-none flex items-center justify-center relative before:content-[''] before:w-2 before:h-2 before:bg-space-black before:rounded-full before:opacity-0 checked:before:opacity-100"
            />
            <span className={`text-sm flex items-center gap-1 transition-colors ${minRating === 0 ? 'text-star-white font-bold' : 'text-moon-silver group-hover:text-star-white'}`}>
              Any Rating
            </span>
          </label>
        </div>
      </div>

      <button 
        onClick={clearFilters}
        className="w-full py-3 mt-4 border border-moon-silver/30 text-moon-silver rounded-lg font-heading text-sm uppercase tracking-widest hover:border-moon-silver hover:text-star-white transition-colors"
      >
        Clear Filters
      </button>
    </div>
  );

  return (
    <div className="bg-space-black min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-72 shrink-0 sticky top-32 bg-deep-space p-6 rounded-2xl border border-white/5 shadow-xl">
            <FilterContent />
          </aside>

          {/* Main Content */}
          <div className="flex-1 w-full">
            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
              <p className="text-moon-silver text-sm">
                Showing <strong className="text-star-white text-lg ml-1">{filteredProducts.length}</strong> products
              </p>
              
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <button 
                  onClick={() => setIsMobileFiltersOpen(true)}
                  className="lg:hidden flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-deep-space border border-white/10 rounded-lg text-moon-silver hover:text-cosmic-cyan transition-colors"
                >
                  <Filter size={18} /> Filters
                </button>

                <div className="relative flex-1 sm:w-56">
                  <select 
                    value={sortBy} 
                    onChange={e => setSortBy(e.target.value)}
                    className="w-full appearance-none bg-deep-space border border-white/10 rounded-lg pl-4 pr-10 py-2.5 text-sm text-star-white focus:outline-none focus:border-cosmic-cyan hover:border-white/20 transition-colors cursor-pointer font-bold"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Best Rated</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-moon-silver">
                    <SlidersHorizontal size={14} />
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-deep-space rounded-2xl border border-white/5 p-16 text-center shadow-xl">
                <div className="text-6xl mb-6">🔭</div>
                <h3 className="font-heading font-bold text-2xl text-star-white mb-2 tracking-wider">No products found</h3>
                <p className="text-moon-silver mb-8">We couldn't find anything matching your universe parameters.</p>
                <button 
                  onClick={clearFilters}
                  className="px-8 py-3 border border-cosmic-cyan text-cosmic-cyan rounded-lg font-heading font-bold uppercase tracking-widest hover:bg-cosmic-cyan/10 transition-colors"
                >
                  RESET FILTERS
                </button>
              </div>
            ) : (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence>
                  {filteredProducts.map((product, i) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      key={product.id}
                    >
                      <ProductCard product={product} onAddToCart={() => addItem(product)} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Sheet */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[110] lg:hidden"
              onClick={() => setIsMobileFiltersOpen(false)}
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 h-[85vh] bg-deep-space rounded-t-[2rem] border-t border-white/10 z-[120] lg:hidden flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-space-black/80 rounded-t-[2rem]">
                <h3 className="font-heading font-bold text-xl text-star-white uppercase tracking-wider">Filters</h3>
                <button 
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-2 text-moon-silver hover:text-error-red transition-colors bg-white/5 hover:bg-white/10 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto flex-1">
                <FilterContent />
              </div>
              <div className="p-6 border-t border-white/5 bg-space-black/90 pb-8 rounded-b-[2rem]">
                <button 
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-full py-4 bg-gradient-cosmic text-star-white rounded-lg font-heading font-bold uppercase tracking-widest hover:opacity-90 shadow-[0_0_20px_rgba(0,212,255,0.4)]"
                >
                  Show {filteredProducts.length} Results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shop;
