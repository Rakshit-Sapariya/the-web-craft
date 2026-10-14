import React, { useState } from 'react';
import { 
  Building2, MapPin, Phone, Calendar, Download, Check, 
  ShieldCheck, ArrowRight, Compass, Sparkles, CheckCircle2 
} from 'lucide-react';

export default function RealEstateClientDemo({ onOrderDesign, isMobileView }) {
  const [selectedPlan, setSelectedPlan] = useState('3bhk');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingForm, setBookingForm] = useState({ name: '', phone: '', date: '' });

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

  const handleBooking = (e) => {
    e.preventDefault();
    setBookingSubmitted(true);
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
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80" 
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
              <p className="text-[11px] text-[#625f5c]">Instant delivery on WhatsApp with floor plans & pricing.</p>
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
                placeholder="WhatsApp Phone Number"
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

      {/* 5. Schedule Site Visit Section */}
      <section id="visit" className="bg-[#F1ECE6] border-t border-[#DDD5CD] py-10 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-5 sm:p-8 border border-[#DDD5CD] shadow-sm">
          <div className="text-center mb-6 space-y-1">
            <span className="text-[10px] font-bold text-[#7D4047] uppercase tracking-wider">Experience In Person</span>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#2E2E2E] font-heading">
              Book a Private Sample Flat Tour
            </h2>
            <p className="text-xs text-[#625f5c]">Complimentary chauffeur pickup and personalized walkthrough.</p>
          </div>

          {!bookingSubmitted ? (
            <form onSubmit={handleBooking} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#2E2E2E] mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hardik Shah"
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5CD] bg-[#F1ECE6]/40 text-xs"
                />
              </div>
              <div className={`grid gap-3 ${isMobileView ? 'grid-cols-1' : 'grid-cols-2'}`}>
                <div>
                  <label className="block font-bold text-[#2E2E2E] mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9825012345"
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5CD] bg-[#F1ECE6]/40 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#2E2E2E] mb-1">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5CD] bg-[#F1ECE6]/40 text-xs"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#7D4047] hover:bg-[#67333a] text-white font-bold text-xs uppercase tracking-wider shadow-wine mt-2"
              >
                Confirm Site Visit
              </button>
            </form>
          ) : (
            <div className="text-center py-4 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-heading font-extrabold text-base text-[#2E2E2E]">Site Visit Scheduled!</h4>
              <p className="text-xs text-[#625f5c]">
                Our sales director will contact you shortly to confirm your chauffeur.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 6. Demo Project Banner */}
      <div className="bg-[#2E2E2E] text-white p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs border-t border-[#DDD5CD]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <span><strong>Client Demo:</strong> Shikhar Skyline &bull; Built by <strong>THE WEBCRAFT</strong></span>
        </div>
        <button
          onClick={onOrderDesign}
          className="px-3.5 py-1.5 rounded-lg bg-[#7D4047] hover:bg-[#67333a] text-white font-bold flex items-center gap-1"
        >
          <span>Order A Real Estate Site</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
