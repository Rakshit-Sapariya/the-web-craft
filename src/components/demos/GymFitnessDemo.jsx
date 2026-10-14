import React, { useState } from 'react';
import { 
  Dumbbell, Calendar, Clock, Star, Phone, MapPin, 
  CheckCircle2, ArrowRight, ShieldCheck, Zap, Flame, Award, Check 
} from 'lucide-react';

export default function GymFitnessDemo({ onOrderDesign, isMobileView }) {
  const [selectedPlan, setSelectedPlan] = useState('annual');
  const [trialForm, setTrialForm] = useState({ name: '', phone: '', goal: 'Muscle Building & Strength' });
  const [trialSuccess, setTrialSuccess] = useState(false);

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

  const handleTrialSubmit = (e) => {
    e.preventDefault();
    setTrialSuccess(true);
  };

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
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80" 
                alt="Gym Weight Training" 
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

      {/* 4. Free 1-Day Trial Form */}
      <section id="trial" className="bg-neutral-950 border-t border-neutral-800 py-10 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto bg-[#1c1c1c] p-6 rounded-3xl border border-neutral-800 shadow-xl">
          <div className="text-center mb-6 space-y-1">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Zero Commitment</span>
            <h3 className="text-lg sm:text-xl font-extrabold text-white">Claim Free 1-Day Workout Pass</h3>
            <p className="text-xs text-neutral-400">Experience our arena, steam room, and trainers for free.</p>
          </div>

          {!trialSuccess ? (
            <form onSubmit={handleTrialSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-300 font-bold mb-1">Primary Fitness Goal</label>
                <select
                  value={trialForm.goal}
                  onChange={(e) => setTrialForm({ ...trialForm, goal: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-700 bg-neutral-900 text-white text-xs"
                >
                  <option>Muscle Building & Strength Hypertrophy</option>
                  <option>Fat Loss & Athletic Conditioning</option>
                  <option>CrossFit & Functional Mobility</option>
                  <option>Cardiovascular Health & Stamina</option>
                </select>
              </div>

              <div className={`grid gap-3 ${isMobileView ? 'grid-cols-1' : 'grid-cols-2'}`}>
                <div>
                  <label className="block text-neutral-300 font-bold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Manan Dave"
                    value={trialForm.name}
                    onChange={(e) => setTrialForm({ ...trialForm, name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-700 bg-neutral-900 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-bold mb-1">WhatsApp Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9825000000"
                    value={trialForm.phone}
                    onChange={(e) => setTrialForm({ ...trialForm, phone: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-neutral-700 bg-neutral-900 text-white text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#7D4047] hover:bg-[#67333a] text-white font-bold text-xs uppercase tracking-wider shadow-wine mt-2"
              >
                Send Me Free Gym Pass On WhatsApp
              </button>
            </form>
          ) : (
            <div className="text-center py-4 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="font-heading font-extrabold text-base text-white">Free Pass Generated!</h4>
              <p className="text-xs text-neutral-300">
                Welcome, {trialForm.name}! Your 1-Day Free Arena Pass has been dispatched to your WhatsApp. Show it at reception.
              </p>
              <button
                onClick={() => setTrialSuccess(false)}
                className="text-[11px] text-amber-400 font-bold underline"
              >
                Claim another pass
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 5. Demo Project Banner */}
      <div className="bg-black text-white p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs border-t border-neutral-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <span><strong>Client Demo:</strong> IronCore Elite Fitness &bull; Built by <strong>THE WEBCRAFT</strong></span>
        </div>
        <button
          onClick={onOrderDesign}
          className="px-3.5 py-1.5 rounded-lg bg-[#7D4047] hover:bg-[#67333a] text-white font-bold flex items-center gap-1.5"
        >
          <span>Order A Gym Website (₹5k Adv)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
