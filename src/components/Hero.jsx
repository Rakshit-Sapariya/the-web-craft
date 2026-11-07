import React from 'react';
import { ArrowRight, CheckCircle2, ShieldAlert, Sparkles, UploadCloud, Eye, Zap, Flame } from 'lucide-react';
import { COMPANY_CONFIG } from '../data/pricingData';
import { useOrderOffer } from '../utils/orderTracker';
import WebCraftWatermark from './WebCraftWatermark';

export default function Hero({ onSelectCategory }) {
  const offer = useOrderOffer();

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const startingPrice = offer.isOfferActive ? offer.applyDiscount(19500) : 19500;

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background ambient accents */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-br from-[#7D4047]/10 via-[#DDD5CD]/40 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

      {/* Signature WebCraft Luxury Watermark Logo in Hero Background (from Photo 2) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[360px] sm:w-[520px] lg:w-[660px] aspect-square pointer-events-none select-none opacity-[0.10] sm:opacity-[0.13] -z-10 flex items-center justify-center">
        <WebCraftWatermark className="w-full h-full" variant="original" opacity="opacity-100" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          {offer.isOfferActive ? (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-100 via-amber-100 to-rose-100 border border-emerald-300 text-emerald-900 text-xs font-bold tracking-wide uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />
              <span>{offer.badgeText}</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DDD5CD]/70 border border-[#DDD5CD] text-[#7D4047] text-xs font-bold tracking-wide uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Handcrafted High-Conversion Websites</span>
            </div>
          )}

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2E2E2E] tracking-tight leading-[1.18]">
            <span className="block">Welcome to <span className="text-[#7D4047]">THE WEBCRAFT</span></span>
            <span className="block mt-1 sm:mt-2 text-[#2E2E2E]">
              Build Your <span className="text-[#7D4047] underline decoration-[#DDD5CD] decoration-4 underline-offset-8">Website</span>
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-[#625f5c] leading-relaxed max-w-2xl mx-auto font-normal">
            {offer.isOfferActive ? (
              <span>
                Your on-demand bespoke web development studio. Starting from just <span className="line-through text-neutral-400">₹19,500</span> <strong className="text-emerald-700 text-xl font-mono">₹{startingPrice.toLocaleString('en-IN')}</strong> ({offer.discountPercent}% flat discount active), we engineer blazing-fast, custom websites tailored to turn visitors into paying clients.
              </span>
            ) : (
              <span>
                Your on-demand bespoke web development studio. Starting from just <strong>₹19,500</strong>, we engineer blazing-fast, custom websites tailored to turn visitors into paying clients.
              </span>
            )}
          </p>

          {/* Key Value Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-left">
            
            {/* Card 1: Starting Package */}
            <div className="flex flex-col justify-between h-full bg-[#DDD5CD]/40 border border-[#DDD5CD] rounded-xl p-3.5">
              <div className="h-6 flex items-center">
                <span className="text-xs text-[#625f5c] font-medium leading-none">Starting Package</span>
              </div>
              <div className="h-8 flex items-baseline gap-1.5 mt-1.5">
                {offer.isOfferActive ? (
                  <>
                    <span className="text-lg font-bold text-emerald-800 font-mono leading-none">₹{startingPrice.toLocaleString('en-IN')}</span>
                    <span className="text-xs line-through text-[#625f5c] font-mono leading-none">₹19,500</span>
                  </>
                ) : (
                  <span className="text-lg font-bold text-[#2E2E2E] leading-none">₹19,500</span>
                )}
              </div>
              <div className="h-5 flex items-center mt-1.5">
                <span className="text-[11px] text-[#7D4047] font-semibold truncate leading-none">
                  {offer.isOfferActive ? `${offer.discountPercent}% Tier Discount` : 'Direct Developer Rate'}
                </span>
              </div>
            </div>

            {/* Card 2: Direct Booking */}
            <div className="flex flex-col justify-between h-full bg-[#DDD5CD]/40 border border-[#DDD5CD] rounded-xl p-3.5">
              <div className="h-6 flex items-center">
                <span className="text-xs text-[#625f5c] font-medium leading-none">Direct Booking</span>
              </div>
              <div className="h-8 flex items-baseline mt-1.5">
                <span className="text-lg font-bold text-[#2E2E2E] leading-none">Zero Online Pay</span>
              </div>
              <div className="h-5 flex items-center mt-1.5">
                <span className="text-[11px] text-[#625f5c] font-semibold truncate leading-none">Direct Message / Email</span>
              </div>
            </div>

            {/* Card 3: Asset Uploads */}
            <div className="flex flex-col justify-between h-full bg-[#DDD5CD]/40 border border-[#DDD5CD] rounded-xl p-3.5">
              <div className="h-6 flex items-center">
                <span className="text-xs text-[#625f5c] font-medium leading-none">Asset Uploads</span>
              </div>
              <div className="h-8 flex items-baseline mt-1.5">
                <span className="text-lg font-bold text-[#2E2E2E] leading-none">Up to 1 GB</span>
              </div>
              <div className="h-5 flex items-center mt-1.5">
                <span className="text-[11px] text-[#625f5c] font-semibold truncate leading-none">Figma, PDF, ZIP</span>
              </div>
            </div>

            {/* Card 4: WhatsApp Inquiries */}
            <a 
              href="https://wa.me/919428298134?text=Hello%20The%20Webcraft%2C%20I%20am%20interested%20in%20building%20a%20website"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-between h-full bg-[#DDD5CD]/40 hover:bg-emerald-50/60 border border-[#DDD5CD] hover:border-emerald-500/50 rounded-xl p-3.5 transition-all text-left group block"
              title="Chat on WhatsApp (No Direct Calls)"
            >
              <div className="h-6 flex items-center justify-between gap-1">
                <span className="text-xs text-[#625f5c] font-medium leading-none whitespace-nowrap">Direct Inquiries</span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-1.5 py-0.5 rounded-full shrink-0 leading-none">
                  WhatsApp
                </span>
              </div>
              <div className="h-8 flex items-baseline mt-1.5">
                <span className="text-lg font-bold text-[#2E2E2E] leading-none group-hover:text-emerald-700 transition-colors tracking-tight">
                  +91 94282 98134
                </span>
              </div>
              <div className="h-5 flex items-center mt-1.5">
                <span className="text-[11px] text-emerald-800 font-semibold truncate leading-none">
                  WhatsApp Chat &bull; <span className="text-red-600 font-normal">No Calls</span>
                </span>
              </div>
            </a>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => scrollTo('#order-form')}
              className="w-full sm:w-auto min-h-[52px] inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-bold text-white bg-[#7D4047] hover:bg-[#67333a] border border-transparent shadow-wine hover:shadow-xl transition-all active:scale-95"
            >
              <span>Book Your Custom Website Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => scrollTo('#demos')}
              className="w-full sm:w-auto min-h-[52px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-bold text-[#2E2E2E] bg-white hover:bg-white border border-[#DDD5CD] shadow-sm transition-all"
            >
              <Eye className="w-5 h-5 text-[#7D4047]" />
              <span>Explore Live Frontend Demos</span>
            </button>
          </div>

          {/* Important note banner */}
          <div className="inline-flex items-center gap-2 text-xs text-[#625f5c] pt-2">
            <CheckCircle2 className="w-4 h-4 text-[#7D4047] shrink-0" />
            <span>Pay on WhatsApp only after you see your website completed, and before it goes live on the browser. Zero upfront online payment.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
