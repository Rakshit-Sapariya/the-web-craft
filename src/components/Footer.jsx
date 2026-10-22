import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  MessageCircle, 
  Mail, 
  ShieldCheck, 
  ArrowUp, 
  ArrowUpRight, 
  ExternalLink,
  Sparkles,
  Lock,
  Compass,
  CheckCircle2,
  FileCode2,
  Cpu
} from 'lucide-react';
import { COMPANY_CONFIG } from '../data/pricingData';
import WebCraftBrandLogo from './WebCraftBrandLogo';
import WebCraftWatermark from './WebCraftWatermark';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { num: '01', label: 'Home Page', path: '/', badge: 'HQ' },
    { num: '02', label: 'Live Frontend Demos', path: '/demos', badge: '8 Demos' },
    { num: '03', label: 'Pricing & Cost Calculator', path: '/pricing', badge: 'Estimator' },
    { num: '04', label: 'Book Custom Website', path: '/order', badge: 'Start' },
    { num: '05', label: 'Client Reviews & Feedback', path: '/#reviews', badge: '★ 4.98', isReview: true },
    { num: '06', label: 'Privacy & Security Charter', path: '/privacy-policy', badge: 'Encrypted', isPrivacy: true },
    { num: '07', label: 'Track Project Status', path: '/track', badge: 'Live', isTrack: true },
    { num: '08', label: 'Studio Admin Portal', path: '/admin', badge: 'Auth', isAdmin: true },
  ];

  const studioPolicies = [
    {
      code: 'ZERO-ADVANCE',
      title: 'Zero Online Upfront Fee',
      desc: 'Submit your complete website specification 100% free with no online payment required.',
      accent: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
    },
    {
      code: 'DEMO-FIRST',
      title: 'Payment on WhatsApp After Demo',
      desc: 'Pay on WhatsApp only after you see your website completed and approved, right before it goes live on the browser.',
      accent: 'text-amber-300 border-amber-500/30 bg-amber-500/10'
    },
    {
      code: 'REVIEWS-100%',
      title: 'Mandatory Client Feedback',
      desc: 'Every client participates in our post-demo review policy to guarantee handcrafted craftsmanship.',
      accent: 'text-rose-300 border-rose-500/30 bg-rose-500/10'
    },
    {
      code: 'DEV-DIRECT',
      title: 'Direct Developer Pricing',
      desc: 'Starting from ₹19,500 with tiered promotional savings and zero agency middleman overheads.',
      accent: 'text-sky-300 border-sky-500/30 bg-sky-500/10'
    }
  ];

  return (
    <footer className="relative bg-[#1A1A1A] text-[#F1ECE6] border-t border-white/10 pt-16 pb-12 overflow-hidden selection:bg-[#7D4047] selection:text-white">
      {/* Ambient background glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7D4047]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Signature WebCraft Watermark Emblem in Dark Footer Background (from Photo 2) */}
      <div className="absolute right-0 bottom-0 translate-x-1/6 translate-y-1/6 w-[450px] lg:w-[580px] aspect-square pointer-events-none select-none opacity-[0.08] sm:opacity-[0.11] -z-10 flex items-center justify-center">
        <WebCraftWatermark className="w-full h-full" variant="original" opacity="opacity-100" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">        {/* Main 3-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* Column 1: Brand Typography & Direct Desk (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Typographic Brand Lockup (Visiting Card Logo & Style Adapted for Dark Theme) */}
            <div className="space-y-3">
              <WebCraftBrandLogo isDark={true} />

              {/* Styled Mission Statement with Typographic Highlights */}
              <p className="text-xs sm:text-[13px] text-[#DDD5CD]/80 leading-relaxed max-w-md pt-1">
                We engineer bespoke, high-performance web platforms for ambitious businesses. <span className="text-white font-medium">Zero generic template bloat</span>, <span className="text-white font-medium">zero third-party trackers</span> — every pixel and query is handcrafted for conversion and sub-second speed.
              </p>
            </div>

            {/* Direct Communication Channels (Interactive Micro-Cards) */}
            <div className="space-y-2.5 pt-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#DDD5CD]/50 block">
                // DIRECT STUDIO CHANNELS
              </span>

              {/* WhatsApp Card */}
              <a 
                href="https://wa.me/919428298134?text=Hello%20The%20Webcraft%2C%20I%20am%20interested%20in%20building%20a%20website" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-emerald-500/[0.08] border border-white/10 hover:border-emerald-500/40 transition-all duration-200"
                title="Direct WhatsApp Chat"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                        WhatsApp Developer Desk
                      </span>
                      <span className="text-[9px] font-mono uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Chat Only
                      </span>
                    </div>
                    <span className="font-mono text-xs text-emerald-400 font-semibold block mt-0.5">
                      +91 94282 98134
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#DDD5CD]/40 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
              </a>

              {/* Email Card */}
              <a 
                href="mailto:thewebcraft404@gmail.com" 
                className="group flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/25 transition-all duration-200"
                title="Send Direct Email"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#DDD5CD] group-hover:scale-110 transition-transform shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-medium text-[#DDD5CD]/70 block">
                      Inquiries &amp; Specifications
                    </span>
                    <span className="font-mono text-xs text-white font-semibold block mt-0.5 truncate">
                      thewebcraft404@gmail.com
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#DDD5CD]/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
              </a>
            </div>

          </div>

          {/* Column 2: Studio Pages -> Typographic Index (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Section Title with Monospace Prefix */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#7D4047] font-bold block">
                // 01. NAVIGATION INDEX
              </span>
              <h4 className="font-heading font-black text-sm text-white tracking-wider uppercase">
                Studio Directory
              </h4>
            </div>

            {/* Structured Typographic Index Links */}
            <ul className="space-y-1 text-xs">
              {navLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="group flex items-center justify-between py-2 px-2.5 rounded-lg hover:bg-white/5 transition-all duration-150"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="font-mono text-[10px] text-[#DDD5CD]/40 group-hover:text-amber-400 transition-colors">
                        [{item.num}]
                      </span>
                      <span className={`transition-all duration-150 group-hover:translate-x-1 ${
                        item.isReview 
                          ? 'text-amber-300 font-semibold' 
                          : item.isPrivacy 
                            ? 'text-emerald-300 font-medium' 
                            : item.isTrack 
                              ? 'text-emerald-400 font-semibold' 
                              : item.isAdmin 
                                ? 'text-[#DDD5CD]/60 hover:text-[#DDD5CD]' 
                                : 'text-[#DDD5CD]/90 group-hover:text-white font-medium'
                      }`}>
                        {item.label}
                      </span>
                    </div>

                    {/* Micro Tag Badge */}
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border transition-colors shrink-0 ${
                      item.isReview
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 font-bold'
                        : item.isTrack
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 flex items-center gap-1 font-bold'
                          : item.isPrivacy
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                            : 'bg-white/5 text-[#DDD5CD]/50 border-white/10 group-hover:text-[#DDD5CD] group-hover:border-white/20'
                    }`}>
                      {item.isTrack && <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping inline-block" />}
                      {item.badge}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

          </div>

          {/* Column 3: Policies At A Glance -> Studio Charter (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Section Title with Monospace Prefix */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#7D4047] font-bold block">
                // 02. TRUST & INTEGRITY
              </span>
              <h4 className="font-heading font-black text-sm text-white tracking-wider uppercase flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Policies at a Glance</span>
              </h4>
            </div>

            {/* Spec Sheet Style Policy Cards */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-3.5 space-y-2.5 backdrop-blur-sm">
              {studioPolicies.map((p, idx) => (
                <div 
                  key={idx}
                  className="p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/15 transition-all group"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {p.title}
                    </span>
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border uppercase shrink-0 ${p.accent}`}>
                      {p.code}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#DDD5CD]/70 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}

              {/* Read Full Policy Callout */}
              <div className="pt-2 border-t border-white/10">
                <Link 
                  to="/privacy-policy" 
                  className="group flex items-center justify-between py-2 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:text-white transition-all text-xs font-semibold"
                >
                  <div className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Read Complete Studio Charter</span>
                  </div>
                  <span className="font-mono text-xs group-hover:translate-x-1 transition-transform">
                    &rarr;
                  </span>
                </Link>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Strip: Legal & Back To Top */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-[#DDD5CD]/60 gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[11px] text-[#DDD5CD]/80">
              &copy; {CURRENT_YEAR} THE WEBCRAFT. All rights reserved.
            </span>
            <span className="hidden sm:inline text-white/20">&bull;</span>
            <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>100% Ad-Free &bull; Bank-Grade Prepared SQL</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              to="/privacy-policy" 
              className="hover:text-white transition-colors underline decoration-emerald-500/40 text-emerald-400/90 text-xs font-medium"
            >
              Privacy Policy
            </Link>
            <span className="text-white/20">&bull;</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#7D4047] text-white text-xs font-medium transition-all duration-200 hover:-translate-y-0.5 active:scale-95 shadow-sm group"
              title="Return to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:animate-bounce-gentle" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
