import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Eye, 
  Layers, Code2, Zap, Phone, Tag, Clock, ArrowUpRight,
  Cpu, Check, Smartphone, Laptop, Globe, Flame, Filter, Sliders, ChevronRight
} from 'lucide-react';
import { COMPANY_CONFIG } from '../data/pricingData';
import FeaturesGrid from '../components/FeaturesGrid';
import ProcessRoadmap from '../components/ProcessRoadmap';
import SecurityShieldSection from '../components/SecurityShieldSection';
import ReviewsSection from '../components/ReviewsSection';
import { useOrderOffer } from '../utils/orderTracker';

export default function HomePage() {
  const offer = useOrderOffer();
  const [activeCategory, setActiveCategory] = useState('all');
  const [comparisonTab, setComparisonTab] = useState('webcraft'); // 'webcraft' | 'builders'
  const [estPages, setEstPages] = useState(5);
  const [showAllMobileProjects, setShowAllMobileProjects] = useState(false);
  const [showMobileCode, setShowMobileCode] = useState(false);

  const teaserProjects = [
    {
      id: 'beautyparlour',
      categoryGroup: 'salon',
      title: 'Glamour & Glow Bridal Studio',
      category: 'Beauty Parlour & Salon',
      tagline: 'Bridal HD airbrush packages, pre-bridal glow, and instant beautician appointment booking.',
      stats: '5.0 ★ • 1,200+ Brides',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
      badge: 'Bridal Studio'
    },
    {
      id: 'hairparlour',
      categoryGroup: 'salon',
      title: 'The Urban Gentleman Barbershop',
      category: "Men's Hair & Grooming",
      tagline: 'Precision taper skin fades, straight-razor beard sculpting, and barber chair scheduling.',
      stats: '4.9 ★ • Master Barbers',
      image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80',
      badge: 'Barber Lounge'
    },
    {
      id: 'gym',
      categoryGroup: 'dining_gym',
      title: 'IronCore Elite Fitness & CrossFit',
      category: 'Gym & Fitness Center',
      tagline: '15,000 sq.ft facility, Rogue barbells, CrossFit boxes, and free 1-day pass claim.',
      stats: '15,000 Sq.Ft • 4.9 ★',
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80',
      badge: 'CrossFit Arena'
    },
    {
      id: 'restaurant',
      categoryGroup: 'dining_gym',
      title: 'The Saffron Courtyard Dining',
      category: 'Restaurant & Table Booking',
      tagline: 'Royal Awadhi restaurant with live online table reservation and a la carte menu.',
      stats: 'Times Food Award 2025',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
      badge: 'Fine Dining'
    },
    {
      id: 'ecommerce',
      categoryGroup: 'commerce_realty',
      title: 'Zahra Luxury Silk & Ethnic Couture',
      category: 'D2C E-Commerce Store',
      tagline: 'High-converting apparel store with live bag drawer, size selector, and discount codes.',
      stats: '0.6s Load • 5.0 ★ Rating',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
      badge: 'Bestseller'
    },
    {
      id: 'realestate',
      categoryGroup: 'commerce_realty',
      title: 'Shikhar Skyline Residences',
      category: 'Real Estate & Builders',
      tagline: 'Luxury 3 & 4 BHK sky-living portal with interactive floorplans and VIP site visit scheduler.',
      stats: 'RERA Approved • 4.9 ★',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      badge: 'Enterprise'
    },
    {
      id: 'healthcare',
      categoryGroup: 'tech',
      title: 'Dr. Mehta Dental Aesthetics & Implant Center',
      category: 'Healthcare & Clinic',
      tagline: 'NABH-certified modern clinic platform with instant patient consultation appointment booking.',
      stats: '16+ Yrs Exp • 4.9 ★',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
      badge: 'NABH Clinic'
    },
    {
      id: 'custombuild',
      categoryGroup: 'tech',
      title: 'NexFlow Custom Systems Architecture',
      category: 'Custom Build Website & Portal',
      tagline: 'Handwritten React + Node architecture, live operational dashboard, API webhooks, and custom business workflows.',
      stats: '100% Bespoke • 0.4s Speed',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      badge: '100% Bespoke'
    }
  ];

  // Marquee ticker items
  const tickerItems = [
    { icon: Zap, label: '0.4s Fast Core Web Vitals' },
    { icon: Code2, label: '100% Handwritten React 19 & Tailwind' },
    { icon: ShieldCheck, label: 'Zero Online Payment • Pay on WhatsApp After Completed Demo' },
    { icon: Layers, label: 'Real SQLite Database Integration' },
    { icon: Eye, label: '8 Live Interactive Client Demos' },
    { icon: Cpu, label: 'Up to 1 GB Design Asset Portal' },
    { icon: Phone, label: 'Direct Lead Developer Studio Line' },
    { icon: ShieldCheck, label: '100% Demo Satisfaction Guarantee' },
  ];

  // Category filter tabs
  const categoryFilters = [
    { id: 'all', label: 'All Projects', count: 8 },
    { id: 'salon', label: 'Salon & Beauty', count: 2 },
    { id: 'dining_gym', label: 'Dining & Gym', count: 2 },
    { id: 'commerce_realty', label: 'E-Commerce & Realty', count: 2 },
    { id: 'tech', label: 'Clinic & Tech Portals', count: 2 },
  ];

  const filteredProjects = activeCategory === 'all'
    ? teaserProjects
    : teaserProjects.filter(p => p.categoryGroup === activeCategory);

  // Dynamic quick estimate calculator with 300 customers tiered discount
  const baseEstimate = estPages <= 5 ? 19500 : 19500 + (estPages - 5) * 3000;
  const estimatedBudget = offer.isOfferActive ? offer.applyDiscount(baseEstimate) : baseEstimate;
  const startingPrice = offer.isOfferActive ? offer.applyDiscount(19500) : 19500;

  return (
    <div className="space-y-8 sm:space-y-20 pb-12 sm:pb-20 overflow-x-hidden">
      
      {/* 1. Hero Section with Glow & Floating Badges */}
      <section className="relative overflow-hidden pt-6 pb-8 md:pt-16 md:pb-24">
        {/* Animated Multi-Layer Glow Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] sm:w-[850px] h-[350px] sm:h-[450px] bg-gradient-to-tr from-[#7D4047]/15 via-[#DDD5CD]/40 to-transparent blur-3xl rounded-full pointer-events-none -z-10 animate-pulse-glow" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-[#7D4047]/10 blur-3xl rounded-full pointer-events-none -z-10 animate-float" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#DDD5CD]/50 blur-3xl rounded-full pointer-events-none -z-10 animate-float-reverse" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Floating Interactive Glass Badge (Left) */}
          <div className="hidden xl:flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/85 backdrop-blur-md border border-[#DDD5CD] shadow-elevated animate-float absolute -left-2 top-20 z-10 hover:scale-105 transition-transform cursor-default">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center font-bold shadow-sm">
              <Zap className="w-5 h-5 animate-pulse" />
            </div>
            <div className="text-left text-xs">
              <div className="font-extrabold text-[#2E2E2E] flex items-center gap-1.5">
                <span>0.4s First Paint</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
              </div>
              <p className="text-[11px] text-[#625f5c]">Google 99/100 Core Vitals</p>
            </div>
          </div>

          {/* Floating Interactive Glass Badge (Right) */}
          <div className="hidden xl:flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/85 backdrop-blur-md border border-[#DDD5CD] shadow-elevated animate-float-reverse absolute -right-2 top-32 z-10 hover:scale-105 transition-transform cursor-default">
            <div className="w-10 h-10 rounded-xl bg-[#7D4047]/15 text-[#7D4047] flex items-center justify-center font-bold shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-left text-xs">
              <div className="font-extrabold text-[#2E2E2E]">100% Handcrafted</div>
              <p className="text-[11px] text-[#625f5c]">Zero Template Bloat</p>
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-6">
            
            {/* Studio Badge with Pulse Indicator */}
            {offer.isOfferActive ? (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-100 via-amber-100 to-rose-100 border border-emerald-300 text-emerald-900 text-[11px] sm:text-xs font-bold tracking-wide uppercase shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />
                <span>{offer.badgeText}</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DDD5CD]/70 border border-[#DDD5CD] text-[#7D4047] text-[11px] sm:text-xs font-bold tracking-wide uppercase shadow-sm hover:border-[#7D4047]/40 transition-colors">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                </span>
                <span>Bespoke Web Studio &bull; Direct Developer Booking</span>
              </div>
            )}

            {/* Headline with Shimmer Animation */}
            <h1 className="text-[17px] xs:text-xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#2E2E2E] tracking-tight leading-[1.3] px-1">
              <span className="block">Welcome to <span className="text-[#7D4047]">THE WEBCRAFT</span></span>
              <span className="block mt-1 sm:mt-2 text-[#2E2E2E]">
                Build Your <span className="shimmer-text underline decoration-[#DDD5CD] decoration-4 underline-offset-8">Website</span>
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-xs sm:text-lg text-[#625f5c] leading-relaxed max-w-2xl mx-auto font-normal">
              {offer.isOfferActive ? (
                <span>
                  Your on-demand bespoke web development studio. Starting from just <span className="line-through text-neutral-400">₹19,500</span> <strong className="text-emerald-700 font-mono text-xl">₹{startingPrice.toLocaleString('en-IN')}</strong> ({offer.discountPercent}% flat discount active), we engineer blazing-fast, custom websites tailored to turn visitors into paying clients.
                </span>
              ) : (
                <span>
                  Your on-demand bespoke web development studio. Starting from just <strong>₹19,500</strong>, we engineer blazing-fast, custom websites tailored to turn visitors into paying clients.
                </span>
              )}
            </p>

            {/* Value Highlights Grid with Hover-Glow (Compact on Mobile) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-1 sm:pt-2 text-left">
              
              {/* Card 1: Starting Package */}
              <div className="flex flex-col justify-between h-full bg-white/70 backdrop-blur-sm border border-[#DDD5CD] rounded-xl sm:rounded-2xl p-2.5 sm:p-4 hover-glow-card transition-all group">
                <div className="h-5 sm:h-6 flex items-center">
                  <span className="text-[10px] sm:text-xs text-[#625f5c] font-medium leading-none">Starting Package</span>
                </div>
                <div className="h-7 sm:h-8 flex items-baseline gap-1.5 mt-1 sm:mt-1.5">
                  {offer.isOfferActive ? (
                    <>
                      <span className="text-sm sm:text-lg font-extrabold text-emerald-800 font-mono leading-none">
                        ₹{startingPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] sm:text-xs line-through text-[#625f5c] font-mono leading-none">
                        ₹19,500
                      </span>
                    </>
                  ) : (
                    <span className="text-sm sm:text-lg font-extrabold text-[#2E2E2E] leading-none group-hover:text-[#7D4047] transition-colors">
                      ₹19,500
                    </span>
                  )}
                </div>
                <div className="h-5 flex items-center mt-1 sm:mt-1.5">
                  <span className="text-[9px] sm:text-[11px] text-[#7D4047] font-semibold truncate leading-none">
                    {offer.isOfferActive ? `${offer.discountPercent}% Tier Discount` : 'Direct Developer Rate'}
                  </span>
                </div>
              </div>

              {/* Card 2: Direct Booking */}
              <div className="flex flex-col justify-between h-full bg-white/70 backdrop-blur-sm border border-[#DDD5CD] rounded-xl sm:rounded-2xl p-2.5 sm:p-4 hover-glow-card transition-all group">
                <div className="h-5 sm:h-6 flex items-center">
                  <span className="text-[10px] sm:text-xs text-[#625f5c] font-medium leading-none">Direct Booking</span>
                </div>
                <div className="h-7 sm:h-8 flex items-baseline mt-1 sm:mt-1.5">
                  <span className="text-sm sm:text-lg font-extrabold text-[#2E2E2E] leading-none group-hover:text-[#7D4047] transition-colors">
                    Zero Online Pay
                  </span>
                </div>
                <div className="h-5 flex items-center mt-1 sm:mt-1.5">
                  <span className="text-[9px] sm:text-[11px] text-[#625f5c] font-semibold truncate leading-none">
                    Direct Message / Email
                  </span>
                </div>
              </div>

              {/* Card 3: Asset Uploads */}
              <div className="flex flex-col justify-between h-full bg-white/70 backdrop-blur-sm border border-[#DDD5CD] rounded-xl sm:rounded-2xl p-2.5 sm:p-4 hover-glow-card transition-all group">
                <div className="h-5 sm:h-6 flex items-center">
                  <span className="text-[10px] sm:text-xs text-[#625f5c] font-medium leading-none">Asset Uploads</span>
                </div>
                <div className="h-7 sm:h-8 flex items-baseline mt-1 sm:mt-1.5">
                  <span className="text-sm sm:text-lg font-extrabold text-[#2E2E2E] leading-none group-hover:text-[#7D4047] transition-colors">
                    Up to 1 GB
                  </span>
                </div>
                <div className="h-5 flex items-center mt-1 sm:mt-1.5">
                  <span className="text-[9px] sm:text-[11px] text-[#625f5c] font-semibold truncate leading-none">
                    Figma, PDF, ZIP
                  </span>
                </div>
              </div>

              {/* Card 4: WhatsApp Inquiries */}
              <a 
                href="https://wa.me/919428298134?text=Hello%20The%20Webcraft%2C%20I%20am%20interested%20in%20building%20a%20website"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col justify-between h-full bg-white/70 hover:bg-emerald-50/70 backdrop-blur-sm border border-[#DDD5CD] hover:border-emerald-500/50 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 hover-glow-card transition-all group block text-left"
                title="Chat on WhatsApp (No Direct Calls)"
              >
                <div className="h-5 sm:h-6 flex items-center justify-between gap-1">
                  <span className="text-[10px] sm:text-xs text-[#625f5c] font-medium leading-none whitespace-nowrap">Direct Inquiries</span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-1.5 py-0.5 rounded-full shrink-0 leading-none">
                    WhatsApp
                  </span>
                </div>
                <div className="h-7 sm:h-8 flex items-baseline mt-1 sm:mt-1.5">
                  <span className="text-sm sm:text-lg font-extrabold text-[#2E2E2E] leading-none group-hover:text-emerald-700 transition-colors tracking-tight">
                    +91 94282 98134
                  </span>
                </div>
                <div className="h-5 flex items-center mt-1 sm:mt-1.5">
                  <span className="text-[9px] sm:text-[11px] text-emerald-800 font-semibold truncate leading-none">
                    WhatsApp Chat &bull; <span className="text-red-600 font-normal">No Calls</span>
                  </span>
                </div>
              </a>

            </div>

            {/* Hero CTAs with Animations */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-3 sm:pt-5">
              <Link
                to="/order"
                className="w-full sm:w-auto min-h-[48px] sm:min-h-[54px] inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-xl sm:rounded-2xl text-sm sm:text-base font-bold text-white bg-[#7D4047] hover:bg-[#67333a] border border-transparent shadow-wine hover:shadow-2xl hover:-translate-y-0.5 transition-all active:scale-95 group"
              >
                <span>Book Your Custom Website Now</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/demos"
                className="w-full sm:w-auto min-h-[48px] sm:min-h-[54px] inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-xl sm:rounded-2xl text-sm sm:text-base font-bold text-[#2E2E2E] bg-white hover:bg-[#F9F6F2] border border-[#DDD5CD] hover:border-[#7D4047]/50 shadow-soft hover:shadow-md hover:-translate-y-0.5 transition-all group"
              >
                <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-[#7D4047] group-hover:scale-110 transition-transform" />
                <span>Explore Live Demos ({teaserProjects.length} Projects)</span>
              </Link>
            </div>

            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs text-[#625f5c] pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#7D4047] shrink-0" />
              <span>Direct collaboration with developer. Pay on WhatsApp only after you see your website completed, and before it goes live on the browser.</span>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Continuous Smooth Infinite Marquee Ticker */}
      <div className="w-full overflow-hidden bg-[#2E2E2E] py-3.5 border-y border-[#DDD5CD]/20 shadow-inner">
        <div className="animate-marquee flex items-center gap-8">
          {[...tickerItems, ...tickerItems].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-2.5 text-xs font-bold text-[#F1ECE6] shrink-0 tracking-wide uppercase">
                <span className="w-6 h-6 rounded-lg bg-[#7D4047] flex items-center justify-center text-white">
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <span dangerouslySetInnerHTML={{ __html: item.label }} />
                <span className="text-[#DDD5CD]/40 mx-2">&bull;</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Core USPs Grid */}
      <FeaturesGrid />

      {/* 4. Interactive Architecture Comparison Terminal (Compact on Mobile) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2E2E2E] text-white rounded-2xl sm:rounded-3xl p-4 sm:p-10 border border-neutral-700 shadow-elevated space-y-4 sm:space-y-8 relative overflow-hidden">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#7D4047]/20 blur-3xl rounded-full pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-400 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                <Code2 className="w-3.5 h-3.5" />
                <span>Architecture Comparison</span>
              </div>
              <h2 className="text-lg sm:text-3xl font-extrabold text-white leading-snug">
                Bespoke Clean Code vs Bloated Agency Builders
              </h2>
              <p className="text-xs sm:text-sm text-[#DDD5CD]/80 max-w-xl">
                See why businesses switch to THE WEBCRAFT. Handcrafted code without heavy plugins or security holes.
              </p>
            </div>

            {/* Interactive Tab Switcher */}
            <div className="bg-white/10 p-1 rounded-xl flex items-center shrink-0 border border-white/10">
              <button
                type="button"
                onClick={() => setComparisonTab('webcraft')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1.5 sm:gap-2 ${
                  comparisonTab === 'webcraft'
                    ? 'bg-[#7D4047] text-white shadow-wine'
                    : 'text-[#DDD5CD] hover:text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>THE WEBCRAFT</span>
              </button>
              <button
                type="button"
                onClick={() => setComparisonTab('builders')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1.5 sm:gap-2 ${
                  comparisonTab === 'builders'
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-[#DDD5CD] hover:text-white'
                }`}
              >
                <span>Template Builders</span>
              </button>
            </div>
          </div>

          {/* Interactive Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-5 space-y-0.5 sm:space-y-1">
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#DDD5CD]/70 block">Average First Paint</span>
              <div className="text-xl sm:text-2xl font-black font-mono">
                {comparisonTab === 'webcraft' ? (
                  <span className="text-emerald-400">0.4s</span>
                ) : (
                  <span className="text-red-400">4.8s</span>
                )}
              </div>
              <span className="text-[9px] sm:text-[10px] text-[#DDD5CD]/60 block">
                {comparisonTab === 'webcraft' ? '✓ Instant bounce-free load' : '✗ High mobile bounce rate'}
              </span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-5 space-y-0.5 sm:space-y-1">
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#DDD5CD]/70 block">Google PageSpeed</span>
              <div className="text-xl sm:text-2xl font-black font-mono">
                {comparisonTab === 'webcraft' ? (
                  <span className="text-emerald-400">99 / 100</span>
                ) : (
                  <span className="text-amber-400">48 / 100</span>
                )}
              </div>
              <span className="text-[9px] sm:text-[10px] text-[#DDD5CD]/60 block">
                {comparisonTab === 'webcraft' ? '✓ Ranked in Google top tier' : '✗ Penalized in search SEO'}
              </span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-5 space-y-0.5 sm:space-y-1">
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#DDD5CD]/70 block">Asset Bundle Size</span>
              <div className="text-xl sm:text-2xl font-black font-mono">
                {comparisonTab === 'webcraft' ? (
                  <span className="text-emerald-400">43 KB</span>
                ) : (
                  <span className="text-red-400">3.8 MB</span>
                )}
              </div>
              <span className="text-[9px] sm:text-[10px] text-[#DDD5CD]/60 block">
                {comparisonTab === 'webcraft' ? '✓ Zero third-party baggage' : '✗ 35+ bulky scripts'}
              </span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-5 space-y-0.5 sm:space-y-1">
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#DDD5CD]/70 block">Backend Database</span>
              <div className="text-xl sm:text-2xl font-black font-mono">
                {comparisonTab === 'webcraft' ? (
                  <span className="text-emerald-400">Real SQLite</span>
                ) : (
                  <span className="text-amber-400">Volatile Form</span>
                )}
              </div>
              <span className="text-[9px] sm:text-[10px] text-[#DDD5CD]/60 block">
                {comparisonTab === 'webcraft' ? '✓ Trackable orders' : '✗ Easy to lose leads'}
              </span>
            </div>
          </div>

          {/* Mobile Code Window Toggle */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setShowMobileCode(!showMobileCode)}
              className="w-full py-2 px-3 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-[#DDD5CD] flex items-center justify-between border border-white/10 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{showMobileCode ? 'Hide Code Window' : 'Tap to View React Source Code'}</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">{showMobileCode ? '▲ Hide' : '▼ View Code'}</span>
            </button>
          </div>

          {/* Code Window Preview (Collapsed on Mobile by default to save 400px height) */}
          <div className={`${showMobileCode ? 'block' : 'hidden md:block'} bg-[#1C1C1C] rounded-xl sm:rounded-2xl border border-white/10 p-3.5 sm:p-5 font-mono text-xs overflow-x-auto shadow-inner`}>
            <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-white/10 mb-2.5 sm:mb-3 text-[10px] sm:text-[11px] text-[#DDD5CD]/60">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-1 sm:ml-2 text-white font-semibold truncate max-w-[200px] sm:max-w-none">
                  {comparisonTab === 'webcraft' ? 'TheWebcraft_Engine.jsx (Bespoke Architecture)' : 'Generic_Agency_Builder_Export.html'}
                </span>
              </div>
              <span className="text-emerald-400 font-bold shrink-0">
                {comparisonTab === 'webcraft' ? '● 100% Bespoke' : '▲ Template Bloat'}
              </span>
            </div>
            
            {comparisonTab === 'webcraft' ? (
              <pre className="text-emerald-300 leading-relaxed text-[11px] sm:text-xs">
{`// Handcrafted with modern React 19 + Node.js + SQLite WAL
export default function StudioProject({ clientRequirement }) {
  const customWebsite = {
    developer: "Rakshit Patel (Direct 1-on-1 Access)",
    cleanSemanticHTML: true,
    pageSpeedScore: 99.4,
    databaseOrders: "Persistent SQLite server/data/webcraft.db",
    bookingAdvance: "Rs. 5,000 Token (Balance on Live Demo Approval)"
  };
  return <DigitalSuccessPlatform client={customWebsite} speed="0.4s" />;
}`}
              </pre>
            ) : (
              <pre className="text-red-300/80 leading-relaxed text-[11px] sm:text-xs">
{`<!-- 42 Bloated Plugins Detected (Site Speed: 4.8s) -->
<script src="/wp-content/plugins/revslider/slow-render.js"></script>
<script src="/wp-content/plugins/heavy-contact-form-v3/bloat.js"></script>
<div class="elementor-container unoptimized-dom-heavy">... 3.8 MB loaded</div>`}
              </pre>
            )}
          </div>

        </div>
      </section>

      {/* 5. Category-Filtered Featured Client Demos (2-Column Compact on Mobile) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-4 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DDD5CD]/60 border border-[#DDD5CD] text-[#7D4047] text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-1.5 sm:mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Client Portfolio Demos</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-[#2E2E2E] tracking-tight leading-snug">
              Genuine Production Websites Built by Us
            </h2>
            <p className="text-xs sm:text-sm text-[#625f5c] mt-0.5 sm:mt-1 max-w-xl">
              Filter by industry category to test real desktop &amp; mobile live frontends built for actual businesses.
            </p>
          </div>
          <Link
            to="/demos"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#2E2E2E] hover:bg-[#7D4047] text-white text-xs font-bold transition-all shadow-sm shrink-0 self-start md:self-auto group"
          >
            <span>View All {teaserProjects.length} Demos</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Filter Pills (Compact on Mobile) */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-4 sm:mb-8">
          {categoryFilters.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveCategory(tab.id);
                  setShowAllMobileProjects(false);
                }}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#7D4047] text-white shadow-wine scale-105'
                    : 'bg-white hover:bg-[#DDD5CD]/50 border border-[#DDD5CD] text-[#2E2E2E]'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-[#DDD5CD]/60 text-[#625f5c]'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid (2 columns on mobile, 4 on desktop, compact cards) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {filteredProjects.map((p, idx) => (
            <div 
              key={p.id} 
              className={`${idx >= 4 && !showAllMobileProjects ? 'hidden md:flex' : 'flex'} bg-white rounded-xl sm:rounded-2xl border border-[#DDD5CD] overflow-hidden shadow-soft hover-glow-card transition-all flex-col justify-between group`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#DDD5CD]/20">
                <img 
                  src={p.image} 
                  alt={p.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                />
                <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#7D4047] text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded shadow-sm">
                  {p.badge}
                </span>
              </div>
              <div className="p-2.5 sm:p-4 space-y-1.5 sm:space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-[#7D4047] uppercase tracking-wider block">{p.category}</span>
                  <h3 className="font-heading font-bold text-xs sm:text-sm text-[#2E2E2E] mt-0.5 line-clamp-1 group-hover:text-[#7D4047] transition-colors">{p.title}</h3>
                  <p className="text-[10px] sm:text-xs text-[#625f5c] line-clamp-1 sm:line-clamp-2 mt-0.5 sm:mt-1">{p.tagline}</p>
                </div>
                <div className="pt-2 sm:pt-3 border-t border-[#DDD5CD]/60 flex items-center justify-between text-[10px] sm:text-xs">
                  <span className="font-semibold text-[#625f5c] truncate pr-1">{p.stats}</span>
                  <Link
                    to="/demos"
                    className="text-[#7D4047] font-bold hover:underline inline-flex items-center gap-0.5 shrink-0 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Demo</span>
                    <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Toggle to Show All 8 Projects */}
        {filteredProjects.length > 4 && (
          <div className="md:hidden mt-3 text-center">
            <button
              type="button"
              onClick={() => setShowAllMobileProjects(!showAllMobileProjects)}
              className="w-full py-2.5 rounded-xl border border-[#DDD5CD] bg-white text-xs font-bold text-[#7D4047] shadow-sm active:scale-95 transition-all"
            >
              {showAllMobileProjects ? 'Show Fewer Projects ▲' : `View All ${filteredProjects.length} Projects ▼`}
            </button>
          </div>
        )}
      </section>

      {/* 6. Interactive 1-Click Homepage Cost Estimator Slider (Compact on Mobile) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#DDD5CD] p-4 sm:p-10 shadow-soft hover:shadow-elevated transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-center">
            
            {/* Left explanation & slider (7 cols) */}
            <div className="lg:col-span-7 space-y-3 sm:space-y-6">
              <div className="space-y-1 sm:space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DDD5CD]/60 border border-[#DDD5CD] text-[#7D4047] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Instant Interactive Estimator</span>
                </div>
                <h3 className="text-lg sm:text-3xl font-extrabold text-[#2E2E2E] leading-snug">
                  Calculate Your Custom Website Cost in 5 Seconds
                </h3>
                <p className="text-xs sm:text-sm text-[#625f5c]">
                  Move the slider to choose the number of pages. See dynamic pricing and token advance in real time.
                </p>
              </div>

              {/* Range Slider */}
              <div className="space-y-2 sm:space-y-3 bg-[#F1ECE6]/50 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-[#DDD5CD]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] sm:text-xs font-bold text-[#2E2E2E] uppercase tracking-wider">
                    Number of Website Pages
                  </span>
                  <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg bg-[#7D4047] text-white text-xs font-extrabold font-mono">
                    {estPages} {estPages === 1 ? 'Page' : 'Pages'}
                  </span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={estPages}
                  onChange={(e) => setEstPages(parseInt(e.target.value, 10))}
                  className="w-full h-2 sm:h-2.5 bg-[#DDD5CD] rounded-lg appearance-none cursor-pointer accent-[#7D4047]"
                />

                <div className="flex justify-between text-[10px] sm:text-[11px] text-[#625f5c] font-semibold">
                  <span>1 Page (Landing)</span>
                  <span>5 Pages (Standard)</span>
                  <span>10+ Pages (Portal)</span>
                </div>
              </div>

              {/* Guarantee highlights */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 text-[11px] sm:text-xs text-[#625f5c]">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                  <span>Zero Online Upfront Fee</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                  <span>Balance on Live Demo Approval</span>
                </div>
              </div>
            </div>

            {/* Right calculated card (5 cols) */}
            <div className="lg:col-span-5 bg-[#2E2E2E] text-white p-4 sm:p-7 rounded-xl sm:rounded-2xl space-y-3 sm:space-y-4 shadow-elevated">
              <div className="flex items-center justify-between pb-2 sm:pb-3 border-b border-white/10">
                <span className="text-[11px] sm:text-xs font-bold text-[#DDD5CD] uppercase">Final Estimated Price</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-emerald-400 border border-white/15">
                  Direct Rate
                </span>
              </div>

              <div className="space-y-0.5 sm:space-y-1">
                <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
                  <span className="text-2xl sm:text-4xl font-black font-mono text-white">
                    ₹{estimatedBudget.toLocaleString('en-IN')}
                  </span>
                  {offer.isOfferActive && (
                    <span className="text-sm line-through text-[#DDD5CD]/70 font-mono">
                      ₹{baseEstimate.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
                {offer.isOfferActive && (
                  <span className="text-[11px] font-bold text-emerald-400 block">
                    {offer.discountPercent}% OFF Applied
                  </span>
                )}
              </div>

              <div className="bg-white/10 rounded-xl p-3 sm:p-3.5 space-y-1.5 sm:space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#DDD5CD] text-[11px] sm:text-xs">Online Payment:</span>
                  <span className="font-bold text-emerald-400 font-mono text-[11px] sm:text-xs">Zero Online Pay</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#DDD5CD] text-[11px] sm:text-xs">Settlement:</span>
                  <span className="font-bold text-white font-mono text-[11px] sm:text-xs">
                    Pay on WhatsApp before Live Launch
                  </span>
                </div>
              </div>

              <Link
                to={`/order?pages=${estPages}&budget=${estimatedBudget}`}
                className="w-full py-2.5 sm:py-3.5 px-4 rounded-xl bg-[#7D4047] hover:bg-[#67333a] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-wine transition-all"
              >
                <span>Book This Configuration</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 7. 5-Stage Process Roadmap */}
      <ProcessRoadmap />

      {/* 8. Unbreakable Cybersecurity & 100% Ad-Free Guarantee */}
      <SecurityShieldSection />

      {/* 9. Client Feedback & Verified Reviews (Mandatory Feedback Policy) */}
      <ReviewsSection />

      {/* 10. Bottom Conversion Callout (Compact on Mobile) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2E2E2E] text-[#F1ECE6] rounded-2xl sm:rounded-3xl p-5 sm:p-12 shadow-elevated grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-center relative overflow-hidden">
          
          <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-[#7D4047]/20 blur-3xl rounded-full pointer-events-none" />

          <div className="lg:col-span-8 space-y-2 sm:space-y-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7D4047] text-white text-[11px] sm:text-xs font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Bespoke Production Slots Open</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white leading-snug">
              Ready to Build Your Custom Website?
            </h2>
            <p className="text-xs sm:text-sm text-[#DDD5CD]/80 leading-relaxed max-w-xl">
              Book your bespoke website development today with zero online payment. Pay on WhatsApp only after you see your website completed, and before it goes live on the browser.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5 sm:gap-3 relative z-10">
            <Link
              to="/order"
              className="py-3 px-5 sm:py-3.5 sm:px-6 rounded-xl bg-[#7D4047] hover:bg-[#67333a] text-white font-bold text-xs uppercase tracking-wider text-center shadow-wine transition-all"
            >
              Order Custom Website
            </Link>
            <Link
              to="/pricing"
              className="py-3 px-5 sm:py-3.5 sm:px-6 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider text-center transition-all"
            >
              Calculate Project Cost
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
