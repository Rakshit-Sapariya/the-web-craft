import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Layers, MessageSquare, ArrowUpRight, Menu, X, Sparkles } from 'lucide-react';
import { COMPANY_CONFIG } from '../data/pricingData';
import { useOrderOffer } from '../utils/orderTracker';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isOfferActive, slotsRemaining } = useOrderOffer();

  const navLinks = [
    { label: 'Home', shortLabel: 'Home', path: '/' },
    { label: 'Live Demos', shortLabel: 'Live Demos', path: '/demos' },
    { label: 'Pricing & Estimator', shortLabel: 'Pricing', path: '/pricing' },
    { label: 'Book Order & Contact', shortLabel: 'Book Order', path: '/order' },
    { label: 'Track Project', shortLabel: 'Track Status', path: '/track' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F1ECE6]/95 backdrop-blur-md border-b border-[#DDD5CD] transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-[#2E2E2E] text-[#F1ECE6] text-[11px] sm:text-xs py-1.5 px-3 sm:px-4 text-center font-medium tracking-wide flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        {isOfferActive ? (
          <>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#DDD5CD] animate-pulse shrink-0" />
              <span>
                <strong>Early Bird:</strong> 15% Discount ({slotsRemaining} slots left)
              </span>
            </div>
            <Link 
              to="/order"
              className="underline decoration-[#DDD5CD] hover:text-white text-[11px] sm:text-xs font-semibold shrink-0"
            >
              Claim Now &rarr;
            </Link>
          </>
        ) : (
          <>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0 inline-block" />
              <span>
                <strong>Bespoke Web Studio:</strong> Direct Booking &bull; Custom Web Engineering
              </span>
            </div>
            <Link 
              to="/order"
              className="underline decoration-[#DDD5CD] hover:text-white text-[11px] sm:text-xs font-semibold shrink-0"
            >
              Book &rarr;
            </Link>
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-[#7D4047] flex items-center justify-center text-[#F1ECE6] shadow-sm group-hover:scale-105 transition-transform duration-200 shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div className="shrink-0">
            <div className="font-heading font-extrabold tracking-tight text-lg lg:text-xl text-[#2E2E2E] flex items-center gap-1.5 whitespace-nowrap">
              <span>THE WEBCRAFT</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#7D4047]"></span>
            </div>
            <p className="text-[10px] lg:text-[11px] text-[#625f5c] tracking-wider uppercase font-semibold whitespace-nowrap">Custom Web Studio</p>
          </div>
        </Link>

        {/* Clean Page Navigation Links (No wrapping, responsive spacing) */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-7 shrink-0">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.path}
              className={({ isActive }) =>
                `text-xs xl:text-sm font-bold whitespace-nowrap transition-all py-1 ${
                  isActive
                    ? 'text-[#7D4047] border-b-2 border-[#7D4047]'
                    : 'text-[#2E2E2E]/80 hover:text-[#7D4047]'
                }`
              }
            >
              <span className="hidden xl:inline">{link.label}</span>
              <span className="xl:hidden">{link.shortLabel}</span>
            </NavLink>
          ))}
        </nav>

        {/* Action Buttons (Strictly single-line, perfectly aligned) */}
        <div className="hidden sm:flex items-center gap-2.5 lg:gap-3 shrink-0">
          <a
            href={COMPANY_CONFIG.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-[#2E2E2E] bg-white hover:bg-[#DDD5CD]/40 border border-[#DDD5CD] hover:border-[#7D4047]/40 shadow-sm transition-all whitespace-nowrap shrink-0"
            title="Chat on WhatsApp (+91 85114 39894 - Only Message, Not Call)"
          >
            <div className="w-5 h-5 rounded-md bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0">
              <MessageSquare className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="font-mono text-xs font-bold text-[#2E2E2E] whitespace-nowrap">
                {COMPANY_CONFIG.whatsappDisplay}
              </span>
              <span className="text-[10px] font-bold text-[#7D4047] bg-[#7D4047]/10 border border-[#7D4047]/20 px-1.5 py-0.5 rounded whitespace-nowrap">
                Only Message, Not Call
              </span>
            </div>
          </a>

          <Link
            to="/order"
            className="inline-flex items-center gap-1.5 px-3.5 lg:px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#7D4047] hover:bg-[#67333a] shadow-wine hover:shadow-lg transition-all active:scale-95 whitespace-nowrap shrink-0"
          >
            <span className="whitespace-nowrap">Book Website</span>
            <ArrowUpRight className="w-4 h-4 shrink-0" />
          </Link>
        </div>

        {/* Mobile / Tablet menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-[#2E2E2E] hover:bg-[#DDD5CD]/50 shrink-0"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile / Tablet Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F1ECE6] border-b border-[#DDD5CD] px-4 pt-2 pb-6 space-y-3">
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
              href={COMPANY_CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-bold text-[#2E2E2E] bg-[#DDD5CD]/60 border border-[#DDD5CD]"
            >
              <MessageSquare className="w-4 h-4 text-[#7D4047]" />
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                <span>WhatsApp: {COMPANY_CONFIG.whatsappDisplay}</span>
                <span className="text-[10px] text-[#7D4047] font-bold bg-[#7D4047]/15 px-1.5 py-0.5 rounded border border-[#7D4047]/20">
                  Only Message, Not Call
                </span>
              </div>
            </a>
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
