import React, { useState } from 'react';
import { 
  UtensilsCrossed, Calendar, Users, Clock, Star, 
  MapPin, Phone, ArrowRight, CheckCircle2, Sparkles 
} from 'lucide-react';

export default function RestaurantClientDemo({ onOrderDesign, isMobileView }) {
  const [activeMenuCategory, setActiveMenuCategory] = useState('Kebabs');
  const [reserveForm, setReserveForm] = useState({
    guests: '4 Guests',
    date: '2026-10-15',
    time: '08:30 PM',
    seating: 'Open Courtyard by Fountain',
    name: '',
    phone: ''
  });
  const [reserveSuccess, setReserveSuccess] = useState(false);

  const menuItems = {
    'Kebabs': [
      {
        name: 'Dhungar Paneer Tikka Angara',
        desc: 'Charcoal-smoked organic cottage cheese marinated in yellow mustard, Kashmiri chili & roasted gram flour.',
        price: '₹420',
        veg: true,
        tag: 'Chef Special',
        rating: 4.9
      },
      {
        name: 'Galouti Mushroom Kebab Melt',
        desc: 'Silky melt-in-mouth smoked button mushrooms infused with 24 Awadhi spices on saffron mini sheermal.',
        price: '₹480',
        veg: true,
        tag: 'Must Try',
        rating: 5.0
      },
      {
        name: 'Zaffrani Malai Soya Chaap',
        desc: 'Tender soya batons steeped overnight in cardamom cream, royal saffron and finished in the tandoor.',
        price: '₹390',
        veg: true,
        tag: 'Popular',
        rating: 4.8
      }
    ],
    'Curries': [
      {
        name: 'Dal Saffron Bukhara 24-Hours Slow Cooked',
        desc: 'Whole black lentils gently simmered over slow charcoal embers with organic white butter & ripe plum tomatoes.',
        price: '₹460',
        veg: true,
        tag: 'Signature',
        rating: 5.0
      },
      {
        name: 'Awadhi Kaju Paneer Lababdar',
        desc: 'Crushed cashew nut gravy cooked with hand-torn fresh paneer, bell peppers and finished with royal kasoori methi.',
        price: '₹490',
        veg: true,
        tag: 'Bestseller',
        rating: 4.9
      },
      {
        name: 'Nizami Subz Handi Biryani',
        desc: 'Long grain aged basmati rice layered with baby vegetables, fragrant rose water and sealed in earthen clay pot.',
        price: '₹520',
        veg: true,
        tag: 'Dum Pukht',
        rating: 4.8
      }
    ],
    'Desserts': [
      {
        name: 'Shahi Tukda with Rabdi Snow',
        desc: 'Crisp ghee-fried milk brioche soaked in saffron cardamom syrup, topped with frozen malai rabdi.',
        price: '₹280',
        veg: true,
        tag: 'Royal Treat',
        rating: 4.9
      },
      {
        name: 'Pistachio Baklava with Rose Ice Cream',
        desc: '32 micro-layers of paper-thin filo pastry layered with Antep pistachios and artisanal gulkand churn.',
        price: '₹340',
        veg: true,
        tag: 'House Special',
        rating: 5.0
      }
    ]
  };

  const handleReserve = (e) => {
    e.preventDefault();
    setReserveSuccess(true);
  };

  return (
    <div className="bg-[#FAF9F6] text-[#222] font-sans antialiased min-h-screen">
      
      {/* 1. Address & Reservation Strip */}
      <div className="bg-[#7D4047] text-white text-[10px] sm:text-[11px] py-1.5 px-3 flex flex-col sm:flex-row items-center justify-between gap-1">
        <div className="flex items-center gap-2">
          <MapPin className="w-3 h-3 text-amber-200 shrink-0" />
          <span>Sindhu Bhavan Road, Bodakdev, Ahmedabad</span>
        </div>
        <div className="flex items-center gap-2 font-bold">
          <Clock className="w-3 h-3 text-amber-200 shrink-0" />
          <span>12:00 PM &ndash; 11:30 PM (All Days)</span>
        </div>
      </div>

      {/* 2. Restaurant Navigation */}
      <header className="bg-white border-b border-[#DDD5CD] sticky top-0 z-20 px-3 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#7D4047] text-amber-200 flex items-center justify-center font-bold">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <span className="font-heading font-black text-lg sm:text-xl text-[#2E2E2E] tracking-tight">THE SAFFRON COURTYARD</span>
              <p className="text-[9px] text-[#7D4047] tracking-widest uppercase font-semibold">Heritage Awadhi Dining</p>
            </div>
          </div>

          <a
            href="#reservation"
            className="px-3.5 py-1.5 rounded-xl bg-[#7D4047] text-white text-xs font-bold uppercase tracking-wider"
          >
            Reserve
          </a>
        </div>
      </header>

      {/* 3. Hero Section */}
      <section className="relative py-10 sm:py-20 bg-[#2E2E2E] text-white overflow-hidden px-4 sm:px-6">
        <div className="absolute inset-0 opacity-30 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80" 
            alt="Courtyard Restaurant Ambient"
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />

        <div className={`mx-auto relative z-20 ${isMobileView ? 'space-y-4' : 'max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'}`}>
          <div className={`${isMobileView ? 'space-y-3' : 'lg:col-span-7 space-y-4'}`}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-[10px] sm:text-xs font-bold uppercase tracking-widest border border-white/20">
              <Sparkles className="w-3 h-3" />
              <span>Times Food Award: Best Awadhi Dining</span>
            </div>
            <h1 className={`font-extrabold font-heading leading-tight ${isMobileView ? 'text-2xl' : 'text-3xl sm:text-5xl'}`}>
              An Ode to Royal Nawabi Feasts Under Open Skies.
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl leading-relaxed">
              Experience centuries-old royal recipes slow-cooked over coal fires in handcrafted brass pots. Enjoy candlelit seating beside our historic marble fountains.
            </p>
            <div className="pt-2 flex flex-wrap gap-2.5 items-center">
              <a
                href="#reservation"
                className="px-5 py-2.5 rounded-xl bg-[#7D4047] hover:bg-[#67333a] text-white font-bold text-xs uppercase tracking-wider shadow-wine"
              >
                Reserve Your Table
              </a>
              <button
                onClick={onOrderDesign}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
              >
                <span>Order Restaurant Site (₹5k Adv)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Highlights Box */}
          <div className={`${isMobileView ? 'pt-2' : 'lg:col-span-5'} bg-white/95 backdrop-blur-md text-[#2E2E2E] p-5 rounded-3xl shadow-2xl border border-white/40 space-y-3`}>
            <div className="flex items-center justify-between border-b border-[#DDD5CD] pb-2.5">
              <div>
                <span className="text-[10px] font-bold text-[#7D4047] uppercase tracking-wider">Guest Rating</span>
                <div className="flex items-center gap-1 text-amber-500 font-extrabold text-base mt-0.5">
                  <Star className="w-4 h-4 fill-current" />
                  <span>4.9 / 5.0</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#625f5c]">Google Reviews</span>
                <p className="text-xs font-bold text-[#2E2E2E]">3,420+ Diners</p>
              </div>
            </div>
            <p className="text-xs text-[#625f5c] italic leading-relaxed">
              "The finest Dal Bukhara and Galouti Kebab in Gujarat. Courtyard ambiance with live sitar in evening is unmatched."
            </p>
          </div>
        </div>
      </section>

      {/* 4. Interactive A La Carte Menu */}
      <section id="menu" className="py-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-6 space-y-1">
          <span className="text-[10px] sm:text-xs font-bold text-[#7D4047] uppercase tracking-wider">Gastronomy</span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#2E2E2E] font-heading">
            Royal A La Carte Highlights
          </h2>
        </div>

        {/* Menu category pills */}
        <div className="flex justify-center gap-2 mb-6">
          {['Kebabs', 'Curries', 'Desserts'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveMenuCategory(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeMenuCategory === cat
                  ? 'bg-[#7D4047] text-white shadow-wine'
                  : 'bg-white border border-[#DDD5CD] text-[#2E2E2E]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items Cards */}
        <div className={`grid gap-4 ${isMobileView ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-3'}`}>
          {menuItems[activeMenuCategory].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-[#DDD5CD] p-5 shadow-soft flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-4 h-4 border border-emerald-600 p-0.5 rounded-sm flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-600" />
                  </div>
                  <span className="text-[9px] font-bold text-[#7D4047] bg-[#7D4047]/10 px-2 py-0.5 rounded">
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-heading font-extrabold text-sm sm:text-base text-[#2E2E2E] leading-snug">{item.name}</h3>
                <p className="text-xs text-[#625f5c] leading-relaxed">{item.desc}</p>
              </div>

              <div className="pt-3 border-t border-[#DDD5CD]/60 flex items-center justify-between">
                <span className="text-base font-black text-[#2E2E2E] font-mono">{item.price}</span>
                <span className="text-xs text-amber-500 font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{item.rating}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Online Table Reservation Form */}
      <section id="reservation" className="bg-[#F1ECE6] border-t border-[#DDD5CD] py-10 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-5 sm:p-8 border border-[#DDD5CD] shadow-sm">
          <div className="text-center mb-6 space-y-1">
            <span className="text-[10px] font-bold text-[#7D4047] uppercase tracking-wider">Zero Wait Time</span>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#2E2E2E] font-heading">
              Reserve An Evening At The Courtyard
            </h2>
            <p className="text-xs text-[#625f5c]">Instant table reservation confirmation pass.</p>
          </div>

          {!reserveSuccess ? (
            <form onSubmit={handleReserve} className="space-y-3 text-xs">
              <div className={`grid gap-3 ${isMobileView ? 'grid-cols-1' : 'grid-cols-2'}`}>
                <div>
                  <label className="block font-bold text-[#2E2E2E] mb-1">Number of Guests</label>
                  <select 
                    value={reserveForm.guests}
                    onChange={(e) => setReserveForm({ ...reserveForm, guests: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5CD] bg-[#F1ECE6]/40 text-xs"
                  >
                    <option>2 Guests (Couple Dining)</option>
                    <option>4 Guests (Family Table)</option>
                    <option>6 Guests (Celebration)</option>
                    <option>8+ Guests (Private Suite)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#2E2E2E] mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={reserveForm.date}
                    onChange={(e) => setReserveForm({ ...reserveForm, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5CD] bg-[#F1ECE6]/40 text-xs"
                  />
                </div>
              </div>

              <div className={`grid gap-3 ${isMobileView ? 'grid-cols-1' : 'grid-cols-2'}`}>
                <div>
                  <label className="block font-bold text-[#2E2E2E] mb-1">Time Slot</label>
                  <select 
                    value={reserveForm.time}
                    onChange={(e) => setReserveForm({ ...reserveForm, time: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5CD] bg-[#F1ECE6]/40 text-xs"
                  >
                    <option>07:00 PM (Early Dinner)</option>
                    <option>08:00 PM (Prime Hour)</option>
                    <option>08:45 PM (Live Sitar)</option>
                    <option>09:30 PM (Late Courtyard)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#2E2E2E] mb-1">Seating Ambience</label>
                  <select 
                    value={reserveForm.seating}
                    onChange={(e) => setReserveForm({ ...reserveForm, seating: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5CD] bg-[#F1ECE6]/40 text-xs"
                  >
                    <option>Open Courtyard by Fountain</option>
                    <option>AC Royal Glass Pavillion</option>
                    <option>Private Dining Chamber</option>
                  </select>
                </div>
              </div>

              <div className={`grid gap-3 ${isMobileView ? 'grid-cols-1' : 'grid-cols-2'}`}>
                <div>
                  <label className="block font-bold text-[#2E2E2E] mb-1">Guest Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Trivedi"
                    value={reserveForm.name}
                    onChange={(e) => setReserveForm({ ...reserveForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5CD] bg-[#F1ECE6]/40 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#2E2E2E] mb-1">Contact Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9825000000"
                    value={reserveForm.phone}
                    onChange={(e) => setReserveForm({ ...reserveForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5CD] bg-[#F1ECE6]/40 text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#7D4047] hover:bg-[#67333a] text-white font-bold text-xs uppercase tracking-wider shadow-wine mt-2"
              >
                Confirm Table Reservation
              </button>
            </form>
          ) : (
            <div className="text-center py-4 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-heading font-extrabold text-base text-[#2E2E2E]">Table Reserved Successfully!</h4>
              <p className="text-xs text-[#625f5c]">
                Hosting {reserveForm.guests} at {reserveForm.time} in our {reserveForm.seating}. SMS pass dispatched.
              </p>
              <button
                onClick={() => setReserveSuccess(false)}
                className="text-[11px] font-bold text-[#7D4047] underline"
              >
                Make another booking
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 6. Demo Project Floating Banner */}
      <div className="bg-[#2E2E2E] text-white p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs border-t border-[#DDD5CD]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <span><strong>Client Demo:</strong> The Saffron Courtyard &bull; Built by <strong>THE WEBCRAFT</strong></span>
        </div>
        <button
          onClick={onOrderDesign}
          className="px-3.5 py-1.5 rounded-lg bg-[#7D4047] hover:bg-[#67333a] text-white font-bold flex items-center gap-1"
        >
          <span>Order A Restaurant Site</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
