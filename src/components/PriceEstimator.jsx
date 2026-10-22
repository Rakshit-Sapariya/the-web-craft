import React, { useState } from 'react';
import { Calculator, Check, ArrowRight, Sparkles, Clock, ShieldAlert, Flame } from 'lucide-react';
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
    <section id="estimator" className="py-8 sm:py-20 bg-[#F1ECE6] border-t border-[#DDD5CD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-12 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DDD5CD]/60 border border-[#DDD5CD] text-[#7D4047] text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Cost Calculator</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-[#2E2E2E] tracking-tight px-2 leading-snug">
            Estimate Your Project Cost &amp; Timeline
          </h2>
          <p className="text-xs sm:text-base text-[#625f5c]">
            Get 100% upfront pricing transparency. Customize your website requirements below to see real-time itemized costs and delivery milestones.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Controls (8 cols) */}
          <div className="lg:col-span-7 bg-white p-4 sm:p-8 rounded-2xl border border-[#DDD5CD] shadow-soft space-y-6 sm:space-y-8">
            
            {/* 1. Website Type Selection */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-[#2E2E2E] mb-2 sm:mb-3">
                1. Select Website Category
              </label>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
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
                      className={`p-2.5 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover-glow-card group ${
                        isSelected
                          ? 'border-[#7D4047] bg-[#7D4047]/5 shadow-md -translate-y-0.5 ring-2 ring-[#7D4047]/20'
                          : 'border-[#DDD5CD] hover:border-[#7D4047]/40 bg-[#F1ECE6]/30 hover:-translate-y-0.5'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-xs sm:text-sm text-[#2E2E2E] group-hover:text-[#7D4047] transition-colors line-clamp-1">{type.name}</span>
                        {isSelected ? (
                          <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#7D4047] animate-pulse shrink-0 ml-1 mt-1" />
                        ) : (
                          <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full border border-[#DDD5CD] group-hover:border-[#7D4047] shrink-0 ml-1 mt-1" />
                        )}
                      </div>
                      <p className="text-[10px] sm:text-xs text-[#625f5c] mt-1 line-clamp-2">{type.idealFor}</p>
                      <div className="mt-2 pt-1.5 sm:mt-3 sm:pt-2 border-t border-[#DDD5CD]/60 flex items-center justify-between text-[11px] sm:text-xs font-semibold">
                        <span className="text-[#7D4047]">From ₹{type.basePrice.toLocaleString('en-IN')}</span>
                        <span className="text-[#625f5c] font-normal">{type.includedPages}p</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Number of Pages Slider */}
            <div className="p-4 bg-[#F1ECE6]/40 rounded-xl border border-[#DDD5CD] space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-[#2E2E2E] flex items-center gap-2">
                  <span>2. Number of Web Pages Needed:</span>
                  <span className="text-[#7D4047] text-sm font-extrabold bg-[#7D4047]/10 px-2.5 py-0.5 rounded-full border border-[#7D4047]/20 animate-pulse">
                    {pageCount} Pages
                  </span>
                </label>
                <span className="text-xs text-[#625f5c]">
                  ({currentTypeObj.includedPages} included in base package)
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={pageCount}
                onChange={(e) => setPageCount(parseInt(e.target.value))}
                className="w-full h-2.5 bg-[#DDD5CD] rounded-lg appearance-none cursor-pointer accent-[#7D4047] transition-all hover:bg-[#DDD5CD]/80"
              />
              <div className="flex justify-between text-[11px] text-[#625f5c] font-mono">
                <span>1 page (Landing)</span>
                <span>5 pages</span>
                <span>10 pages</span>
                <span>20+ pages</span>
              </div>
            </div>

            {/* 3. Addon Features */}
            <div>
              <label className="block text-sm font-bold text-[#2E2E2E] mb-3">
                3. Choose Optional Features & Integrations
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ADDON_OPTIONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <label
                      key={addon.id}
                      className={`flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl border cursor-pointer transition-all duration-200 hover-glow-card hover:-translate-y-0.5 ${
                        isChecked
                          ? 'border-[#7D4047] bg-[#7D4047]/5 shadow-sm'
                          : 'border-[#DDD5CD] bg-[#F1ECE6]/20 hover:border-[#7D4047]/30'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleAddon(addon.id)}
                        className="mt-0.5 rounded text-[#7D4047] focus:ring-[#7D4047] accent-[#7D4047] transition-transform active:scale-90"
                      />
                      <div className="text-xs flex-1">
                        <span className="font-semibold text-[#2E2E2E] block text-[11px] sm:text-xs">{addon.name}</span>
                        <span className="text-[#7D4047] font-bold text-[11px] sm:text-xs">+₹{addon.price.toLocaleString('en-IN')}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Summary Card (5 cols) */}
          <div className="relative overflow-hidden lg:col-span-5 bg-[#2E2E2E] text-[#F1ECE6] p-4 sm:p-8 rounded-2xl shadow-elevated space-y-4 sm:space-y-6 lg:sticky lg:top-28 hover-glow-card border border-white/10">
            {/* Subtle Ambient Glow Orb */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#7D4047]/25 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
            
            <div className="border-b border-white/10 pb-4 relative z-10">
              <span className="text-xs font-bold text-[#DDD5CD] uppercase tracking-wider block">Estimated Quote</span>
              <h3 className="text-2xl font-extrabold text-white mt-1">{currentTypeObj.name}</h3>
              <div className="flex items-center gap-2 mt-2 text-xs text-[#DDD5CD]">
                <Clock className="w-3.5 h-3.5 text-[#DDD5CD]" />
                <span>Estimated Delivery: <strong>{currentTypeObj.deliveryDays}</strong></span>
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-3 text-xs relative z-10">
              <div className="flex justify-between text-[#DDD5CD]/80">
                <span>Base Package ({currentTypeObj.name}):</span>
                <span className="font-mono font-semibold text-white">₹{basePrice.toLocaleString('en-IN')}</span>
              </div>

              {extraPages > 0 && (
                <div className="flex justify-between text-[#DDD5CD]/80">
                  <span>Additional {extraPages} Pages:</span>
                  <span className="font-mono font-semibold text-white">+₹{extraPagesPrice.toLocaleString('en-IN')}</span>
                </div>
              )}

              {addonsTotal > 0 && (
                <div className="flex justify-between text-[#DDD5CD]/80">
                  <span>Selected Features ({selectedAddons.length}):</span>
                  <span className="font-mono font-semibold text-white">+₹{addonsTotal.toLocaleString('en-IN')}</span>
                </div>
              )}

              {offer.isOfferActive && discountAmount > 0 && (
                <div className="flex justify-between text-emerald-300 font-medium pt-1 border-t border-white/10">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>{offer.tierName} (-{offer.discountPercent}%):</span>
                  </span>
                  <span className="font-mono font-bold text-emerald-400">-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

            </div>

            {/* Final Total */}
            <div className="pt-4 border-t border-white/20 relative z-10">
              <div className="flex justify-between items-baseline flex-wrap gap-1">
                <span className="text-sm font-semibold text-[#DDD5CD]">Final Project Estimate:</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white font-mono tracking-tight">₹{finalTotal.toLocaleString('en-IN')}</span>
                  {offer.isOfferActive && (
                    <span className="text-sm line-through text-[#DDD5CD]/70 font-mono">₹{grossTotal.toLocaleString('en-IN')}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Direct Booking & Zero Online Payment Highlight */}
            <div className="bg-white/5 border border-white/15 p-4 rounded-xl space-y-2 text-xs relative z-10">
              <div className="flex justify-between font-bold text-white">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                  Online Payment:
                </span>
                <span className="text-emerald-400 font-mono text-xs font-bold bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                  Zero Online Pay
                </span>
              </div>
              <p className="text-[11px] text-[#DDD5CD]/70 leading-relaxed">
                Zero upfront payment required on website. Submit your configuration for free. Milestones, timeline, and deliverables are confirmed directly with Lead Developer Rakshit Patel before any settlement.
              </p>
            </div>

            {/* Action */}
            <button
              onClick={handleApply}
              className="w-full py-3.5 px-4 rounded-xl bg-[#7D4047] hover:bg-[#67333a] active:scale-[0.98] text-white font-bold text-sm shadow-wine hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 group relative z-10"
            >
              <span>Use This Configuration in Order Form</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
