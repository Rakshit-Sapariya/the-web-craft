import React, { useState } from 'react';
import { 
  Building2, MapPin, Phone, Calendar, Download, Check, 
  ShieldCheck, ArrowRight, Compass, Sparkles, CheckCircle2 
} from 'lucide-react';

export default function RealEstateClientDemo({ onOrderDesign, isMobileView }) {
  const [selectedPlan, setSelectedPlan] = useState('3bhk');

  const floorPlans = {
    '3bhk': {
      title: '3 BHK Royal Residence',
      superArea: '2,180 Sq. Ft.',
      carpetArea: '1,420 Sq. Ft.',
      balconies: '2 Private Deck Balconies',
      facing: 'Riverfront & Garden Facing',
      price: '₹1.42 Cr*',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    },
    '4bhk': {
      title: '4 BHK Imperial Sky Suite',
      superArea: '3,250 Sq. Ft.',
      carpetArea: '2,150 Sq. Ft.',
      balconies: '3 Wraparound Panoramic Decks',
      facing: 'Unobstructed Sunset & River View',
      price: '₹2.15 Cr*',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
    },
    '5bhk': {
      title: '5 BHK Duplex Penthouse',
      superArea: '5,100 Sq. Ft.',
      carpetArea: '3,600 Sq. Ft.',
      balconies: 'Private Terrace with Plunge Pool',
      facing: '360° Sky Cityscape',
      price: '₹3.85 Cr*',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
    }
  };

  const activePlanData = floorPlans[selectedPlan];

  return (
    <div className="bg-[#FAF9F6] text-[#222] font-sans antialiased min-h-screen">
      
      {/* 1. RERA & Contact Top Bar */}
      <div className="bg-[#1C1C1C] text-white text-[10px] sm:text-[11px] py-1.5 px-3 flex flex-col sm:flex-row items-center justify-between gap-1 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <span className="font-mono text-amber-400 font-bold">RERA NO: PR/GJ/AHM/CITY/MAA08920/120224</span>
        </div>
        <div className="flex items-center gap-2 text-neutral-300">
          <span className="flex items-center gap-1 font-bold text-white">
            <Phone className="w-3 h-3 text-amber-400" />
            <span>Sales: +91 98250 99884</span>
          </span>
        </div>
      </div>

      {/* 2. Real Estate Nav */}
      <header className="bg-white/95 backdrop-blur-md border-b border-[#DDD5CD] sticky top-0 z-20 px-3 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#2E2E2E] text-amber-400 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-heading font-black text-lg sm:text-xl text-[#2E2E2E] tracking-tight">SHIKHAR SKYLINE</span>
              <p className="text-[9px] text-[#625f5c] tracking-widest uppercase font-semibold">Riverfront Living &bull; Ahmedabad</p>
            </div>
          </div>

          <a
            href="#visit"
            className="px-3.5 py-1.5 rounded-xl bg-[#7D4047] text-white text-xs font-bold uppercase tracking-wider"
          >
            VIP Visit
          </a>
        </div>
      </header>

      {/* 3. Luxury Real Estate Hero */}
      <section id="overview" className="relative bg-[#2E2E2E] text-white overflow-hidden py-10 sm:py-16 px-4 sm:px-6">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80" 
            alt="Luxury Architecture" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />

        <div className={`mx-auto relative z-20 ${isMobileView ? 'space-y-4' : 'max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'}`}>
          <div className={`${isMobileView ? 'space-y-3' : 'lg:col-span-7 space-y-4'}`}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-[10px] sm:text-xs font-bold uppercase tracking-widest border border-white/20">
              <Sparkles className="w-3 h-3" />
              <span>Ultra-Luxury 3 & 4 BHK Sky Homes</span>
            </div>
            <h1 className={`font-extrabold font-heading leading-tight ${isMobileView ? 'text-2xl' : 'text-3xl sm:text-5xl'}`}>
              Where Ahmedabad Meets The Horizon.
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-lg leading-relaxed">
              32-Storey architectural landmark with 78% open green landscaped grounds, German acoustic soundproofing, and panoramic riverfront balconies.
            </p>
            <div className="pt-2 flex flex-wrap gap-2.5 items-center">
              <div className="bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20">
                <span className="text-[9px] text-amber-300 font-bold uppercase block">Starting Price</span>
                <span className="text-base sm:text-xl font-extrabold font-mono">₹1.42 Cr* Onwards</span>
              </div>
              <button
                onClick={onOrderDesign}
                className="px-4 py-2.5 rounded-xl bg-[#7D4047] hover:bg-[#67333a] text-white font-bold text-xs uppercase tracking-wider shadow-wine flex items-center gap-1.5"
              >
                <span>Order Real Estate Site (₹5k Adv)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Brochure Card */}
          <div className={`${isMobileView ? 'pt-2' : 'lg:col-span-5'} bg-white/95 backdrop-blur-xl text-[#2E2E2E] p-5 rounded-3xl shadow-2xl border border-white/40 space-y-3`}>
            <div>
              <span className="text-[10px] font-bold text-[#7D4047] uppercase tracking-wider">Fast Enquiry</span>
              <h3 className="font-heading font-extrabold text-base sm:text-lg">Download Official E-Brochure</h3>
              <p className="text-[11px] text-[#625f5c]">Instant delivery via Email/SMS with floor plans & pricing.</p>
            </div>

            <form onSubmit={handleBooking} className="space-y-2.5">
              <input
                type="text"
                required
                placeholder="Your Full Name"
                className="w-full px-3 py-2 rounded-xl border border-[#DDD5CD] text-xs bg-[#F1ECE6]/40"
              />
              <input
                type="tel"
                required
                placeholder="Mobile Phone Number"
                className="w-full px-3 py-2 rounded-xl border border-[#DDD5CD] text-xs bg-[#F1ECE6]/40"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#2E2E2E] hover:bg-[#7D4047] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Get Instant PDF Brochure</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 4. Interactive Floor Plans Switcher */}
      <section id="plans" className="py-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-6 space-y-1">
          <span className="text-[10px] sm:text-xs font-bold text-[#7D4047] uppercase tracking-wider">Master Architecture</span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#2E2E2E] font-heading">
            Thoughtfully Crafted Floor Plans
          </h2>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-6">
          {[
            { id: '3bhk', label: '3 BHK Royal (2,180 Sq.Ft)' },
            { id: '4bhk', label: '4 BHK Imperial (3,250 Sq.Ft)' },
            { id: '5bhk', label: '5 BHK Penthouse' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedPlan(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedPlan === tab.id
                  ? 'bg-[#7D4047] text-white shadow-wine'
                  : 'bg-white border border-[#DDD5CD] text-[#2E2E2E]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Plan Details Card */}
        <div className={`bg-white rounded-3xl border border-[#DDD5CD] p-5 shadow-soft ${isMobileView ? 'space-y-4' : 'grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'}`}>
          <div className={`${isMobileView ? 'space-y-3' : 'lg:col-span-6 space-y-4'}`}>
            <span className="text-[10px] font-bold text-[#7D4047] uppercase tracking-wider">Specifications</span>
            <h3 className="font-heading font-extrabold text-xl text-[#2E2E2E]">{activePlanData.title}</h3>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-[#F1ECE6]/60 rounded-xl border border-[#DDD5CD]">
                <span className="text-[#625f5c] text-[10px] block">Built-up Area:</span>
                <strong className="text-xs sm:text-sm font-extrabold text-[#2E2E2E]">{activePlanData.superArea}</strong>
              </div>
              <div className="p-2.5 bg-[#F1ECE6]/60 rounded-xl border border-[#DDD5CD]">
                <span className="text-[#625f5c] text-[10px] block">RERA Carpet:</span>
                <strong className="text-xs sm:text-sm font-extrabold text-[#2E2E2E]">{activePlanData.carpetArea}</strong>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-[#DDD5CD]">
              <div>
                <span className="text-[10px] text-[#625f5c]">Indicative Price:</span>
                <div className="text-base sm:text-lg font-black text-[#7D4047] font-mono">{activePlanData.price}</div>
              </div>
              <a
                href="#visit"
                className="px-3 py-1.5 rounded-xl bg-[#2E2E2E] text-white hover:bg-[#7D4047] text-xs font-bold"
              >
                Cost Breakdown
              </a>
            </div>
          </div>

          <div className={`${isMobileView ? '' : 'lg:col-span-6'}`}>
            <div className="rounded-2xl overflow-hidden border border-[#DDD5CD] shadow aspect-[4/3]">
              <img 
                src={activePlanData.image} 
                alt={activePlanData.title}
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Architectural Specifications & Sales Lounge */}
      <section id="visit" className="bg-[#F1ECE6] border-t border-[#DDD5CD] py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-[10px] sm:text-xs font-bold text-[#7D4047] uppercase tracking-wider">Uncompromising Engineering</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#2E2E2E] font-heading">
              Ultra-Luxury Specifications & Master Blueprint
            </h2>
            <p className="text-xs text-[#625f5c]">
              Designed for Ahmedabad's discerning elite. Every residence crafted with imported materials and IGBC Platinum green standards.
            </p>
          </div>

          <div className={`grid gap-5 ${isMobileView ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
            <div className="bg-white rounded-3xl p-6 border border-[#DDD5CD] shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#7D4047]/10 text-[#7D4047] flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#7D4047] uppercase">Grand Volume</span>
                  <h3 className="font-heading font-extrabold text-base text-[#2E2E2E] mt-0.5">Italian Marble & 11-Ft Ceilings</h3>
                </div>
                <p className="text-xs text-[#625f5c] leading-relaxed">
                  Imported Botticino & Statuario marble flooring across expansive living chambers. High clear slab height with acoustic soundproofing glass windows.
                </p>
              </div>
              <div className="pt-3 border-t border-[#DDD5CD] flex items-center justify-between text-[11px] text-[#2E2E2E]">
                <span><strong>Flooring:</strong> Italian Botticino</span>
                <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded">11-Ft Slab</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#DDD5CD] shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#7D4047]/10 text-[#7D4047] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#7D4047] uppercase">Biometric Security</span>
                  <h3 className="font-heading font-extrabold text-base text-[#2E2E2E] mt-0.5">Private Elevator Foyer</h3>
                </div>
                <p className="text-xs text-[#625f5c] leading-relaxed">
                  High-speed Mitsubishi passenger elevators opening straight into your private personal apartment vestibule with encrypted biometric fingerprint and RFID keycards.
                </p>
              </div>
              <div className="pt-3 border-t border-[#DDD5CD] flex items-center justify-between text-[11px] text-[#2E2E2E]">
                <span><strong>Speed:</strong> 2.5 m/s Lift</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">Private Entry</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#DDD5CD] shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#7D4047]/10 text-[#7D4047] flex items-center justify-center font-bold">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#7D4047] uppercase">Sustainable Luxury</span>
                  <h3 className="font-heading font-extrabold text-base text-[#2E2E2E] mt-0.5">IGBC Platinum Green Horizon</h3>
                </div>
                <p className="text-xs text-[#625f5c] leading-relaxed">
                  85% lush manicured botanical gardens, solar-paneled common power grids, rainwater harvesting reservoir, and dual fast EV charging points per parking slot.
                </p>
              </div>
              <div className="pt-3 border-t border-[#DDD5CD] flex items-center justify-between text-[11px] text-[#2E2E2E]">
                <span><strong>Open Greens:</strong> 85% Ground</span>
                <span className="text-cyan-800 font-bold bg-cyan-50 px-2 py-0.5 rounded">IGBC Platinum</span>
              </div>
            </div>
          </div>

          {/* Sales Pavilion & Chauffeur Request Strip */}
          <div className={`bg-white rounded-3xl p-5 sm:p-8 border border-[#DDD5CD] shadow-sm flex items-center justify-between gap-6 ${isMobileView ? 'flex-col text-center' : 'flex-col lg:flex-row text-center lg:text-left'}`}>
            <div className={`space-y-1.5 ${isMobileView ? 'text-center' : 'text-center lg:text-left'}`}>
              <span className="text-[10px] font-bold text-[#7D4047] uppercase tracking-wider">Experience Sales Pavilion</span>
              <h3 className="text-base sm:text-lg font-extrabold text-[#2E2E2E] font-heading">
                Visit the On-Site Sample Penthouse & Sales Gallery
              </h3>
              <p className="text-xs text-[#625f5c] max-w-xl">
                Experience the 4 BHK show home in person. Complimentary chauffeur pickup available from anywhere in Ahmedabad for pre-registered high-net-worth buyers.
              </p>
              <div className={`flex flex-wrap items-center gap-3 pt-1 text-xs text-[#2E2E2E] ${isMobileView ? 'justify-center' : ''}`}>
                <span className="flex items-center gap-1 font-bold">
                  <Calendar className="w-3.5 h-3.5 text-[#7D4047]" />
                  <span>Sales Lounge Open 7 Days: 10:00 AM &ndash; 07:00 PM</span>
                </span>
                <span className="text-[#625f5c]">&bull;</span>
                <span className="text-[#625f5c]">Science City Road, Sola, Ahmedabad</span>
              </div>
            </div>

            <div className={`flex flex-wrap items-center gap-3 shrink-0 ${isMobileView ? 'w-full flex-col' : ''}`}>
              <a
                href="tel:+919825067890"
                className={`px-5 py-3 rounded-2xl bg-[#7D4047] hover:bg-[#67333a] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-wine transition-all ${isMobileView ? 'w-full justify-center' : ''}`}
              >
                <Phone className="w-4 h-4" />
                <span>VIP Sales Desk: +91 98250 67890</span>
              </a>
              <a
                href="https://wa.me/919825067890"
                target="_blank"
                rel="noreferrer"
                className={`px-4 py-3 rounded-2xl bg-[#2E2E2E] hover:bg-black text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${isMobileView ? 'w-full justify-center' : ''}`}
              >
                <span>WhatsApp Sales Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Homeowner Testimonials */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
          <span className="text-[10px] sm:text-xs font-bold text-[#7D4047] uppercase tracking-wider">Buyer Testimonials</span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#2E2E2E] font-heading">
            Chosen by Ahmedabad's Industrial Leaders
          </h2>
        </div>

        <div className={`grid gap-4 ${isMobileView ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
          <div className="bg-white p-5 rounded-2xl border border-[#DDD5CD] shadow-sm space-y-3">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
            </div>
            <p className="text-xs text-[#2E2E2E] italic leading-relaxed">
              "The private elevator foyer opening right into our living hall gives villa-like privacy in a 32-storey high-rise. Construction quality and slab finishes are outstanding."
            </p>
            <div className="pt-2 border-t border-[#DDD5CD] flex items-center justify-between text-xs">
              <span className="font-bold text-[#2E2E2E]">Hardik Shah</span>
              <span className="text-[#625f5c] text-[11px]">Chemical Manufacturer & Resident</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#DDD5CD] shadow-sm space-y-3">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
            </div>
            <p className="text-xs text-[#2E2E2E] italic leading-relaxed">
              "We booked the 4 BHK Presidential suite. The unobstructed sunset views and the 42,000 sq.ft clubhouse with heated infinity pool make this western Ahmedabad's best project."
            </p>
            <div className="pt-2 border-t border-[#DDD5CD] flex items-center justify-between text-xs">
              <span className="font-bold text-[#2E2E2E]">Niharika Trivedi</span>
              <span className="text-[#625f5c] text-[11px]">Senior Advocate, High Court</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#DDD5CD] shadow-sm space-y-3">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
            </div>
            <p className="text-xs text-[#2E2E2E] italic leading-relaxed">
              "Zero delays in milestone construction updates and full RERA compliance. Clear carpet areas without misleading super built-up inflation. Truly a landmark address."
            </p>
            <div className="pt-2 border-t border-[#DDD5CD] flex items-center justify-between text-xs">
              <span className="font-bold text-[#2E2E2E]">Rajesh Agrawal</span>
              <span className="text-[#625f5c] text-[11px]">Managing Director, Agrawal Textiles</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Complete Real Estate Footer */}
      <footer className="bg-[#2E2E2E] text-white pt-10 pb-6 px-4 sm:px-6 border-t border-[#DDD5CD]">
        <div className={`max-w-7xl mx-auto grid pb-8 border-b border-neutral-700 ${isMobileView ? 'grid-cols-1 gap-6 text-center' : 'grid-cols-1 md:grid-cols-4 gap-8'}`}>
          <div className={`space-y-3 md:col-span-1 ${isMobileView ? 'flex flex-col items-center' : ''}`}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#7D4047] text-amber-200 flex items-center justify-center font-bold">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="font-heading font-black text-sm text-white tracking-tight">SHIKHAR SKYLINE</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Luxury 3 & 4 BHK sky residences and presidential duplexes on Science City Road, Ahmedabad.
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-amber-200 uppercase tracking-wider text-[11px]">RERA Regulatory Info</h4>
            <p className="text-neutral-300 font-mono text-[11px]">RERA: PR/GJ/AHMEDABAD/2024/0981</p>
            <p className="text-neutral-400 text-[11px]">Website: gujrera.gujarat.gov.in</p>
            <p className="text-neutral-400 text-[11px]">Possession: Dec 2027 Onwards</p>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-amber-200 uppercase tracking-wider text-[11px]">Site & Sales Pavilion</h4>
            <p className="text-neutral-300">Science City Road, Near Sola Bridge,</p>
            <p className="text-neutral-300">Ahmedabad, Gujarat 380060</p>
            <p className="text-neutral-400 text-[11px]">Open 7 Days a Week</p>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-amber-200 uppercase tracking-wider text-[11px]">VIP Sales Lounge</h4>
            <p className="text-neutral-300">Sales Hotline: +91 98250 67890</p>
            <p className="text-neutral-300">Corporate: sales@shikharskyline.com</p>
            <p className="text-neutral-400 text-[11px]">Prior Appointment for Chauffeur</p>
          </div>
        </div>

        <div className={`max-w-7xl mx-auto pt-6 flex items-center justify-between text-xs text-neutral-400 gap-2 ${isMobileView ? 'flex-col text-center' : 'flex-col sm:flex-row'}`}>
          <span>&copy; {new Date().getFullYear()} Shikhar Skyline Residences. All Rights Reserved.</span>
          <span>Crafted with pure performance &bull; Powered by THE WEBCRAFT</span>
        </div>
      </footer>

      {/* 6. Demo Project Banner */}
      <div className={`bg-[#2E2E2E] text-white p-3 sm:p-4 flex items-center justify-between gap-2 text-xs border-t border-[#DDD5CD] ${isMobileView ? 'flex-col text-center' : 'flex-col sm:flex-row'}`}>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <span><strong>Client Demo:</strong> Shikhar Skyline &bull; Built by <strong>THE WEBCRAFT</strong></span>
        </div>
        <button
          onClick={onOrderDesign}
          className={`px-3.5 py-1.5 rounded-lg bg-[#7D4047] hover:bg-[#67333a] text-white font-bold flex items-center gap-1 ${isMobileView ? 'w-full justify-center' : ''}`}
        >
          <span>Order A Real Estate Site</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
