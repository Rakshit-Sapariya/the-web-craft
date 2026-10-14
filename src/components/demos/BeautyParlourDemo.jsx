import React, { useState } from 'react';
import { 
  Sparkles, Calendar, Clock, Star, Phone, MapPin, 
  CheckCircle2, ArrowRight, Heart, Scissors, UserCheck 
} from 'lucide-react';

export default function BeautyParlourDemo({ onOrderDesign, isMobileView }) {
  const [selectedCategory, setSelectedCategory] = useState('Bridal');
  const [bookingForm, setBookingForm] = useState({
    service: 'Signature HD Bridal Makeup',
    date: '2026-10-22',
    time: '11:00 AM',
    clientName: '',
    phone: '',
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

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

  const handleBook = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
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
                src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80" 
                alt="Bridal Makeup"
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

      {/* 5. Online Appointment Booking Form */}
      <section id="book" className="bg-[#FAF6F3] border-t border-[#DDD5CD] py-10 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-3xl border border-[#DDD5CD] shadow-md">
          <div className="text-center mb-6 space-y-1">
            <span className="text-[10px] font-bold text-[#7D4047] uppercase tracking-wider">Hassle-Free Booking</span>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#2E2E2E]">Schedule Your Salon Visit</h3>
            <p className="text-xs text-[#625f5c]">Instant WhatsApp confirmation sent to your number.</p>
          </div>

          {!bookingSuccess ? (
            <form onSubmit={handleBook} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#2E2E2E] mb-1">Select Service</label>
                <select
                  value={bookingForm.service}
                  onChange={(e) => setBookingForm({ ...bookingForm, service: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDD5CD] bg-[#F1ECE6]/30 text-xs"
                >
                  <option>Signature HD Airbrush Bridal Makeup (₹14,999)</option>
                  <option>Pre-Bridal Luxury Radiance Package (₹8,499)</option>
                  <option>Sangeet & Engagement Glam Look (₹5,999)</option>
                  <option>Brazilian Nanoplastia Keratin (₹4,999)</option>
                  <option>Korean Glass Skin Facial (₹3,499)</option>
                </select>
              </div>

              <div className={`grid gap-3 ${isMobileView ? 'grid-cols-1' : 'grid-cols-2'}`}>
                <div>
                  <label className="block font-bold text-[#2E2E2E] mb-1">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5CD] bg-[#F1ECE6]/30 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#2E2E2E] mb-1">Preferred Time Slot</label>
                  <select
                    value={bookingForm.time}
                    onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5CD] bg-[#F1ECE6]/30 text-xs"
                  >
                    <option>10:00 AM &ndash; Morning Slot</option>
                    <option>12:30 PM &ndash; Afternoon Slot</option>
                    <option>04:00 PM &ndash; Evening Slot</option>
                    <option>06:30 PM &ndash; Prime Slot</option>
                  </select>
                </div>
              </div>

              <div className={`grid gap-3 ${isMobileView ? 'grid-cols-1' : 'grid-cols-2'}`}>
                <div>
                  <label className="block font-bold text-[#2E2E2E] mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Khushi Trivedi"
                    value={bookingForm.clientName}
                    onChange={(e) => setBookingForm({ ...bookingForm, clientName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5CD] bg-[#F1ECE6]/30 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#2E2E2E] mb-1">WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9825000000"
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5CD] bg-[#F1ECE6]/30 text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#7D4047] hover:bg-[#67333a] text-white font-bold text-xs uppercase tracking-wider shadow-wine mt-2"
              >
                Confirm Salon Slot
              </button>
            </form>
          ) : (
            <div className="text-center py-4 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-heading font-extrabold text-base text-[#2E2E2E]">Appointment Reserved!</h4>
              <p className="text-xs text-[#625f5c]">
                Thank you, {bookingForm.clientName}! Your slot for {bookingForm.service} on {bookingForm.date} at {bookingForm.time} is reserved. We will ping you on WhatsApp.
              </p>
              <button
                onClick={() => setBookingSuccess(false)}
                className="text-[11px] text-[#7D4047] font-bold underline"
              >
                Book another appointment
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 6. Demo Project Floating Banner */}
      <div className="bg-[#2E2E2E] text-white p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs border-t border-[#DDD5CD]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-pink-400 animate-pulse" />
          <span><strong>Client Demo:</strong> Glamour & Glow Salon &bull; Built by <strong>THE WEBCRAFT</strong></span>
        </div>
        <button
          onClick={onOrderDesign}
          className="px-3.5 py-1.5 rounded-lg bg-[#7D4047] hover:bg-[#67333a] text-white font-bold flex items-center gap-1.5"
        >
          <span>Get A Salon Website (₹5k Adv)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
