import React, { useState } from 'react';
import { 
  Laptop, Smartphone, ShoppingBag, Building2, UtensilsCrossed, 
  HeartPulse, ArrowRight, Star, ExternalLink, Sparkles, CheckCircle2, 
  Maximize2, X, Eye, ShieldCheck, Check, Scissors, Dumbbell, Sparkle, Cpu 
} from 'lucide-react';
import EcommerceClientDemo from './demos/EcommerceClientDemo';
import RealEstateClientDemo from './demos/RealEstateClientDemo';
import RestaurantClientDemo from './demos/RestaurantClientDemo';
import HealthcareClientDemo from './demos/HealthcareClientDemo';
import BeautyParlourDemo from './demos/BeautyParlourDemo';
import HairParlourDemo from './demos/HairParlourDemo';
import GymFitnessDemo from './demos/GymFitnessDemo';
import CustomBuildDemo from './demos/CustomBuildDemo';

export default function DemoShowcase({ onSelectCategoryForOrder }) {
  const [activeProject, setActiveProject] = useState('beautyparlour');
  const [viewMode, setViewMode] = useState('desktop'); // 'desktop' | 'mobile'
  const [isFullScreen, setIsFullScreen] = useState(false);

  const clientProjects = [
    {
      id: 'beautyparlour',
      name: 'Glamour & Glow Bridal & Beauty Studio',
      client: 'Glamour & Glow Studio',
      location: 'Drive-In, Ahmedabad',
      category: 'Beauty Parlour & Bridal Studio',
      tagline: 'Luxury bridal airbrush packages, pre-bridal skincare, hair spa, and instant appointment booking.',
      stats: { rating: '5.0 ★ (1.2k Reviews)', artists: 'Certified Artists', booking: 'Instant WhatsApp' },
      icon: Sparkles,
      accentColor: '#7D4047',
    },
    {
      id: 'hairparlour',
      name: 'The Urban Gentleman - Barbershop Lounge',
      client: 'The Urban Gentleman Co.',
      location: 'Vastrapur, Ahmedabad',
      category: 'Men Hair Parlour & Barber Lounge',
      tagline: 'Precision taper fades, straight razor beard sculpting, charcoal facials, and barber chair scheduling.',
      stats: { rating: '4.9 ★ (850 Reviews)', chairs: 'Master Barbers', vibe: 'Executive Lounge' },
      icon: Scissors,
      accentColor: '#2E2E2E',
    },
    {
      id: 'restaurant',
      name: 'The Saffron Courtyard - Heritage Dining',
      client: 'Saffron Hospitality Group',
      location: 'Sindhu Bhavan, Ahmedabad',
      category: 'Restaurant & Table Booking',
      tagline: 'Royal Awadhi restaurant with live online table reservation engine, a la carte menu, and customer accolades.',
      stats: { rating: '4.9 ★ (3.4k Reviews)', tables: 'Zero Wait', award: 'Times Food 2025' },
      icon: UtensilsCrossed,
      accentColor: '#7D4047',
    },
    {
      id: 'gym',
      name: 'IronCore Elite Fitness & CrossFit Arena',
      client: 'IronCore Arena Pvt Ltd',
      location: 'Prahladnagar, Ahmedabad',
      category: 'Gym & Fitness Center',
      tagline: '15,000 sq.ft arena with Rogue equipment, CrossFit conditioning, membership tiers, and free trial pass claim.',
      stats: { rating: '4.9 ★', trainers: 'ACE Certified', facility: '15,000 Sq.Ft' },
      icon: Dumbbell,
      accentColor: '#7D4047',
    },
    {
      id: 'ecommerce',
      name: 'Zahra Luxury Silk & Ethnic Couture',
      client: 'Zahra Fashion Studio',
      location: 'Ahmedabad & Mumbai',
      category: 'D2C E-Commerce Store',
      tagline: 'High-converting apparel store with live bag drawer, size selector, coupon codes, and customer reviews.',
      stats: { speed: '0.6s Load', sales: '+54% Orders', rating: '5.0 ★' },
      icon: ShoppingBag,
      accentColor: '#7D4047',
    },
    {
      id: 'realestate',
      name: 'Shikhar Skyline Riverfront Residences',
      client: 'Shikhar Infra Group',
      location: 'SG Highway, Ahmedabad',
      category: 'Real Estate & Infrastructure',
      tagline: 'Luxury 3 & 4 BHK sky-living portal with interactive floorplans, RERA badges, and VIP site visit scheduler.',
      stats: { rera: 'RERA Approved', rating: '4.9 ★', type: '3 & 4 BHK' },
      icon: Building2,
      accentColor: '#1C1C1C',
    },
    {
      id: 'healthcare',
      name: 'Dr. Mehta Dental Aesthetics & Implant Center',
      client: 'Dr. Harshil Mehta (MDS)',
      location: 'Satellite & Navrangpura',
      category: 'Healthcare & Clinic',
      tagline: 'NABH-accredited modern clinic platform with instant patient consultation appointment booking and credentials.',
      stats: { rating: '4.9 ★ (1.8k Reviews)', exp: '16+ Years', patients: '15,000+ Treated' },
      icon: HeartPulse,
      accentColor: '#1e3a5f',
    },
    {
      id: 'custombuild',
      name: 'NexFlow Systems - Custom Architecture & Bespoke Portal',
      client: 'NexFlow Enterprise Solutions',
      location: 'SG Highway & Prahladnagar, Ahmedabad',
      category: 'Custom Build Website & Bespoke Architecture',
      tagline: 'Handwritten React + Node architecture, live telemetry dashboard, automated API webhooks, and custom business workflows.',
      stats: { speed: '0.4s Response', code: 'Handcrafted Clean Code', rating: '5.0 ★' },
      icon: Cpu,
      accentColor: '#2E2E2E',
    },
  ];

  const currentProject = clientProjects.find(p => p.id === activeProject) || clientProjects[0];

  const handleOrderThisDesign = (projectId) => {
    // Map project ID to form category
    const categoryMap = {
      beautyparlour: 'beautyparlour',
      hairparlour: 'hairparlour',
      restaurant: 'restaurant',
      gym: 'gym',
      ecommerce: 'ecommerce',
      realestate: 'corporate',
      healthcare: 'corporate',
      custombuild: 'custombuild',
    };
    onSelectCategoryForOrder(categoryMap[projectId] || 'custombuild');
    if (isFullScreen) setIsFullScreen(false);
    const formElement = document.querySelector('#order-form');
    if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
  };

  const isMobile = viewMode === 'mobile';

  const renderActiveDemoContent = () => {
    switch (activeProject) {
      case 'beautyparlour':
        return <BeautyParlourDemo onOrderDesign={() => handleOrderThisDesign('beautyparlour')} isMobileView={isMobile} />;
      case 'hairparlour':
        return <HairParlourDemo onOrderDesign={() => handleOrderThisDesign('hairparlour')} isMobileView={isMobile} />;
      case 'restaurant':
        return <RestaurantClientDemo onOrderDesign={() => handleOrderThisDesign('restaurant')} isMobileView={isMobile} />;
      case 'gym':
        return <GymFitnessDemo onOrderDesign={() => handleOrderThisDesign('gym')} isMobileView={isMobile} />;
      case 'ecommerce':
        return <EcommerceClientDemo onOrderDesign={() => handleOrderThisDesign('ecommerce')} isMobileView={isMobile} />;
      case 'realestate':
        return <RealEstateClientDemo onOrderDesign={() => handleOrderThisDesign('realestate')} isMobileView={isMobile} />;
      case 'healthcare':
        return <HealthcareClientDemo onOrderDesign={() => handleOrderThisDesign('healthcare')} isMobileView={isMobile} />;
      case 'custombuild':
        return <CustomBuildDemo onOrderDesign={() => handleOrderThisDesign('custombuild')} isMobileView={isMobile} />;
      default:
        return <BeautyParlourDemo onOrderDesign={() => handleOrderThisDesign('beautyparlour')} isMobileView={isMobile} />;
    }
  };

  return (
    <section id="demos" className="py-12 sm:py-20 bg-[#F1ECE6] border-t border-[#DDD5CD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#DDD5CD]/60 border border-[#DDD5CD] text-[#7D4047] text-xs font-bold uppercase tracking-wider max-w-full">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Interactive Production Frontends ({clientProjects.length} Live Projects)</span>
          </div>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-[#2E2E2E] tracking-tight px-2 leading-snug">
            Industry Website Demos Built by THE WEBCRAFT
          </h2>
          <p className="text-xs sm:text-sm text-[#625f5c]">
            Real, commercial-grade websites for <strong>Beauty Parlours, Hair Salons, Restaurants, Gyms, E-Commerce, Real Estate, Healthcare, and Custom Portals ({clientProjects.length} Total)</strong>. Test their desktop and mobile view below.
          </p>
        </div>

        {/* Project Selector Chips / Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3.5 mb-6">
          {clientProjects.map((proj) => {
            const isSelected = activeProject === proj.id;
            const Icon = proj.icon;

            return (
              <div
                key={proj.id}
                onClick={() => setActiveProject(proj.id)}
                className={`p-3.5 sm:p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col justify-between hover-glow-card relative overflow-hidden group ${
                  isSelected
                    ? 'border-[#7D4047] bg-white shadow-elevated scale-[1.02] ring-2 ring-[#7D4047]/20'
                    : 'border-[#DDD5CD] bg-white/75 hover:bg-white hover:border-[#7D4047]/40 shadow-soft'
                }`}
              >
                {/* Active indicator bar */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#7D4047]" />
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold transition-transform group-hover:scale-110 duration-200 ${
                      isSelected ? 'bg-[#7D4047] text-white shadow-wine' : 'bg-[#7D4047]/10 text-[#7D4047]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {isSelected ? (
                      <span className="text-[10px] font-bold text-white bg-[#7D4047] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                        <Check className="w-2.5 h-2.5" />
                        <span>Previewing</span>
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#625f5c] font-semibold bg-[#DDD5CD]/40 px-2 py-0.5 rounded-md">
                        {proj.location.split(',')[0]}
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-bold text-[#7D4047] uppercase tracking-wider block truncate">
                    {proj.category}
                  </span>
                  <h3 className="font-heading font-extrabold text-xs sm:text-sm text-[#2E2E2E] mt-0.5 line-clamp-1 group-hover:text-[#7D4047] transition-colors">
                    {proj.name}
                  </h3>
                </div>

                <div className="pt-2.5 border-t border-[#DDD5CD]/60 mt-2.5 flex items-center justify-between text-[11px]">
                  <span className="text-[#625f5c] font-semibold">{Object.values(proj.stats)[0]}</span>
                  <span className="text-[#7D4047] font-bold inline-flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Control Bar: Viewport Switcher & Fullscreen Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 bg-white p-3 rounded-2xl border border-[#DDD5CD] shadow-soft">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-[#2E2E2E]">
              Selected: <strong>{currentProject.name}</strong> ({currentProject.category})
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Viewport switch */}
            <div className="flex items-center bg-[#F1ECE6] p-1 rounded-xl border border-[#DDD5CD]">
              <button
                onClick={() => setViewMode('desktop')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'desktop' ? 'bg-[#2E2E2E] text-white shadow-sm' : 'text-[#625f5c] hover:text-[#2E2E2E]'
                }`}
              >
                <Laptop className="w-3.5 h-3.5" />
                <span>Desktop</span>
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'mobile' ? 'bg-[#2E2E2E] text-white shadow-sm' : 'text-[#625f5c] hover:text-[#2E2E2E]'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile (390px)</span>
              </button>
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={() => setIsFullScreen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#2E2E2E] hover:bg-[#111] text-white text-xs font-bold shadow-sm"
              title="Open full immersive view"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Fullscreen</span>
            </button>

            {/* Direct Order Button */}
            <button
              onClick={() => handleOrderThisDesign(activeProject)}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-[#7D4047] hover:bg-[#67333a] text-white text-xs font-bold shadow-wine"
            >
              <span>Order This Design</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Embedded Interactive Viewer Frame */}
        <div className="flex justify-center transition-all">
          <div 
            className={`transition-all duration-300 w-full ${
              viewMode === 'mobile'
                ? 'max-w-[400px] rounded-[44px] border-[10px] border-[#2E2E2E] shadow-2xl p-2 bg-[#2E2E2E]'
                : 'max-w-full rounded-2xl border-2 border-[#DDD5CD] shadow-elevated bg-white overflow-hidden'
            }`}
          >
            {/* Desktop Browser Bar */}
            {viewMode === 'desktop' && (
              <div className="bg-[#2E2E2E] text-white px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-[11px] font-mono text-neutral-400 ml-2">
                    https://{activeProject}.thewebcraft.com
                  </span>
                </div>
                <span className="text-[11px] font-bold text-amber-300">
                  Fully Interactive Client Website
                </span>
              </div>
            )}

            {/* Mobile Speaker Notch */}
            {viewMode === 'mobile' && (
              <div className="w-24 h-3 bg-[#111] mx-auto rounded-b-xl mb-1.5 flex items-center justify-center">
                <div className="w-8 h-1 bg-[#333] rounded-full" />
              </div>
            )}

            {/* Scrollable Website Body */}
            <div className={`overflow-y-auto ${viewMode === 'mobile' ? 'max-h-[660px] rounded-[28px] bg-white' : 'max-h-[720px]'}`}>
              {renderActiveDemoContent()}
            </div>
          </div>
        </div>

      </div>

      {/* FULLSCREEN IMMERSIVE DEMO MODAL */}
      {isFullScreen && (
        <div className="fixed inset-0 z-50 bg-[#2E2E2E] text-white flex flex-col overflow-hidden animate-in fade-in duration-200">
          {/* Top Control Bar */}
          <div className="bg-[#1C1C1C] border-b border-neutral-700 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <span className="font-heading font-extrabold text-sm text-white block">
                  {currentProject.name}
                </span>
                <span className="text-[10px] text-neutral-400">
                  Live Client Portfolio &bull; Built by <strong>THE WEBCRAFT</strong>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => handleOrderThisDesign(activeProject)}
                className="px-4 py-2 rounded-xl bg-[#7D4047] hover:bg-[#67333a] text-white text-xs font-bold uppercase tracking-wider shadow-wine flex items-center gap-1.5"
              >
                <span>Order This Design</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsFullScreen(false)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Exit Fullscreen"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Fullscreen Content */}
          <div className="flex-1 overflow-y-auto bg-white text-[#2E2E2E]">
            {renderActiveDemoContent()}
          </div>
        </div>
      )}

    </section>
  );
}
