import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import DemoShowcase from '../components/DemoShowcase';

export default function DemosPage({ onSelectCategoryForOrder }) {
  const navigate = useNavigate();

  const handleSelectFromDemo = (catId) => {
    if (onSelectCategoryForOrder) {
      onSelectCategoryForOrder(catId);
    }
    navigate(`/order?category=${catId}`);
  };

  return (
    <div className="pb-12 sm:pb-20">
      {/* Page Header */}
      <div className="relative overflow-hidden bg-[#DDD5CD]/30 border-b border-[#DDD5CD] py-8 sm:py-14">
        {/* Subtle Ambient Glowing Orbs */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#7D4047]/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute -bottom-10 left-1/3 w-64 h-64 bg-[#7D4047]/5 rounded-full blur-2xl pointer-events-none animate-pulse-glow" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#DDD5CD] text-[#7D4047] text-xs font-bold uppercase tracking-wider shadow-sm shimmer-badge">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Interactive Client Showcase (8 Live Projects)</span>
          </div>
          <h1 className="text-xl sm:text-3xl lg:text-5xl font-extrabold text-[#2E2E2E] tracking-tight font-heading px-2 leading-snug">
            Live Production Website Demos
          </h1>
          <p className="text-xs sm:text-base text-[#625f5c] max-w-2xl mx-auto leading-relaxed">
            These are not mockups or templates. These are <strong>real, high-converting, commercial client websites</strong> designed and coded by THE WEBCRAFT. Test their full functionality in desktop or mobile view below.
          </p>
        </div>
      </div>

      {/* The Demo Showcase Component */}
      <DemoShowcase onSelectCategoryForOrder={handleSelectFromDemo} />

      {/* Conversion Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-16">
        <div className="relative overflow-hidden bg-[#2E2E2E] text-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-neutral-700 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 shadow-elevated hover-glow-card transition-all duration-300">
          {/* Subtle Ambient Glow Orb */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#7D4047]/30 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

          <div className="space-y-1 relative z-10 text-center sm:text-left">
            <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white">Want a High-Converting Website Like These?</h3>
            <p className="text-xs text-[#DDD5CD]/80">
              Direct developer booking. Pay on WhatsApp only after you see your website completed, before it goes live on the browser.
            </p>
          </div>
          <button
            onClick={() => navigate('/order')}
            className="relative z-10 w-full sm:w-auto px-6 py-3 rounded-xl bg-[#7D4047] hover:bg-[#67333a] active:scale-95 text-white font-bold text-xs uppercase tracking-wider shadow-wine hover:shadow-2xl flex items-center justify-center gap-2 shrink-0 transition-all duration-200 group"
          >
            <span>Book Your Website Now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
