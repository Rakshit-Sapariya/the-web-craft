import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag, ArrowRight, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import PriceEstimator from '../components/PriceEstimator';
import PricingPolicy from '../components/PricingPolicy';
import { useOrderOffer } from '../utils/orderTracker';

export default function PricingPage({ onApplyEstimate, onSelectTier }) {
  const navigate = useNavigate();
  const offer = useOrderOffer();

  const handleEstimateApply = (estimate) => {
    if (onApplyEstimate) {
      onApplyEstimate(estimate);
    }
    navigate(`/order?category=${estimate.typeId}&budget=${estimate.estimatedBudget}`);
  };

  const handleTierSelect = (typeId, budget) => {
    if (onSelectTier) {
      onSelectTier(typeId, budget);
    }
    navigate(`/order?category=${typeId}&budget=${budget}`);
  };

  const startingPrice = offer.isOfferActive ? offer.applyDiscount(19500) : 19500;

  return (
    <div className="space-y-8 sm:space-y-16 pb-12 sm:pb-20 bg-[#FFF7E8]">
      {/* Page Header */}
      <div className="relative overflow-hidden bg-[#F1E8D8] border-b border-[#E2D7C3] py-8 sm:py-12">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 sm:space-y-4">
          {offer.isOfferActive ? (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF7E8] border border-[#E2D7C3] text-[#355CDE] text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#355CDE]" />
              <span className="font-extrabold">{offer.badgeText}</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF7E8] border border-[#E2D7C3] text-[#000000] text-xs font-bold uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5 text-[#355CDE]" />
              <span>Honest &amp; Upfront Rates</span>
            </div>
          )}

          <h1 className="text-xl sm:text-4xl font-extrabold text-[#000000] tracking-tight font-heading px-2 leading-snug">
            {offer.isOfferActive ? (
              <span>
                Transparent Pricing &bull; <span className="text-[#355CDE]">{offer.discountPercent}% OFF Active</span>
              </span>
            ) : (
              <span>Transparent Pricing &amp; Live Cost Calculator</span>
            )}
          </h1>
          <p className="text-xs sm:text-base text-[#3D362E] max-w-2xl mx-auto leading-relaxed">
            {offer.isOfferActive ? (
              <span>
                Starting from <span className="line-through text-neutral-400 font-mono">₹19,500</span> <strong className="text-[#000000] font-mono">₹{startingPrice.toLocaleString('en-IN')}</strong> ({offer.discountPercent}% flat discount active). Zero upfront online payment; pay on WhatsApp only after you see your website completed, before it goes live on the browser.
              </span>
            ) : (
              <span>
                Starting from <strong className="text-[#000000]">₹19,500</strong>. Handcrafted bespoke development with zero hidden fees. Zero upfront online payment; pay on WhatsApp only after you see your website completed, before it goes live on the browser.
              </span>
            )}
          </p>
        </div>
      </div>

      {/* 1. Live Interactive Cost Estimator */}
      <PriceEstimator onApplyEstimate={handleEstimateApply} />

      {/* 2. Structured Package Cards */}
      <PricingPolicy onSelectTier={handleTierSelect} />

      {/* 3. Detailed Revision & Payment Policy FAQ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F1E8D8] rounded-3xl rounded-tl-sm border border-[#E2D7C3] p-5 sm:p-10 space-y-6 sm:space-y-8 shadow-soft">
          <div className="space-y-1.5 sm:space-y-2">
            <span className="text-[11px] sm:text-xs font-bold text-[#355CDE] uppercase tracking-wider block">Frequently Asked Questions</span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-[#000000] font-heading">Everything You Need to Know About Billing</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-xs text-[#3D362E] leading-relaxed">
            <div className="p-5 bg-[#FFF7E8] rounded-2xl rounded-tr-sm border border-[#E2D7C3] space-y-2 transition-colors shadow-xs">
              <h4 className="font-bold text-sm text-[#000000]">Do I need to pay anything online right now?</h4>
              <p>
                No. Submitting your project specifications on our website is 100% free with zero online upfront payment. You do not need to enter any UPI or credit card details.
              </p>
            </div>

            <div className="p-5 bg-[#FFF7E8] rounded-2xl rounded-tl-sm border border-[#E2D7C3] space-y-2 transition-colors shadow-xs">
              <h4 className="font-bold text-sm text-[#000000]">How does project onboarding work?</h4>
              <p>
                Once you submit your requirements, Lead Developer Rakshit Patel directly connects with you via WhatsApp (<a href="https://wa.me/919428298134" target="_blank" rel="noopener noreferrer" className="font-mono text-[#355CDE] font-bold hover:underline">+91 94282 98134</a> - WhatsApp Chat Only &bull; No Calls) or email to review your assets, discuss milestones, and schedule your live demo walkthrough.
              </p>
            </div>

            <div className="p-5 bg-[#FFF7E8] rounded-2xl rounded-bl-sm border border-[#E2D7C3] space-y-2 transition-all group shadow-xs">
              <h4 className="font-bold text-sm text-[#000000] group-hover:text-[#355CDE] transition-colors">When is payment settled?</h4>
              <p>
                Payment is settled only after we complete the full website and you inspect, test, and approve your live private demo link.
              </p>
            </div>

            <div className="p-5 bg-[#FFF7E8] rounded-2xl rounded-br-sm border border-[#E2D7C3] space-y-2 transition-all group shadow-xs">
              <h4 className="font-bold text-sm text-[#000000] group-hover:text-[#355CDE] transition-colors">How are extra changes/revisions handled?</h4>
              <p>
                Minor adjustments (text changes, color tweaks, bug fixes) during demo review are included at no extra cost. Brand new extra pages, major design redesigns, or new feature additions outside the initial brief are billed transparently.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
