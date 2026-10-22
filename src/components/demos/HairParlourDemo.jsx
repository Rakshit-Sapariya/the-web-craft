import React, { useState } from 'react';
import { 
  Scissors, Calendar, Clock, Star, Phone, MapPin, 
  CheckCircle2, ArrowRight, ShieldCheck, Sparkles, User 
} from 'lucide-react';

export default function HairParlourDemo({ onOrderDesign, isMobileView }) {
  const [selectedStylist, setSelectedStylist] = useState('Senior Stylist - Ravi');

  const services = [
    {
      name: 'Precision Fade & Scissor Cut',
      desc: 'Skin taper fade, textured crop or pompadour styled with premium matte pomade.',
      price: '₹450',
      duration: '40 Mins',
      tag: 'Bestseller',
    },
    {
      name: 'Royal Charcoal Beard Sculpting',
      desc: 'Hot towel compress, straight razor sharp lineup, organic beard butter treatment.',
      price: '₹350',
      duration: '30 Mins',
      tag: 'Signature',
    },
    {
      name: 'Gentleman Executive Grooming Combo',
      desc: 'Signature Haircut + Beard Sculpting + Charcoal Peel-off Facial + Scalp Massage.',
      price: '₹1,199',
      duration: '80 Mins',
      tag: 'Full Value',
    },
    {
      name: 'Keratin Anti-Dandruff Scalp Detox',
      desc: 'Deep clarifying tea tree steam wash, exfoliating scalp scrub, and hair nourishment.',
      price: '₹799',
      duration: '45 Mins',
      tag: 'Restorative',
    },
  ];

  return (
    <div className="bg-[#181818] text-[#F1ECE6] font-sans antialiased min-h-screen">
      
      {/* 1. Header Bar */}
      <header className="bg-[#121212] border-b border-neutral-800 sticky top-0 z-20 px-4 py-3">
        <div className={`mx-auto flex items-center justify-between ${isMobileView ? 'flex-col gap-2' : 'max-w-7xl h-16'}`}>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#7D4047] text-white flex items-center justify-center font-bold shadow-sm">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <span className="font-heading font-black text-lg text-white tracking-widest uppercase">THE URBAN GENTLEMAN</span>
              <p className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">Master Barbershop & Beard Lounge</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-400 hidden sm:inline">Vastrapur Lake, Ahmedabad</span>
            <a
              href="#book"
              className="px-4 py-1.5 rounded-xl bg-[#7D4047] hover:bg-[#67333a] text-white text-xs font-bold uppercase tracking-wider"
            >
              Book Chair
            </a>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 border-b border-neutral-800 bg-gradient-to-b from-[#1c1c1c] to-[#141414]">
        <div className={`mx-auto ${isMobileView ? 'space-y-4' : 'max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'}`}>
          <div className={`${isMobileView ? 'space-y-3' : 'lg:col-span-7 space-y-4'}`}>
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-amber-300 text-[10px] sm:text-xs font-bold uppercase tracking-widest border border-white/10">
              Modern Men's Hair & Beard Craftsmanship
            </span>
            <h1 className={`font-heading font-extrabold text-white leading-tight ${isMobileView ? 'text-2xl' : 'text-3xl sm:text-5xl'}`}>
              Sharp Cuts. Clean Lines. Classic Gentleman Experience.
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-xl">
              From precision skin fades to royal straight-razor shaves. Enjoy complimentary espresso and leather vintage chairs while our master stylists craft your signature look.
            </p>
            <div className="pt-2 flex flex-wrap gap-2.5">
              <a
                href="#book"
                className="px-5 py-2.5 rounded-xl bg-[#7D4047] hover:bg-[#67333a] text-white text-xs font-bold uppercase tracking-wider shadow-wine"
              >
                Reserve Stylist Chair
              </a>
              <button
                onClick={onOrderDesign}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
              >
                <span>Order A Salon Website (₹5k Adv)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className={`${isMobileView ? 'pt-2' : 'lg:col-span-5'}`}>
            <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-neutral-700 aspect-[4/3]">
              <img 
                src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80" 
                alt="Executive Barber Shop Lounge" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services Grid */}
      <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
          <span className="text-[10px] sm:text-xs font-bold text-amber-400 uppercase tracking-widest">Grooming Menu</span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">Signature Barber Services</h2>
        </div>

        <div className={`grid gap-4 ${isMobileView ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'}`}>
          {services.map((svc, i) => (
            <div key={i} className="bg-[#202020] p-5 rounded-2xl border border-neutral-800 flex flex-col justify-between space-y-3">
              <div>
                <span className="inline-block text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                  {svc.tag}
                </span>
                <h3 className="font-heading font-bold text-sm text-white mt-2">{svc.name}</h3>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{svc.desc}</p>
              </div>

              <div className="pt-3 border-t border-neutral-700 flex items-center justify-between text-xs">
                <div>
                  <span className="font-black text-base text-amber-300 font-mono">{svc.price}</span>
                  <span className="text-[10px] text-neutral-400 block">{svc.duration}</span>
                </div>
                <a
                  href="#book"
                  className="px-3 py-1.5 rounded-lg bg-[#7D4047] hover:bg-[#67333a] text-white text-[11px] font-bold"
                >
                  Select
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. The Grooming Lounge & VIP Standards */}
      <section id="book" className="bg-[#121212] border-t border-neutral-800 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-[10px] sm:text-xs font-bold text-amber-400 uppercase tracking-widest">Master Craftsmanship</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
              The Gentleman Grooming Lounge
            </h2>
            <p className="text-xs text-neutral-400">
              Zero rush. Zero waiting line. Pure old-school barber precision and modern styling.
            </p>
          </div>

          <div className={`grid gap-5 ${isMobileView ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
            <div className="bg-[#1e1e1e] rounded-3xl p-6 border border-neutral-800 shadow-xl flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold">
                  <Scissors className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase">Artisanal Shave</span>
                  <h3 className="font-heading font-extrabold text-base text-white mt-0.5">Straight-Razor Hot Towel Shave</h3>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Dual organic eucalyptus hot steam towel wrap, pre-shave sandalwood oil massage, single-pass Japanese steel razor blade finish, and icy astringent splash.
                </p>
              </div>
              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-300">
                <span><strong>Experience:</strong> 35 Mins</span>
                <span className="text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded">Single Blade</span>
              </div>
            </div>

            <div className="bg-[#1e1e1e] rounded-3xl p-6 border border-neutral-800 shadow-xl flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase">Bespoke Hospitality</span>
                  <h3 className="font-heading font-extrabold text-base text-white mt-0.5">Cold Brew & Beverage Lounge</h3>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Complimentary artisanal pour-over coffee, sparkling tonic, or dark roast espresso while our master stylists sculpt your fade and calibrate your beard silhouette.
                </p>
              </div>
              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-300">
                <span><strong>Complimentary:</strong> Coffee Bar</span>
                <span className="text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded">On The House</span>
              </div>
            </div>

            <div className="bg-[#1e1e1e] rounded-3xl p-6 border border-neutral-800 shadow-xl flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase">Sterilization Rigor</span>
                  <h3 className="font-heading font-extrabold text-base text-white mt-0.5">Hospital-Grade Hygiene</h3>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Fresh disposable single-use razor cartridges for every patron, UV-C sterilizer chambers for all scissor sets, and freshly washed Egyptian cotton capes.
                </p>
              </div>
              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-300">
                <span><strong>Protocol:</strong> UV-C Sealed</span>
                <span className="text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded">100% Sterile</span>
              </div>
            </div>
          </div>

          {/* Chair Hotline & Schedule Strip */}
          <div className={`bg-[#1e1e1e] rounded-3xl p-5 sm:p-8 border border-neutral-800 shadow-xl flex items-center justify-between gap-6 ${isMobileView ? 'flex-col text-center' : 'flex-col lg:flex-row text-center lg:text-left'}`}>
            <div className={`space-y-1.5 ${isMobileView ? 'text-center' : 'text-center lg:text-left'}`}>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Chair Reservations</span>
              <h3 className="text-base sm:text-lg font-extrabold text-white font-heading">
                Reserve Your Chair with Master Barber Directly
              </h3>
              <p className="text-xs text-neutral-400 max-w-xl">
                Walk-ins welcomed upon availability. Call or WhatsApp our chair coordinator to lock in your preferred barber and guaranteed zero-wait chair slot.
              </p>
              <div className={`flex flex-wrap items-center gap-3 pt-1 text-xs text-neutral-300 ${isMobileView ? 'justify-center' : ''}`}>
                <span className="flex items-center gap-1 font-bold">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Tuesday &ndash; Sunday: 09:30 AM &ndash; 09:00 PM (Mondays Closed)</span>
                </span>
                <span className="text-neutral-600">&bull;</span>
                <span className="text-neutral-400">Vastrapur Lake Road, Ahmedabad</span>
              </div>
            </div>

            <div className={`flex flex-wrap items-center gap-3 shrink-0 ${isMobileView ? 'w-full flex-col' : ''}`}>
              <a
                href="tel:+919825034567"
                className={`px-5 py-3 rounded-2xl bg-[#7D4047] hover:bg-[#67333a] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-wine transition-all ${isMobileView ? 'w-full justify-center' : ''}`}
              >
                <Phone className="w-4 h-4" />
                <span>Call Chair Desk: +91 98250 34567</span>
              </a>
              <a
                href="https://wa.me/919825034567"
                target="_blank"
                rel="noreferrer"
                className={`px-4 py-3 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${isMobileView ? 'w-full justify-center' : ''}`}
              >
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Gentleman Testimonials */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
          <span className="text-[10px] sm:text-xs font-bold text-amber-400 uppercase tracking-widest">Client Testimonials</span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
            Endorsed by Ahmedabad Gentlemen
          </h2>
        </div>

        <div className={`grid gap-4 ${isMobileView ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
          <div className="bg-[#1e1e1e] p-5 rounded-2xl border border-neutral-800 shadow-sm space-y-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
            </div>
            <p className="text-xs text-neutral-300 italic leading-relaxed">
              "Ravi gives the cleanest mid-skin taper fade in the city. The hot towel compress with eucalyptus oil after the shave is pure therapeutic bliss."
            </p>
            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs">
              <span className="font-bold text-white">Yashpal Jadeja</span>
              <span className="text-neutral-400 text-[11px]">Architect, Bodakdev</span>
            </div>
          </div>

          <div className="bg-[#1e1e1e] p-5 rounded-2xl border border-neutral-800 shadow-sm space-y-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
            </div>
            <p className="text-xs text-neutral-300 italic leading-relaxed">
              "No chaotic queues or blaring loud music. You sit down with a fresh espresso, Salman takes his time to sculpt your beard with razor precision. Top tier."
            </p>
            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs">
              <span className="font-bold text-white">Siddharth Mehta</span>
              <span className="text-neutral-400 text-[11px]">Tech Founder, SG Highway</span>
            </div>
          </div>

          <div className="bg-[#1e1e1e] p-5 rounded-2xl border border-neutral-800 shadow-sm space-y-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
            </div>
            <p className="text-xs text-neutral-300 italic leading-relaxed">
              "I get the Executive Grooming Combo every fortnight before client presentations. Their keratin scalp wash and styling keep you looking sharp."
            </p>
            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs">
              <span className="font-bold text-white">Arjun Patel</span>
              <span className="text-neutral-400 text-[11px]">Vastrapur, Ahmedabad</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Complete Barbershop Footer */}
      <footer className="bg-black text-white pt-10 pb-6 px-4 sm:px-6 border-t border-neutral-800">
        <div className={`max-w-7xl mx-auto grid pb-8 border-b border-neutral-800 ${isMobileView ? 'grid-cols-1 gap-6 text-center' : 'grid-cols-1 md:grid-cols-4 gap-8'}`}>
          <div className={`space-y-3 md:col-span-1 ${isMobileView ? 'flex flex-col items-center' : ''}`}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#7D4047] text-white flex items-center justify-center font-bold">
                <Scissors className="w-4 h-4" />
              </div>
              <span className="font-heading font-black text-sm text-white tracking-widest uppercase">THE URBAN GENTLEMAN</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Old-school barber tradition meets modern hair aesthetics for the discerning gentleman.
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-amber-400 uppercase tracking-widest text-[11px]">Chair Schedule</h4>
            <p className="text-neutral-300">Tuesday &ndash; Saturday: 09:30 AM &ndash; 09:00 PM</p>
            <p className="text-neutral-300">Sunday: 09:30 AM &ndash; 08:00 PM</p>
            <p className="text-neutral-500 text-[11px]">Mondays Dedicated Blade Maintenance</p>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-amber-400 uppercase tracking-widest text-[11px]">Lounge Location</h4>
            <p className="text-neutral-300">Opp. Alpha One Mall, Vastrapur Lake Road,</p>
            <p className="text-neutral-300">Ahmedabad, Gujarat 380015</p>
            <p className="text-neutral-500 text-[11px]">Valet & Basement Parking Available</p>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-amber-400 uppercase tracking-widest text-[11px]">Chair Desk</h4>
            <p className="text-neutral-300">Direct Line: +91 98250 34567</p>
            <p className="text-neutral-300">WhatsApp Desk: +91 98250 34567</p>
            <p className="text-neutral-500 text-[11px]">Walk-ins & Appointments Welcome</p>
          </div>
        </div>

        <div className={`max-w-7xl mx-auto pt-6 flex items-center justify-between text-xs text-neutral-500 gap-2 ${isMobileView ? 'flex-col text-center' : 'flex-col sm:flex-row'}`}>
          <span>&copy; {new Date().getFullYear()} The Urban Gentleman Barbershop. All Rights Reserved.</span>
          <span>Crafted with pure performance &bull; Powered by THE WEBCRAFT</span>
        </div>
      </footer>

      {/* 5. Demo Project Banner */}
      <div className={`bg-black text-white p-3 sm:p-4 flex items-center justify-between gap-2 text-xs border-t border-neutral-800 ${isMobileView ? 'flex-col text-center' : 'flex-col sm:flex-row'}`}>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <span><strong>Client Demo:</strong> The Urban Gentleman Barbershop &bull; Built by <strong>THE WEBCRAFT</strong></span>
        </div>
        <button
          onClick={onOrderDesign}
          className={`px-3.5 py-1.5 rounded-lg bg-[#7D4047] hover:bg-[#67333a] text-white font-bold flex items-center gap-1.5 ${isMobileView ? 'w-full justify-center' : ''}`}
        >
          <span>Order A Barbershop Website (Zero Pay)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
