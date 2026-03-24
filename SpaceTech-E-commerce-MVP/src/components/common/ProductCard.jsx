import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import Badge from './Badge';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="group relative bg-deep-space rounded-2xl p-4 border border-white/5 overflow-hidden transition-all duration-300 ease-out hover:-translate-y-2 hover:border-cosmic-cyan hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_30px_rgba(0,212,255,0.2)]">
      {/* Shine effect */}
      <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-700 group-hover:left-full z-10 pointer-events-none" />

      <Link to={`/product/${product.id}`} className="block relative aspect-square mb-4 overflow-hidden rounded-xl">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <div className="absolute top-2 left-2 flex flex-col gap-2 z-20">
          {product.isFeatured && <Badge variant="featured">Featured</Badge>}
          {product.discount > 0 && <Badge variant="discount">{product.discount}% OFF</Badge>}
        </div>
      </Link>

      <div className="space-y-2">
        <Badge variant="category" className="!text-[9px] !px-2 !py-1">{product.category.replace('-', ' ')}</Badge>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="font-heading font-bold text-lg text-star-white truncate group-hover:text-cosmic-cyan transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center text-sm text-moon-silver/70">
          <span className="text-warning-yellow mr-1">★</span>
          <span>{product.rating} ({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            {product.discount > 0 && (
              <span className="text-sm text-moon-silver/50 line-through">₹{product.originalPrice?.toLocaleString()}</span>
            )}
            <span className="font-mono font-bold text-xl text-cosmic-cyan">₹{product.price.toLocaleString()}</span>
          </div>

          <button 
            onClick={(e) => { e.preventDefault(); onAddToCart(product); }}
            className="w-10 h-10 rounded-full bg-nebula-blue flex items-center justify-center text-star-white border border-white/10 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-cosmic-cyan hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] z-20"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
