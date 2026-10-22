import React from 'react';

/**
 * WebCraftWatermark - Renders the authentic logo emblem from the user's second photo (Photo 2)
 * Features the genuine spiderweb, interlocking 'V' & 'C' with metallic bevels and '</>' code bracket.
 */
export default function WebCraftWatermark({ 
  className = "w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] lg:w-[600px] lg:h-[600px]",
  opacity = "opacity-[0.09] sm:opacity-[0.12]",
  variant = "original" // 'original' | 'wine'
}) {
  const imgSrc = variant === "wine" ? "/webcraft-mark-wine.png" : "/webcraft-mark-transparent.png";

  return (
    <div className={`pointer-events-none select-none -z-10 flex items-center justify-center ${opacity} ${className}`}>
      <img
        src={imgSrc}
        alt="WebCraft Authentic Logo Watermark"
        className="w-full h-full object-contain filter drop-shadow-sm select-none"
      />
    </div>
  );
}
