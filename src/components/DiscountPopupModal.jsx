import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Sparkles, Percent, Zap, CheckCircle2, ArrowRight, X, 
  ShieldCheck, Gift, Flame, Tag, Clock
} from 'lucide-react';
import { WEBSITE_TYPES } from '../data/pricingData';

export default function DiscountPopupModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Don't show on admin or client preview pages
  const shouldDisable = pathname.startsWith('/admin') || pathname.startsWith('/preview');

  useEffect(() => {
    if (shouldDisable) {
      setIsOpen(false);
      return;
    }

    // Check if user dismissed it in this browser session
    const hasDismissed = sessionStorage.getItem('twc_discount_popup_dismissed');

    // Trigger popup with smooth 900ms delay on page load
    const timer = setTimeout(() => {
      if (!hasDismissed) {
        setIsOpen(true);
      } else {
        setIsMinimized(true);
      }
    }, 900);

    return () => clearTimeout(timer);
  }, [pathname, shouldDisable]);

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(true);
    sessionStorage.setItem('twc_discount_popup_dismissed', 'true');
  };

  const handleClaimOffer = () => {
    setIsOpen(false);
    setIsMinimized(true);
    navigate('/order');
  };

  if (shouldDisable) return null;

  return (
    <>
      {/* 1. FLOATING MINIMIZED RE-OPEN PILL (Always accessible if modal was closed) */}
      {isMinimized && !isOpen && (
        <aside 
          aria-label="Active discount offer"
          className="fixed bottom-5 left-5 z-40 animate-bounce duration-1000"
        >
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2.5 rounded-full bg-gradient-to-r from-[#7D4047] via-[#98535c] to-amber-600 text-white font-extrabold text-xs shadow-wine hover:shadow-2xl flex items-center gap-2 border border-white/20 active:scale-95 transition-all group"
          >
            <span className="p-1 rounded-full bg-white/20 group-hover:rotate-12 transition-transform">
              <Flame className="w-3.5 h-3.5 text-amber-300" />
            </span>
            <span className="tracking-wide">⚡ FLAT 50% OFF Active &bull; View Offer</span>
          </button>
        </aside>
      )}

      {/* 2. THE MAIN CELEBRATION DISCOUNT POPUP MODAL */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative bg-[#222222] text-white rounded-3xl max-w-xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-white/15 shadow-2xl transition-all scale-100 hover-glow-card">
            
            {/* Ambient Lighting Orbs */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#7D4047]/40 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Top Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
              aria-label="Close discount popup"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Scrollable Content Container */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              
              {/* Header Badge & Title */}
              <div className="text-center space-y-2 pt-2">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-[#7D4047]/30 border border-amber-500/30 text-amber-300 text-[11px] font-extrabold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Exclusive Early Bird Promotion</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Flat <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">50% DISCOUNT</span>
                </h2>

                <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                  Special launch celebration for our <strong>First 100 Studio Clients</strong>. Handcrafted bespoke websites at half the regular studio price.
                </p>
              </div>

              {/* 300 Clients Tier Structure (Detailed & Highlighted) */}
              <div className="space-y-2.5">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block text-center">
                  Official 300 Clients Discount Roadmap
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* Tier 1 - Active Highlight */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-b from-[#7D4047]/40 to-[#2E2E2E] border-2 border-amber-400 shadow-lg relative text-center space-y-1">
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-amber-400 text-black text-[9px] font-black uppercase tracking-wider">
                      ACTIVE NOW
                    </span>
                    <span className="text-[10px] text-amber-200 font-bold block pt-1">Tier 1 &bull; First 100</span>
                    <div className="text-2xl font-black text-amber-300 font-mono">50% OFF</div>
                    <span className="text-[10px] text-emerald-400 font-semibold block">Slots Remaining: ~94</span>
                  </div>

                  {/* Tier 2 */}
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1 opacity-75">
                    <span className="text-[10px] text-gray-400 font-bold block pt-1">Tier 2 &bull; Next 100</span>
                    <div className="text-2xl font-black text-gray-200 font-mono">25% OFF</div>
                    <span className="text-[10px] text-gray-400 block">Upcoming Wave</span>
                  </div>

                  {/* Tier 3 */}
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1 opacity-60">
                    <span className="text-[10px] text-gray-400 font-bold block pt-1">Tier 3 &bull; Final 100</span>
                    <div className="text-2xl font-black text-gray-300 font-mono">15% OFF</div>
                    <span className="text-[10px] text-gray-400 block">Final Wave</span>
                  </div>
                </div>
              </div>

              {/* Sample Discount Highlights Table */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-gray-300 border-b border-white/10 pb-2">
                  <span>Website Package</span>
                  <span>50% Flat Discounted Price</span>
                </div>

                <div className="space-y-2 text-xs">
                  {WEBSITE_TYPES.slice(0, 5).map((type) => {
                    const discounted = Math.round(type.basePrice * 0.5);
                    return (
                      <div key={type.id} className="flex items-center justify-between">
                        <span className="text-gray-300 font-medium truncate max-w-[200px] sm:max-w-[280px]">
                          {type.name}
                        </span>
                        <div className="flex items-center gap-2 font-mono">
                          <span className="text-gray-500 line-through text-[11px]">
                            ₹{type.basePrice.toLocaleString('en-IN')}
                          </span>
                          <span className="text-amber-300 font-bold text-sm">
                            ₹{discounted.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <p className="text-[10px] text-gray-400 text-center pt-1 border-t border-white/5">
                  50% discount automatically applies on your base package during order submission.
                </p>
              </div>

              {/* Zero-Risk Guarantees Highlight */}
              <div className="grid grid-cols-2 gap-3 text-[11px]">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-gray-300"><strong>₹0 Online Upfront</strong> &bull; Zero risk</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-gray-300"><strong>Pay on WhatsApp</strong> after completion</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-1">
                <button
                  onClick={handleClaimOffer}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-[#7D4047] hover:opacity-95 active:scale-98 text-black font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 transition-all"
                >
                  <span>Claim 50% Flat Discount &amp; Book Website</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center">
                  <button
                    onClick={handleClose}
                    className="text-xs text-gray-400 hover:text-white transition-colors underline py-1"
                  >
                    Explore Website First &rarr;
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
}
