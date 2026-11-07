import React, { useState } from 'react';
import { 
  Dumbbell, Calendar, Clock, Star, Phone, MapPin, 
  CheckCircle2, ArrowRight, ShieldCheck, Zap, Flame, Award, Check 
} from 'lucide-react';

export default function GymFitnessDemo({ onOrderDesign, isMobileView }) {
  const [selectedPlan, setSelectedPlan] = useState('annual');

  const plans = [
    {
      id: 'monthly',
      name: '1-Month Kickstart',
      price: '₹2,200',
      period: 'per month',
      features: ['Full Gym Floor Access', 'Cardio & Strength Zone', 'General Fitness Guidance', 'Locker & Shower Access'],
      badge: 'Flexible',
    },
    {
      id: 'quarterly',
      name: '3-Month Shred',
      price: '₹5,499',
      period: 'for 3 months',
      features: ['All Monthly Features', 'Free Diet & Nutrition Chart', 'Weekly Body Composition Scan', 'CrossFit & HIIT Sessions'],
      badge: 'Popular',
    },
    {
      id: 'annual',
      name: '12-Month Elite Athlete',
      price: '₹13,999',
      period: 'for 12 months',
      features: ['All Gym & CrossFit Access', '5 Free Personal Trainer Sessions', 'Steam, Sauna & Ice Bath', 'Free Workout Apparel & Shaker', '2 Months Pause Facility'],
      badge: 'Best Value',
    },
  ];

  return (
    <div className="bg-[#111] text-white font-sans antialiased min-h-screen">
      
      {/* 1. Header */}
      <header className="bg-black/90 border-b border-neutral-800 sticky top-0 z-20 px-4 py-3">
        <div className={`mx-auto flex items-center justify-between ${isMobileView ? 'flex-col gap-2' : 'max-w-7xl h-16'}`}>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#7D4047] text-white flex items-center justify-center font-bold shadow-sm">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <span className="font-heading font-black text-lg text-white tracking-widest uppercase">IRONCORE FITNESS</span>
              <p className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">CrossFit & Strength Arena</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-400 hidden sm:inline">Prahladnagar &bull; Ahmedabad</span>
            <a
              href="#trial"
              className="px-4 py-1.5 rounded-xl bg-[#7D4047] hover:bg-[#67333a] text-white text-xs font-bold uppercase tracking-wider shadow-wine"
            >
              Get Free Pass
            </a>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 border-b border-neutral-800 relative bg-gradient-to-b from-neutral-900 to-black">
        <div className={`mx-auto ${isMobileView ? 'space-y-4' : 'max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'}`}>
          <div className={`${isMobileView ? 'space-y-3' : 'lg:col-span-7 space-y-4'}`}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest border border-amber-400/20">
              <Flame className="w-3.5 h-3.5" />
              <span>Gujarat's Largest 15,000 Sq.Ft Training Facility</span>
            </span>
            <h1 className={`font-heading font-black text-white leading-tight uppercase tracking-tight ${isMobileView ? 'text-2xl' : 'text-3xl sm:text-5xl'}`}>
              Forge Unbreakable Strength & Peak Athleticism.
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-xl">
              Rogue Olympic barbells, Hammer Strength machines, certified sports nutritionists, and high-intensity CrossFit metabolic conditioning.
            </p>
            <div className="pt-2 flex flex-wrap gap-2.5">
              <a
                href="#trial"
                className="px-5 py-2.5 rounded-xl bg-[#7D4047] hover:bg-[#67333a] text-white text-xs font-bold uppercase tracking-wider shadow-wine"
              >
                Claim 1-Day Free Trial
              </a>
              <button
                onClick={onOrderDesign}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
              >
                <span>Order A Gym Website (₹5k Adv)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className={`${isMobileView ? 'pt-2' : 'lg:col-span-5'}`}>
            <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-neutral-700 aspect-[4/3]">
              <img 
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80" 
                alt="Elite Gym & Fitness Center" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Membership Plans */}
      <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
          <span className="text-[10px] sm:text-xs font-bold text-amber-400 uppercase tracking-widest">Transparent Fees</span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">Membership Tiers</h2>
        </div>

        <div className={`grid gap-4 ${isMobileView ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-3'}`}>
          {plans.map((p) => {
            const isSelected = selectedPlan === p.id;
            return (
              <div 
                key={p.id}
                onClick={() => setSelectedPlan(p.id)}
                className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between cursor-pointer ${
                  isSelected 
                    ? 'border-[#7D4047] bg-[#1a1a1a] shadow-xl' 
                    : 'border-neutral-800 bg-[#161616] hover:border-neutral-700'
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">{p.badge}</span>
                    {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-[#7D4047]" />}
                  </div>
                  <h3 className="font-heading font-extrabold text-lg text-white">{p.name}</h3>
                  <div className="py-3 border-y border-neutral-800 my-3">
                    <span className="font-black text-2xl sm:text-3xl text-white font-mono">{p.price}</span>
                    <span className="text-xs text-neutral-400 ml-1.5">{p.period}</span>
                  </div>

                  <ul className="space-y-2 text-xs text-neutral-300">
                    {p.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#7D4047] shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-800">
                  <a
                    href="#trial"
                    className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#7D4047] text-white hover:bg-[#67333a]'
                        : 'bg-neutral-800 text-neutral-300 hover:text-white'
                    }`}
                  >
                    Select Membership
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Arena Facilities & VIP Training Standards */}
      <section id="trial" className="bg-neutral-950 border-t border-neutral-800 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-[10px] sm:text-xs font-bold text-amber-400 uppercase tracking-widest">Elite Training Facility</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
              World-Class Equipment & Recovery Suite
            </h2>
            <p className="text-xs text-neutral-400">
              Built for serious lifters, athletic conditioning, and holistic physical performance.
            </p>
          </div>

          <div className={`grid gap-5 ${isMobileView ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
            <div className="bg-[#1c1c1c] rounded-3xl p-6 border border-neutral-800 shadow-xl flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase">Power & Hypertrophy</span>
                  <h3 className="font-heading font-extrabold text-base text-white mt-0.5">Olympic Calibrated Barbells & Racks</h3>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  6 Swedish Eleiko weightlifting platforms, Rogue competition power cages, machined steel calibrated plates, and dumbbells extending up to 60 kg.
                </p>
              </div>
              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-300">
                <span><strong>Lifting Zones:</strong> 6 Dedicated Pods</span>
                <span className="text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded">Eleiko Certified</span>
              </div>
            </div>

            <div className="bg-[#1c1c1c] rounded-3xl p-6 border border-neutral-800 shadow-xl flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase">Bio-Recovery Suite</span>
                  <h3 className="font-heading font-extrabold text-base text-white mt-0.5">Finnish Sauna & 8°C Ice Plunge</h3>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Dual contrast therapy zone with infrared dry sauna chambers, 8°C filtered ice cold plunge tubs, and Theragun pro recovery stations to flush lactic acid.
                </p>
              </div>
              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-300">
                <span><strong>Access:</strong> All Members</span>
                <span className="text-cyan-400 font-bold bg-cyan-400/10 px-2 py-0.5 rounded">Cold Plunge</span>
              </div>
            </div>

            <div className="bg-[#1c1c1c] rounded-3xl p-6 border border-neutral-800 shadow-xl flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase">Body Diagnostics</span>
                  <h3 className="font-heading font-extrabold text-base text-white mt-0.5">InBody 770 Clinical Scanner</h3>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Medical-grade multi-frequency bioelectrical impedance analysis. Monthly tracking of visceral fat, skeletal muscle mass balance, and intracellular hydration.
                </p>
              </div>
              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-300">
                <span><strong>Tracking:</strong> Monthly Audit</span>
                <span className="text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded">Free for Members</span>
              </div>
            </div>
          </div>

          {/* Front Desk Reception Strip */}
          <div className={`bg-[#1c1c1c] rounded-3xl p-5 sm:p-8 border border-neutral-800 shadow-xl flex items-center justify-between gap-6 ${isMobileView ? 'flex-col text-center' : 'flex-col lg:flex-row text-center lg:text-left'}`}>
            <div className={`space-y-1.5 ${isMobileView ? 'text-center' : 'text-center lg:text-left'}`}>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Direct Reception Desk</span>
              <h3 className="text-base sm:text-lg font-extrabold text-white font-heading">
                Visit the Arena & Meet with Head Coaches
              </h3>
              <p className="text-xs text-neutral-400 max-w-xl">
                Tour our 12,000 sq.ft facility in person. Walk-in tours available daily. Front desk handles direct enrollment, trainer pairing, and facility passes.
              </p>
              <div className={`flex flex-wrap items-center gap-3 pt-1 text-xs text-neutral-300 ${isMobileView ? 'justify-center' : ''}`}>
                <span className="flex items-center gap-1 font-bold">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Mon &ndash; Sat: 05:30 AM &ndash; 11:00 PM &bull; Sun: 07:00 AM &ndash; 02:00 PM</span>
                </span>
                <span className="text-neutral-600">&bull;</span>
                <span className="text-neutral-400">SG Highway (Opp. Rajpath Club), Ahmedabad</span>
              </div>
            </div>

            <div className={`flex flex-wrap items-center gap-3 shrink-0 ${isMobileView ? 'w-full flex-col' : ''}`}>
              <a
                href="tel:+919825045678"
                className={`px-5 py-3 rounded-2xl bg-[#7D4047] hover:bg-[#67333a] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-wine transition-all ${isMobileView ? 'w-full justify-center' : ''}`}
              >
                <Phone className="w-4 h-4" />
                <span>Call Front Desk: +91 98250 45678</span>
              </a>
              <a
                href="https://wa.me/919825045678"
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

      {/* 5. Athlete Testimonials */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
          <span className="text-[10px] sm:text-xs font-bold text-amber-400 uppercase tracking-widest">Athlete Feedback</span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
            Trained Over 3,500 Athletes in Gujarat
          </h2>
        </div>

        <div className={`grid gap-4 ${isMobileView ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
          <div className="bg-[#1c1c1c] p-5 rounded-2xl border border-neutral-800 shadow-sm space-y-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
            </div>
            <p className="text-xs text-neutral-300 italic leading-relaxed">
              "Dropped 14 kg in 4 months under their head coach's guidance. The Eleiko lifting platforms and lack of waiting for squat racks makes it Ahmedabad's premier gym."
            </p>
            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs">
              <span className="font-bold text-white">Manan Dave</span>
              <span className="text-neutral-400 text-[11px]">Marathoner & Powerlifter</span>
            </div>
          </div>

          <div className="bg-[#1c1c1c] p-5 rounded-2xl border border-neutral-800 shadow-sm space-y-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
            </div>
            <p className="text-xs text-neutral-300 italic leading-relaxed">
              "The ice plunge and dry cedar sauna after intense functional CrossFit sessions is game-changing. Never felt so energized for high-stress clinic work."
            </p>
            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs">
              <span className="font-bold text-white">Dr. Pooja Mehta</span>
              <span className="text-neutral-400 text-[11px]">Orthopedic Surgeon</span>
            </div>
          </div>

          <div className="bg-[#1c1c1c] p-5 rounded-2xl border border-neutral-800 shadow-sm space-y-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
            </div>
            <p className="text-xs text-neutral-300 italic leading-relaxed">
              "Best hygienic gym in western Ahmedabad. Certified trainers actually spot you on bench press and fix your deadlift form instead of pushing unnecessary supplements."
            </p>
            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs">
              <span className="font-bold text-white">Kunal Shah</span>
              <span className="text-neutral-400 text-[11px]">Investment Banker, Bodakdev</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Complete Gym Footer */}
      <footer className="bg-black text-white pt-10 pb-6 px-4 sm:px-6 border-t border-neutral-800">
        <div className={`max-w-7xl mx-auto grid pb-8 border-b border-neutral-800 ${isMobileView ? 'grid-cols-1 gap-6 text-center' : 'grid-cols-1 md:grid-cols-4 gap-8'}`}>
          <div className={`space-y-3 md:col-span-1 ${isMobileView ? 'flex flex-col items-center' : ''}`}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#7D4047] text-white flex items-center justify-center font-bold">
                <Dumbbell className="w-4 h-4" />
              </div>
              <span className="font-heading font-black text-sm text-white tracking-widest uppercase">IRONCORE ELITE</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              12,000 sq.ft state-of-the-art strength arena, bio-recovery suite, and athletic training center.
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-amber-400 uppercase tracking-widest text-[11px]">Arena Hours</h4>
            <p className="text-neutral-300">Monday &ndash; Saturday: 05:30 AM &ndash; 11:00 PM</p>
            <p className="text-neutral-300">Sunday: 07:00 AM &ndash; 02:00 PM</p>
            <p className="text-neutral-500 text-[11px]">365 Days Uninterrupted Access</p>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-amber-400 uppercase tracking-widest text-[11px]">Location & Parking</h4>
            <p className="text-neutral-300">Opp. Rajpath Club, SG Highway,</p>
            <p className="text-neutral-300">Bodakdev, Ahmedabad 380054</p>
            <p className="text-neutral-500 text-[11px]">Ample Covered Basement Parking</p>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-amber-400 uppercase tracking-widest text-[11px]">Front Desk</h4>
            <p className="text-neutral-300">Reception: +91 98250 45678</p>
            <p className="text-neutral-300">WhatsApp: +91 98250 45678</p>
            <p className="text-neutral-500 text-[11px]">Daily Facility Walkthroughs</p>
          </div>
        </div>

        <div className={`max-w-7xl mx-auto pt-6 flex items-center justify-between text-xs text-neutral-500 gap-2 ${isMobileView ? 'flex-col text-center' : 'flex-col sm:flex-row'}`}>
          <span>&copy; {new Date().getFullYear()} IronCore Elite Fitness. All Rights Reserved.</span>
          <span>Crafted with pure performance &bull; Powered by THE WEBCRAFT</span>
        </div>
      </footer>

      {/* 5. Demo Project Banner */}
      <div className={`bg-black text-white p-3 sm:p-4 flex items-center justify-between gap-2 text-xs border-t border-neutral-800 ${isMobileView ? 'flex-col text-center' : 'flex-col sm:flex-row'}`}>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <span><strong>Client Demo:</strong> IronCore Elite Fitness &bull; Built by <strong>THE WEBCRAFT</strong></span>
        </div>
        <button
          onClick={onOrderDesign}
          className={`px-3.5 py-1.5 rounded-lg bg-[#7D4047] hover:bg-[#67333a] text-white font-bold flex items-center gap-1.5 ${isMobileView ? 'w-full justify-center' : ''}`}
        >
          <span>Order A Gym Website (₹5k Adv)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
