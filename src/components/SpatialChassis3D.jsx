import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Laptop, ExternalLink, Check, Sparkles, 
  ArrowRight, ShieldCheck, Zap, Phone, Calendar, Star, Building2, Dumbbell, ShoppingBag
} from 'lucide-react';

/**
 * SpatialChassis3D
 * An interactive 3D perspective device stage showcasing live industry editions.
 * Built with CSS 3D matrix transforms, tactile tab switching, and WCAG AAA compliance.
 */
export default function SpatialChassis3D() {
  const [activeTab, setActiveTab] = useState('salon');
  const chassisRef = useRef(null);

  const demoTiers = {
    salon: {
      id: 'salon',
      badge: 'Luxury Bridal & Spa Edition',
      badgeColor: 'bg-[#7D4047]/10 text-[#7D4047] border-[#7D4047]/20',
      title: 'Glamour & Glow Bridal Studio',
      rating: '5.0 Rating • 1,200+ Brides',
      desc: 'Engineered with tactile booking slots, zero-friction WhatsApp appointment confirmation, high-contrast typography, and curated warm organic tones.',
      link: '/demos',
      highlights: [
        { label: 'Integrated WhatsApp Flow', note: '1-tap appointment routing' },
        { label: 'Interactive Rate Card', note: 'Filterable bridal treatments' },
        { label: 'Google Local Geotag', note: 'Local SEO schema injected' }
      ],
      metric: '3.4x Booking Lift in 14 Days'
    },
    realty: {
      id: 'realty',
      badge: 'Elite Real Estate Edition',
      badgeColor: 'bg-[#355CDE]/10 text-[#355CDE] border-[#355CDE]/20',
      title: 'Shikhar Skyline Luxury Residences',
      rating: 'RERA Approved • 4.9 Rating',
      desc: 'Equipped with high-resolution floorplan viewports, direct brochure download capture, interactive EMI calculator, and automated lead routing.',
      link: '/demos',
      highlights: [
        { label: 'Interactive 3D Floorplan', note: 'Spatial unit inspection' },
        { label: 'Brochure Lead Wall', note: 'Direct WhatsApp verification' },
        { label: 'VIP Site Visit Scheduler', note: 'Calendar slot integration' }
      ],
      metric: '42 Qualified Inquiries / Month'
    },
    gym: {
      id: 'gym',
      badge: 'Fitness & Athletic Arena',
      badgeColor: 'bg-emerald-700/10 text-emerald-800 border-emerald-700/20',
      title: 'IronCore Elite Fitness & CrossFit',
      rating: '15,000 Sq.Ft • 4.9 Rating',
      desc: 'High-octane typographic hierarchy, instant free trial pass download, trainer schedule calendar, and localized membership pricing tables.',
      link: '/demos',
      highlights: [
        { label: '1-Day Free Pass Claim', note: 'Instant WhatsApp pass issuance' },
        { label: 'Live Class Schedule', note: 'Dynamic daily timetable' },
        { label: 'Trainer Transformation Deck', note: 'Tactile proof slider' }
      ],
      metric: '68 New Walk-in Leads in 30 Days'
    },
    commerce: {
      id: 'commerce',
      badge: 'D2C High-Conversion E-Store',
      badgeColor: 'bg-amber-800/10 text-amber-900 border-amber-800/20',
      title: 'Zahra Luxury Silk & Ethnic Couture',
      rating: '0.4s Fast Load • 5.0 Rating',
      desc: 'Ultra-fast headless checkout simulator, product zoom matrix, dynamic cart sidebar, and instant UPI QR integration without paying third-party fees.',
      link: '/demos',
      highlights: [
        { label: 'Zero-Fee Direct UPI QR', note: 'Direct merchant settlement' },
        { label: 'Instant Slide-Over Bag', note: 'Zero page reload latency' },
        { label: 'Size & Stock Matrix', note: 'Instant variant selection' }
      ],
      metric: '₹1.8L Direct UPI Volume in M1'
    }
  };

  const current = demoTiers[activeTab];

  const handleMouseMove = (e) => {
    const el = chassisRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -6;
    const rotY = ((x - centerX) / centerX) * 6;
    el.style.transform = `perspective(1200px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handleMouseLeave = () => {
    const el = chassisRef.current;
    if (!el) return;
    el.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <section className="relative py-12 sm:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        
        {/* Header Header & Pitch */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7D4047]/10 border border-[#7D4047]/20 text-[#7D4047] text-[11px] font-bold tracking-widest uppercase">
              <Laptop className="w-3.5 h-3.5" />
              <span>Interactive 3D Device Studio</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#111111] tracking-tight">
              Tactile Precision Engineered for Every Industry
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#5A534A] max-w-md leading-relaxed">
            Switch between our custom live staging architectures. Every edition is built with zero bloatware and optimized for instant client conversions.
          </p>
        </div>

        {/* 3D Chassis Stage Container */}
        <div style={{ perspective: '1200px' }}>
          <div
            ref={chassisRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transformStyle: 'preserve-3d',
              transition: 'transform 0.22s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.22s ease'
            }}
            className="bg-white/90 backdrop-blur-xl border border-[#E5DDCF] rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-2xl shadow-[#7D4047]/10"
          >
            
            {/* Window Browser Titlebar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[#E5DDCF]/80">
              
              {/* OS Dots & Active Domain */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#E57373]" />
                  <span className="w-3 h-3 rounded-full bg-[#FFB74D]" />
                  <span className="w-3 h-3 rounded-full bg-[#81C784]" />
                </div>
                <span className="ml-3 text-xs font-mono font-medium text-[#5A534A] hidden sm:inline">
                  https://the-web-craft.onrender.com/demos/{current.id}
                </span>
              </div>

              {/* Interactive Industry Tab Switcher */}
              <div className="flex flex-wrap items-center gap-1.5 bg-[#F1E8D8] p-1 rounded-xl border border-[#E2D7C3] text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setActiveTab('salon')}
                  className={`px-3 py-1.5 rounded-lg transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-[#7D4047] focus-visible:outline-none ${
                    activeTab === 'salon'
                      ? 'bg-white text-[#111111] shadow-xs'
                      : 'text-[#5A534A] hover:text-[#111111]'
                  }`}
                >
                  Salon & Spa
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('realty')}
                  className={`px-3 py-1.5 rounded-lg transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-[#7D4047] focus-visible:outline-none ${
                    activeTab === 'realty'
                      ? 'bg-white text-[#111111] shadow-xs'
                      : 'text-[#5A534A] hover:text-[#111111]'
                  }`}
                >
                  Real Estate
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('gym')}
                  className={`px-3 py-1.5 rounded-lg transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-[#7D4047] focus-visible:outline-none ${
                    activeTab === 'gym'
                      ? 'bg-white text-[#111111] shadow-xs'
                      : 'text-[#5A534A] hover:text-[#111111]'
                  }`}
                >
                  Fitness Club
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('commerce')}
                  className={`px-3 py-1.5 rounded-lg transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-[#7D4047] focus-visible:outline-none ${
                    activeTab === 'commerce'
                      ? 'bg-white text-[#111111] shadow-xs'
                      : 'text-[#5A534A] hover:text-[#111111]'
                  }`}
                >
                  E-Commerce
                </button>
              </div>

            </div>

            {/* Viewport Screen Content */}
            <div className="bg-[#FAF6EF] rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-[#E5DDCF] flex flex-col justify-between gap-6 transition-all duration-300">
              
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider border ${current.badgeColor}`}>
                    {current.badge}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#5A534A] font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                    <span>{current.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-3xl font-black text-[#111111] tracking-tight">
                  {current.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#5A534A] max-w-2xl leading-relaxed">
                  {current.desc}
                </p>

                {/* Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {current.highlights.map((h, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-white border border-[#E5DDCF] shadow-2xs">
                      <div className="text-xs font-bold text-[#111111]">{h.label}</div>
                      <div className="text-[11px] text-[#5A534A] mt-0.5">{h.note}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Bar inside Mockup */}
              <div className="pt-6 border-t border-[#E5DDCF] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs font-mono text-[#5A534A]">
                  Verified ROI: <strong className="text-[#111111] font-bold">{current.metric}</strong>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    to={current.link}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7D4047] hover:bg-[#683238] text-white text-xs font-bold tracking-wide shadow-sm hover:shadow-md transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-[#7D4047] focus-visible:outline-none"
                  >
                    <span>Launch Live Interactive Demo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
