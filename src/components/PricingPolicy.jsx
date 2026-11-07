import React from 'react';
import { Check, AlertCircle, ArrowRight, Tag, ShieldCheck, Flame } from 'lucide-react';
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
    <section id="pricing" className="py-8 sm:py-20 bg-[#FFF7E8] border-t border-[#E2D7C3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14 space-y-3">
          {offer.isOfferActive ? (
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F1E8D8] border border-[#E2D7C3] text-[#355CDE] text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#355CDE]" />
              <span>{offer.badgeText}</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F1E8D8] border border-[#E2D7C3] text-[#000000] text-xs font-bold uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5 text-[#355CDE]" />
              <span>Honest &amp; Transparent Rates</span>
            </div>
          )}

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#000000] tracking-tight">
            {offer.isOfferActive ? (
              <span>
                Website Packages Starting at <span className="line-through text-neutral-400 font-mono">₹19,500</span> <span className="text-[#000000] font-mono">₹{startingPrice.toLocaleString('en-IN')}</span>
              </span>
            ) : (
              <span>Website Development Packages Starting at ₹19,500</span>
            )}
          </h2>

          <p className="text-xs sm:text-base text-[#3D362E]">
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

        {/* Pricing Cards Grid - Strict 3x3 Layout for 9 Packages with Architectural Hierarchy */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {WEBSITE_TYPES.map((tier, idx) => {
            const originalPrice = tier.basePrice;
            const activePrice = offer.isOfferActive ? offer.applyDiscount(originalPrice) : originalPrice;
            const isCustom = tier.id === 'custombuild';
            const isPopular = tier.id === 'corporate';

            // Distinct geometric silhouettes based on role and column placement
            const colIdx = idx % 3;
            const shapeClass = isPopular
              ? 'rounded-t-[36px] rounded-b-xl border-2 border-[#355CDE] shadow-md'
              : isCustom
              ? 'rounded-2xl rounded-br-[36px] border-2 border-[#000000] shadow-md'
              : colIdx === 0
              ? 'rounded-2xl rounded-tl-[32px] rounded-br-sm border border-[#E2D7C3] hover:border-[#355CDE]'
              : colIdx === 1
              ? 'rounded-t-[32px] rounded-b-lg border border-[#E2D7C3] hover:border-[#355CDE]'
              : 'rounded-2xl rounded-tr-[32px] rounded-bl-sm border border-[#E2D7C3] hover:border-[#355CDE]';

            return (
              <div 
                key={tier.id}
                className={`bg-[#F1E8D8] ${shapeClass} p-5 sm:p-7 flex flex-col justify-between transition-all duration-200 relative group shadow-xs hover:shadow-md`}
              >
                {/* Promo Ribbon */}
                {offer.isOfferActive && (
                  <span className="absolute -top-2.5 right-4 bg-[#355CDE] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                    {offer.discountPercent}% OFF
                  </span>
                )}

                {isPopular && (
                  <span className="absolute -top-2.5 left-4 bg-[#355CDE] text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                    Most Popular
                  </span>
                )}

                {isCustom && (
                  <span className="absolute -top-2.5 left-4 bg-[#000000] text-white border border-white/20 text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                    100% Bespoke
                  </span>
                )}

                <div>
                  <div className="mb-4">
                    <span className="text-xs font-bold text-[#355CDE] uppercase tracking-wider">{tier.includedPages} Pages Incl.</span>
                    <h3 className="font-heading font-extrabold text-lg text-[#000000] mt-1">{tier.name}</h3>
                    <p className="text-xs text-[#3D362E] mt-1">{tier.idealFor}</p>
                  </div>

                  {/* Pricing Box */}
                  <div className="py-4 border-y border-[#E2D7C3] space-y-1">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-2xl sm:text-3xl font-black text-[#000000] font-mono">
                        ₹{activePrice.toLocaleString('en-IN')}
                      </span>
                      {offer.isOfferActive && (
                        <span className="text-sm line-through text-[#3D362E] font-mono font-semibold">
                          ₹{originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <span className="inline-block text-[11px] font-semibold text-[#355CDE]">
                      {offer.isOfferActive ? `${offer.discountPercent}% Flat Tier Discount Applied` : 'Handcrafted Custom Code'}
                    </span>
                  </div>

                  {/* Included features */}
                  <div className="py-4 space-y-2 text-xs text-[#000000]">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#355CDE] shrink-0" />
                      <span>{tier.deliveryDays} Fast Delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#355CDE] shrink-0" />
                      <span>100% Mobile &amp; Tablet Responsive</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#355CDE] shrink-0" />
                      <span>1 GB Asset Upload Support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#355CDE] shrink-0" />
                      <span>Direct Inquiry &amp; Lead Capture Setup</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#355CDE] shrink-0" />
                      <span>SSL Security &amp; SEO Architecture</span>
                    </div>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-4 border-t border-[#E2D7C3] space-y-2">
                  <div className="text-[11px] text-[#3D362E] flex justify-between">
                    <span>Online Payment:</span>
                    <strong className="text-[#355CDE] font-semibold">Zero Online Pay</strong>
                  </div>
                  <button
                    onClick={() => handleSelectTier(tier.id, activePrice)}
                    className="w-full py-3 px-5 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 bg-[#355CDE] hover:bg-[#2447B8] text-white active:scale-[0.98] shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <span>Choose This Plan</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Revisions & Cancellation Legal Card - Architectural Silhouette */}
        <div className="mt-12 bg-[#F1E8D8] rounded-[32px] rounded-tl-sm border border-[#E2D7C3] p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start shadow-soft">
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-base text-[#000000] flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[#355CDE]" />
              <span>Website Revision Policy</span>
            </h4>
            <p className="text-xs text-[#3D362E] leading-relaxed">
              Once our developers build and present the live website demo according to your requirements, you can review it thoroughly. 
              <strong> If the dealer/client requests changes outside the agreed design brief</strong>, additional nominal charges will be added based on the scope of changes. This protects both parties and guarantees project focus.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-heading font-bold text-base text-[#000000] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Transparent Settlement Policy</span>
            </h4>
            <p className="text-xs text-[#3D362E] leading-relaxed">
              <strong>Zero online upfront payment is required on this website.</strong> You submit your specifications, assets, and wishlist for free. Our team crafts the complete working website, and you pay easily on WhatsApp only after you see your website completed and approved, right before it goes live on the browser.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
