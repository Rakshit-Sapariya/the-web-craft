import React from 'react';
import { ArrowRight, Eye } from 'lucide-react';
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
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24">
      {/* Signature WebCraft Luxury Watermark Logo in Hero Background (from Photo 2) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[360px] sm:w-[520px] lg:w-[660px] aspect-square pointer-events-none select-none opacity-[0.08] sm:opacity-[0.11] -z-10 flex items-center justify-center">
        <WebCraftWatermark className="w-full h-full" variant="original" opacity="opacity-100" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Badge matching Brand Palette */}
          {offer.isOfferActive ? (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F1E8D8] border border-[#E2D7C3] text-[#355CDE] text-xs font-bold tracking-wide uppercase shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#355CDE]" />
              <span className="font-extrabold">{offer.badgeText}</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F1E8D8] border border-[#E2D7C3] text-[#000000] text-xs font-bold tracking-wide uppercase shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#355CDE]" />
              <span>Handcrafted Bespoke Web Architecture</span>
            </div>
          )}

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#000000] tracking-tight leading-[1.18]">
            <span className="block">Welcome to <span className="text-[#000000]">THE <span className="text-[#355CDE]">WEB</span>CRAFT</span></span>
            <span className="block mt-1 sm:mt-2 text-[#000000]">
              Build Your <span className="underline decoration-[#355CDE] decoration-4 underline-offset-8">Website</span>
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-[#3D362E] leading-relaxed max-w-2xl mx-auto font-normal">
            {offer.isOfferActive ? (
              <span>
                Your on-demand bespoke web development studio. Starting from just <span className="line-through text-neutral-400">₹19,500</span> <strong className="text-[#000000] text-xl font-mono">₹{startingPrice.toLocaleString('en-IN')}</strong> (<span className="text-[#355CDE] font-bold">{offer.discountPercent}% flat discount active</span>), we engineer blazing-fast, custom websites tailored to turn visitors into paying clients.
              </span>
            ) : (
              <span>
                Your on-demand bespoke web development studio. Starting from just <strong className="text-[#000000]">₹19,500</strong>, we engineer blazing-fast, custom websites tailored to turn visitors into paying clients.
              </span>
            )}
          </p>

          {/* Key Value Cards - Architectural Asymmetric Pinwheel Perimeter */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-2 text-left">
            
            {/* Card 1: Starting Package (Top-Left Architectural Curve) */}
            <div className="flex flex-col justify-between h-full bg-[#F1E8D8] border border-[#E2D7C3] hover:border-[#355CDE] rounded-tl-[26px] rounded-br-[22px] rounded-tr-md rounded-bl-md p-4 shadow-xs transition-all hover:-translate-y-0.5">
              <div className="h-6 flex items-center">
                <span className="text-xs text-[#3D362E] font-medium leading-none">Starting Package</span>
              </div>
              <div className="h-8 flex items-baseline gap-1.5 mt-1.5">
                {offer.isOfferActive ? (
                  <>
                    <span className="text-lg font-bold text-[#000000] font-mono leading-none">₹{startingPrice.toLocaleString('en-IN')}</span>
                    <span className="text-xs line-through text-[#3D362E] font-mono leading-none">₹19,500</span>
                  </>
                ) : (
                  <span className="text-lg font-bold text-[#000000] leading-none">₹19,500</span>
                )}
              </div>
              <div className="h-5 flex items-center mt-1.5">
                <span className="text-[11px] text-[#355CDE] font-bold truncate leading-none">
                  {offer.isOfferActive ? `${offer.discountPercent}% Tier Discount` : 'Direct Developer Rate'}
                </span>
              </div>
            </div>

            {/* Card 2: Direct Booking (Top-Right Architectural Curve) */}
            <div className="flex flex-col justify-between h-full bg-[#F1E8D8] border border-[#E2D7C3] hover:border-[#355CDE] rounded-tr-[26px] rounded-bl-[22px] rounded-tl-md rounded-br-md p-4 shadow-xs transition-all hover:-translate-y-0.5">
              <div className="h-6 flex items-center">
                <span className="text-xs text-[#3D362E] font-medium leading-none">Direct Booking</span>
              </div>
              <div className="h-8 flex items-baseline mt-1.5">
                <span className="text-lg font-bold text-[#000000] leading-none">Zero Online Pay</span>
              </div>
              <div className="h-5 flex items-center mt-1.5">
                <span className="text-[11px] text-[#3D362E] font-semibold truncate leading-none">Direct Message / Email</span>
              </div>
            </div>

            {/* Card 3: Asset Uploads (Bottom-Left Architectural Curve) */}
            <div className="flex flex-col justify-between h-full bg-[#F1E8D8] border border-[#E2D7C3] hover:border-[#355CDE] rounded-bl-[26px] rounded-tr-[22px] rounded-tl-md rounded-br-md p-4 shadow-xs transition-all hover:-translate-y-0.5">
              <div className="h-6 flex items-center">
                <span className="text-xs text-[#3D362E] font-medium leading-none">Asset Uploads</span>
              </div>
              <div className="h-8 flex items-baseline mt-1.5">
                <span className="text-lg font-bold text-[#000000] leading-none">Up to 1 GB</span>
              </div>
              <div className="h-5 flex items-center mt-1.5">
                <span className="text-[11px] text-[#3D362E] font-semibold truncate leading-none">Figma, PDF, ZIP</span>
              </div>
            </div>

            {/* Card 4: WhatsApp Inquiries (Bottom-Right Architectural Curve) */}
            <a 
              href="https://wa.me/919428298134?text=Hello%20The%20Webcraft%2C%20I%20am%20interested%20in%20building%20a%20website"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-between h-full bg-[#F1E8D8] hover:bg-emerald-50/70 border border-[#E2D7C3] hover:border-emerald-500/50 rounded-br-[26px] rounded-tl-[22px] rounded-tr-md rounded-bl-md p-4 shadow-xs transition-all hover:-translate-y-0.5 text-left group block"
              title="Chat on WhatsApp (No Direct Calls)"
            >
              <div className="h-6 flex items-center justify-between gap-1">
                <span className="text-xs text-[#3D362E] font-medium leading-none whitespace-nowrap">Direct Inquiries</span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full shrink-0 leading-none">
                  WhatsApp
                </span>
              </div>
              <div className="h-8 flex items-baseline mt-1.5">
                <span className="text-lg font-bold text-[#000000] leading-none group-hover:text-emerald-700 transition-colors tracking-tight">
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

          {/* Action CTAs - Sculpted Stadium & Capsule Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => scrollTo('#order-form')}
              className="w-full sm:w-auto min-h-[50px] inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm sm:text-base font-bold text-white bg-[#355CDE] hover:bg-[#2447B8] active:scale-[0.98] transition-all shadow-sm cursor-pointer"
            >
              <span>Book Your Custom Website Now</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <button
              onClick={() => scrollTo('#demos')}
              className="w-full sm:w-auto min-h-[50px] inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm sm:text-base font-bold text-[#000000] bg-[#F1E8D8] hover:bg-[#E7DDC9] border border-[#E2D7C3] hover:border-[#355CDE] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Eye className="w-4 h-4 text-[#355CDE]" />
              <span>Explore Live Frontend Demos</span>
            </button>
          </div>

          {/* Important note banner */}
          <div className="inline-flex items-center gap-2 text-xs text-[#3D362E] pt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#355CDE] shrink-0" />
            <span>Pay on WhatsApp only after you see your website completed, and before it goes live on the browser. Zero upfront online payment.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
