import React, { useState } from 'react';
import { 
  HeartPulse, ShieldCheck, Clock, Award, Star, 
  MapPin, Phone, Calendar, ArrowRight, CheckCircle2, Sparkles, User 
} from 'lucide-react';

export default function HealthcareClientDemo({ onOrderDesign, isMobileView }) {

  const services = [
    {
      title: 'Invisible Clear Aligners',
      desc: 'Discreet, removable custom clear aligners for perfect teeth straightening without metal wires.',
      duration: '6 - 9 Months',
      badge: 'Bestseller'
    },
    {
      title: 'German Straumann Dental Implants',
      desc: 'Lifetime guaranteed titanium implants restoring natural chewing function and aesthetic bone density.',
      duration: 'Same-Day Teeth',
      badge: 'Permanent'
    },
    {
      title: 'Single-Visit Microscopic Root Canal',
      desc: '100% painless computerized rotary endodontics saving infected natural teeth in under 45 minutes.',
      duration: '45 Minutes',
      badge: 'Painless'
    },
    {
      title: 'Laser Zoom Smile Whitening',
      desc: 'Remove deep tea, coffee, and tobacco stains to reveal 4-6 shades brighter natural enamel.',
      duration: 'Single Sitting',
      badge: 'Instant Results'
    }
  ];

  return (
    <div className="bg-[#FAF9F6] text-[#222] font-sans antialiased min-h-screen">
      
      {/* 1. Medical Accreditation Strip */}
      <div className="bg-[#1e3a5f] text-white text-[10px] sm:text-[11px] py-1.5 px-3 flex flex-col sm:flex-row items-center justify-between gap-1">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
          <span className="font-bold">NABH Accredited &bull; ISO 9001:2015 Center</span>
        </div>
        <div className="flex items-center gap-2 text-cyan-300 font-bold">
          <Phone className="w-3 h-3 shrink-0" />
          <span>Emergency: +91 99090 12844</span>
        </div>
      </div>

      {/* 2. Clinic Nav */}
      <header className="bg-white border-b border-[#DDD5CD] sticky top-0 z-20 px-3 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#1e3a5f] text-cyan-300 flex items-center justify-center font-bold">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <span className="font-heading font-black text-lg sm:text-xl text-[#2E2E2E] tracking-tight">DR. MEHTA DENTAL</span>
              <p className="text-[9px] text-[#1e3a5f] tracking-widest uppercase font-bold">Aesthetics & Implants</p>
            </div>
          </div>

          <a
            href="#appointment"
            className="px-3.5 py-1.5 rounded-xl bg-[#1e3a5f] text-white text-xs font-bold uppercase tracking-wider"
          >
            Consult
          </a>
        </div>
      </header>

      {/* 3. Hero Section */}
      <section className="py-10 sm:py-16 bg-gradient-to-r from-[#F1ECE6] via-white to-[#EAE4DC] border-b border-[#DDD5CD] px-4 sm:px-6">
        <div className={`mx-auto ${isMobileView ? 'space-y-4' : 'max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'}`}>
          <div className={`${isMobileView ? 'space-y-3' : 'lg:col-span-7 space-y-4'}`}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e3a5f]/10 text-[#1e3a5f] text-[10px] sm:text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3 h-3" />
              <span>Gujarat's Leading Digital Clinic</span>
            </div>
            <h1 className={`font-extrabold text-[#2E2E2E] font-heading leading-tight ${isMobileView ? 'text-2xl' : 'text-3xl sm:text-5xl'}`}>
              Precision Painless Dentistry for Radiant Smiles.
            </h1>
            <p className="text-xs sm:text-sm text-[#625f5c] max-w-xl leading-relaxed">
              Equipped with 3D CBCT Intraoral Scanners, German laser equipment, and computerized painless injection technology.
            </p>
            <div className="pt-2 flex flex-wrap gap-2.5">
              <a
                href="#appointment"
                className="px-5 py-2.5 rounded-xl bg-[#1e3a5f] hover:bg-[#152841] text-white font-bold text-xs uppercase tracking-wider shadow-md"
              >
                Schedule Consultation
              </a>
              <button
                onClick={onOrderDesign}
                className="px-4 py-2.5 rounded-xl bg-[#7D4047] hover:bg-[#67333a] text-white font-bold text-xs uppercase tracking-wider shadow-wine flex items-center gap-1.5"
              >
                <span>Order Clinic Site (₹5k Adv)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className={`${isMobileView ? 'pt-2' : 'lg:col-span-5'}`}>
            <div className="bg-white p-5 rounded-3xl border border-[#DDD5CD] shadow-lg space-y-3">
              <div className="flex items-center gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80" 
                  alt="Dr. Harshil Mehta"
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-[#1e3a5f]" 
                />
                <div>
                  <h4 className="font-heading font-extrabold text-sm sm:text-base text-[#2E2E2E]">Dr. Harshil Mehta</h4>
                  <p className="text-xs text-[#1e3a5f] font-bold">BDS, MDS &bull; Gold Medalist Implantologist</p>
                  <p className="text-[10px] text-[#625f5c]">Fellow of ICOI (USA)</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2.5 border-t border-[#DDD5CD] text-center">
                <div className="p-1.5 bg-[#F1ECE6]/60 rounded-xl">
                  <span className="font-black text-xs sm:text-sm text-[#2E2E2E] block">16+</span>
                  <span className="text-[9px] text-[#625f5c]">Years</span>
                </div>
                <div className="p-1.5 bg-[#F1ECE6]/60 rounded-xl">
                  <span className="font-black text-xs sm:text-sm text-[#2E2E2E] block">15,000+</span>
                  <span className="text-[9px] text-[#625f5c]">Smiles</span>
                </div>
                <div className="p-1.5 bg-[#F1ECE6]/60 rounded-xl">
                  <span className="font-black text-xs sm:text-sm text-[#2E2E2E] block">4.9 ★</span>
                  <span className="text-[9px] text-[#625f5c]">Reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Specialized Services Grid */}
      <section id="services" className="py-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-6 space-y-1">
          <span className="text-[10px] sm:text-xs font-bold text-[#1e3a5f] uppercase tracking-wider">Clinical Excellence</span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#2E2E2E] font-heading">
            Comprehensive Dental Treatments
          </h2>
        </div>

        <div className={`grid gap-4 ${isMobileView ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'}`}>
          {services.map((svc, i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#DDD5CD] p-5 shadow-soft flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <span className="inline-block text-[9px] font-bold text-[#1e3a5f] bg-[#1e3a5f]/10 px-2 py-0.5 rounded-full">
                  {svc.badge}
                </span>
                <h3 className="font-heading font-extrabold text-sm sm:text-base text-[#2E2E2E] leading-snug">{svc.title}</h3>
                <p className="text-xs text-[#625f5c] leading-relaxed">{svc.desc}</p>
              </div>

              <div className="pt-2.5 border-t border-[#DDD5CD]/60 flex items-center justify-between text-xs">
                <span className="text-[10px] text-[#625f5c]">Time:</span>
                <strong className="text-[#2E2E2E] text-xs">{svc.duration}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Clinical Rigor & Patient Concierge Desk */}
      <section id="appointment" className="bg-[#F1ECE6] border-t border-[#DDD5CD] py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-[10px] sm:text-xs font-bold text-[#1e3a5f] uppercase tracking-wider">Uncompromising Medicine</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#2E2E2E] font-heading">
              NABH Clinical Rigor & Dental Diagnostics
            </h2>
            <p className="text-xs text-[#625f5c]">
              Equipped with German 3D imaging, pain-free wand anesthesia, and strict sterile protocols.
            </p>
          </div>

          <div className={`grid gap-5 ${isMobileView ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
            <div className="bg-white rounded-3xl p-6 border border-[#DDD5CD] shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#1e3a5f]/10 text-[#1e3a5f] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#1e3a5f] uppercase">Zero Cross-Infection</span>
                  <h3 className="font-heading font-extrabold text-base text-[#2E2E2E] mt-0.5">Class-B Vacuum Autoclave</h3>
                </div>
                <p className="text-xs text-[#625f5c] leading-relaxed">
                  Every handpiece and surgical instrument goes through fractional vacuum steam sterilization. Individual sterile pouches opened right in front of the patient.
                </p>
              </div>
              <div className="pt-3 border-t border-[#DDD5CD] flex items-center justify-between text-[11px] text-[#2E2E2E]">
                <span><strong>Standards:</strong> NABH Protocol</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">100% Sterile</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#DDD5CD] shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#1e3a5f]/10 text-[#1e3a5f] flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#1e3a5f] uppercase">German 3D Scan</span>
                  <h3 className="font-heading font-extrabold text-base text-[#2E2E2E] mt-0.5">Sirona CBCT Digital Imaging</h3>
                </div>
                <p className="text-xs text-[#625f5c] leading-relaxed">
                  Ultra-low radiation cone beam CT scanning providing sub-millimeter 3D bone density maps for exact guided implant placement without guesswork.
                </p>
              </div>
              <div className="pt-3 border-t border-[#DDD5CD] flex items-center justify-between text-[11px] text-[#2E2E2E]">
                <span><strong>Accuracy:</strong> Sub-Millimeter</span>
                <span className="text-cyan-800 font-bold bg-cyan-50 px-2 py-0.5 rounded">3D Precision</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#DDD5CD] shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#1e3a5f]/10 text-[#1e3a5f] flex items-center justify-center font-bold">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#1e3a5f] uppercase">Needle-Phobic Friendly</span>
                  <h3 className="font-heading font-extrabold text-base text-[#2E2E2E] mt-0.5">Painless Computerized Wand</h3>
                </div>
                <p className="text-xs text-[#625f5c] leading-relaxed">
                  Microprocessor-guided anesthetic delivery at flow rates below the patient pain threshold. Truly painless root canals, fillings, and tooth extraction.
                </p>
              </div>
              <div className="pt-3 border-t border-[#DDD5CD] flex items-center justify-between text-[11px] text-[#2E2E2E]">
                <span><strong>Comfort:</strong> 100% Painless</span>
                <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded">No Syringe</span>
              </div>
            </div>
          </div>

          {/* Doctor Reception Desk Strip */}
          <div className={`bg-white rounded-3xl p-5 sm:p-8 border border-[#DDD5CD] shadow-sm flex items-center justify-between gap-6 ${isMobileView ? 'flex-col text-center' : 'flex-col lg:flex-row text-center lg:text-left'}`}>
            <div className={`space-y-1.5 ${isMobileView ? 'text-center' : 'text-center lg:text-left'}`}>
              <span className="text-[10px] font-bold text-[#1e3a5f] uppercase tracking-wider">Patient Reception & Emergency Line</span>
              <h3 className="text-base sm:text-lg font-extrabold text-[#2E2E2E] font-heading">
                Schedule Consultations with Senior Implantologists
              </h3>
              <p className="text-xs text-[#625f5c] max-w-xl">
                Direct phone consultation with our front clinic coordinator. Emergency tooth pain cases accommodated within 30 minutes without waiting queue.
              </p>
              <div className={`flex flex-wrap items-center gap-3 pt-1 text-xs text-[#2E2E2E] ${isMobileView ? 'justify-center' : ''}`}>
                <span className="flex items-center gap-1 font-bold">
                  <Clock className="w-3.5 h-3.5 text-[#1e3a5f]" />
                  <span>Mon &ndash; Sat: 09:30 AM &ndash; 01:30 PM & 04:30 PM &ndash; 08:30 PM</span>
                </span>
                <span className="text-[#625f5c]">&bull;</span>
                <span className="text-[#625f5c]">Satellite Main Branch & Navrangpura Branch</span>
              </div>
            </div>

            <div className={`flex flex-wrap items-center gap-3 shrink-0 ${isMobileView ? 'w-full flex-col' : ''}`}>
              <a
                href="tel:+919825056789"
                className={`px-5 py-3 rounded-2xl bg-[#1e3a5f] hover:bg-[#152841] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all ${isMobileView ? 'w-full justify-center' : ''}`}
              >
                <Phone className="w-4 h-4" />
                <span>Call Clinic Desk: +91 98250 56789</span>
              </a>
              <a
                href="https://wa.me/919825056789"
                target="_blank"
                rel="noreferrer"
                className={`px-4 py-3 rounded-2xl bg-[#2E2E2E] hover:bg-black text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${isMobileView ? 'w-full justify-center' : ''}`}
              >
                <span>WhatsApp Doctor Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Patient Testimonials */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
          <span className="text-[10px] sm:text-xs font-bold text-[#1e3a5f] uppercase tracking-wider">Patient Care Stories</span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#2E2E2E] font-heading">
            Trusted by 8,000+ Ahmedabad Patients
          </h2>
        </div>

        <div className={`grid gap-4 ${isMobileView ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
          <div className="bg-white p-5 rounded-2xl border border-[#DDD5CD] shadow-sm space-y-3">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
            </div>
            <p className="text-xs text-[#2E2E2E] italic leading-relaxed">
              "Had severe anxiety regarding root canals. Dr. Mehta used the computerized wand anesthesia—I genuinely felt zero pain throughout the single 40-minute sitting."
            </p>
            <div className="pt-2 border-t border-[#DDD5CD] flex items-center justify-between text-xs">
              <span className="font-bold text-[#2E2E2E]">Bhavik Patel</span>
              <span className="text-[#625f5c] text-[11px]">Satellite, Ahmedabad</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#DDD5CD] shadow-sm space-y-3">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
            </div>
            <p className="text-xs text-[#2E2E2E] italic leading-relaxed">
              "Completed my invisible clear aligners course in just 7 months. The 3D scan visualization of how teeth move before starting treatment gave me 100% confidence."
            </p>
            <div className="pt-2 border-t border-[#DDD5CD] flex items-center justify-between text-xs">
              <span className="font-bold text-[#2E2E2E]">Dr. Sheetal Rao</span>
              <span className="text-[#625f5c] text-[11px]">Professor, Navrangpura</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#DDD5CD] shadow-sm space-y-3">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
            </div>
            <p className="text-xs text-[#2E2E2E] italic leading-relaxed">
              "My mother received two German Straumann implants. She was able to eat solid Gujarati food within 48 hours without discomfort. Exceptional hygiene standards."
            </p>
            <div className="pt-2 border-t border-[#DDD5CD] flex items-center justify-between text-xs">
              <span className="font-bold text-[#2E2E2E]">Meena Shah</span>
              <span className="text-[#625f5c] text-[11px]">Prahlad Nagar, Ahmedabad</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Complete Healthcare Footer */}
      <footer className="bg-[#1e3a5f] text-white pt-10 pb-6 px-4 sm:px-6 border-t border-[#DDD5CD]">
        <div className={`max-w-7xl mx-auto grid pb-8 border-b border-cyan-800/60 ${isMobileView ? 'grid-cols-1 gap-6 text-center' : 'grid-cols-1 md:grid-cols-4 gap-8'}`}>
          <div className={`space-y-3 md:col-span-1 ${isMobileView ? 'flex flex-col items-center' : ''}`}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white text-[#1e3a5f] flex items-center justify-center font-bold">
                <HeartPulse className="w-4 h-4" />
              </div>
              <span className="font-heading font-black text-sm text-white tracking-tight">DR. MEHTA DENTAL</span>
            </div>
            <p className="text-xs text-cyan-100/80 leading-relaxed">
              Advanced implantology, clear aligners & painless laser dentistry accredited by NABH.
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-cyan-300 uppercase tracking-wider text-[11px]">Consultation Timings</h4>
            <p className="text-cyan-100">Morning: 09:30 AM &ndash; 01:30 PM</p>
            <p className="text-cyan-100">Evening: 04:30 PM &ndash; 08:30 PM</p>
            <p className="text-cyan-300 text-[11px]">Sundays Emergency Dental on Call</p>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-cyan-300 uppercase tracking-wider text-[11px]">Clinic Centers</h4>
            <p className="text-cyan-100">Main: Opp. Star Bazaar, Satellite Road</p>
            <p className="text-cyan-100">Branch: Near St. Xavier's, Navrangpura</p>
            <p className="text-cyan-300 text-[11px]">Ahmedabad, Gujarat 380015</p>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-cyan-300 uppercase tracking-wider text-[11px]">Direct Patient Desk</h4>
            <p className="text-cyan-100">Helpline: +91 98250 56789</p>
            <p className="text-cyan-100">Emergency Desk: +91 98250 56780</p>
            <p className="text-cyan-300 text-[11px]">Zero-Wait Appointment Slots</p>
          </div>
        </div>

        <div className={`max-w-7xl mx-auto pt-6 flex items-center justify-between text-xs text-cyan-200/70 gap-2 ${isMobileView ? 'flex-col text-center' : 'flex-col sm:flex-row'}`}>
          <span>&copy; {new Date().getFullYear()} Dr. Mehta Dental Clinic & Implant Center. All Rights Reserved.</span>
          <span>Crafted with pure performance &bull; Powered by THE WEBCRAFT</span>
        </div>
      </footer>

      {/* 6. Demo Project Banner */}
      <div className={`bg-[#2E2E2E] text-white p-3 sm:p-4 flex items-center justify-between gap-2 text-xs border-t border-[#DDD5CD] ${isMobileView ? 'flex-col text-center' : 'flex-col sm:flex-row'}`}>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span><strong>Client Demo:</strong> Dr. Mehta Dental Clinic &bull; Built by <strong>THE WEBCRAFT</strong></span>
        </div>
        <button
          onClick={onOrderDesign}
          className={`px-3.5 py-1.5 rounded-lg bg-[#7D4047] hover:bg-[#67333a] text-white font-bold flex items-center gap-1 ${isMobileView ? 'w-full justify-center' : ''}`}
        >
          <span>Order A Clinic Site</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
