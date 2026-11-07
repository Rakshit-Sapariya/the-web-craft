import React, { useState, useEffect, useRef } from 'react';
import { 
  Laptop, Smartphone, ShoppingBag, Building2, UtensilsCrossed, 
  HeartPulse, ArrowRight, Star, ExternalLink, CheckCircle2, 
  Maximize2, X, Eye, ShieldCheck, Check, Scissors, Dumbbell, Cpu 
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
  const [activeProject, setActiveProject] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search).get('project');
      if (p) return p;
    }
    return 'beautyparlour';
  });
  const [isLoadingDemo, setIsLoadingDemo] = useState(false);
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const m = new URLSearchParams(window.location.search).get('mode');
      if (m === 'mobile') return 'mobile';
    }
    return 'desktop';
  }); // 'desktop' | 'mobile'
  const [isFullScreen, setIsFullScreen] = useState(false);
  const demoScrollRef = useRef(null);

  const handleSwitchProject = (id) => {
    if (id === activeProject) return;
    setIsLoadingDemo(true);
    setActiveProject(id);
    setTimeout(() => {
      setIsLoadingDemo(false);
    }, 200);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const s = new URLSearchParams(window.location.search).get('scroll');
      if (s && demoScrollRef.current) {
        demoScrollRef.current.scrollTop = parseInt(s, 10);
      }
    }
    if (typeof window !== 'undefined' && window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        el.scrollIntoView();
      } else {
        const timer = setTimeout(() => {
          const e = document.querySelector(window.location.hash);
          if (e) e.scrollIntoView();
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [activeProject, viewMode]);

  const clientProjects = [
    {
      id: 'beautyparlour',
      name: 'Glamour & Glow Bridal & Beauty Studio',
      client: 'Glamour & Glow Studio',
      location: 'Drive-In, Ahmedabad',
      category: 'Beauty Parlour & Bridal Studio',
      tagline: 'Luxury bridal airbrush packages, pre-bridal skincare, private suite experience, and bride testimonials.',
      stats: { rating: '5.0 (1.2k Reviews)', artists: 'Certified Artists', booking: 'Concierge Desk' },
      icon: Star,
      accentColor: '#355CDE',
    },
    {
      id: 'hairparlour',
      name: 'The Urban Gentleman - Barbershop Lounge',
      client: 'The Urban Gentleman Co.',
      location: 'Vastrapur, Ahmedabad',
      category: 'Men Hair Parlour & Barber Lounge',
      tagline: 'Precision taper fades, straight razor beard sculpting, cold brew lounge, and master barber roster.',
      stats: { rating: '4.9 (850 Reviews)', chairs: 'Master Barbers', vibe: 'Executive Lounge' },
      icon: Scissors,
      accentColor: '#000000',
    },
    {
      id: 'restaurant',
      name: 'The Saffron Courtyard - Heritage Dining',
      client: 'Saffron Hospitality Group',
      location: 'Sindhu Bhavan, Ahmedabad',
      category: 'Restaurant & Table Booking',
      tagline: 'Royal Awadhi dining with curated dining spaces, interactive a la carte menu, and table concierge.',
      stats: { rating: '4.9 (3.4k Reviews)', tables: 'Fine Dining', award: 'Times Food 2025' },
      icon: UtensilsCrossed,
      accentColor: '#000000',
    },
    {
      id: 'gym',
      name: 'IronCore Elite Fitness & CrossFit Arena',
      client: 'IronCore Arena Pvt Ltd',
      location: 'Prahladnagar, Ahmedabad',
      category: 'Gym & Fitness Center',
      tagline: '12,000 sq.ft strength arena with Eleiko lifting zones, Finnish sauna, cold plunge, and athlete testimonials.',
      stats: { rating: '4.9 Rating', trainers: 'ACE Certified', facility: '12,000 Sq.Ft' },
      icon: Dumbbell,
      accentColor: '#000000',
    },
    {
      id: 'ecommerce',
      name: 'Zahra Luxury Silk & Ethnic Couture',
      client: 'Zahra Fashion Studio',
      location: 'Ahmedabad & Mumbai',
      category: 'D2C E-Commerce Store',
      tagline: 'High-converting apparel store with live bag drawer, size selector, coupon codes, and customer reviews.',
      stats: { speed: '0.6s Load', sales: '+54% Orders', rating: '5.0 Rating' },
      icon: ShoppingBag,
      accentColor: '#355CDE',
    },
    {
      id: 'realestate',
      name: 'Shikhar Skyline Riverfront Residences',
      client: 'Shikhar Infra Group',
      location: 'SG Highway, Ahmedabad',
      category: 'Real Estate & Infrastructure',
      tagline: 'Luxury 3 & 4 BHK sky-living portal with interactive floorplans, RERA badges, and architectural specifications.',
      stats: { rera: 'RERA Approved', rating: '4.9 Rating', type: '3 & 4 BHK' },
      icon: Building2,
      accentColor: '#1C1C1C',
    },
    {
      id: 'healthcare',
      name: 'Dr. Mehta Dental Aesthetics & Implant Center',
      client: 'Dr. Harshil Mehta (MDS)',
      location: 'Satellite & Navrangpura',
      category: 'Healthcare & Clinic',
      tagline: 'NABH-accredited modern clinic platform with German 3D CBCT imaging, painless wand anesthesia, and clinical standards.',
      stats: { rating: '4.9 (1.8k Reviews)', exp: '16+ Years', patients: '15,000+ Treated' },
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
      stats: { speed: '0.4s Response', code: 'Handcrafted Clean Code', rating: '5.0 Rating' },
      icon: Cpu,
      accentColor: '#000000',
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
    <section id="demos" className="py-12 sm:py-20 bg-[#FFF7E8] border-t border-[#E2D7C3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#F1E8D8] border border-[#E2D7C3] text-[#355CDE] text-xs font-bold uppercase tracking-wider max-w-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#355CDE]" />
            <span className="truncate">Interactive Production Frontends ({clientProjects.length} Live Projects)</span>
          </div>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-[#000000] tracking-tight px-2 leading-snug">
            Industry Website Demos Built by THE WEBCRAFT
          </h2>
          <p className="text-xs sm:text-sm text-[#3D362E]">
            Real, commercial-grade websites for <strong>Beauty Parlours, Hair Salons, Restaurants, Gyms, E-Commerce, Real Estate, Healthcare, and Custom Portals ({clientProjects.length} Total)</strong>. Test their desktop and mobile view below.
          </p>
        </div>

        {/* Project Selector Chips - Alternating Architectural Notch Geometry */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3.5 mb-6">
          {clientProjects.map((proj, idx) => {
            const isSelected = activeProject === proj.id;
            const Icon = proj.icon;
            const shapeClass = isSelected
              ? 'rounded-2xl rounded-tr-md'
              : idx % 2 === 0
              ? 'rounded-xl rounded-tr-[24px]'
              : 'rounded-xl rounded-tl-[24px]';

            return (
              <div
                key={proj.id}
                onClick={() => handleSwitchProject(proj.id)}
                className={`p-3.5 sm:p-4 ${shapeClass} border cursor-pointer transition-all duration-200 flex flex-col justify-between relative overflow-hidden group shadow-xs hover:shadow-md ${
                  isSelected
                    ? 'border-[#355CDE] bg-[#F1E8D8] ring-2 ring-[#355CDE]/30'
                    : 'border-[#E2D7C3] bg-[#F1E8D8]/60 hover:bg-[#F1E8D8] hover:border-[#355CDE]/60'
                }`}
              >
                {/* Active indicator bar */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#355CDE]" />
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
                      isSelected ? 'bg-[#355CDE] text-white' : 'bg-[#355CDE]/10 text-[#355CDE]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {isSelected ? (
                      <span className="text-[10px] font-bold text-white bg-[#355CDE] px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                        <Check className="w-2.5 h-2.5" />
                        <span>Previewing</span>
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#3D362E] font-semibold bg-[#E2D7C3]/50 px-2.5 py-0.5 rounded-full">
                        {proj.location.split(',')[0]}
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-bold text-[#355CDE] uppercase tracking-wider block truncate">
                    {proj.category}
                  </span>
                  <h3 className="font-heading font-extrabold text-xs sm:text-sm text-[#000000] mt-0.5 line-clamp-1 group-hover:text-[#355CDE] transition-colors">
                    {proj.name}
                  </h3>
                </div>

                <div className="pt-2.5 border-t border-[#E2D7C3]/80 mt-2.5 flex items-center justify-between text-[11px]">
                  <span className="text-[#3D362E] font-semibold">{Object.values(proj.stats)[0]}</span>
                  <span className="text-[#355CDE] font-bold inline-flex items-center gap-0.5">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Control Bar: Viewport Switcher & Fullscreen Button - Stadium Capsule */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 bg-[#F1E8D8] p-3 sm:px-5 sm:py-3 rounded-2xl sm:rounded-full border border-[#E2D7C3] shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold text-[#000000]">
              Selected: <strong>{currentProject.name}</strong> ({currentProject.category})
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Viewport switch */}
            <div className="flex items-center bg-[#FFF7E8] p-1 rounded-full border border-[#E2D7C3]">
              <button
                onClick={() => setViewMode('desktop')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold transition-all ${
                  viewMode === 'desktop' ? 'bg-[#000000] text-white shadow-xs' : 'text-[#3D362E] hover:text-[#000000]'
                }`}
              >
                <Laptop className="w-3.5 h-3.5" />
                <span>Desktop</span>
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold transition-all ${
                  viewMode === 'mobile' ? 'bg-[#000000] text-white shadow-xs' : 'text-[#3D362E] hover:text-[#000000]'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile (390px)</span>
              </button>
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={() => setIsFullScreen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#000000] hover:bg-neutral-800 text-white text-xs font-bold transition-all shadow-xs"
              title="Open full immersive view"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Fullscreen</span>
            </button>

            {/* Direct Order Button */}
            <button
              onClick={() => handleOrderThisDesign(activeProject)}
              className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-[#355CDE] hover:bg-[#2447B8] active:scale-[0.98] text-white text-xs font-bold transition-all shadow-xs"
            >
              <span>Order This Design</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>

        {/* Embedded Interactive Viewer Frame */}
        <div className="flex justify-center transition-all">
          <div 
            className={`transition-all duration-300 w-full ${
              viewMode === 'mobile'
                ? 'max-w-[400px] rounded-[36px] border-[8px] border-[#000000] p-2 bg-[#000000]'
                : 'max-w-full rounded-xl border border-[#E2D7C3] bg-white overflow-hidden'
            }`}
          >
            {/* Desktop Browser Bar (Clean semantic URL bar without fake Mac dots) */}
            {viewMode === 'desktop' && (
              <div className="bg-[#000000] text-white px-4 py-2 flex items-center justify-between text-xs border-b border-neutral-800">
                <div className="flex items-center gap-2 flex-1 max-w-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <div className="bg-white/10 px-3 py-1 rounded text-[11px] font-mono text-neutral-300 w-full truncate">
                    https://thewebcraft.com/demos/{activeProject}
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#355CDE] pl-2">
                  Interactive Live Client Demo
                </span>
              </div>
            )}

            {/* Mobile Speaker Notch */}
            {viewMode === 'mobile' && (
              <div className="w-20 h-2.5 bg-[#111] mx-auto rounded-b-md mb-1.5 flex items-center justify-center">
                <div className="w-6 h-1 bg-[#333] rounded-full" />
              </div>
            )}

            {/* Scrollable Website Body with Skeleton Loader State */}
            <div 
              ref={demoScrollRef}
              className={`overflow-y-auto ${viewMode === 'mobile' ? 'max-h-[660px] rounded-[24px] bg-white' : 'max-h-[720px]'}`}
            >
              {isLoadingDemo ? (
                <div className="p-6 space-y-4 animate-pulse bg-white min-h-[400px]">
                  <div className="h-44 bg-[#E2D7C3]/30 rounded-lg w-full flex items-center justify-center text-xs text-[#3D362E] font-mono">
                    Loading {currentProject.name} demo architecture...
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="h-6 bg-[#E2D7C3]/50 rounded w-1/3" />
                    <div className="h-4 bg-[#E2D7C3]/30 rounded w-2/3" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="h-32 bg-[#E2D7C3]/30 rounded-lg" />
                    <div className="h-32 bg-[#E2D7C3]/30 rounded-lg" />
                  </div>
                </div>
              ) : (
                renderActiveDemoContent()
              )}
            </div>
          </div>
        </div>

      </div>

      {/* FULLSCREEN IMMERSIVE DEMO MODAL */}
      {isFullScreen && (
        <div className="fixed inset-0 z-50 bg-[#000000] text-white flex flex-col overflow-hidden animate-in fade-in duration-200">
          {/* Top Control Bar */}
          <div className="bg-[#000000] border-b border-neutral-800 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 shrink-0">
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
                className="px-4 py-2 rounded-xl bg-[#355CDE] hover:bg-[#2447B8] active:scale-[0.98] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
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
          <div className="flex-1 overflow-y-auto bg-white text-[#000000]">
            {renderActiveDemoContent()}
          </div>
        </div>
      )}

    </section>
  );
}
