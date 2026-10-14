import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, MessageSquare, Mail, Phone, ShieldAlert, ArrowUp } from 'lucide-react';
import { COMPANY_CONFIG } from '../data/pricingData';
import { useOrderOffer } from '../utils/orderTracker';

export default function Footer() {
  const { 
    isOfferActive, 
    slotsRemaining, 
    orderCount, 
    incrementOrderCount, 
    setOrderCount, 
    resetOrderCount 
  } = useOrderOffer();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2E2E2E] text-[#F1ECE6] border-t border-[#DDD5CD]/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#7D4047] flex items-center justify-center text-white">
                <Layers className="w-5 h-5" />
              </div>
              <span className="font-heading font-extrabold text-xl text-white tracking-tight">
                THE WEBCRAFT
              </span>
            </Link>

            <p className="text-xs text-[#DDD5CD]/80 leading-relaxed max-w-sm">
              Custom-built web development studio providing tailored websites, frontend architectures, and high-conversion landing pages. We turn ideas into scalable digital platforms.
            </p>

            <div className="pt-2 flex flex-col gap-1 text-xs text-[#DDD5CD]">
              <span className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#DDD5CD] shrink-0" />
                <span className="flex flex-wrap items-center gap-1.5">
                  <span>WhatsApp: <strong>+91 85114 39894</strong></span>
                  <span className="text-[10px] text-amber-300 font-bold px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30">
                    Only Message, Not Call
                  </span>
                </span>
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#DDD5CD]" />
                <span>Email: <strong>thewebcraft404@gmail.com</strong></span>
              </span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">Studio Pages</h4>
            <ul className="space-y-2 text-xs text-[#DDD5CD]/80">
              <li><Link to="/" className="hover:text-white transition-colors">1. Home Page</Link></li>
              <li><Link to="/demos" className="hover:text-white transition-colors">2. Live Frontend Demos</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">3. Pricing & Estimator</Link></li>
              <li><Link to="/order" className="hover:text-white transition-colors">4. Book Order & Contact</Link></li>
              <li className="pt-2 border-t border-white/10">
                <Link to="/track" className="hover:text-white transition-colors text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Track Project Status</span>
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-white transition-colors text-[#DDD5CD]/60 hover:text-[#DDD5CD]">
                  &bull; Studio Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Policy Highlights (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#DDD5CD]" />
              <span>Policies at a Glance</span>
            </h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-2 text-[11px] text-[#DDD5CD]/80 leading-relaxed">
              <p>
                &bull; <strong>Advance Deposit:</strong> ₹5,000 online token advance is required to book your development slot.
              </p>
              <p>
                &bull; <strong>Non-Refundable Clause:</strong> If the client cancels after paying the ₹5,000 token, the advance is strictly non-refundable.
              </p>
              <p>
                &bull; <strong>Revisions:</strong> Minor tweaks during demo review are included; scope additions or structural redesigns incur nominal revision charges.
              </p>
              {isOfferActive ? (
                <p>
                  &bull; <strong>Discount:</strong> 15% discount for first 10 customers on package rates starting at ₹13,000 ({slotsRemaining} slots left).
                </p>
              ) : (
                <p>
                  &bull; <strong>Pricing:</strong> Direct developer transparent pricing starting from ₹13,000.
                </p>
              )}
            </div>
          </div>

        </div>

        {/* Owner Order Counter & Offer Auto-Expiry Simulator */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#7D4047] animate-pulse" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Order Counter & Offer Auto-Expiry Test Simulator
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isOfferActive ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {isOfferActive ? `Offer Active (${slotsRemaining} slots left)` : 'Offer Expired & Deleted'}
                </span>
              </div>
              <p className="text-[11px] text-[#DDD5CD]/70">
                Confirmed orders: <strong className="text-white font-mono">{orderCount} / 10</strong>. When confirmed orders reach 10, the 15% discount card & all promo banners are automatically deleted across the site.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => incrementOrderCount()}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold transition-all"
                title="Add 1 order"
              >
                +1 Order ({orderCount})
              </button>
              <button
                type="button"
                onClick={() => setOrderCount(10)}
                className="px-3 py-1.5 rounded-lg bg-red-900/60 hover:bg-red-800/80 border border-red-500/40 text-red-200 text-[11px] font-semibold transition-all"
                title="Set orders to 10 to test auto-deletion"
              >
                Simulate 10 Orders (Auto-Delete)
              </button>
              <button
                type="button"
                onClick={() => resetOrderCount(6)}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold transition-all"
                title="Reset to default 6 orders"
              >
                Reset (6 Orders)
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#DDD5CD]/60 gap-4">
          <p>&copy; {new Date().getFullYear()} THE WEBCRAFT. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-white font-mono text-[11px]">Colors: #F1ECE6 &bull; #DDD5CD &bull; #7D4047 &bull; #2E2E2E</span>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-[#7D4047] text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-95 shadow-sm group"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4 group-hover:animate-bounce-gentle" />
            </button>
          </div>
        </div>

      </div>

      {/* Persistent Floating WhatsApp Action Button with gentle pulse ring */}
      <a
        href={COMPANY_CONFIG.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center gap-2 group border-2 border-white/20 hover:border-white shadow-emerald-500/20"
        title="Chat on WhatsApp (+91 85114 39894 - Only Message, Not Call)"
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
        </span>
        <MessageSquare className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold px-0 group-hover:px-1">
          Chat on WhatsApp (Only Message, Not Call)
        </span>
      </a>
    </footer>
  );
}
