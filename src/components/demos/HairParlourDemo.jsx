import React, { useState } from 'react';
import { 
  Scissors, Calendar, Clock, Star, Phone, MapPin, 
  CheckCircle2, ArrowRight, ShieldCheck, Sparkles, User 
} from 'lucide-react';

export default function HairParlourDemo({ onOrderDesign, isMobileView }) {
  const [selectedStylist, setSelectedStylist] = useState('Senior Stylist - Ravi');
  const [barberBooking, setBarberBooking] = useState({
    service: 'Signature Fade & Beard Sculpting Combo',
    date: '2026-10-21',
    time: '05:00 PM',
    name: '',
    phone: '',
  });
  const [booked, setBooked] = useState(false);

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

  const handleBooking = (e) => {
    e.preventDefault();
    setBooked(true);
  };

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
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80" 
                alt="Barber Shop Styling" 
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

      {/* 4. Barber Appointment Booking */}
      <section id="book" className="bg-[#121212] border-t border-neutral-800 py-10 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto bg-[#1e1e1e] p-6 rounded-3xl border border-neutral-800 shadow-xl">
          <div className="text-center mb-6 space-y-1">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Fast Chair Booking</span>
            <h3 className="text-lg sm:text-xl font-extrabold text-white">Book Your Barber Chair</h3>
            <p className="text-xs text-neutral-400">Zero waiting queue. Walk in and get pampered.</p>
          </div>

          {!booked ? (
            <form onSubmit={handleBooking} className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-300 font-bold mb-1">Choose Master Stylist</label>
                <select
                  value={selectedStylist}
                  onChange={(e) => setSelectedStylist(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-700 bg-[#282828] text-white text-xs"
                >
                  <option>Senior Stylist &bull; Ravi (Fade Specialist - 8 yrs exp)</option>
                  <option>Master Barber &bull; Salman (Beard Architect - 10 yrs exp)</option>
                  <option>Style Director &bull; Karan (Hair Aesthetics - 12 yrs exp)</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-300 font-bold mb-1">Choose Service</label>
                <select
                  value={barberBooking.service}
                  onChange={(e) => setBarberBooking({ ...barberBooking, service: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-700 bg-[#282828] text-white text-xs"
                >
                  <option>Gentleman Executive Grooming Combo (₹1,199)</option>
                  <option>Precision Fade & Scissor Cut (₹450)</option>
                  <option>Royal Charcoal Beard Sculpting (₹350)</option>
                  <option>Keratin Scalp Detox Wash (₹799)</option>
                </select>
              </div>

              <div className={`grid gap-3 ${isMobileView ? 'grid-cols-1' : 'grid-cols-2'}`}>
                <div>
                  <label className="block text-neutral-300 font-bold mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={barberBooking.date}
                    onChange={(e) => setBarberBooking({ ...barberBooking, date: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-700 bg-[#282828] text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-bold mb-1">Time Slot</label>
                  <select
                    value={barberBooking.time}
                    onChange={(e) => setBarberBooking({ ...barberBooking, time: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-700 bg-[#282828] text-white text-xs"
                  >
                    <option>11:00 AM (Morning)</option>
                    <option>02:30 PM (Afternoon)</option>
                    <option>05:00 PM (Prime Evening)</option>
                    <option>07:30 PM (Late Shift)</option>
                  </select>
                </div>
              </div>

              <div className={`grid gap-3 ${isMobileView ? 'grid-cols-1' : 'grid-cols-2'}`}>
                <div>
                  <label className="block text-neutral-300 font-bold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Yashpal Jadeja"
                    value={barberBooking.name}
                    onChange={(e) => setBarberBooking({ ...barberBooking, name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-700 bg-[#282828] text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-bold mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9825000000"
                    value={barberBooking.phone}
                    onChange={(e) => setBarberBooking({ ...barberBooking, phone: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-700 bg-[#282828] text-white text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#7D4047] hover:bg-[#67333a] text-white font-bold text-xs uppercase tracking-wider shadow-wine mt-2"
              >
                Confirm Barber Chair Slot
              </button>
            </form>
          ) : (
            <div className="text-center py-4 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="font-heading font-extrabold text-base text-white">Chair Confirmed!</h4>
              <p className="text-xs text-neutral-300">
                See you on {barberBooking.date} at {barberBooking.time} with {selectedStylist}. SMS reminder dispatched.
              </p>
              <button
                onClick={() => setBooked(false)}
                className="text-[11px] text-amber-400 font-bold underline"
              >
                Book another chair
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 5. Demo Project Banner */}
      <div className="bg-black text-white p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs border-t border-neutral-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <span><strong>Client Demo:</strong> The Urban Gentleman Barbershop &bull; Built by <strong>THE WEBCRAFT</strong></span>
        </div>
        <button
          onClick={onOrderDesign}
          className="px-3.5 py-1.5 rounded-lg bg-[#7D4047] hover:bg-[#67333a] text-white font-bold flex items-center gap-1.5"
        >
          <span>Order A Barbershop Website (Zero Pay)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
