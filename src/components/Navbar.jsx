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
    <header className="sticky top-0 z-40 bg-[#FFF7E8] border-b border-[#E2D7C3] shadow-xs">
      {/* Top Announcement Bar */}
      <div className="text-white text-[11px] sm:text-xs py-1.5 px-3 sm:px-6 font-medium tracking-wide flex items-center justify-between gap-3 transition-colors bg-[#000000]">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className={`w-2 h-2 rounded-full shrink-0 inline-block ${
            offer.isOfferActive ? 'bg-[#355CDE] animate-pulse' : 'bg-[#355CDE]'
          }`} />
          <span>
            {offer.isOfferActive ? (
              <span>
                <strong className="text-[#355CDE]">{offer.announcement}</strong>
              </span>
            ) : (
              <span>
                <strong className="text-[#355CDE]">Bespoke Web Studio:</strong> Direct Booking &bull; Custom Web Engineering &bull; Zero Online Upfront
              </span>
            )}
          </span>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <Link 
            to="/order"
            className="text-[#355CDE] hover:text-white underline decoration-[#355CDE]/50 text-[11px] sm:text-xs font-semibold shrink-0"
          >
            {offer.isOfferActive ? 'Claim Discount →' : 'Book Website →'}
          </Link>
        </div>
      </div>

      {/* Signature Swatch Accent Strip */}
      <div className="h-[2px] w-full flex">
        <div className="w-[50%] bg-[#000000]" />
        <div className="w-[30%] bg-[#355CDE]" />
        <div className="w-[20%] bg-[#F1E8D8]" />
      </div>

      {/* Main Navbar Row (3-Zone Architecture: Brand | Centered Nav | Action Cluster) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* ZONE 1: Brand Logo */}
        <WebCraftBrandLogo />

        {/* ZONE 2: Clean Page Navigation */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-8 shrink-0">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.path}
              className={({ isActive }) =>
                `text-xs xl:text-sm font-bold whitespace-nowrap transition-colors py-1 ${
                  isActive
                    ? 'text-[#000000] border-b-2 border-[#355CDE]'
                    : 'text-[#000000]/75 hover:text-[#355CDE]'
                }`
              }
            >
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* ZONE 3: Action Buttons Cluster */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
          {/* 1-Click WhatsApp Quick Action */}
          <a
            href="https://wa.me/919428298134?text=Hello%20The%20Webcraft%2C%20I%20am%20interested%20in%20building%20a%20custom%20website"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 xl:px-4.5 xl:py-2.5 rounded-full text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-all active:scale-[0.98] whitespace-nowrap shrink-0 group"
            title="Direct WhatsApp Chat: +91 94282 98134 (Chat Only • No Calls)"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>WhatsApp</span>
          </a>

          {/* Email Quick-Copy Button */}
          <button
            type="button"
            onClick={handleEmailClick}
            className="inline-flex items-center gap-1.5 px-4 py-2 xl:px-4.5 xl:py-2.5 rounded-full text-xs font-bold text-[#000000] bg-[#F1E8D8] hover:bg-[#E7DDC9] border border-[#E2D7C3] hover:border-[#355CDE] transition-all active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
            title={`Click to copy studio email: ${COMPANY_CONFIG.email}`}
          >
            <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 ${
              copiedEmail ? 'text-emerald-600' : 'text-[#355CDE]'
            }`}>
              {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Mail className="w-3.5 h-3.5" />}
            </div>
            <span className="text-xs font-semibold text-[#000000]">
              {copiedEmail ? 'Copied to Clipboard' : (
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
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#355CDE] hover:bg-[#2447B8] active:scale-[0.98] transition-all whitespace-nowrap shrink-0 group ml-1 shadow-sm"
          >
            <span className="whitespace-nowrap">Book Website</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white/90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </Link>
        </div>

        {/* Mobile / Tablet View Controls (< 1024px) */}
        <div className="lg:hidden flex items-center gap-2 shrink-0">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#000000] hover:bg-[#F1E8D8] shrink-0"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFF7E8] border-b border-[#E2D7C3] px-4 pt-2 pb-6 space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block py-2 text-base font-semibold ${
                  isActive ? 'text-[#000000] font-bold border-l-2 border-[#355CDE] pl-2' : 'text-[#000000] hover:text-[#355CDE]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="pt-3 border-t border-[#E2D7C3] space-y-2">
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
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-bold text-[#000000] bg-[#F1E8D8] border border-[#E2D7C3]"
            >
              <Mail className="w-4 h-4 text-[#355CDE]" />
              <span>{copiedEmail ? 'Email Copied to Clipboard' : `Email: ${COMPANY_CONFIG.email}`}</span>
            </button>
            <Link
              to="/order"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-bold text-white bg-[#355CDE] hover:bg-[#2447B8]"
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
