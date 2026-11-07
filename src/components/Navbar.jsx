import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  MessageCircle, 
  ArrowUpRight, 
  Menu, 
  X, 
  Mail, 
  Check 
} from 'lucide-react';
import { COMPANY_CONFIG } from '../data/pricingData';
import { useOrderOffer } from '../utils/orderTracker';
import WebCraftBrandLogo from './WebCraftBrandLogo';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const offer = useOrderOffer();

  const handleEmailClick = (e) => {
    try {
      navigator.clipboard?.writeText(COMPANY_CONFIG.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } catch (err) {
      // Fallback
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Live Demos', path: '/demos' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Book Order', path: '/order' },
    { label: 'Track Project', path: '/track' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F1ECE6]/95 backdrop-blur-md border-b border-[#DDD5CD] transition-all">
      {/* Top Announcement Bar */}
      <div className={`text-[#F1ECE6] text-[11px] sm:text-xs py-1.5 px-3 sm:px-6 font-medium tracking-wide flex items-center justify-between gap-3 transition-colors ${
        offer.isOfferActive ? 'bg-gradient-to-r from-[#7D4047] via-[#2E2E2E] to-[#7D4047]' : 'bg-[#2E2E2E]'
      }`}>
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className={`w-2 h-2 rounded-full shrink-0 inline-block ${
            offer.isOfferActive ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'
          }`} />
          <span>
            {offer.isOfferActive ? (
              <span>
                <strong>{offer.announcement}</strong>
              </span>
            ) : (
              <span>
                <strong>Bespoke Web Studio:</strong> Direct Booking &bull; Custom Web Engineering &bull; Zero Online Upfront
              </span>
            )}
          </span>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <Link 
            to="/order"
            className="underline decoration-[#DDD5CD] hover:text-white text-[11px] sm:text-xs font-semibold shrink-0"
          >
            {offer.isOfferActive ? 'Claim Discount →' : 'Book Website →'}
          </Link>
        </div>
      </div>

      {/* Main Navbar Row (3-Zone Architecture: Brand | Centered Nav | Action Cluster) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* ZONE 1: Brand Logo (Exact Visiting Card Logo Mark & Name Style) */}
        <WebCraftBrandLogo />

        {/* ZONE 2: Clean Page Navigation (Center - Perfectly Balanced & Spaced) */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-8 shrink-0">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.path}
              className={({ isActive }) =>
                `text-xs xl:text-sm font-bold whitespace-nowrap transition-colors py-1 ${
                  isActive
                    ? 'text-[#7D4047] border-b-2 border-[#7D4047]'
                    : 'text-[#2E2E2E]/80 hover:text-[#7D4047]'
                }`
              }
            >
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* ZONE 3: Action Buttons Cluster (Right - WhatsApp + Email + Primary CTA) */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
          {/* 1-Click WhatsApp Quick Action */}
          <a
            href="https://wa.me/919428298134?text=Hello%20The%20Webcraft%2C%20I%20am%20interested%20in%20building%20a%20custom%20website"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 xl:px-3.5 xl:py-2.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 hover:border-emerald-400 shadow-xs hover:shadow transition-all duration-200 active:scale-95 whitespace-nowrap shrink-0 group"
            title="Direct WhatsApp Chat: +91 94282 98134 (Chat Only • No Calls)"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition-transform shrink-0" />
            <span>WhatsApp</span>
          </a>

          {/* Email Quick-Copy Button */}
          <button
            type="button"
            onClick={handleEmailClick}
            className="inline-flex items-center gap-1.5 px-3 py-2 xl:px-3.5 xl:py-2.5 rounded-xl text-xs font-bold text-[#2E2E2E] bg-white hover:bg-[#FAF9F6] border border-[#DDD5CD] hover:border-[#7D4047]/50 shadow-xs hover:shadow transition-all duration-200 active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
            title={`Click to copy studio email: ${COMPANY_CONFIG.email}`}
          >
            <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 transition-colors duration-200 ${
              copiedEmail ? 'text-emerald-600' : 'text-[#7D4047]'
            }`}>
              {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Mail className="w-3.5 h-3.5" />}
            </div>
            <span className="text-xs font-semibold text-[#2E2E2E]">
              {copiedEmail ? 'Copied! ✓' : (
                <>
                  <span className="hidden 2xl:inline">{COMPANY_CONFIG.email}</span>
                  <span className="2xl:hidden">Email</span>
                </>
              )}
            </span>
          </button>

          {/* Primary Order CTA */}
          <Link
            to="/order"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#7D4047] hover:bg-[#67333a] shadow-wine hover:shadow-lg transition-all active:scale-95 whitespace-nowrap shrink-0 group ml-1"
          >
            <span className="whitespace-nowrap">Book Website</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </Link>
        </div>

        {/* Mobile / Tablet View Controls (< 1024px) */}
        <div className="lg:hidden flex items-center gap-2 shrink-0">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#2E2E2E] hover:bg-[#DDD5CD]/50 shrink-0"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F1ECE6] border-b border-[#DDD5CD] px-4 pt-2 pb-6 space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block py-2 text-base font-semibold ${
                  isActive ? 'text-[#7D4047] font-bold' : 'text-[#2E2E2E] hover:text-[#7D4047]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="pt-3 border-t border-[#DDD5CD] space-y-2">
            <a
              href="https://wa.me/919428298134?text=Hello%20The%20Webcraft%2C%20I%20am%20interested%20in%20building%20a%20website"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp: +91 94282 98134 (Chat Only &bull; No Calls)</span>
            </a>
            <button
              type="button"
              onClick={handleEmailClick}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-bold text-[#2E2E2E] bg-[#DDD5CD]/60 border border-[#DDD5CD]"
            >
              <Mail className="w-4 h-4 text-[#7D4047]" />
              <span>{copiedEmail ? 'Email Copied to Clipboard! ✓' : `Email: ${COMPANY_CONFIG.email}`}</span>
            </button>
            <Link
              to="/order"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-bold text-white bg-[#7D4047]"
            >
              <span>Book Custom Website</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
