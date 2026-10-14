import React, { useState } from 'react';
import { 
  HeartPulse, ShieldCheck, Clock, Award, Star, 
  MapPin, Phone, Calendar, ArrowRight, CheckCircle2, Sparkles, User 
} from 'lucide-react';

export default function HealthcareClientDemo({ onOrderDesign, isMobileView }) {
  const [appointmentForm, setAppointmentForm] = useState({
    branch: 'Satellite Main Center',
    service: 'Invisible Clear Aligners',
    date: '2026-10-18',
    time: '11:00 AM',
    patientName: '',
    phone: ''
  });
  const [appointmentBooked, setAppointmentBooked] = useState(false);

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

  const handleBookAppointment = (e) => {
    e.preventDefault();
    setAppointmentBooked(true);
  };

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

      {/* 5. Online Appointment Form */}
      <section id="appointment" className="bg-[#F1ECE6] border-t border-[#DDD5CD] py-10 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-5 sm:p-8 border border-[#DDD5CD] shadow-sm">
          <div className="text-center mb-6 space-y-1">
            <span className="text-[10px] font-bold text-[#1e3a5f] uppercase tracking-wider">Quick Consultation</span>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#2E2E2E] font-heading">
              Book An In-Clinic Consultation
            </h2>
            <p className="text-xs text-[#625f5c]">Zero waiting time. Select your nearest clinic slot.</p>
          </div>

          {!appointmentBooked ? (
            <form onSubmit={handleBookAppointment} className="space-y-3 text-xs">
              <div className={`grid gap-3 ${isMobileView ? 'grid-cols-1' : 'grid-cols-2'}`}>
                <div>
                  <label className="block font-bold text-[#2E2E2E] mb-1">Clinic Branch</label>
                  <select 
                    value={appointmentForm.branch}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, branch: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5CD] bg-[#F1ECE6]/40 text-xs"
                  >
                    <option>Satellite Main Center (Near Star Bazaar)</option>
                    <option>Navrangpura Center (Near St. Xavier's)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#2E2E2E] mb-1">Treatment / Concern</label>
                  <select 
                    value={appointmentForm.service}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, service: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5CD] bg-[#F1ECE6]/40 text-xs"
                  >
                    <option>Invisible Clear Aligners</option>
                    <option>Dental Implants Consultation</option>
                    <option>Emergency Root Canal</option>
                    <option>Teeth Whitening</option>
                  </select>
                </div>
              </div>

              <div className={`grid gap-3 ${isMobileView ? 'grid-cols-1' : 'grid-cols-2'}`}>
                <div>
                  <label className="block font-bold text-[#2E2E2E] mb-1">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={appointmentForm.date}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5CD] bg-[#F1ECE6]/40 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#2E2E2E] mb-1">Preferred Time</label>
                  <select 
                    value={appointmentForm.time}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, time: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5CD] bg-[#F1ECE6]/40 text-xs"
                  >
                    <option>10:00 AM &ndash; 11:30 AM</option>
                    <option>11:30 AM &ndash; 01:00 PM</option>
                    <option>04:30 PM &ndash; 06:30 PM</option>
                    <option>06:30 PM &ndash; 08:30 PM</option>
                  </select>
                </div>
              </div>

              <div className={`grid gap-3 ${isMobileView ? 'grid-cols-1' : 'grid-cols-2'}`}>
                <div>
                  <label className="block font-bold text-[#2E2E2E] mb-1">Patient Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bhavik Patel"
                    value={appointmentForm.patientName}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, patientName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5CD] bg-[#F1ECE6]/40 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#2E2E2E] mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9825000000"
                    value={appointmentForm.phone}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD5CD] bg-[#F1ECE6]/40 text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#1e3a5f] hover:bg-[#152841] text-white font-bold text-xs uppercase tracking-wider shadow-md mt-2"
              >
                Confirm Doctor Appointment
              </button>
            </form>
          ) : (
            <div className="text-center py-4 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-heading font-extrabold text-base text-[#2E2E2E]">Appointment Booked!</h4>
              <p className="text-xs text-[#625f5c]">
                Thank you, {appointmentForm.patientName}. Your appointment is confirmed at {appointmentForm.branch}.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 6. Demo Project Banner */}
      <div className="bg-[#2E2E2E] text-white p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs border-t border-[#DDD5CD]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span><strong>Client Demo:</strong> Dr. Mehta Dental Clinic &bull; Built by <strong>THE WEBCRAFT</strong></span>
        </div>
        <button
          onClick={onOrderDesign}
          className="px-3.5 py-1.5 rounded-lg bg-[#7D4047] hover:bg-[#67333a] text-white font-bold flex items-center gap-1"
        >
          <span>Order A Clinic Site</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
