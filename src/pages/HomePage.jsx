import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle2, ShieldCheck, Eye, 
  Layers, Code2, Zap, Phone, Tag, Clock, ArrowUpRight,
  Cpu, Check, X, Star, Smartphone, Laptop, Globe, Flame, Filter, Sliders, ChevronRight
} from 'lucide-react';
import { COMPANY_CONFIG } from '../data/pricingData';
import FeaturesGrid from '../components/FeaturesGrid';
import ProcessRoadmap from '../components/ProcessRoadmap';
import SecurityShieldSection from '../components/SecurityShieldSection';
import ReviewsSection from '../components/ReviewsSection';
import { useOrderOffer } from '../utils/orderTracker';
import SpatialMonolithCanvas from '../components/SpatialMonolithCanvas';
import SpatialChassis3D from '../components/SpatialChassis3D';
import BespokeTiltCard from '../components/BespokeTiltCard';
import SpatialIsometricPipeline from '../components/SpatialIsometricPipeline';

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
      stats: '5.0 Rating • 1,200+ Brides',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
      badge: 'Bridal Studio'
    },
    {
      id: 'hairparlour',
      categoryGroup: 'salon',
      title: 'The Urban Gentleman Barbershop',
      category: "Men's Hair & Grooming",
      tagline: 'Precision taper skin fades, straight-razor beard sculpting, and barber chair scheduling.',
      stats: '4.9 Rating • Master Barbers',
      image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80',
      badge: 'Barber Lounge'
    },
    {
      id: 'gym',
      categoryGroup: 'dining_gym',
      title: 'IronCore Elite Fitness & CrossFit',
      category: 'Gym & Fitness Center',
      tagline: '15,000 sq.ft facility, Rogue barbells, CrossFit boxes, and free 1-day pass claim.',
      stats: '15,000 Sq.Ft • 4.9 Rating',
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
      stats: '0.6s Load • 5.0 Rating',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
      badge: 'Bestseller'
    },
    {
      id: 'realestate',
      categoryGroup: 'commerce_realty',
      title: 'Shikhar Skyline Residences',
      category: 'Real Estate & Builders',
      tagline: 'Luxury 3 & 4 BHK sky-living portal with interactive floorplans and VIP site visit scheduler.',
      stats: 'RERA Approved • 4.9 Rating',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      badge: 'Enterprise'
    },
    {
      id: 'healthcare',
      categoryGroup: 'tech',
      title: 'Dr. Mehta Dental Aesthetics & Implant Center',
      category: 'Healthcare & Clinic',
      tagline: 'NABH-certified modern clinic platform with instant patient consultation appointment booking.',
      stats: '16+ Yrs Exp • 4.9 Rating',
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
      
      {/* 1. Hero Section with 3D Spatial Monolith */}
      <section className="relative overflow-hidden pt-6 pb-8 md:pt-14 md:pb-20">
        {/* Background 3D WebGL Monolith Canvas */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden opacity-85">
          <SpatialMonolithCanvas />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-6">
            
            {/* Studio Badge matching Business Card Palette */}
            {offer.isOfferActive ? (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#355CDE]/10 border border-[#355CDE]/30 text-[#000000] text-[11px] sm:text-xs font-bold tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#355CDE]" />
                <span className="font-extrabold">{offer.badgeText}</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F1E8D8] border border-[#E2D7C3] text-[#000000] text-[11px] sm:text-xs font-bold tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#355CDE]" />
                <span>Bespoke Web Studio &bull; Direct Developer Booking</span>
              </div>
            )}

            {/* Headline with Brand Lockup */}
            <h1 className="text-[17px] xs:text-xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#000000] tracking-tight leading-[1.3] px-1">
              <span className="block">Welcome to <span className="text-[#000000]">THE <span className="text-[#355CDE]">WEB</span>CRAFT</span></span>
              <span className="block mt-1 sm:mt-2 text-[#000000]">
                Build Your <span className="underline decoration-[#355CDE] decoration-4 underline-offset-8">Website</span>
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-xs sm:text-lg text-[#3D362E] leading-relaxed max-w-2xl mx-auto font-normal">
              {offer.isOfferActive ? (
                <span>
                  Your on-demand bespoke web development studio. Starting from just <span className="line-through text-neutral-400">₹19,500</span> <strong className="text-[#000000] font-mono text-xl">₹{startingPrice.toLocaleString('en-IN')}</strong> (<span className="text-[#355CDE] font-bold">{offer.discountPercent}% flat discount active</span>), we engineer blazing-fast, custom websites tailored to turn visitors into paying clients.
                </span>
              ) : (
                <span>
                  Your on-demand bespoke web development studio. Starting from just <strong className="text-[#000000]">₹19,500</strong>, we engineer blazing-fast, custom websites tailored to turn visitors into paying clients.
                </span>
              )}
            </p>

            {/* Value Highlights Grid - Architectural Pinwheel Perimeter */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 pt-1 sm:pt-2 text-left">
              
              {/* Card 1: Starting Package (Top-Left Arch) */}
              <BespokeTiltCard cornerStyle="arch-1" className="p-3 sm:p-4 bg-[#F1E8D8] border-[#E2D7C3] hover:border-[#355CDE] text-left">
                <div className="flex flex-col justify-between h-full">
                  <div className="h-5 sm:h-6 flex items-center">
                    <span className="text-[10px] sm:text-xs text-[#3D362E] font-medium leading-none">Starting Package</span>
                  </div>
                  <div className="h-7 sm:h-8 flex items-baseline gap-1.5 mt-1 sm:mt-1.5">
                    {offer.isOfferActive ? (
                      <>
                        <span className="text-sm sm:text-lg font-extrabold text-[#000000] font-mono leading-none">
                          ₹{startingPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] sm:text-xs line-through text-[#3D362E] font-mono leading-none">
                          ₹19,500
                        </span>
                      </>
                    ) : (
                      <span className="text-sm sm:text-lg font-extrabold text-[#000000] leading-none group-hover:text-[#355CDE] transition-colors">
                        ₹19,500
                      </span>
                    )}
                  </div>
                  <div className="h-5 flex items-center mt-1 sm:mt-1.5">
                    <span className="text-[9px] sm:text-[11px] text-[#355CDE] font-bold truncate leading-none">
                      {offer.isOfferActive ? `${offer.discountPercent}% Tier Discount` : 'Direct Developer Rate'}
                    </span>
                  </div>
                </div>
              </BespokeTiltCard>

              {/* Card 2: Direct Booking (Top-Right Arch) */}
              <BespokeTiltCard cornerStyle="arch-2" className="p-3 sm:p-4 bg-[#F1E8D8] border-[#E2D7C3] hover:border-[#355CDE] text-left">
                <div className="flex flex-col justify-between h-full">
                  <div className="h-5 sm:h-6 flex items-center">
                    <span className="text-[10px] sm:text-xs text-[#3D362E] font-medium leading-none">Direct Booking</span>
                  </div>
                  <div className="h-7 sm:h-8 flex items-baseline mt-1 sm:mt-1.5">
                    <span className="text-sm sm:text-lg font-extrabold text-[#000000] leading-none group-hover:text-[#355CDE] transition-colors">
                      Zero Online Pay
                    </span>
                  </div>
                  <div className="h-5 flex items-center mt-1 sm:mt-1.5">
                    <span className="text-[9px] sm:text-[11px] text-[#3D362E] font-semibold truncate leading-none">
                      Direct Message / Email
                    </span>
                  </div>
                </div>
              </BespokeTiltCard>

              {/* Card 3: Asset Uploads (Bottom-Left Arch) */}
              <BespokeTiltCard cornerStyle="arch-2" className="p-3 sm:p-4 bg-[#F1E8D8] border-[#E2D7C3] hover:border-[#355CDE] text-left">
                <div className="flex flex-col justify-between h-full">
                  <div className="h-5 sm:h-6 flex items-center">
                    <span className="text-[10px] sm:text-xs text-[#3D362E] font-medium leading-none">Asset Uploads</span>
                  </div>
                  <div className="h-7 sm:h-8 flex items-baseline mt-1 sm:mt-1.5">
                    <span className="text-sm sm:text-lg font-extrabold text-[#000000] leading-none group-hover:text-[#355CDE] transition-colors">
                      Up to 1 GB
                    </span>
                  </div>
                  <div className="h-5 flex items-center mt-1 sm:mt-1.5">
                    <span className="text-[9px] sm:text-[11px] text-[#3D362E] font-semibold truncate leading-none">
                      Figma, PDF, ZIP
                    </span>
                  </div>
                </div>
              </BespokeTiltCard>

              {/* Card 4: WhatsApp Inquiries (Bottom-Right Arch) */}
              <BespokeTiltCard cornerStyle="arch-1" className="p-3 sm:p-4 bg-[#F1E8D8] hover:bg-emerald-50/70 border-[#E2D7C3] hover:border-emerald-500/50 text-left">
                <a 
                  href="https://wa.me/919428298134?text=Hello%20The%20Webcraft%2C%20I%20am%20interested%20in%20building%20a%20website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col justify-between h-full block"
                  title="Chat on WhatsApp (No Direct Calls)"
                >
                  <div className="h-5 sm:h-6 flex items-center justify-between gap-1">
                    <span className="text-[10px] sm:text-xs text-[#3D362E] font-medium leading-none whitespace-nowrap">Direct Inquiries</span>
                    <span className="text-[9px] sm:text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full shrink-0 leading-none">
                      WhatsApp
                    </span>
                  </div>
                  <div className="h-7 sm:h-8 flex items-baseline mt-1 sm:mt-1.5">
                    <span className="text-sm sm:text-lg font-extrabold text-[#000000] leading-none group-hover:text-emerald-700 transition-colors tracking-tight">
                      +91 94282 98134
                    </span>
                  </div>
                  <div className="h-5 flex items-center mt-1 sm:mt-1.5">
                    <span className="text-[9px] sm:text-[11px] text-emerald-800 font-semibold truncate leading-none">
                      WhatsApp Chat &bull; <span className="text-red-600 font-normal">No Calls</span>
                    </span>
                  </div>
                </a>
              </BespokeTiltCard>

            </div>

            {/* Hero CTAs - Stadium Pills */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-3 sm:pt-4">
              <Link
                to="/order"
                className="w-full sm:w-auto min-h-[48px] sm:min-h-[52px] inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-bold text-white bg-[#355CDE] hover:bg-[#2447B8] active:scale-[0.98] transition-all shadow-sm hover:shadow-md"
              >
                <span>Book Your Custom Website Now</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>

              <Link
                to="/demos"
                className="w-full sm:w-auto min-h-[48px] sm:min-h-[52px] inline-flex items-center justify-center gap-2 px-7 sm:px-9 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-bold text-[#000000] bg-[#F1E8D8] hover:bg-[#E7DDC9] border border-[#E2D7C3] hover:border-[#355CDE] active:scale-[0.98] transition-all shadow-xs"
              >
                <Eye className="w-4 h-4 text-[#355CDE]" />
                <span>Explore Live Demos ({teaserProjects.length} Projects)</span>
              </Link>
            </div>

            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs text-[#3D362E] pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#355CDE] shrink-0" />
              <span>Direct collaboration with developer. Pay on WhatsApp only after you see your website completed, and before it goes live on the browser.</span>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Continuous Smooth Infinite Marquee Ticker */}
      <div className="w-full overflow-hidden bg-[#000000] py-3.5 border-y border-[#E2D7C3]/20 shadow-inner">
        <div className="animate-marquee flex items-center gap-8">
          {[...tickerItems, ...tickerItems].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-2.5 text-xs font-bold text-[#FFF7E8] shrink-0 tracking-wide uppercase">
                <span className="w-6 h-6 rounded-lg bg-[#355CDE] flex items-center justify-center text-white">
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <span dangerouslySetInnerHTML={{ __html: item.label }} />
                <span className="text-[#E2D7C3]/40 mx-2">&bull;</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Core USPs Grid */}
      <FeaturesGrid />

      {/* 3.5 Spatial 3D Device Studio */}
      <SpatialChassis3D />

      {/* 4. Engineering Architecture Benchmark */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#000000] text-white rounded-3xl rounded-tl-md p-5 sm:p-10 border border-[#E2D7C3]/20 space-y-5 sm:space-y-8 relative overflow-hidden shadow-soft">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#355CDE] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                <Code2 className="w-3.5 h-3.5 text-[#355CDE]" />
                <span>Architecture Comparison</span>
              </div>
              <h2 className="text-lg sm:text-3xl font-extrabold text-white leading-snug">
                Bespoke Clean Code vs Bloated Agency Builders
              </h2>
              <p className="text-xs sm:text-sm text-[#FFF7E8]/80 max-w-xl">
                See why businesses switch to THE WEBCRAFT. Handcrafted code without heavy plugins or security holes.
              </p>
            </div>

            {/* Interactive Tab Switcher - Smooth Capsule */}
            <div className="bg-white/10 p-1 rounded-full flex items-center shrink-0 border border-white/10">
              <button
                type="button"
                onClick={() => setComparisonTab('webcraft')}
                className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1.5 sm:gap-2 ${
                  comparisonTab === 'webcraft'
                    ? 'bg-[#355CDE] text-white font-bold shadow-sm'
                    : 'text-[#FFF7E8]/80 hover:text-white'
                }`}
              >
                <span>THE WEBCRAFT</span>
              </button>
              <button
                type="button"
                onClick={() => setComparisonTab('builders')}
                className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1.5 sm:gap-2 ${
                  comparisonTab === 'builders'
                    ? 'bg-neutral-800 text-white'
                    : 'text-[#FFF7E8]/80 hover:text-white'
                }`}
              >
                <span>Template Builders</span>
              </button>
            </div>
          </div>

          {/* Metric Comparison Cards - Architectural Asymmetric Notch Cuts */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tr-sm border-t-2 border-t-[#355CDE] p-3 sm:p-5 space-y-0.5 sm:space-y-1">
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#DDD5CD]/70 block">Average First Paint</span>
              <div className="text-xl sm:text-2xl font-black font-mono">
                {comparisonTab === 'webcraft' ? (
                  <span className="text-emerald-400">0.4s</span>
                ) : (
                  <span className="text-red-400">4.8s</span>
                )}
              </div>
              <span className="text-[9px] sm:text-[10px] text-[#DDD5CD]/60 block">
                {comparisonTab === 'webcraft' ? 'Instant bounce-free load' : 'High mobile bounce rate'}
              </span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm border-t-2 border-t-emerald-400 p-3 sm:p-5 space-y-0.5 sm:space-y-1">
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#DDD5CD]/70 block">Google PageSpeed</span>
              <div className="text-xl sm:text-2xl font-black font-mono">
                {comparisonTab === 'webcraft' ? (
                  <span className="text-emerald-400">99 / 100</span>
                ) : (
                  <span className="text-amber-400">48 / 100</span>
                )}
              </div>
              <span className="text-[9px] sm:text-[10px] text-[#DDD5CD]/60 block">
                {comparisonTab === 'webcraft' ? 'Ranked in Google top tier' : 'Penalized in search SEO'}
              </span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl rounded-br-sm border-t-2 border-t-[#355CDE] p-3 sm:p-5 space-y-0.5 sm:space-y-1">
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#DDD5CD]/70 block">Asset Bundle Size</span>
              <div className="text-xl sm:text-2xl font-black font-mono">
                {comparisonTab === 'webcraft' ? (
                  <span className="text-emerald-400">43 KB</span>
                ) : (
                  <span className="text-red-400">3.8 MB</span>
                )}
              </div>
              <span className="text-[9px] sm:text-[10px] text-[#DDD5CD]/60 block">
                {comparisonTab === 'webcraft' ? 'Zero third-party baggage' : '35+ bulky scripts'}
              </span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-sm border-t-2 border-t-emerald-400 p-3 sm:p-5 space-y-0.5 sm:space-y-1">
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#DDD5CD]/70 block">Backend Database</span>
              <div className="text-xl sm:text-2xl font-black font-mono">
                {comparisonTab === 'webcraft' ? (
                  <span className="text-emerald-400">Real SQLite</span>
                ) : (
                  <span className="text-amber-400">Volatile Form</span>
                )}
              </div>
              <span className="text-[9px] sm:text-[10px] text-[#DDD5CD]/60 block">
                {comparisonTab === 'webcraft' ? 'Trackable order state' : 'Prone to lost inquiries'}
              </span>
            </div>
          </div>

          {/* Engineering Specifications Matrix */}
          <div className="bg-[#111111] rounded-2xl rounded-tr-none border border-white/10 p-4 sm:p-6 overflow-x-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 text-xs">
              <span className="font-mono text-[#FFF7E8]/70 uppercase tracking-wider">
                Production Architecture Specifications
              </span>
              <span className="text-xs font-mono font-bold text-[#355CDE]">
                {comparisonTab === 'webcraft' ? 'Bespoke React 19 + Node.js' : 'Generic CMS Plugin Builder'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl rounded-bl-sm bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-[#FFF7E8]/60 block text-[11px]">Developer Collaboration</span>
                <span className="font-semibold text-white block">
                  {comparisonTab === 'webcraft' ? 'Direct 1-on-1 with Rakshit Patel' : 'Delegated to Junior Interns'}
                </span>
              </div>
              <div className="p-3 rounded-xl rounded-bl-sm bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-[#FFF7E8]/60 block text-[11px]">Source Code Handover</span>
                <span className="font-semibold text-white block">
                  {comparisonTab === 'webcraft' ? '100% Unrestricted IP Ownership' : 'Locked to Monthly Subscriptions'}
                </span>
              </div>
              <div className="p-3 rounded-xl rounded-bl-sm bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-[#FFF7E8]/60 block text-[11px]">Payment Milestone</span>
                <span className="font-semibold text-white block">
                  {comparisonTab === 'webcraft' ? 'Pay on WhatsApp After Demo Approval' : '100% Upfront Online Charge'}
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Category-Filtered Featured Client Demos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-4 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F1E8D8] border border-[#E2D7C3] text-[#000000] text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-1.5 sm:mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#355CDE]" />
              <span>Client Portfolio Demos</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-[#000000] tracking-tight leading-snug">
              Genuine Production Websites Built by Us
            </h2>
            <p className="text-xs sm:text-sm text-[#3D362E] mt-0.5 sm:mt-1 max-w-xl">
              Filter by industry category to test real desktop &amp; mobile live frontends built for actual businesses.
            </p>
          </div>
          <Link
            to="/demos"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#355CDE] hover:bg-[#2447B8] text-white text-xs font-bold transition-all shrink-0 self-start md:self-auto shadow-sm"
          >
            <span>View All {teaserProjects.length} Demos</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </Link>
        </div>

        {/* Category Filter Pills - Capsule Shape */}
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
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#355CDE] text-white border border-[#355CDE] shadow-sm'
                    : 'bg-[#F1E8D8] hover:bg-[#E7DDC9] border border-[#E2D7C3] text-[#000000]'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-white text-[#355CDE] font-bold' : 'bg-[#E2D7C3] text-[#3D362E]'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid - Alternating Architectural Geometric Silhouettes */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredProjects.map((p, idx) => (
            <div 
              key={p.id} 
              className={`${idx >= 4 && !showAllMobileProjects ? 'hidden md:flex' : 'flex'} bg-[#F1E8D8] ${
                idx % 2 === 0
                  ? 'rounded-2xl rounded-tr-[32px] rounded-bl-md'
                  : 'rounded-2xl rounded-tl-[32px] rounded-br-md'
              } border border-[#E2D7C3] overflow-hidden transition-all duration-200 flex-col justify-between group hover:border-[#355CDE] shadow-xs hover:shadow-md`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#E2D7C3]/30">
                <img 
                  src={p.image} 
                  alt={p.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                />
                <span className="absolute top-2.5 left-2.5 bg-[#000000] text-white text-[9px] sm:text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                  {p.badge}
                </span>
              </div>
              <div className="p-3 sm:p-4 space-y-1.5 sm:space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-[#355CDE] uppercase tracking-wider block">{p.category}</span>
                  <h3 className="font-heading font-bold text-xs sm:text-sm text-[#000000] mt-0.5 line-clamp-1 group-hover:text-[#355CDE] transition-colors">{p.title}</h3>
                  <p className="text-[10px] sm:text-xs text-[#3D362E] line-clamp-1 sm:line-clamp-2 mt-0.5 sm:mt-1">{p.tagline}</p>
                </div>
                <div className="pt-2 sm:pt-3 border-t border-[#E2D7C3] flex items-center justify-between text-[10px] sm:text-xs">
                  <span className="font-semibold text-[#3D362E] truncate pr-1">{p.stats}</span>
                  <Link
                    to="/demos"
                    className="text-[#355CDE] font-bold hover:text-[#2447B8] inline-flex items-center gap-0.5 shrink-0"
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
              className="w-full py-2.5 rounded-full border border-[#E2D7C3] bg-[#F1E8D8] text-xs font-bold text-[#000000] hover:border-[#355CDE] active:scale-[0.98] transition-all cursor-pointer"
            >
              {showAllMobileProjects ? 'Show Fewer Projects ▲' : `View All ${filteredProjects.length} Projects ▼`}
            </button>
          </div>
        )}
      </section>

      {/* 6. Interactive 1-Click Homepage Cost Estimator Slider */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F1E8D8] rounded-[32px] rounded-br-lg border border-[#E2D7C3] p-5 sm:p-10 transition-colors shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
            
            {/* Left explanation & slider (7 cols) */}
            <div className="lg:col-span-7 space-y-3 sm:space-y-6">
              <div className="space-y-1 sm:space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF7E8] border border-[#E2D7C3] text-[#000000] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                  <Sliders className="w-3.5 h-3.5 text-[#355CDE]" />
                  <span>Instant Interactive Estimator</span>
                </div>
                <h3 className="text-lg sm:text-3xl font-extrabold text-[#000000] leading-snug">
                  Calculate Your Custom Website Cost in 5 Seconds
                </h3>
                <p className="text-xs sm:text-sm text-[#3D362E]">
                  Move the slider to choose the number of pages. See dynamic pricing and token advance in real time.
                </p>
              </div>

              {/* Range Slider Card - Architectural Asymmetric Notch */}
              <div className="space-y-2 sm:space-y-3 bg-[#FFF7E8] p-4 sm:p-5 rounded-2xl rounded-tr-sm border border-[#E2D7C3] shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] sm:text-xs font-bold text-[#000000] uppercase tracking-wider">
                    Number of Website Pages
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#355CDE] text-white text-xs font-extrabold font-mono shadow-xs">
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
                  className="w-full h-2 sm:h-2.5 bg-[#E2D7C3] rounded-full appearance-none cursor-pointer accent-[#355CDE]"
                />

                <div className="flex justify-between text-[10px] sm:text-[11px] text-[#3D362E] font-semibold">
                  <span>1 Page (Landing)</span>
                  <span>5 Pages (Standard)</span>
                  <span>10+ Pages (Portal)</span>
                </div>
              </div>

              {/* Guarantee highlights */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 text-[11px] sm:text-xs text-[#3D362E]">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#355CDE] shrink-0" />
                  <span>Zero Online Upfront Fee</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#355CDE] shrink-0" />
                  <span>Balance on Live Demo Approval</span>
                </div>
              </div>
            </div>

            {/* Right calculated card (5 cols) - Architectural Cut Shape */}
            <div className="lg:col-span-5 bg-[#000000] text-white p-5 sm:p-8 rounded-3xl rounded-tl-sm space-y-3 sm:space-y-4 shadow-elevated border border-[#E2D7C3]/20">
              <div className="flex items-center justify-between pb-2 sm:pb-3 border-b border-white/10">
                <span className="text-[11px] sm:text-xs font-bold text-[#FFF7E8]/80 uppercase">Final Estimated Price</span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-[#355CDE] border border-white/15">
                  Direct Rate
                </span>
              </div>

              <div className="space-y-0.5 sm:space-y-1">
                <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
                  <span className="text-2xl sm:text-4xl font-black font-mono text-white">
                    ₹{estimatedBudget.toLocaleString('en-IN')}
                  </span>
                  {offer.isOfferActive && (
                    <span className="text-sm line-through text-[#FFF7E8]/60 font-mono">
                      ₹{baseEstimate.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
                {offer.isOfferActive && (
                  <span className="text-[11px] font-bold text-[#355CDE] block">
                    {offer.discountPercent}% OFF Applied
                  </span>
                )}
              </div>

              <div className="bg-white/10 rounded-2xl rounded-br-sm p-3.5 sm:p-4 space-y-1.5 sm:space-y-2 text-xs border border-white/5">
                <div className="flex justify-between">
                  <span className="text-[#FFF7E8]/70 text-[11px] sm:text-xs">Online Payment:</span>
                  <span className="font-bold text-[#355CDE] font-mono text-[11px] sm:text-xs">Zero Online Pay</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#FFF7E8]/70 text-[11px] sm:text-xs">Settlement:</span>
                  <span className="font-bold text-white font-mono text-[11px] sm:text-xs">
                    Pay on WhatsApp before Live Launch
                  </span>
                </div>
              </div>

              <Link
                to={`/order?pages=${estPages}&budget=${estimatedBudget}`}
                className="w-full py-3.5 px-5 rounded-full bg-[#355CDE] hover:bg-[#2447B8] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-sm hover:shadow-md"
              >
                <span>Book This Configuration</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 7. 5-Stage Spatial Isometric Engineering Pipeline */}
      <SpatialIsometricPipeline />

      {/* 8. Unbreakable Cybersecurity & 100% Ad-Free Guarantee */}
      <SecurityShieldSection />

      {/* 9. Client Feedback & Verified Reviews (Mandatory Feedback Policy) */}
      <ReviewsSection />

      {/* 10. Bottom Conversion Callout - Stadium Frame */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#000000] text-[#FFF7E8] rounded-[36px] rounded-tl-xl rounded-br-xl p-6 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center relative overflow-hidden border border-[#E2D7C3]/20 shadow-soft">
          
          <div className="lg:col-span-8 space-y-2 sm:space-y-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#355CDE] text-white text-[11px] sm:text-xs font-bold uppercase shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="font-extrabold">Bespoke Production Slots Open</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white leading-snug">
              Ready to Build Your Custom Website?
            </h2>
            <p className="text-xs sm:text-sm text-[#FFF7E8]/80 leading-relaxed max-w-xl">
              Book your bespoke website development today with zero online payment. Pay on WhatsApp only after you see your website completed, and before it goes live on the browser.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 relative z-10">
            <Link
              to="/order"
              className="py-3.5 px-6 rounded-full bg-[#355CDE] hover:bg-[#2447B8] text-white font-black text-xs uppercase tracking-wider text-center transition-all active:scale-[0.98] shadow-sm hover:shadow-md"
            >
              Order Custom Website
            </Link>
            <Link
              to="/pricing"
              className="py-3.5 px-6 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider text-center transition-all active:scale-[0.98]"
            >
              Calculate Project Cost
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
