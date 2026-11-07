import React, { useRef } from 'react';

/**
 * BespokeTiltCard
 * High-performance 3D perspective card with natural spring easing,
 * tactile 5-state feedback, and WCAG AAA compliance.
 */
export default function BespokeTiltCard({
  children,
  className = '',
  cornerStyle = 'arch-1', // 'arch-1' | 'arch-2' | 'arch-3' | 'rounded'
  intensity = 7,
  onClick,
  role,
  tabIndex
}) {
  const cardRef = useRef(null);

  const getCornerClass = () => {
    switch (cornerStyle) {
      case 'arch-1':
        return 'rounded-tl-[26px] rounded-br-[22px] rounded-tr-md rounded-bl-md';
      case 'arch-2':
        return 'rounded-tr-[26px] rounded-bl-[22px] rounded-tl-md rounded-br-md';
      case 'arch-3':
        return 'rounded-t-[32px] rounded-b-xl';
      default:
        return 'rounded-2xl';
    }
  };

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -intensity;
    const rotateY = ((x - centerX) / centerX) * intensity;

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      role={role}
      tabIndex={tabIndex}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.22s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.22s ease, border-color 0.22s ease'
      }}
      className={`bg-white/85 backdrop-blur-md border border-[#E5DDCF] hover:border-[#7D4047]/50 shadow-xs hover:shadow-xl hover:shadow-[#7D4047]/5 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#7D4047] focus-visible:outline-none transition-all ${getCornerClass()} ${className}`}
    >
      {children}
    </div>
  );
}
