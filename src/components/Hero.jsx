import React from 'react';
import { ArrowRight, CheckCircle2, ShieldAlert, Sparkles, UploadCloud, Eye, Zap } from 'lucide-react';
import { COMPANY_CONFIG } from '../data/pricingData';
import { useOrderOffer } from '../utils/orderTracker';

export default function Hero({ onSelectCategory }) {
  const { isOfferActive } = useOrderOffer();
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background ambient accents */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-br from-[#7D4047]/10 via-[#DDD5CD]/40 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DDD5CD]/70 border border-[#DDD5CD] text-[#7D4047] text-xs font-bold tracking-wide uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {isOfferActive 
                ? 'Limited Offer: Extra 15% OFF For First 10 Customers' 
                : 'Handcrafted High-Conversion Websites'}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2E2E2E] tracking-tight leading-[1.18]">
            <span className="block">Welcome to <span className="text-[#7D4047]">THE WEBCRAFT</span></span>
            <span className="block mt-1 sm:mt-2 text-[#2E2E2E]">
              Build Your <span className="text-[#7D4047] underline decoration-[#DDD5CD] decoration-4 underline-offset-8">Website</span>
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-[#625f5c] leading-relaxed max-w-2xl mx-auto font-normal">
            Your on-demand bespoke web development studio. Starting from just <strong>₹13,000</strong>, we engineer blazing-fast, custom websites tailored to turn visitors into paying clients.
          </p>

          {/* Key Value Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-left">
            <div className="bg-[#DDD5CD]/40 border border-[#DDD5CD] rounded-xl p-3.5">
              <span className="text-xs text-[#625f5c] block font-medium">Starting Package</span>
              <span className="text-lg font-bold text-[#2E2E2E]">₹13,000</span>
              <span className="text-[11px] text-[#7D4047] font-semibold block mt-0.5">
                {isOfferActive ? '-15% First 10 Promo' : 'Direct Developer Rate'}
              </span>
            </div>

            <div className="bg-[#DDD5CD]/40 border border-[#DDD5CD] rounded-xl p-3.5">
              <span className="text-xs text-[#625f5c] block font-medium">Direct Booking</span>
              <span className="text-lg font-bold text-[#2E2E2E]">Zero Online Pay</span>
              <span className="text-[11px] text-[#625f5c] block mt-0.5">Direct Phone / Email</span>
            </div>

            <div className="bg-[#DDD5CD]/40 border border-[#DDD5CD] rounded-xl p-3.5">
              <span className="text-xs text-[#625f5c] block font-medium">Asset Uploads</span>
              <span className="text-lg font-bold text-[#2E2E2E]">Up to 1 GB</span>
              <span className="text-[11px] text-[#625f5c] block mt-0.5">Any file format</span>
            </div>

            <div className="bg-[#DDD5CD]/40 border border-[#DDD5CD] rounded-xl p-3.5">
              <span className="text-xs text-[#625f5c] block font-medium">Direct Developer</span>
              <span className="text-lg font-bold text-[#2E2E2E]">Studio Line</span>
              <span className="text-[11px] text-[#7D4047] font-semibold block mt-0.5">+91 85114 39894 <span className="font-normal text-[10px] text-[#7D4047] block sm:inline">(Only Message, Not Call)</span></span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => scrollTo('#order-form')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-[#7D4047] hover:bg-[#67333a] shadow-wine hover:shadow-xl transition-all active:scale-95"
            >
              <span>Book Your Custom Website Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => scrollTo('#demos')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-bold text-[#2E2E2E] bg-white/70 hover:bg-white border border-[#DDD5CD] shadow-sm transition-all"
            >
              <Eye className="w-5 h-5 text-[#7D4047]" />
              <span>Explore Live Frontend Demos</span>
            </button>
          </div>

          {/* Important note banner */}
          <div className="inline-flex items-center gap-2 text-xs text-[#625f5c] pt-2">
            <CheckCircle2 className="w-4 h-4 text-[#7D4047] shrink-0" />
            <span>Pay only after full demo satisfaction. No upfront online payment required on website.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
