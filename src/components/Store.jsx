import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { ShoppingCart, Heart, Eye, Star, Check, ArrowLeft, RotateCw, RefreshCw, X, ShieldAlert } from 'lucide-react';

export default function Store() {
  const {
    catalog,
    cart, addToCart,
    wishlist, toggleWishlist,
    compareList, toggleCompare,
    currentView, setCurrentView,
    selectedProductId, setSelectedProductId
  } = useContext(AppContext);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [is360Mode, setIs360Mode] = useState(false);
  const [rotationIndex, setRotationIndex] = useState(0);

  // Categories list
  const categories = ['All', 'Solar Panels', 'Solar Inverters', 'Lithium Batteries', 'Solar Water Heaters', 'Solar Accessories'];

  // Handle 360 rotation drag simulation
  const handle360Drag = (e) => {
    // Basic mouse drag simulation: incremental change of image rotation
    const delta = Math.floor(e.clientX / 40) % 3;
    const nextIndex = Math.abs(delta);
    setRotationIndex(nextIndex);
  };

  const filteredProducts = selectedCategory === 'All' 
    ? catalog 
    : catalog.filter(p => p.category === selectedCategory);

  const selectedProduct = catalog.find(p => p.id === selectedProductId);

  // Render detail view if selectedProduct is set
  if (selectedProduct) {
    const imagesToRender = is360Mode ? selectedProduct.images : [selectedProduct.images[activeImageIndex]];
    const currentDisplayImage = is360Mode ? selectedProduct.images[rotationIndex] : selectedProduct.images[activeImageIndex];

    return (
      <div className="py-24 max-w-7xl mx-auto px-6 animate-fade-in text-left">
        <button 
          onClick={() => { setSelectedProductId(null); setIs360Mode(false); }}
          className="flex items-center gap-2 mb-6 font-bold text-sm text-solar-primary uppercase hover:underline"
        >
          <ArrowLeft size={16} /> Back to Store
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Gallery Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-150 dark:border-gray-900 h-96 flex items-center justify-center p-6 shadow-md">
              
              {/* Main image */}
              <img 
                src={currentDisplayImage ? (currentDisplayImage.startsWith('http') ? currentDisplayImage : `${import.meta.env.BASE_URL}${currentDisplayImage.replace(/^\//, '')}`) : 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80'} 
                alt={selectedProduct.name}
                onMouseMove={is360Mode ? handle360Drag : undefined}
                className={`max-h-full max-w-full object-contain transition-all duration-300 ${
                  is360Mode ? 'cursor-ew-resize' : ''
                }`}
              />

              {/* 360 mode indicator badge */}
              <button 
                onClick={() => setIs360Mode(!is360Mode)}
                className={`absolute bottom-4 right-4 px-4 py-2 rounded-full font-bold text-xs flex items-center gap-1.5 shadow-md border transition-all ${
                  is360Mode 
                    ? 'bg-solar-primary text-white border-solar-primary' 
                    : 'bg-white dark:bg-gray-700 text-solar-textDark dark:text-white border-gray-200 dark:border-gray-600 hover:bg-gray-50'
                }`}
              >
                <RotateCw size={14} className={is360Mode ? 'animate-spin' : ''} />
                {is360Mode ? 'Active 360° (Drag Image)' : '360° Viewer'}
              </button>

              {/* Discount Tag */}
              {selectedProduct.discountPrice && (
                <div className="absolute top-4 left-4 bg-red-500 text-white font-bold text-xs px-3 py-1.5 rounded-full">
                  SAVE {Math.round(((selectedProduct.price - selectedProduct.discountPrice) / selectedProduct.price) * 100)}%
                </div>
              )}
            </div>

            {/* Thumbnail gallery */}
            {!is360Mode && (
              <div className="flex gap-2">
                {selectedProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border p-2 ${
                      activeImageIndex === idx ? 'border-solar-primary' : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <img src={img.startsWith('http') ? img : `${import.meta.env.BASE_URL}${img.replace(/^\//, '')}`} alt="thumbnail" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold text-solar-primary uppercase tracking-widest">{selectedProduct.category}</span>
              <h1 className="text-3xl font-extrabold text-solar-textDark dark:text-white uppercase mt-1">
                {selectedProduct.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-1 mt-2 text-solar-yellow">
                <Star size={16} fill="currentColor" />
                <span className="font-bold text-sm text-solar-textDark dark:text-white">{selectedProduct.rating}</span>
                <span className="text-xs text-gray-400">({selectedProduct.reviewsCount} verified reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-black text-solar-primary">
                ₹{selectedProduct.discountPrice ? selectedProduct.discountProduct : (selectedProduct.discountPrice || selectedProduct.price).toLocaleString()}
              </span>
              {selectedProduct.discountPrice && (
                <span className="text-base text-gray-400 line-through">
                  ₹{selectedProduct.price.toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm font-light text-gray-600 dark:text-gray-300 leading-relaxed">
              {selectedProduct.description}
            </p>

            {/* Availability */}
            <div className="flex items-center gap-2 text-xs font-semibold text-solar-primary">
              <span className="w-2 h-2 rounded-full bg-solar-secondary"></span>
              Availability: {selectedProduct.availability}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <button 
                onClick={() => { addToCart(selectedProduct, 1); alert('Added to cart!'); }}
                className="px-8 py-3.5 bg-solar-primary text-white rounded-full font-bold text-sm hover-glow glow-btn flex items-center gap-2"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
              <button 
                onClick={() => toggleWishlist(selectedProduct.id)}
                className={`p-3 rounded-full border transition-all ${
                  wishlist.includes(selectedProduct.id)
                    ? 'bg-red-500/10 border-red-500 text-red-500'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 hover:text-red-500'
                }`}
              >
                <Heart size={20} fill={wishlist.includes(selectedProduct.id) ? 'currentColor' : 'none'} />
              </button>
              <button 
                onClick={() => toggleCompare(selectedProduct)}
                className={`p-3 rounded-full border transition-all ${
                  compareList.find(p => p.id === selectedProduct.id)
                    ? 'bg-solar-primary/10 border-solar-primary text-solar-primary'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 hover:text-solar-primary'
                }`}
              >
                <RefreshCw size={20} />
              </button>
            </div>

            {/* Features List */}
            <div className="space-y-2">
              <h3 className="font-bold text-xs uppercase text-gray-400">Key Features</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400">
                {selectedProduct.features.map((feat, index) => (
                  <li key={index} className="flex gap-2 items-start">
                    <Check size={14} className="text-solar-secondary flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specs Table */}
            <div className="space-y-2">
              <h3 className="font-bold text-xs uppercase text-gray-400">Specifications</h3>
              <div className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden text-xs">
                {Object.entries(selectedProduct.specifications).map(([key, val], idx) => (
                  <div key={idx} className={`grid grid-cols-2 p-3 ${
                    idx % 2 === 0 ? 'bg-solar-bgLight/40 dark:bg-gray-800/10' : 'bg-white dark:bg-gray-800/40'
                  }`}>
                    <span className="font-semibold text-gray-500 dark:text-gray-400">{key}</span>
                    <span className="text-solar-textDark dark:text-white font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 space-y-12">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
        <div className="space-y-4">
          <span className="text-xs font-bold tracking-widest text-solar-primary uppercase block">
            SUNVOIT SMART STORE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-solar-textDark dark:text-white uppercase leading-none">
            E-Commerce Portal
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-light">
            Browse our line of premium solar energy products, accessories, and batteries with certified 25-year warranties.
          </p>
        </div>

        {/* Categories Tab switches */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                selectedCategory === cat
                  ? 'bg-solar-primary text-white border-solar-primary'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-solar-textDark dark:text-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Catalog */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((prod) => (
          <div 
            key={prod.id}
            className="group rounded-3xl overflow-hidden glass border dark:border-gray-800 h-[450px] flex flex-col justify-between shadow-sm hover:shadow-2xl transition-all duration-300 hover-glow"
          >
            {/* Header Image */}
            <div className="h-56 bg-white dark:bg-gray-900 p-6 flex items-center justify-center relative border-b border-gray-100 dark:border-gray-850">
              <img src={prod.images[0].startsWith('http') ? prod.images[0] : `${import.meta.env.BASE_URL}${prod.images[0].replace(/^\//, '')}`} alt={prod.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
              
              {prod.discountPrice && (
                <span className="absolute top-4 left-4 bg-red-500 text-white font-bold text-[10px] px-2.5 py-1 rounded-full uppercase">
                  Sale
                </span>
              )}

              {/* Hover actions */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button 
                  onClick={() => setSelectedProductId(prod.id)}
                  className="p-3 bg-white text-solar-textDark rounded-full hover:bg-solar-primary hover:text-white transition-colors"
                  title="Quick View"
                >
                  <Eye size={18} />
                </button>
                <button 
                  onClick={() => { addToCart(prod, 1); alert('Added to cart!'); }}
                  className="p-3 bg-white text-solar-textDark rounded-full hover:bg-solar-primary hover:text-white transition-colors"
                  title="Add to Cart"
                >
                  <ShoppingCart size={18} />
                </button>
                <button 
                  onClick={() => toggleCompare(prod)}
                  className="p-3 bg-white text-solar-textDark rounded-full hover:bg-solar-primary hover:text-white transition-colors"
                  title="Compare"
                >
                  <RefreshCw size={18} />
                </button>
              </div>
            </div>

            {/* Body Info */}
            <div className="p-6 flex-1 flex flex-col justify-between items-start text-left">
              <div className="space-y-1.5 w-full">
                <div className="flex justify-between items-center w-full">
                  <span className="text-[10px] font-bold text-solar-primary uppercase">{prod.category}</span>
                  <button onClick={() => toggleWishlist(prod.id)} className="text-gray-400 hover:text-red-500">
                    <Heart size={16} fill={wishlist.includes(prod.id) ? '#EF4444' : 'none'} className={wishlist.includes(prod.id) ? 'text-red-500' : ''} />
                  </button>
                </div>
                
                <h3 className="font-extrabold text-base text-solar-textDark dark:text-white group-hover:text-solar-primary transition-colors truncate">
                  {prod.name}
                </h3>

                <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
                  {prod.description}
                </p>
              </div>

              {/* Price & Rating footer */}
              <div className="flex justify-between items-center w-full pt-4 border-t border-gray-150 dark:border-gray-800/60">
                <div className="flex items-baseline gap-2">
                  <span className="font-black text-lg text-solar-primary">
                    ₹{(prod.discountPrice || prod.price).toLocaleString()}
                  </span>
                  {prod.discountPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      ₹{prod.price.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-0.5 text-solar-yellow">
                  <Star size={12} fill="currentColor" />
                  <span className="text-xs font-bold text-solar-textDark dark:text-white">{prod.rating}</span>
                </div>
              </div>

            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
