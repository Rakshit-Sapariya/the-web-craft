import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import DemoShowcase from '../components/DemoShowcase';
import Spatial3DOrbitGallery from '../components/Spatial3DOrbitGallery';

export default function DemosPage({ onSelectCategoryForOrder }) {
  const navigate = useNavigate();

  const handleSelectFromDemo = (catId) => {
    if (onSelectCategoryForOrder) {
      onSelectCategoryForOrder(catId);
    }
    navigate(`/order?category=${catId}`);
  };

  return (
    <div className="pb-12 sm:pb-20 bg-[#FFF7E8]">
      {/* Page Header */}
      <div className="relative overflow-hidden bg-[#F1E8D8] border-b border-[#E2D7C3] py-8 sm:py-12">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF7E8] border border-[#E2D7C3] text-[#000000] text-xs font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#355CDE]" />
            <span>Interactive Client Showcase (8 Live Projects)</span>
          </div>
          <h1 className="text-xl sm:text-3xl lg:text-5xl font-extrabold text-[#000000] tracking-tight font-heading px-2 leading-snug">
            Live Production Website Demos
          </h1>
          <p className="text-xs sm:text-base text-[#3D362E] max-w-2xl mx-auto leading-relaxed">
            These are not mockups or templates. These are <strong className="text-[#000000]">real, high-converting, commercial client websites</strong> designed and coded by THE WEBCRAFT. Test their full functionality in desktop or mobile view below.
          </p>
        </div>
      </div>

      {/* 3D Spatial Gallery Matrix */}
      <Spatial3DOrbitGallery />

      {/* The Demo Showcase Component */}
      <DemoShowcase onSelectCategoryForOrder={handleSelectFromDemo} />

      {/* Conversion Banner - Architectural Silhouette */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-14">
        <div className="relative overflow-hidden bg-[#000000] text-white p-6 sm:p-10 rounded-[32px] rounded-tl-sm border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-8 shadow-soft">
          <div className="space-y-1 relative z-10 text-center sm:text-left">
            <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white">Want a High-Converting Website Like These?</h3>
            <p className="text-xs text-neutral-300">
              Direct developer booking. Pay on WhatsApp only after you see your website completed, before it goes live on the browser.
            </p>
          </div>
          <button
            onClick={() => navigate('/order')}
            className="relative z-10 w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#355CDE] hover:bg-[#2447B8] active:scale-[0.98] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shrink-0 transition-all shadow-sm hover:shadow-md cursor-pointer"
          >
            <span>Book Your Website Now</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
