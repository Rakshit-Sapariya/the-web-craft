import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag, Sparkles, ArrowRight, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import PriceEstimator from '../components/PriceEstimator';
import PricingPolicy from '../components/PricingPolicy';
import { useOrderOffer } from '../utils/orderTracker';

export default function PricingPage({ onApplyEstimate, onSelectTier }) {
  const navigate = useNavigate();
  const { isOfferActive } = useOrderOffer();

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

  return (
    <div className="space-y-8 sm:space-y-16 pb-12 sm:pb-20">
      {/* Page Header */}
      <div className="relative overflow-hidden bg-[#DDD5CD]/30 border-b border-[#DDD5CD] py-8 sm:py-14">
        {/* Subtle Ambient Glowing Orbs */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#7D4047]/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute -bottom-10 left-1/3 w-64 h-64 bg-[#7D4047]/5 rounded-full blur-2xl pointer-events-none animate-pulse-glow" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#DDD5CD] text-[#7D4047] text-xs font-bold uppercase tracking-wider shadow-sm shimmer-badge">
            <Tag className="w-3.5 h-3.5" />
            <span>Honest &amp; Upfront Rates</span>
          </div>
          <h1 className="text-xl sm:text-4xl font-extrabold text-[#2E2E2E] tracking-tight font-heading px-2 leading-snug">
            Transparent Pricing &amp; Live Cost Calculator
          </h1>
          <p className="text-xs sm:text-base text-[#625f5c] max-w-2xl mx-auto leading-relaxed">
            {isOfferActive ? (
              <>Starting from <strong>₹13,000</strong>. Take advantage of our <strong className="text-[#7D4047]">15% Early-Bird Discount</strong> reserved for the first 10 clients. Pay only ₹5,000 advance now; rest after completion.</>
            ) : (
              <>Starting from <strong>₹13,000</strong>. Handcrafted bespoke development with zero hidden fees. Pay only ₹5,000 advance now; rest after full demo approval.</>
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
              <h4 className="font-bold text-sm text-[#2E2E2E] group-hover:text-[#7D4047] transition-colors">Why is the ₹5,000 advance compulsory?</h4>
              <p>
                The ₹5,000 online token advance locks your project slot on our calendar and covers initial wireframing and dedicated developer allocation immediately.
              </p>
            </div>

            <div className="p-5 bg-[#F1ECE6]/50 rounded-2xl border border-[#DDD5CD] space-y-2 hover-glow-card transition-all duration-300 hover:-translate-y-1 hover:border-[#7D4047]/40 group">
              <h4 className="font-bold text-sm text-[#2E2E2E] group-hover:text-[#7D4047] transition-colors">Why is the advance non-refundable upon cancellation?</h4>
              <p>
                Once an order is confirmed, our senior developers immediately begin wireframing, architecture planning, and asset processing. If an order is cancelled, this deposit compensates for dedicated hours spent.
              </p>
            </div>

            <div className="p-5 bg-[#F1ECE6]/50 rounded-2xl border border-[#DDD5CD] space-y-2 hover-glow-card transition-all duration-300 hover:-translate-y-1 hover:border-[#7D4047]/40 group">
              <h4 className="font-bold text-sm text-[#2E2E2E] group-hover:text-[#7D4047] transition-colors">When is the remaining balance paid?</h4>
              <p>
                The remaining balance (Final Budget &minus; ₹5,000) is paid only after we complete the full website and you test and approve your live private demo link.
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
