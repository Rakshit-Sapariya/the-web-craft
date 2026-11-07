import React from 'react';
import { Link } from 'react-router-dom';

/**
 * WebCraftBrandLogo - Renders the authentic logo mark from the second photo (Photo 2)
 * Features the genuine spiderweb, interlocking 'V' & 'C' with gold/metallic border, sage green code bracket '</>'
 */
export function WebCraftLogoIcon({ className = "w-10 h-10 sm:w-11 sm:h-11" }) {
  return (
    <div className={`${className} rounded-[13px] sm:rounded-[15px] overflow-hidden shrink-0 shadow-sm group-hover:scale-105 transition-all duration-200 border border-[#C5A059]/30 hover:border-[#C5A059]/60 relative bg-[#242A30]`}>
      <img
        src="/webcraft-logo-badge.png"
        alt="The WebCraft Official Logo"
        className="w-full h-full object-cover select-none"
        width={48}
        height={48}
      />
    </div>
  );
}

export default function WebCraftBrandLogo({ 
  linkTo = "/", 
  showSubtitle = true,
  isDark = false,
  className = ""
}) {
  return (
    <Link to={linkTo} className={`flex items-center gap-2.5 sm:gap-3 group shrink-0 ${className}`}>
      {/* Authentic Logo Badge from Second Photo (Photo 2) */}
      <WebCraftLogoIcon className="w-10 h-10 sm:w-11 sm:h-11" />

      {/* Name Style from Visiting Card */}
      <div className="shrink-0 flex flex-col justify-center">
        {/* 'WebCraft' in Luxury Serif with Theme Color-Split */}
        <div 
          className="font-serif tracking-tight text-[19px] sm:text-[22px] leading-none select-none flex items-baseline font-bold"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {/* 'Web' */}
          <span className={isDark ? "text-white" : "text-[#2E2E2E] group-hover:text-[#1A1A1A] transition-colors"}>
            Web
          </span>
          {/* 'C' in Signature Theme Wine */}
          <span className="text-[#7D4047] font-extrabold group-hover:scale-105 inline-block transition-transform">
            C
          </span>
          {/* 'raft' in Warm Rose Wine / Gold */}
          <span className={isDark ? "text-[#E0C097]" : "text-[#9E535C] group-hover:text-[#7D4047] transition-colors"}>
            raft
          </span>
        </div>

        {/* '— WEB DEVELOPMENT —' with delicate rules matching the card */}
        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-1 sm:mt-1.5 select-none">
            <span className={`w-2.5 sm:w-3.5 h-[1px] ${isDark ? 'bg-white/30' : 'bg-[#7D4047]/40'} shrink-0`}></span>
            <span className={`text-[8.5px] sm:text-[9.5px] ${isDark ? 'text-[#DDD5CD]/70' : 'text-[#625f5c]'} tracking-[0.22em] sm:tracking-[0.26em] uppercase font-semibold whitespace-nowrap`}>
              Web Development
            </span>
            <span className={`w-2.5 sm:w-3.5 h-[1px] ${isDark ? 'bg-white/30' : 'bg-[#7D4047]/40'} shrink-0`}></span>
          </div>
        )}
      </div>
    </Link>
  );
}
