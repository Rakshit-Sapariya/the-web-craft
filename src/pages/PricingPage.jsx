import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag, Sparkles, ArrowRight, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
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
    <div className="space-y-8 sm:space-y-16 pb-12 sm:pb-20">
      {/* Page Header */}
      <div className="relative overflow-hidden bg-[#DDD5CD]/30 border-b border-[#DDD5CD] py-8 sm:py-14">
        {/* Subtle Ambient Glowing Orbs */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#7D4047]/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute -bottom-10 left-1/3 w-64 h-64 bg-[#7D4047]/5 rounded-full blur-2xl pointer-events-none animate-pulse-glow" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 sm:space-y-4">
          {offer.isOfferActive ? (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-100 via-amber-100 to-rose-100 border border-emerald-300 text-emerald-900 text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />
              <span>{offer.badgeText}</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#DDD5CD] text-[#7D4047] text-xs font-bold uppercase tracking-wider shadow-sm shimmer-badge">
              <Tag className="w-3.5 h-3.5" />
              <span>Honest &amp; Upfront Rates</span>
            </div>
          )}

          <h1 className="text-xl sm:text-4xl font-extrabold text-[#2E2E2E] tracking-tight font-heading px-2 leading-snug">
            {offer.isOfferActive ? (
              <span>
                Transparent Pricing &bull; <span className="text-emerald-700">{offer.discountPercent}% OFF Active</span>
              </span>
            ) : (
              <span>Transparent Pricing &amp; Live Cost Calculator</span>
            )}
          </h1>
          <p className="text-xs sm:text-base text-[#625f5c] max-w-2xl mx-auto leading-relaxed">
            {offer.isOfferActive ? (
              <span>
                Starting from <span className="line-through text-neutral-400 font-mono">₹19,500</span> <strong className="text-emerald-700 font-mono">₹{startingPrice.toLocaleString('en-IN')}</strong> ({offer.discountPercent}% flat discount active). Zero upfront online payment; pay on WhatsApp only after you see your website completed, before it goes live on the browser.
              </span>
            ) : (
              <span>
                Starting from <strong>₹19,500</strong>. Handcrafted bespoke development with zero hidden fees. Zero upfront online payment; pay on WhatsApp only after you see your website completed, before it goes live on the browser.
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
        <div className="bg-white rounded-3xl border border-[#DDD5CD] p-5 sm:p-12 shadow-soft space-y-6 sm:space-y-8 hover-glow-card transition-all duration-300">
          <div className="space-y-1.5 sm:space-y-2">
            <span className="text-[11px] sm:text-xs font-bold text-[#7D4047] uppercase tracking-wider block">Frequently Asked Questions</span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-[#2E2E2E] font-heading">Everything You Need to Know About Billing</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#625f5c] leading-relaxed">
            <div className="p-5 bg-[#F1ECE6]/50 rounded-2xl border border-[#DDD5CD] space-y-2 hover-glow-card transition-all duration-300 hover:-translate-y-1 hover:border-[#7D4047]/40 group">
              <h4 className="font-bold text-sm text-[#2E2E2E] group-hover:text-[#7D4047] transition-colors">Do I need to pay anything online right now?</h4>
              <p>
                No. Submitting your project specifications on our website is 100% free with zero online upfront payment. You do not need to enter any UPI or credit card details.
              </p>
            </div>

            <div className="p-5 bg-[#F1ECE6]/50 rounded-2xl border border-[#DDD5CD] space-y-2 hover-glow-card transition-all duration-300 hover:-translate-y-1 hover:border-[#7D4047]/40 group">
              <h4 className="font-bold text-sm text-[#2E2E2E] group-hover:text-[#7D4047] transition-colors">How does project onboarding work?</h4>
              <p>
                Once you submit your requirements, Lead Developer Rakshit Patel directly connects with you via WhatsApp (<a href="https://wa.me/919428298134" target="_blank" rel="noopener noreferrer" className="font-mono text-emerald-800 font-bold hover:underline">+91 94282 98134</a> - WhatsApp Chat Only &bull; No Calls) or email to review your assets, discuss milestones, and schedule your live demo walkthrough.
              </p>
            </div>

            <div className="p-5 bg-[#F1ECE6]/50 rounded-2xl border border-[#DDD5CD] space-y-2 hover-glow-card transition-all duration-300 hover:-translate-y-1 hover:border-[#7D4047]/40 group">
              <h4 className="font-bold text-sm text-[#2E2E2E] group-hover:text-[#7D4047] transition-colors">When is payment settled?</h4>
              <p>
                Payment is settled only after we complete the full website and you inspect, test, and approve your live private demo link.
              </p>
            </div>

            <div className="p-5 bg-[#F1ECE6]/50 rounded-2xl border border-[#DDD5CD] space-y-2 hover-glow-card transition-all duration-300 hover:-translate-y-1 hover:border-[#7D4047]/40 group">
              <h4 className="font-bold text-sm text-[#2E2E2E] group-hover:text-[#7D4047] transition-colors">How are extra changes/revisions handled?</h4>
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
