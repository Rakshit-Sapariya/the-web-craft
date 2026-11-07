import React from 'react';
import { Check, AlertCircle, ArrowRight, Tag, Sparkles, ShieldCheck, Flame } from 'lucide-react';
import { WEBSITE_TYPES, COMPANY_CONFIG } from '../data/pricingData';
import { useOrderOffer } from '../utils/orderTracker';

export default function PricingPolicy({ onSelectTier }) {
  const offer = useOrderOffer();

  const handleSelectTier = (typeId, budget) => {
    onSelectTier(typeId, budget);
    const formElement = document.querySelector('#order-form');
    if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
  };

  const startingPrice = offer.isOfferActive ? offer.applyDiscount(19500) : 19500;

  return (
    <section id="pricing" className="py-8 sm:py-20 bg-[#F1ECE6] border-t border-[#DDD5CD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14 space-y-3">
          {offer.isOfferActive ? (
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-emerald-100 via-amber-100 to-rose-100 border border-emerald-300 text-emerald-900 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />
              <span>{offer.badgeText}</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DDD5CD]/60 border border-[#DDD5CD] text-[#7D4047] text-xs font-bold uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5" />
              <span>Honest &amp; Transparent Rates</span>
            </div>
          )}

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2E2E2E] tracking-tight">
            {offer.isOfferActive ? (
              <span>
                Website Packages Starting at <span className="line-through text-neutral-400 font-mono">₹19,500</span> <span className="text-emerald-700 font-mono">₹{startingPrice.toLocaleString('en-IN')}</span>
              </span>
            ) : (
              <span>Website Development Packages Starting at ₹19,500</span>
            )}
          </h2>

          <p className="text-xs sm:text-base text-[#625f5c]">
            {offer.isOfferActive ? (
              <span>
                {offer.tierName} active. Slashed direct developer pricing applies across all categories. Zero upfront online fees; pay on WhatsApp only after you see your website completed, before it goes live on the browser.
              </span>
            ) : (
              <span>
                Direct developer pricing with zero agency markups. Zero upfront online fees; pay on WhatsApp only after you see your website completed, before it goes live on the browser.
              </span>
            )}
          </p>
        </div>

        {/* Pricing Cards Grid - Strict 3x3 Layout for 9 Packages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {WEBSITE_TYPES.map((tier) => {
            const originalPrice = tier.basePrice;
            const activePrice = offer.isOfferActive ? offer.applyDiscount(originalPrice) : originalPrice;
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
                {/* Promo Ribbon */}
                {offer.isOfferActive && (
                  <span className="absolute -top-3 right-4 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                    {offer.discountPercent}% OFF
                  </span>
                )}

                {isPopular && (
                  <span className="absolute -top-3 left-4 bg-[#7D4047] text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm shimmer-badge">
                    Most Popular
                  </span>
                )}

                {isCustom && (
                  <span className="absolute -top-3 left-4 bg-[#2E2E2E] text-amber-300 border border-neutral-700 text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm shimmer-badge">
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
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-2xl sm:text-3xl font-black text-[#2E2E2E] font-mono">
                        ₹{activePrice.toLocaleString('en-IN')}
                      </span>
                      {offer.isOfferActive && (
                        <span className="text-sm line-through text-[#625f5c] font-mono font-semibold">
                          ₹{originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <span className="inline-block text-[11px] font-semibold text-[#625f5c]">
                      {offer.isOfferActive ? `${offer.discountPercent}% Flat Tier Discount Applied` : 'Handcrafted Custom Code'}
                    </span>
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
              <strong>Zero online upfront payment is required on this website.</strong> You submit your specifications, assets, and wishlist for free. Our team crafts the complete working website, and you pay easily on WhatsApp only after you see your website completed and approved, right before it goes live on the browser.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
