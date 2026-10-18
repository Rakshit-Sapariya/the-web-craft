import React from 'react';
import { Check, AlertCircle, ArrowRight, Tag, Sparkles, ShieldCheck } from 'lucide-react';
import { WEBSITE_TYPES, COMPANY_CONFIG } from '../data/pricingData';
import { useOrderOffer } from '../utils/orderTracker';

export default function PricingPolicy({ onSelectTier }) {
  const { isOfferActive } = useOrderOffer();

  const handleSelectTier = (typeId, budget) => {
    onSelectTier(typeId, budget);
    const formElement = document.querySelector('#order-form');
    if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="py-8 sm:py-20 bg-[#F1ECE6] border-t border-[#DDD5CD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DDD5CD]/60 border border-[#DDD5CD] text-[#7D4047] text-xs font-bold uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5" />
            <span>Honest & Transparent Rates</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2E2E2E] tracking-tight">
            Website Development Packages Starting at ₹13,000
          </h2>
          <p className="text-xs sm:text-base text-[#625f5c]">
            {isOfferActive ? (
              <>Take advantage of our <strong>15% Early-Bird Discount</strong> reserved for the first 10 clients. Zero upfront online fees; pay only upon demo satisfaction.</>
            ) : (
              <>Direct developer pricing with zero agency markups. Zero upfront online fees; pay only after full demo satisfaction.</>
            )}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {WEBSITE_TYPES.map((tier) => {
            const originalPrice = tier.basePrice;
            const discountedPrice = Math.round(originalPrice * 0.85);
            const activePrice = isOfferActive ? discountedPrice : originalPrice;
            const isCustom = tier.id === 'custombuild';
            const isPopular = tier.id === 'corporate';

            return (
              <div 
                key={tier.id}
                className={`bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-2 flex flex-col justify-between transition-all duration-300 relative hover-glow-card group ${
                  isPopular 
                    ? 'border-[#7D4047] shadow-elevated scale-[1.01]' 
                    : isCustom
                    ? 'border-[#2E2E2E] shadow-elevated'
                    : 'border-[#DDD5CD] shadow-soft hover:border-[#7D4047]'
                }`}
              >
                {isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#7D4047] text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm shimmer-badge">
                    Most Popular
                  </span>
                )}

                {isCustom && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2E2E2E] text-amber-300 border border-neutral-700 text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm shimmer-badge">
                    100% Bespoke
                  </span>
                )}

                <div>
                  <div className="mb-4">
                    <span className="text-xs font-bold text-[#7D4047] uppercase tracking-wider">{tier.includedPages} Pages Incl.</span>
                    <h3 className="font-heading font-extrabold text-lg text-[#2E2E2E] mt-1">{tier.name}</h3>
                    <p className="text-xs text-[#625f5c] mt-1">{tier.idealFor}</p>
                  </div>

                  {/* Pricing Box */}
                  <div className="py-4 border-y border-[#DDD5CD]/60 space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-black text-[#2E2E2E] font-mono">
                        ₹{activePrice.toLocaleString('en-IN')}
                      </span>
                      {isOfferActive && (
                        <span className="text-xs text-[#625f5c] line-through font-mono">
                          ₹{originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    {isOfferActive ? (
                      <span className="inline-block text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        15% First-10 Discount Applied
                      </span>
                    ) : (
                      <span className="inline-block text-[11px] font-semibold text-[#625f5c]">
                        Handcrafted Custom Code
                      </span>
                    )}
                  </div>

                  {/* Included features */}
                  <div className="py-4 space-y-2 text-xs text-[#2E2E2E]">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#7D4047] shrink-0" />
                      <span>{tier.deliveryDays} Fast Delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#7D4047] shrink-0" />
                      <span>100% Mobile & Tablet Responsive</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#7D4047] shrink-0" />
                      <span>1 GB Asset Upload Support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#7D4047] shrink-0" />
                      <span>Direct Inquiry & Lead Capture Setup</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#7D4047] shrink-0" />
                      <span>SSL Security & SEO Architecture</span>
                    </div>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-4 border-t border-[#DDD5CD]/60 space-y-2">
                  <div className="text-[11px] text-[#625f5c] flex justify-between">
                    <span>Online Payment:</span>
                    <strong className="text-emerald-700 font-semibold">Zero Online Pay</strong>
                  </div>
                  <button
                    onClick={() => handleSelectTier(tier.id, activePrice)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      isPopular
                        ? 'bg-[#7D4047] text-white hover:bg-[#67333a] shadow-wine'
                        : 'bg-[#2E2E2E] text-white hover:bg-[#7D4047]'
                    }`}
                  >
                    <span>Choose This Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Revisions & Cancellation Legal Card */}
        <div className="mt-12 bg-white rounded-2xl border border-[#DDD5CD] p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-base text-[#2E2E2E] flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[#7D4047]" />
              <span>Website Revision Policy</span>
            </h4>
            <p className="text-xs text-[#625f5c] leading-relaxed">
              Once our developers build and present the live website demo according to your requirements, you can review it thoroughly. 
              <strong> If the dealer/client requests changes outside the agreed design brief</strong>, additional nominal charges will be added based on the scope of changes. This protects both parties and guarantees project focus.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-heading font-bold text-base text-[#2E2E2E] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#7D4047]" />
              <span>Transparent Settlement Policy</span>
            </h4>
            <p className="text-xs text-[#625f5c] leading-relaxed">
              <strong>Zero online upfront payment is required on this website.</strong> You submit your specifications, assets, and wishlist for free. Our team crafts the preliminary prototype, and you pay only after reviewing and approving your live working demo.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
