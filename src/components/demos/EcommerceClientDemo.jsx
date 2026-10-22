import React, { useState } from 'react';
import { 
  ShoppingBag, Star, Plus, Minus, X, 
  ArrowRight, Truck, ShieldCheck, RefreshCw, Sparkles 
} from 'lucide-react';

export default function EcommerceClientDemo({ onOrderDesign, isMobileView }) {
  const [activeTab, setActiveTab] = useState('All');
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState({});
  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Gulmohar Hand-Embroidered Chanderi Kurta Set',
      price: 3499,
      originalPrice: 5499,
      size: 'M',
      qty: 1,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80'
    }
  ]);

  const products = [
    {
      id: 1,
      name: 'Gulmohar Hand-Embroidered Chanderi Kurta Set',
      category: 'Chanderi Silk',
      price: 3499,
      originalPrice: 5499,
      discount: '36% OFF',
      rating: 4.9,
      reviews: 142,
      tag: 'Festive Bestseller',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      name: 'Noor Banarasi Tissue Silk Saree in Rose Gold',
      category: 'Festive Lehengas',
      price: 6899,
      originalPrice: 9999,
      discount: '31% OFF',
      rating: 5.0,
      reviews: 98,
      tag: 'Handcrafted',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      name: 'Mehrunissa Velvet Anarkali with Zari Dupatta',
      category: 'Chanderi Silk',
      price: 4999,
      originalPrice: 7500,
      discount: '33% OFF',
      rating: 4.8,
      reviews: 76,
      tag: 'Limited Edition',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 4,
      name: 'Kashmiri Aari Work Pure Cotton Co-ord Set',
      category: 'Handcrafted Kurtis',
      price: 2499,
      originalPrice: 3800,
      discount: '34% OFF',
      rating: 4.7,
      reviews: 64,
      tag: 'Trending',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const handleSizeSelect = (productId, size) => {
    setSelectedSize(prev => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (product) => {
    const size = selectedSize[product.id] || 'M';
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id && item.size === size);
      if (exists) {
        return prev.map(item => item.id === product.id && item.size === size ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, size, qty: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (id, size, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.size === size) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const filteredProducts = activeTab === 'All' ? products : products.filter(p => p.category === activeTab);

  return (
    <div className="bg-[#FAF9F6] text-[#222] font-sans antialiased min-h-screen relative">
      
      {/* 1. Announcement Strip */}
      <div className="bg-[#7D4047] text-white text-[10px] sm:text-[11px] py-1.5 px-3 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3 h-3 text-amber-200 shrink-0" />
        <span>FESTIVE SALE: Use Code <strong>ROYAL15</strong> For 15% Off | Free All-India Delivery</span>
      </div>

      {/* 2. D2C Navigation Header */}
      <header className="bg-white border-b border-[#DDD5CD] sticky top-0 z-20 px-3 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="#" className="font-heading font-black text-lg sm:text-2xl text-[#2E2E2E] tracking-widest uppercase">
              ZAHRA <span className="text-[#7D4047] text-[10px] block -mt-1 font-normal tracking-wider">Couture India</span>
            </a>
            {!isMobileView && (
              <nav className="hidden md:flex items-center gap-5 text-xs font-bold uppercase tracking-wider text-[#2E2E2E]/80">
                <a href="#collection" className="hover:text-[#7D4047]">Festive Bestsellers</a>
                <a href="#reviews" className="hover:text-[#7D4047]">Customer Reviews</a>
              </nav>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-full bg-[#F1ECE6] hover:bg-[#DDD5CD] text-[#2E2E2E] transition-all flex items-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[#7D4047]" />
              <span className="text-xs font-bold hidden sm:inline">Bag</span>
              {cart.length > 0 && (
                <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#7D4047] text-white text-[10px] font-bold flex items-center justify-center">
                  {cart.reduce((a, b) => a + b.qty, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 3. Hero Banner */}
      <section className="bg-gradient-to-r from-[#F1ECE6] to-[#EAE4DC] border-b border-[#DDD5CD] py-8 sm:py-16 px-4 sm:px-6">
        <div className={`mx-auto ${isMobileView ? 'space-y-4' : 'max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'}`}>
          <div className={`${isMobileView ? 'space-y-2.5 text-center' : 'lg:col-span-7 space-y-4'}`}>
            <span className="inline-block px-3 py-1 rounded-full bg-[#7D4047]/10 text-[#7D4047] text-[10px] sm:text-xs font-bold uppercase tracking-widest">
              Spring Wedding Edit 2026
            </span>
            <h1 className={`font-extrabold text-[#2E2E2E] font-heading leading-tight ${isMobileView ? 'text-2xl' : 'text-3xl sm:text-5xl'}`}>
              Handcrafted Indian Luxury, Tailored For You.
            </h1>
            <p className="text-xs sm:text-sm text-[#625f5c] leading-relaxed max-w-xl mx-auto">
              Pure Chanderi silk, authentic handloom zari needlework, and heirloom wedding silhouettes delivered to your door.
            </p>
            <div className={`pt-2 flex flex-wrap gap-2.5 ${isMobileView ? 'justify-center' : ''}`}>
              <a 
                href="#collection"
                className="px-5 py-2.5 rounded-xl bg-[#7D4047] hover:bg-[#67333a] text-white font-bold text-xs uppercase tracking-wider shadow-wine"
              >
                Shop Bestsellers
              </a>
              <button
                onClick={onOrderDesign}
                className="px-4 py-2.5 rounded-xl bg-white border border-[#DDD5CD] text-[#2E2E2E] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
              >
                <span>Book This Website Design (₹5k Adv)</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#7D4047]" />
              </button>
            </div>
          </div>

          <div className={`${isMobileView ? 'pt-2' : 'lg:col-span-5'}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] sm:aspect-[4/5] max-w-sm mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80" 
                alt="Boutique Fashion Collection" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-2.5 rounded-xl shadow-lg border border-[#DDD5CD] flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase font-bold text-[#7D4047]">Featured Outfit</span>
                  <p className="text-xs font-bold text-[#2E2E2E]">Gulmohar Silk Ensemble</p>
                  <p className="text-xs font-mono font-bold text-[#7D4047]">₹3,499</p>
                </div>
                <button
                  onClick={() => handleAddToCart(products[0])}
                  className="px-2.5 py-1 rounded-lg bg-[#7D4047] text-white text-[11px] font-bold"
                >
                  Quick Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Trust Pillars */}
      <div className="bg-white border-b border-[#DDD5CD] py-4 px-3">
        <div className={`mx-auto grid ${isMobileView ? 'grid-cols-2 gap-2 text-center' : 'max-w-7xl grid-cols-2 sm:grid-cols-4 gap-4 text-center'}`}>
          <div className="flex flex-col items-center gap-1 p-1.5">
            <Truck className="w-5 h-5 text-[#7D4047]" />
            <h4 className="text-[11px] sm:text-xs font-bold text-[#2E2E2E]">Free Express Delivery</h4>
            <p className="text-[10px] text-[#625f5c]">Orders above ₹1,999</p>
          </div>
          <div className="flex flex-col items-center gap-1 p-1.5">
            <ShieldCheck className="w-5 h-5 text-[#7D4047]" />
            <h4 className="text-[11px] sm:text-xs font-bold text-[#2E2E2E]">100% Handloom Certified</h4>
            <p className="text-[10px] text-[#625f5c]">Artisan Weavers</p>
          </div>
          <div className="flex flex-col items-center gap-1 p-1.5">
            <RefreshCw className="w-5 h-5 text-[#7D4047]" />
            <h4 className="text-[11px] sm:text-xs font-bold text-[#2E2E2E]">7-Day Easy Exchange</h4>
            <p className="text-[10px] text-[#625f5c]">Doorstep Pickup</p>
          </div>
          <div className="flex flex-col items-center gap-1 p-1.5">
            <Star className="w-5 h-5 text-[#7D4047]" />
            <h4 className="text-[11px] sm:text-xs font-bold text-[#2E2E2E]">4.9 / 5 Rating</h4>
            <p className="text-[10px] text-[#625f5c]">12,500+ Reviews</p>
          </div>
        </div>
      </div>

      {/* 5. Collection Grid with Filter Tabs */}
      <section id="collection" className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <span className="text-[10px] sm:text-xs font-bold text-[#7D4047] uppercase tracking-wider">Handpicked For You</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#2E2E2E] font-heading mt-0.5">
              Festive Bestsellers
            </h2>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {['All', 'Chanderi Silk', 'Festive Lehengas', 'Handcrafted Kurtis'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded-lg text-[11px] font-bold tracking-wide transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-[#7D4047] text-white shadow-wine'
                    : 'bg-white border border-[#DDD5CD] text-[#2E2E2E] hover:bg-[#F1ECE6]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards */}
        <div className={`grid gap-4 ${isMobileView ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'}`}>
          {filteredProducts.map(p => {
            const currentSize = selectedSize[p.id] || 'M';
            return (
              <div key={p.id} className="bg-white rounded-2xl border border-[#DDD5CD] overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between group">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#DDD5CD]/20">
                  <img 
                    src={p.image} 
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <span className="absolute top-2.5 left-2.5 bg-[#7D4047] text-white text-[9px] font-bold px-2 py-0.5 rounded-md">
                    {p.tag}
                  </span>
                  <span className="absolute top-2.5 right-2.5 bg-white/90 text-[#2E2E2E] text-[9px] font-bold px-2 py-0.5 rounded-md shadow-sm">
                    {p.discount}
                  </span>
                </div>

                <div className="p-3.5 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 text-xs">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="font-bold text-[#2E2E2E]">{p.rating}</span>
                      <span className="text-[#625f5c] text-[10px]">({p.reviews} reviews)</span>
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-[#2E2E2E] line-clamp-2 mt-1 leading-snug">{p.name}</h3>
                    
                    {/* Size Selectors */}
                    <div className="flex items-center gap-1 mt-2">
                      <span className="text-[10px] font-bold text-[#625f5c] uppercase">Size:</span>
                      {['S', 'M', 'L', 'XL'].map(size => (
                        <button
                          key={size}
                          onClick={() => handleSizeSelect(p.id, size)}
                          className={`w-6 h-6 rounded text-[10px] font-bold border transition-all ${
                            currentSize === size
                              ? 'bg-[#2E2E2E] text-white border-[#2E2E2E]'
                              : 'bg-white text-[#2E2E2E] border-[#DDD5CD]'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-[#DDD5CD]/60 flex items-center justify-between">
                    <div>
                      <span className="text-sm sm:text-base font-black text-[#2E2E2E] font-mono">₹{p.price.toLocaleString('en-IN')}</span>
                      <span className="text-[10px] text-[#625f5c] line-through ml-1 font-mono">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(p)}
                      className="px-3 py-1.5 rounded-xl bg-[#7D4047] hover:bg-[#67333a] text-white text-xs font-bold flex items-center gap-1 shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Customer Testimonials */}
      <section id="reviews" className="bg-[#F1ECE6] border-y border-[#DDD5CD] py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-10">
          <div>
            <div className="text-center max-w-xl mx-auto mb-6">
              <span className="text-[10px] sm:text-xs font-bold text-[#7D4047] uppercase tracking-wider">Customer Love</span>
              <h2 className="text-lg sm:text-2xl font-extrabold text-[#2E2E2E] font-heading mt-0.5">Loved By 12,000+ Women Across India</h2>
            </div>

            <div className={`grid gap-4 ${isMobileView ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-3'}`}>
              <div className="bg-white p-4 rounded-2xl border border-[#DDD5CD] shadow-sm space-y-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>
                <p className="text-xs text-[#2E2E2E] italic leading-relaxed">
                  "The Chanderi suit set fabric is so pure! Wore it for Sangeet in Ahmedabad and got countless compliments. Super fast 2-day delivery."
                </p>
                <div className="pt-2 border-t border-[#DDD5CD] flex items-center justify-between text-[11px]">
                  <span className="font-bold text-[#2E2E2E]">Pooja Patel</span>
                  <span className="text-[#625f5c]">Ahmedabad</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#DDD5CD] shadow-sm space-y-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>
                <p className="text-xs text-[#2E2E2E] italic leading-relaxed">
                  "Zari needlework quality is exceptional, looks like a boutique designer piece. Exactly as shown in photos. Beautiful luxury packaging."
                </p>
                <div className="pt-2 border-t border-[#DDD5CD] flex items-center justify-between text-[11px]">
                  <span className="font-bold text-[#2E2E2E]">Ananya Verma</span>
                  <span className="text-[#625f5c]">Mumbai</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#DDD5CD] shadow-sm space-y-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>
                <p className="text-xs text-[#2E2E2E] italic leading-relaxed">
                  "The flare and lining on the Lehengas are top notch. Sizing was true to the chart and the doorstep return policy gave me total peace of mind."
                </p>
                <div className="pt-2 border-t border-[#DDD5CD] flex items-center justify-between text-[11px]">
                  <span className="font-bold text-[#2E2E2E]">Rhea Kothari</span>
                  <span className="text-[#625f5c]">Bengaluru</span>
                </div>
              </div>
            </div>
          </div>

          {/* Artisan Heritage Strip */}
          <div className={`bg-white rounded-3xl p-5 sm:p-8 border border-[#DDD5CD] shadow-sm flex items-center justify-between gap-6 ${isMobileView ? 'flex-col text-center' : 'flex-col lg:flex-row text-center lg:text-left'}`}>
            <div className={`space-y-1.5 ${isMobileView ? 'text-center' : 'text-center lg:text-left'}`}>
              <span className="text-[10px] font-bold text-[#7D4047] uppercase tracking-wider">Heritage Craftsmanship</span>
              <h3 className="text-base sm:text-lg font-extrabold text-[#2E2E2E] font-heading">
                Hand-Spun Silks & Ethical Weaver Cooperatives
              </h3>
              <p className="text-xs text-[#625f5c] max-w-xl">
                Every Zahra Couture garment supports master handloom artisans across Madhya Pradesh, Gujarat, and Varanasi. 100% azo-free natural dyes and direct fair-trade wages.
              </p>
              <div className={`flex flex-wrap items-center gap-3 pt-1 text-xs text-[#2E2E2E] ${isMobileView ? 'justify-center' : ''}`}>
                <span className="text-[#7D4047] font-bold">Free Express Delivery on Orders &gt; ₹1,999</span>
                <span className="text-[#625f5c]">&bull;</span>
                <span className="text-[#625f5c]">7-Day No-Questions Exchange</span>
              </div>
            </div>

            <div className={`flex flex-wrap items-center gap-3 shrink-0 ${isMobileView ? 'w-full flex-col' : ''}`}>
              <button
                onClick={() => setCartOpen(true)}
                className={`px-5 py-3 rounded-2xl bg-[#7D4047] hover:bg-[#67333a] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-wine transition-all ${isMobileView ? 'w-full justify-center' : ''}`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>View Bag ({cart.length})</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Complete E-Commerce Footer */}
      <footer className="bg-[#2E2E2E] text-white pt-10 pb-6 px-4 sm:px-6 border-t border-[#DDD5CD]">
        <div className={`max-w-7xl mx-auto grid pb-8 border-b border-neutral-700 ${isMobileView ? 'grid-cols-1 gap-6 text-center' : 'grid-cols-1 md:grid-cols-4 gap-8'}`}>
          <div className={`space-y-3 md:col-span-1 ${isMobileView ? 'flex flex-col items-center' : ''}`}>
            <span className="font-heading font-black text-base text-white tracking-widest uppercase">ZAHRA COUTURE</span>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Curated artisanal Indian luxury handlooms, royal festive wear & handcrafted heirloom silhouettes.
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-amber-200 uppercase tracking-wider text-[11px]">Collections</h4>
            <p className="text-neutral-300">Chanderi Silk Ensembles</p>
            <p className="text-neutral-300">Handcrafted Festive Lehengas</p>
            <p className="text-neutral-300">Zari Embroidered Kurtis</p>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-amber-200 uppercase tracking-wider text-[11px]">Customer Support</h4>
            <p className="text-neutral-300">Support Line: +91 98250 11223</p>
            <p className="text-neutral-300">Order Tracking & Returns Desk</p>
            <p className="text-neutral-400 text-[11px]">Mon &ndash; Sat: 10:00 AM &ndash; 07:00 PM</p>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-amber-200 uppercase tracking-wider text-[11px]">Boutique Address</h4>
            <p className="text-neutral-300">Boutique Lane, Sindhu Bhavan Road,</p>
            <p className="text-neutral-300">Ahmedabad, Gujarat 380054</p>
            <p className="text-neutral-400 text-[11px]">100% Secure Encrypted Checkout</p>
          </div>
        </div>

        <div className={`max-w-7xl mx-auto pt-6 flex items-center justify-between text-xs text-neutral-400 gap-2 ${isMobileView ? 'flex-col text-center' : 'flex-col sm:flex-row'}`}>
          <span>&copy; {new Date().getFullYear()} Zahra Couture India. All Rights Reserved.</span>
          <span>Crafted with pure performance &bull; Powered by THE WEBCRAFT</span>
        </div>
      </footer>

      {/* 7. Slide-over Shopping Cart */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-sm sm:max-w-md bg-white h-full shadow-2xl flex flex-col justify-between p-5">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#DDD5CD]">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#7D4047]" />
                  <h3 className="font-heading font-extrabold text-sm text-[#2E2E2E]">Shopping Bag ({cart.length})</h3>
                </div>
                <button onClick={() => setCartOpen(false)} className="p-1 hover:bg-[#DDD5CD]/40 rounded-lg">
                  <X className="w-4 h-4 text-[#2E2E2E]" />
                </button>
              </div>

              {/* Free delivery notice */}
              <div className="bg-[#F1ECE6] p-2.5 rounded-xl my-3 text-[11px] text-[#2E2E2E] flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-[#7D4047] shrink-0" />
                <span>
                  {cartTotal >= 1999 
                    ? '🎉 You unlocked FREE Express Delivery!' 
                    : `Add ₹${(1999 - cartTotal).toLocaleString('en-IN')} more for FREE Delivery`}
                </span>
              </div>

              {/* Cart items */}
              <div className="divide-y divide-[#DDD5CD] max-h-80 overflow-y-auto">
                {cart.length === 0 ? (
                  <p className="text-xs text-[#625f5c] text-center py-8">Your bag is empty.</p>
                ) : (
                  cart.map((item, idx) => (
                    <div key={`${item.id}-${item.size}-${idx}`} className="py-2.5 flex gap-2.5">
                      <img src={item.image} alt={item.name} className="w-14 h-16 object-cover rounded-lg border border-[#DDD5CD]" />
                      <div className="flex-1 space-y-0.5">
                        <h4 className="font-bold text-xs text-[#2E2E2E] line-clamp-1">{item.name}</h4>
                        <span className="text-[10px] text-[#625f5c]">Size: {item.size}</span>
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-xs font-mono font-bold text-[#7D4047]">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                          <div className="flex items-center border border-[#DDD5CD] rounded">
                            <button onClick={() => updateQty(item.id, item.size, -1)} className="p-0.5 hover:bg-[#DDD5CD]/40">
                              <Minus className="w-3 h-3 text-[#2E2E2E]" />
                            </button>
                            <span className="px-1.5 text-xs font-bold">{item.qty}</span>
                            <button onClick={() => updateQty(item.id, item.size, 1)} className="p-0.5 hover:bg-[#DDD5CD]/40">
                              <Plus className="w-3 h-3 text-[#2E2E2E]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Cart Bottom Checkout */}
            <div className="border-t border-[#DDD5CD] pt-3 space-y-2.5">
              <div className="flex justify-between text-xs font-bold text-[#2E2E2E]">
                <span>Total Amount:</span>
                <span className="font-mono text-sm text-[#7D4047]">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <button 
                onClick={onOrderDesign}
                className="w-full py-3 rounded-xl bg-[#7D4047] hover:bg-[#67333a] text-white text-xs font-bold uppercase tracking-wider shadow-wine flex items-center justify-center gap-1.5"
              >
                <span>Order This E-Commerce Website (₹5k Adv)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. Demo Project Floating Banner */}
      <div className={`bg-[#2E2E2E] text-white p-3 sm:p-4 flex items-center justify-between gap-2 text-xs border-t border-[#DDD5CD] ${isMobileView ? 'flex-col text-center' : 'flex-col sm:flex-row'}`}>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span><strong>Client Demo:</strong> Zahra Couture &bull; Built by <strong>THE WEBCRAFT</strong></span>
        </div>
        <button
          onClick={onOrderDesign}
          className={`px-3 py-1.5 rounded-lg bg-[#7D4047] hover:bg-[#67333a] text-white font-bold flex items-center gap-1 ${isMobileView ? 'w-full justify-center' : ''}`}
        >
          <span>Get An E-Commerce Site</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
