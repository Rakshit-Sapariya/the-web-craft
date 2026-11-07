import React from 'react';
import { Link } from 'react-router-dom';

/**
 * WebCraftBrandLogo - Renders the authentic logo mark from the second photo (Photo 2)
 * Features the genuine spiderweb, interlocking 'V' & 'C' with gold/metallic border, sage green code bracket '</>'
 */
export function WebCraftLogoIcon({ className = "w-10 h-10 sm:w-11 sm:h-11" }) {
  return (
    <div className={`${className} rounded-[13px] sm:rounded-[15px] overflow-hidden shrink-0 shadow-sm transition-all duration-200 border border-[#355CDE]/30 hover:border-[#355CDE]/70 relative bg-[#000000]`}>
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
      {/* Authentic Logo Badge */}
      <WebCraftLogoIcon className="w-10 h-10 sm:w-11 sm:h-11" />

      {/* Name Style */}
      <div className="shrink-0 flex flex-col justify-center">
        {/* 'WebCraft' with Royal Blue highlight */}
        <div 
          className="font-serif tracking-tight text-[19px] sm:text-[22px] leading-none select-none flex items-baseline font-bold"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {/* 'Web' in Solid Black */}
          <span className={isDark ? "text-white" : "text-[#000000] group-hover:text-[#355CDE] transition-colors"}>
            Web
          </span>
          {/* 'Craft' in Royal Blue */}
          <span className="text-[#355CDE] font-extrabold group-hover:text-[#2447B8] transition-colors">
            Craft
          </span>
        </div>

        {/* 'WEB DEVELOPMENT' with delicate rules */}
        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-1 sm:mt-1.5 select-none">
            <span className={`w-2.5 sm:w-3.5 h-[1px] ${isDark ? 'bg-white/30' : 'bg-[#355CDE]/40'} shrink-0`}></span>
            <span className={`text-[8.5px] sm:text-[9.5px] ${isDark ? 'text-white/70' : 'text-[#3D362E]'} tracking-[0.22em] sm:tracking-[0.26em] uppercase font-semibold whitespace-nowrap`}>
              Web Development
            </span>
            <span className={`w-2.5 sm:w-3.5 h-[1px] ${isDark ? 'bg-white/30' : 'bg-[#355CDE]/40'} shrink-0`}></span>
          </div>
        )}
      </div>
    </Link>
  );
}
