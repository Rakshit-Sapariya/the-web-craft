import React, { useState } from 'react';
import { 
  Sparkles, Calendar, Clock, Star, Phone, MapPin, 
  CheckCircle2, ArrowRight, Heart, Scissors, UserCheck 
} from 'lucide-react';

export default function BeautyParlourDemo({ onOrderDesign, isMobileView }) {
  const [selectedCategory, setSelectedCategory] = useState('Bridal');

  const services = {
    'Bridal': [
      {
        name: 'Signature HD Airbrush Bridal Makeup',
        desc: 'Includes waterproof HD airbrush base, 3D lashes, bridal hair styling, and dupatta draping.',
        price: '₹14,999',
        duration: '3.5 Hours',
        rating: 5.0,
      },
      {
        name: 'Pre-Bridal Luxury Radiance Package',
        desc: 'Hydra facial, body polishing, gold waxing, hair spa, and crystal manicure & pedicure.',
        price: '₹8,499',
        duration: '4 Hours',
        rating: 4.9,
      },
      {
        name: 'Sangeet & Engagement Glam Look',
        desc: 'Soft glam party makeup with international cosmetics, textured curls, and jewelry setting.',
        price: '₹5,999',
        duration: '2 Hours',
        rating: 4.9,
      },
    ],
    'Hair': [
      {
        name: 'Brazilian Nanoplastia / Keratin Treatment',
        desc: 'Formaldehyde-free hair straightening and intense protein repair for silky frizz-free hair.',
        price: '₹4,999',
        duration: '3 Hours',
        rating: 4.9,
      },
      {
        name: 'Moroccan Oil Deep Hydration Hair Spa',
        desc: 'Restorative scalp massage, argan oil micro-mist infusion, and split-end repair.',
        price: '₹1,899',
        duration: '60 Mins',
        rating: 4.8,
      },
    ],
    'Skin': [
      {
        name: 'O3+ Oxygen Glow Facial Therapy',
        desc: 'Instant pigmentation brightening, dead cell peel, and hyper-moisturizing algae mask.',
        price: '₹2,499',
        duration: '75 Mins',
        rating: 4.9,
      },
      {
        name: 'Korean Glass Skin Hydra Dermabrasion',
        desc: 'Deep pore vacuum suction, hyaluronic acid jet spray, and collagen peptide infusion.',
        price: '₹3,499',
        duration: '90 Mins',
        rating: 5.0,
      },
    ],
  };

  return (
    <div className="bg-[#FFFDFB] text-[#2E2E2E] font-sans antialiased min-h-screen">
      
      {/* 1. Top Offer Strip */}
      <div className="bg-[#7D4047] text-white text-[11px] py-1.5 px-3 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-200 shrink-0" />
        <span>WEDDING SEASON SPECIAL: Flat 20% Off On All Bridal Packages | Book Before Month-End</span>
      </div>

      {/* 2. Salon Header */}
      <header className="bg-white border-b border-[#DDD5CD] sticky top-0 z-20 px-4 py-3">
        <div className={`mx-auto flex items-center justify-between ${isMobileView ? 'flex-col gap-2' : 'max-w-7xl h-16'}`}>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#7D4047] text-white flex items-center justify-center font-bold shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-heading font-black text-lg text-[#2E2E2E] tracking-tight">GLAMOUR & GLOW</span>
              <p className="text-[10px] text-[#7D4047] uppercase font-bold tracking-widest">Luxury Salon & Bridal Studio</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-[#625f5c] hidden sm:inline flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#7D4047]" />
              <span>Drive-In Road, Ahmedabad</span>
            </span>
            <a
              href="#book"
              className="px-3.5 py-1.5 rounded-xl bg-[#7D4047] text-white text-xs font-bold shadow-sm"
            >
              Book Slot
            </a>
          </div>
        </div>
      </header>

      {/* 3. Hero Section */}
      <section className="bg-gradient-to-r from-[#FAF6F3] to-[#F1ECE6] border-b border-[#DDD5CD] py-8 sm:py-14 px-4 sm:px-6">
        <div className={`mx-auto ${isMobileView ? 'space-y-4' : 'max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'}`}>
          <div className={`${isMobileView ? 'space-y-3' : 'lg:col-span-7 space-y-4'}`}>
            <span className="inline-block px-3 py-1 rounded-full bg-[#7D4047]/10 text-[#7D4047] text-[10px] sm:text-xs font-bold uppercase tracking-widest">
              Award-Winning Bridal Artists
            </span>
            <h1 className={`font-extrabold font-heading text-[#2E2E2E] leading-tight ${isMobileView ? 'text-2xl' : 'text-3xl sm:text-4xl'}`}>
              Look Breathtaking on Your Most Special Day.
            </h1>
            <p className="text-xs sm:text-sm text-[#625f5c] leading-relaxed">
              Certified international makeup artists specializing in bridal HD airbrush, royal Gujarati weddings, pre-bridal skincare, and luxury hair aesthetics.
            </p>
            <div className="pt-2 flex flex-wrap gap-2.5">
              <a
                href="#book"
                className="px-5 py-2.5 rounded-xl bg-[#7D4047] hover:bg-[#67333a] text-white text-xs font-bold shadow-wine"
              >
                Book Bridal Appointment
              </a>
              <button
                onClick={onOrderDesign}
                className="px-4 py-2.5 rounded-xl bg-white border border-[#DDD5CD] text-[#2E2E2E] text-xs font-bold flex items-center gap-1.5"
              >
                <span>Order A Beauty Salon Website (₹5k Adv)</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#7D4047]" />
              </button>
            </div>
          </div>

          <div className={`${isMobileView ? 'pt-2' : 'lg:col-span-5'}`}>
            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] bg-neutral-100">
              <img 
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80" 
                alt="Luxury Beauty Salon"
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Services Menu */}
      <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-6 space-y-1">
          <span className="text-[10px] sm:text-xs font-bold text-[#7D4047] uppercase tracking-wider">Pamper Yourself</span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#2E2E2E]">Popular Salon & Bridal Services</h2>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-2 mb-6">
          {['Bridal', 'Hair', 'Skin'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#7D4047] text-white shadow-wine'
                  : 'bg-white border border-[#DDD5CD] text-[#2E2E2E]'
              }`}
            >
              {cat} Packages
            </button>
          ))}
        </div>

        {/* Services Cards */}
        <div className={`grid gap-4 ${isMobileView ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-3'}`}>
          {services[selectedCategory].map((s, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-[#DDD5CD] shadow-sm flex flex-col justify-between space-y-3">
              <div>
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-heading font-extrabold text-sm text-[#2E2E2E]">{s.name}</h3>
                  <span className="text-xs text-amber-500 font-bold flex items-center gap-0.5 shrink-0">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{s.rating}</span>
                  </span>
                </div>
                <p className="text-xs text-[#625f5c] mt-1.5 leading-relaxed">{s.desc}</p>
              </div>

              <div className="pt-3 border-t border-[#DDD5CD]/60 flex items-center justify-between text-xs">
                <div>
                  <span className="font-black text-base text-[#7D4047] font-mono">{s.price}</span>
                  <span className="text-[11px] text-[#625f5c] block">{s.duration}</span>
                </div>
                <a
                  href="#book"
                  className="px-3 py-1.5 rounded-lg bg-[#2E2E2E] text-white hover:bg-[#7D4047] text-[11px] font-bold"
                >
                  Book Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Studio Bridal Experience & Concierge Desk */}
      <section id="book" className={`bg-[#FAF6F3] border-t border-[#DDD5CD] ${isMobileView ? 'py-6 px-3' : 'py-12 px-4 sm:px-6'}`}>
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-[10px] sm:text-xs font-bold text-[#7D4047] uppercase tracking-wider">Uncompromising Luxury</span>
            <h2 className="text-lg sm:text-2xl font-extrabold text-[#2E2E2E] font-heading">
              The Bridal Suite & Salon Experience
            </h2>
            <p className="text-xs text-[#625f5c]">
              Designed for brides who demand perfection on their milestone day.
            </p>
          </div>

          <div className={`grid gap-4 ${isMobileView ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-[#DDD5CD] shadow-sm flex flex-col justify-between space-y-3 sm:space-y-4">
              <div className="space-y-2 sm:space-y-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#7D4047]/10 text-[#7D4047] flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-[#7D4047] uppercase">VIP Dressing Lounge</span>
                  <h3 className="font-heading font-extrabold text-sm sm:text-base text-[#2E2E2E] mt-0.5">Private Bridal Suite</h3>
                </div>
                <p className="text-xs text-[#625f5c] leading-relaxed">
                  Dedicated high-mirror private vanity suite with studio-grade color-calibrated lighting, refreshment bar, and private changing pavilion for bridal entourage.
                </p>
              </div>
              <div className="pt-2.5 sm:pt-3 border-t border-[#DDD5CD] flex items-center justify-between text-[11px] text-[#2E2E2E]">
                <span><strong>Access:</strong> 1 Bride per Suite</span>
                <span className="text-pink-700 font-bold bg-pink-50 px-2 py-0.5 rounded text-[10px]">100% Privacy</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-[#DDD5CD] shadow-sm flex flex-col justify-between space-y-3 sm:space-y-4">
              <div className="space-y-2 sm:space-y-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#7D4047]/10 text-[#7D4047] flex items-center justify-center font-bold">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-[#7D4047] uppercase">Cosmetics Standard</span>
                  <h3 className="font-heading font-extrabold text-sm sm:text-base text-[#2E2E2E] mt-0.5">Global Luxury Formulations</h3>
                </div>
                <p className="text-xs text-[#625f5c] leading-relaxed">
                  Only Charlotte Tilbury, MAC Pro, Huda Beauty, and Dior Backstage cosmetics. Applied with sterilized airbrush guns and Dyson Supersonic styling tools.
                </p>
              </div>
              <div className="pt-2.5 sm:pt-3 border-t border-[#DDD5CD] flex items-center justify-between text-[11px] text-[#2E2E2E]">
                <span><strong>Longevity:</strong> 18-Hour Waterproof</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[10px]">Zero Crease</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-[#DDD5CD] shadow-sm flex flex-col justify-between space-y-3 sm:space-y-4">
              <div className="space-y-2 sm:space-y-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#7D4047]/10 text-[#7D4047] flex items-center justify-center font-bold">
                  <UserCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-[#7D4047] uppercase">Consultation Routine</span>
                  <h3 className="font-heading font-extrabold text-sm sm:text-base text-[#2E2E2E] mt-0.5">Pre-Wedding Skin Roadmap</h3>
                </div>
                <p className="text-xs text-[#625f5c] leading-relaxed">
                  Complimentary 48-hour cosmetic patch test and skin texture analysis by senior dermatological estheticians to ensure flawless glass-skin radiance.
                </p>
              </div>
              <div className="pt-2.5 sm:pt-3 border-t border-[#DDD5CD] flex items-center justify-between text-[11px] text-[#2E2E2E]">
                <span><strong>Included:</strong> Patch Testing</span>
                <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded text-[10px]">Custom Tone</span>
              </div>
            </div>
          </div>

          {/* Direct Concierge Desk Strip */}
          <div className={`bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#DDD5CD] shadow-sm flex items-center justify-between gap-4 sm:gap-6 ${isMobileView ? 'flex-col text-center' : 'flex-col lg:flex-row text-center lg:text-left'}`}>
            <div className="space-y-1 sm:space-y-1.5">
              <span className="text-[10px] font-bold text-[#7D4047] uppercase tracking-wider">Direct Studio Concierge</span>
              <h3 className="text-base sm:text-lg font-extrabold text-[#2E2E2E] font-heading">
                Book Consultations & Appointments Directly
              </h3>
              <p className="text-xs text-[#625f5c] max-w-xl">
                Call our front desk coordinator or reach out on WhatsApp to verify bridal date availability, check package customizations, and reserve your date.
              </p>
              <div className={`flex flex-wrap items-center gap-2 sm:gap-3 pt-1 text-xs text-[#2E2E2E] ${isMobileView ? 'justify-center' : ''}`}>
                <span className="flex items-center gap-1 font-bold">
                  <Clock className="w-3.5 h-3.5 text-[#7D4047]" />
                  <span>Tue &ndash; Sun: 10:00 AM &ndash; 08:30 PM (Mon Closed)</span>
                </span>
                <span>&bull;</span>
                <span className="text-[#625f5c]">Drive-In Road, Bodakdev, Ahmedabad</span>
              </div>
            </div>

            <div className={`flex flex-wrap items-center gap-2 sm:gap-3 shrink-0 ${isMobileView ? 'w-full flex-col' : ''}`}>
              <a
                href="tel:+919825023456"
                className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-[#7D4047] hover:bg-[#67333a] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-wine transition-all ${isMobileView ? 'w-full' : ''}`}
              >
                <Phone className="w-4 h-4" />
                <span>Call Studio: +91 98250 23456</span>
              </a>
              <a
                href="https://wa.me/919825023456"
                target="_blank"
                rel="noreferrer"
                className={`px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-[#2E2E2E] hover:bg-black text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 ${isMobileView ? 'w-full' : ''}`}
              >
                <span>WhatsApp Studio</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Real Brides Testimonials */}
      <section className={`max-w-7xl mx-auto ${isMobileView ? 'py-6 px-3' : 'py-12 px-4 sm:px-6'}`}>
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 space-y-1">
          <span className="text-[10px] sm:text-xs font-bold text-[#7D4047] uppercase tracking-wider">Bride Stories</span>
          <h2 className="text-lg sm:text-2xl font-extrabold text-[#2E2E2E] font-heading">
            Trusted by Over 1,200 Gujarat Brides
          </h2>
        </div>

        <div className={`grid gap-4 ${isMobileView ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#DDD5CD] shadow-sm space-y-2.5 sm:space-y-3">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
            </div>
            <p className="text-xs text-[#2E2E2E] italic leading-relaxed">
              "Khushi did my HD Airbrush Bridal look for my wedding at YMCA Club Ahmedabad. It stayed flawless through 8 hours of tears, humidity, and stage lights without a single smudge!"
            </p>
            <div className="pt-2 border-t border-[#DDD5CD] flex items-center justify-between text-xs">
              <span className="font-bold text-[#2E2E2E]">Aashna Shah</span>
              <span className="text-[#625f5c] text-[11px]">Sindhu Bhavan Bride</span>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#DDD5CD] shadow-sm space-y-2.5 sm:space-y-3">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
            </div>
            <p className="text-xs text-[#2E2E2E] italic leading-relaxed">
              "The pre-bridal radiance routine completely transformed my skin texture. The team is warm, hygienic, and makes you feel like royalty in their private bridal suite."
            </p>
            <div className="pt-2 border-t border-[#DDD5CD] flex items-center justify-between text-xs">
              <span className="font-bold text-[#2E2E2E]">Nidhi Trivedi</span>
              <span className="text-[#625f5c] text-[11px]">Navrangpura, Ahmedabad</span>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#DDD5CD] shadow-sm space-y-2.5 sm:space-y-3">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
            </div>
            <p className="text-xs text-[#2E2E2E] italic leading-relaxed">
              "Had my Nanoplastia hair treatment done here. My coarse frizzy hair became so soft and glossy. Best beauty salon experience in Ahmedabad hands down."
            </p>
            <div className="pt-2 border-t border-[#DDD5CD] flex items-center justify-between text-xs">
              <span className="font-bold text-[#2E2E2E]">Priyanka Joshi</span>
              <span className="text-[#625f5c] text-[11px]">Prahlad Nagar, Ahmedabad</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Complete Salon Footer */}
      <footer className={`bg-[#2E2E2E] text-white border-t border-[#DDD5CD] ${isMobileView ? 'pt-8 pb-5 px-3' : 'pt-10 pb-6 px-4 sm:px-6'}`}>
        <div className={`max-w-7xl mx-auto grid pb-6 sm:pb-8 border-b border-neutral-700 ${isMobileView ? 'grid-cols-1 gap-6 text-center' : 'grid-cols-1 md:grid-cols-4 gap-8'}`}>
          <div className={`space-y-2 sm:space-y-3 md:col-span-1 ${isMobileView ? 'flex flex-col items-center' : ''}`}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#7D4047] text-white flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-heading font-black text-sm text-white tracking-tight">GLAMOUR & GLOW</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Premier luxury bridal salon, keratin studio & dermatological aesthetics center in Ahmedabad.
            </p>
          </div>

          <div className="space-y-1.5 sm:space-y-2 text-xs">
            <h4 className="font-bold text-pink-300 uppercase tracking-wider text-[11px]">Studio Timings</h4>
            <p className="text-neutral-300">Tue &ndash; Sat: 10:00 AM &ndash; 08:30 PM</p>
            <p className="text-neutral-300">Sun: 10:00 AM &ndash; 07:00 PM</p>
            <p className="text-neutral-400 text-[11px]">Mondays Sanitization Rest</p>
          </div>

          <div className="space-y-1.5 sm:space-y-2 text-xs">
            <h4 className="font-bold text-pink-300 uppercase tracking-wider text-[11px]">Location & Parking</h4>
            <p className="text-neutral-300">Drive-In Road, Opp. Himalaya Mall,</p>
            <p className="text-neutral-300">Bodakdev, Ahmedabad 380054</p>
            <p className="text-neutral-400 text-[11px]">Reserved Basement Parking</p>
          </div>

          <div className="space-y-1.5 sm:space-y-2 text-xs">
            <h4 className="font-bold text-pink-300 uppercase tracking-wider text-[11px]">Appointments Desk</h4>
            <p className="text-neutral-300">Bridal Desk: +91 98250 23456</p>
            <p className="text-neutral-300">WhatsApp: +91 98250 23456</p>
            <p className="text-neutral-400 text-[11px]">Advance Booking Recommended</p>
          </div>
        </div>

        <div className={`max-w-7xl mx-auto pt-4 sm:pt-6 flex items-center justify-between text-[11px] text-neutral-400 gap-2 ${isMobileView ? 'flex-col text-center' : 'flex-col sm:flex-row'}`}>
          <span>&copy; {new Date().getFullYear()} Glamour & Glow Studio. All Rights Reserved.</span>
          <span>Crafted with pure performance &bull; Powered by THE WEBCRAFT</span>
        </div>
      </footer>

      {/* 6. Demo Project Floating Banner */}
      <div className={`bg-[#2E2E2E] text-white p-3 sm:p-4 flex items-center justify-between gap-2 text-xs border-t border-[#DDD5CD] ${isMobileView ? 'flex-col text-center' : 'flex-col sm:flex-row'}`}>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-pink-400 animate-pulse" />
          <span><strong>Client Demo:</strong> Glamour & Glow Salon &bull; Built by <strong>THE WEBCRAFT</strong></span>
        </div>
        <button
          onClick={onOrderDesign}
          className={`px-3.5 py-1.5 rounded-lg bg-[#7D4047] hover:bg-[#67333a] text-white font-bold flex items-center gap-1.5 ${isMobileView ? 'w-full justify-center' : ''}`}
        >
          <span>Get A Salon Website (₹5k Adv)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
