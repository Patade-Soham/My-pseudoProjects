import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, Star, Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { useCartStore } from '../store/cartStore';
import ProductCard from '../components/common/ProductCard';
import Badge from '../components/common/Badge';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore(state => state.addItem);
  
  const product = products.find(p => p.id === id);
  
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 text-center bg-space-black flex flex-col items-center justify-center">
        <h1 className="text-4xl text-star-white font-heading mb-4">Product Not Found</h1>
        <button onClick={() => navigate('/shop')} className="px-6 py-2 border border-cosmic-cyan text-cosmic-cyan rounded-lg">Back to Shop</button>
      </div>
    );
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      addItem(product, quantity);
      setIsAdding(false);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }, 600);
  };

  const images = product.images.length > 1 ? product.images : [product.images[0], product.images[0], product.images[0], product.images[0]];
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="bg-space-black min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-moon-silver mb-8">
          <Link to="/" className="hover:text-star-white">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-star-white">Shop</Link>
          <span>/</span>
          <span className="text-cosmic-cyan">{product.category.replace('-', ' ')}</span>
        </div>

        {/* Product Viewer & Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20 animate-fade-in-up">
          
          {/* Left: Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/5 bg-deep-space">
              <img src={mainImage} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {product.isFeatured && <Badge variant="featured">Featured</Badge>}
                {product.discount > 0 && <Badge variant="discount">{product.discount}% OFF</Badge>}
              </div>
            </div>
            
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setMainImage(img)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${mainImage === img ? 'border-cosmic-cyan shrink-0' : 'border-white/5 hover:border-white/20'}`}
                >
                  <img src={img} alt={`Thumbnail ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex flex-col">
            <Badge variant="category" className="w-fit mb-4">{product.category.replace('-', ' ')}</Badge>
            
            <h1 className="font-heading font-black text-3xl md:text-5xl text-star-white uppercase mb-4 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(star => (
                  <Star key={star} size={18} className={star <= Math.round(product.rating) ? 'fill-warning-yellow text-warning-yellow' : 'text-moon-silver/30'} />
                ))}
              </div>
              <span className="text-moon-silver text-sm">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <div className="flex items-end gap-4 mb-6">
              <span className="font-mono font-bold text-4xl lg:text-5xl text-cosmic-cyan">₹{product.price.toLocaleString()}</span>
              {product.discount > 0 && (
                <span className="font-mono text-xl text-moon-silver/50 line-through mb-1">₹{product.originalPrice?.toLocaleString()}</span>
              )}
            </div>

            <p className="text-moon-silver/80 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 mb-10 text-sm text-moon-silver">
              {product.features?.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cosmic-cyan" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {/* Quantity */}
              <div className="flex items-center justify-between border border-white/10 rounded-lg p-2 bg-deep-space w-full sm:w-32">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:text-cosmic-cyan text-moon-silver transition-colors">
                  <Minus size={16} />
                </button>
                <span className="font-mono font-bold text-star-white">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:text-cosmic-cyan text-moon-silver transition-colors">
                  <Plus size={16} />
                </button>
              </div>

              {/* Add to Cart */}
              <button 
                onClick={handleAddToCart}
                disabled={isAdding || isAdded}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-lg font-heading font-bold tracking-widest uppercase transition-all duration-300 ${
                  isAdded 
                    ? 'bg-success-green border border-success-green text-space-black' 
                    : 'bg-gradient-cosmic border border-transparent hover:border-cosmic-cyan text-star-white hover:opacity-90 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]'
                }`}
              >
                {isAdding ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isAdded ? (
                  <>Added ✓</>
                ) : (
                  <>
                    <ShoppingCart size={20} /> Add to Cart
                  </>
                )}
              </button>
            </div>
            
            <p className="text-sm text-success-green flex items-center gap-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-success-green animate-pulse" />
              In Stock - Ready to ship
            </p>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-deep-space rounded-2xl border border-white/5 overflow-hidden mb-24 animate-fade-in-up">
          <div className="flex border-b border-white/5 overflow-x-auto">
            {['description', 'specifications', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-6 font-heading font-bold uppercase tracking-wider text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab 
                    ? 'text-cosmic-cyan border-b-2 border-cosmic-cyan bg-white/5' 
                    : 'text-moon-silver hover:text-star-white hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="p-8 lg:p-12">
            {activeTab === 'description' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="prose prose-invert max-w-none text-moon-silver">
                <h3 className="text-xl font-heading text-star-white mb-4">About This Product</h3>
                <p className="mb-6 leading-relaxed">{product.description}</p>
                <p className="leading-relaxed">Engineered using the latest space-grade materials, this product ensures maximum durability and cosmic accuracy. Perfect for both collectors and everyday enthusiasts looking to bring a piece of the universe into their home.</p>
              </motion.div>
            )}
            
            {activeTab === 'specifications' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
                <table className="w-full text-left text-moon-silver">
                  <tbody>
                    {Object.entries(product.specifications || {}).map(([key, value], i) => (
                      <tr key={i} className="border-b border-white/5 last:border-0">
                        <td className="py-4 font-heading text-star-white w-1/3 pr-4">{key}</td>
                        <td className="py-4 font-mono text-sm">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
            
            {activeTab === 'reviews' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <div className="inline-flex gap-1 mb-4">
                  {[1,2,3,4,5].map(star => <Star key={star} size={24} className={star <= Math.round(product.rating) ? 'fill-warning-yellow text-warning-yellow' : 'text-moon-silver/30'} />)}
                </div>
                <h3 className="font-heading font-bold text-2xl text-star-white mb-2">{product.rating} out of 5</h3>
                <p className="text-moon-silver mb-8">Based on {product.reviews} reviews from verified astronauts</p>
                <button className="px-6 py-3 bg-nebula-blue text-star-white rounded-lg font-heading uppercase text-sm font-bold border border-white/10 hover:border-cosmic-cyan transition-colors hover:shadow-[0_0_15px_rgba(0,212,255,0.3)]">
                  Add a transmission
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-star-white uppercase tracking-wider">You Might Also Like</h2>
              <div className="h-0.5 flex-1 bg-white/5 ml-8 hidden sm:block" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} onAddToCart={() => addItem(p)} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
