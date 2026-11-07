import React, { useState } from 'react';
import { Calculator, Check, ArrowRight, Clock, ShieldAlert, Flame } from 'lucide-react';
import { WEBSITE_TYPES, ADDON_OPTIONS, COMPANY_CONFIG } from '../data/pricingData';
import { useOrderOffer } from '../utils/orderTracker';

export default function PriceEstimator({ onApplyEstimate }) {
  const offer = useOrderOffer();
  const [selectedType, setSelectedType] = useState('corporate');
  const [pageCount, setPageCount] = useState(6);
  const [selectedAddons, setSelectedAddons] = useState(['payment', 'crm']);

  const currentTypeObj = WEBSITE_TYPES.find(t => t.id === selectedType) || WEBSITE_TYPES[0];

  const handleToggleAddon = (id) => {
    setSelectedAddons(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Calculations
  const basePrice = currentTypeObj.basePrice;
  const extraPages = Math.max(0, pageCount - currentTypeObj.includedPages);
  const extraPagesPrice = extraPages * 1800; // ₹1,800 per additional page
  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const addon = ADDON_OPTIONS.find(a => a.id === addonId);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const grossTotal = basePrice + extraPagesPrice + addonsTotal;
  const discountAmount = offer.isOfferActive ? Math.round(grossTotal * (offer.discountPercent / 100)) : 0;
  const finalTotal = grossTotal - discountAmount;
  const tokenAdvance = COMPANY_CONFIG.tokenAdvance;
  const remainingBalance = Math.max(0, finalTotal - tokenAdvance);

  const handleApply = () => {
    onApplyEstimate({
      typeId: selectedType,
      pages: pageCount,
      estimatedBudget: finalTotal,
      addons: selectedAddons,
    });
    const formElement = document.querySelector('#order-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="estimator" className="py-8 sm:py-20 bg-[#FFF7E8] border-t border-[#E2D7C3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-12 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1E8D8] border border-[#E2D7C3] text-[#355CDE] text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Cost Calculator</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-[#000000] tracking-tight px-2 leading-snug">
            Estimate Your Project Cost &amp; Timeline
          </h2>
          <p className="text-xs sm:text-base text-[#3D362E]">
            Get 100% upfront pricing transparency. Customize your website requirements below to see real-time itemized costs and delivery milestones.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Controls (8 cols) - Architectural Silhouette */}
          <div className="lg:col-span-7 bg-[#F1E8D8] p-5 sm:p-8 rounded-[32px] rounded-br-sm border border-[#E2D7C3] shadow-soft space-y-6 sm:space-y-8">
            
            {/* 1. Website Type Selection */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-[#000000] mb-2 sm:mb-3">
                1. Select Website Category
              </label>
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                {WEBSITE_TYPES.map((type) => {
                  const isSelected = selectedType === type.id;
                  return (
                    <div
                      key={type.id}
                      onClick={() => {
                        setSelectedType(type.id);
                        if (pageCount < type.includedPages) {
                          setPageCount(type.includedPages);
                        }
                      }}
                      className={`p-3 sm:p-4 rounded-2xl rounded-tr-sm border-2 cursor-pointer transition-all duration-200 group ${
                        isSelected
                          ? 'border-[#355CDE] bg-white shadow-sm ring-2 ring-[#355CDE]/20'
                          : 'border-[#E2D7C3] hover:border-[#355CDE] bg-[#FFF7E8]'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-xs sm:text-sm text-[#000000] group-hover:text-[#355CDE] transition-colors line-clamp-1">{type.name}</span>
                        {isSelected ? (
                          <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#355CDE] shrink-0 ml-1 mt-1" />
                        ) : (
                          <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full border border-[#E2D7C3] group-hover:border-[#355CDE] shrink-0 ml-1 mt-1" />
                        )}
                      </div>
                      <p className="text-[10px] sm:text-xs text-[#3D362E] mt-1 line-clamp-2">{type.idealFor}</p>
                      <div className="mt-2 pt-1.5 sm:mt-3 sm:pt-2 border-t border-[#E2D7C3] flex items-center justify-between text-[11px] sm:text-xs font-semibold">
                        <span className="text-[#355CDE]">From ₹{type.basePrice.toLocaleString('en-IN')}</span>
                        <span className="text-[#3D362E] font-normal">{type.includedPages}p</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Number of Pages Slider */}
            <div className="p-4 sm:p-5 bg-[#FFF7E8] rounded-2xl rounded-tl-sm border border-[#E2D7C3] space-y-3 shadow-xs">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-[#000000] flex items-center gap-2">
                  <span>2. Number of Web Pages Needed:</span>
                  <span className="text-white text-xs font-extrabold bg-[#355CDE] px-3 py-0.5 rounded-full shadow-xs">
                    {pageCount} Pages
                  </span>
                </label>
                <span className="text-xs text-[#3D362E]">
                  ({currentTypeObj.includedPages} included in base package)
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={pageCount}
                onChange={(e) => setPageCount(parseInt(e.target.value))}
                className="w-full h-2.5 bg-[#E2D7C3] rounded-full appearance-none cursor-pointer accent-[#355CDE] transition-colors"
              />
              <div className="flex justify-between text-[11px] text-[#3D362E] font-mono">
                <span>1 page (Landing)</span>
                <span>5 pages</span>
                <span>10 pages</span>
                <span>20+ pages</span>
              </div>
            </div>

            {/* 3. Addon Features */}
            <div>
              <label className="block text-sm font-bold text-[#000000] mb-3">
                3. Choose Optional Features & Integrations
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ADDON_OPTIONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <label
                      key={addon.id}
                      className={`flex items-start gap-2.5 p-3 rounded-xl rounded-bl-sm border cursor-pointer transition-all duration-200 ${
                        isChecked
                          ? 'border-[#355CDE] bg-white shadow-xs'
                          : 'border-[#E2D7C3] bg-[#FFF7E8] hover:border-[#355CDE]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleAddon(addon.id)}
                        className="mt-0.5 rounded text-[#355CDE] focus:ring-[#355CDE] accent-[#355CDE]"
                      />
                      <div className="text-xs flex-1">
                        <span className="font-semibold text-[#000000] block text-[11px] sm:text-xs">{addon.name}</span>
                        <span className="text-[#355CDE] font-bold text-[11px] sm:text-xs">+₹{addon.price.toLocaleString('en-IN')}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Summary Card (5 cols) - Architectural Cut Shape */}
          <div className="relative overflow-hidden lg:col-span-5 bg-[#000000] text-white p-5 sm:p-8 rounded-3xl rounded-tl-sm space-y-4 sm:space-y-6 lg:sticky lg:top-28 border border-[#E2D7C3]/20 shadow-soft">
            
            <div className="border-b border-white/10 pb-4 relative z-10">
              <span className="text-xs font-bold text-[#FFF7E8]/80 uppercase tracking-wider block">Estimated Quote</span>
              <h3 className="text-2xl font-extrabold text-white mt-1">{currentTypeObj.name}</h3>
              <div className="flex items-center gap-2 mt-2 text-xs text-[#FFF7E8]/80">
                <Clock className="w-3.5 h-3.5 text-[#355CDE]" />
                <span>Estimated Delivery: <strong>{currentTypeObj.deliveryDays}</strong></span>
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-3 text-xs relative z-10">
              <div className="flex justify-between text-[#FFF7E8]/80">
                <span>Base Package ({currentTypeObj.name}):</span>
                <span className="font-mono font-semibold text-white">₹{basePrice.toLocaleString('en-IN')}</span>
              </div>

              {extraPages > 0 && (
                <div className="flex justify-between text-[#FFF7E8]/80">
                  <span>Additional {extraPages} Pages:</span>
                  <span className="font-mono font-semibold text-white">+₹{extraPagesPrice.toLocaleString('en-IN')}</span>
                </div>
              )}

              {addonsTotal > 0 && (
                <div className="flex justify-between text-[#FFF7E8]/80">
                  <span>Selected Features ({selectedAddons.length}):</span>
                  <span className="font-mono font-semibold text-white">+₹{addonsTotal.toLocaleString('en-IN')}</span>
                </div>
              )}

              {offer.isOfferActive && discountAmount > 0 && (
                <div className="flex justify-between text-emerald-300 font-medium pt-1 border-t border-white/10">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#355CDE]" />
                    <span>{offer.tierName} (-{offer.discountPercent}%):</span>
                  </span>
                  <span className="font-mono font-bold text-emerald-400">-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

            </div>

            {/* Final Total */}
            <div className="pt-4 border-t border-white/20 relative z-10">
              <div className="flex justify-between items-baseline flex-wrap gap-1">
                <span className="text-sm font-semibold text-[#FFF7E8]/80">Final Project Estimate:</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white font-mono tracking-tight">₹{finalTotal.toLocaleString('en-IN')}</span>
                  {offer.isOfferActive && (
                    <span className="text-sm line-through text-white/50 font-mono">₹{grossTotal.toLocaleString('en-IN')}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Direct Booking & Zero Online Payment Highlight */}
            <div className="bg-white/5 border border-white/15 p-4 sm:p-5 rounded-2xl rounded-br-sm space-y-2 text-xs relative z-10">
              <div className="flex justify-between font-bold text-white">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#355CDE]" />
                  Online Payment:
                </span>
                <span className="text-emerald-400 font-mono text-xs font-bold bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  Zero Online Pay
                </span>
              </div>
              <p className="text-[11px] text-[#FFF7E8]/70 leading-relaxed">
                Zero upfront payment required on website. Submit your configuration for free. Milestones, timeline, and deliverables are confirmed directly with Lead Developer Rakshit Patel before any settlement.
              </p>
            </div>

            {/* Action */}
            <button
              onClick={handleApply}
              className="w-full py-3.5 px-6 rounded-full bg-[#355CDE] hover:bg-[#2447B8] active:scale-[0.98] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 relative z-10 shadow-sm hover:shadow-md cursor-pointer"
            >
              <span>Use This Configuration in Order Form</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
