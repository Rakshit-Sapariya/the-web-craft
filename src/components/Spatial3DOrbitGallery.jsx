import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, ArrowLeft, ArrowRight, Eye, ShieldCheck, 
  ExternalLink, Layers, Smartphone, Laptop
} from 'lucide-react';

/**
 * Spatial3DOrbitGallery
 * A 3D spatial cylindrical carousel where projects are placed around a 3D orbit.
 * Allows smooth dragging, keyboard navigation, and interactive 3D perspective depth.
 */
export default function Spatial3DOrbitGallery({ onSelectProject }) {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const currentRotationRef = useRef(0);
  const containerRef = useRef(null);

  const projects = [
    {
      id: 'beautyparlour',
      title: 'Glamour & Glow Bridal Studio',
      badge: 'Bridal Studio',
      metric: '5.0 Rating • 1,200+ Brides',
      category: 'Luxury Salon',
      accent: '#7D4047',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
      description: 'Bridal HD airbrush packages, pre-bridal glow, and instant beautician appointment booking.'
    },
    {
      id: 'hairparlour',
      title: 'The Urban Gentleman Barbershop',
      badge: 'Barber Lounge',
      metric: '4.9 Rating • Master Barbers',
      category: 'Men\'s Grooming',
      accent: '#355CDE',
      image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80',
      description: 'Precision taper skin fades, straight-razor beard sculpting, and barber chair scheduling.'
    },
    {
      id: 'gym',
      title: 'IronCore Elite Fitness & CrossFit',
      badge: 'CrossFit Arena',
      metric: '15,000 Sq.Ft • 4.9 Rating',
      category: 'Fitness Center',
      accent: '#15803D',
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80',
      description: '15,000 sq.ft facility, Rogue barbells, CrossFit boxes, and free 1-day pass claim.'
    },
    {
      id: 'restaurant',
      title: 'The Saffron Courtyard Dining',
      badge: 'Fine Dining',
      metric: 'Times Food Award 2025',
      category: 'Gourmet Dining',
      accent: '#D97706',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
      description: 'Royal Awadhi restaurant with live online table reservation and a la carte menu.'
    },
    {
      id: 'ecommerce',
      title: 'Zahra Luxury Silk & Ethnic Couture',
      badge: 'Bestseller',
      metric: '0.4s Fast Load • 5.0 Rating',
      category: 'D2C E-Commerce',
      accent: '#7D4047',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
      description: 'High-converting apparel store with live bag drawer, size selector, and discount codes.'
    },
    {
      id: 'realestate',
      title: 'Shikhar Skyline Residences',
      badge: 'Enterprise',
      metric: 'RERA Approved • 4.9 Rating',
      category: 'Real Estate & Living',
      accent: '#355CDE',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      description: 'Luxury 3 & 4 BHK sky-living portal with interactive floorplans and VIP site visit scheduler.'
    },
    {
      id: 'healthcare',
      title: 'Dr. Mehta Dental Aesthetics',
      badge: 'NABH Clinic',
      metric: '16+ Yrs Exp • 4.9 Rating',
      category: 'Healthcare & Clinic',
      accent: '#0369A1',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
      description: 'NABH-certified modern clinic platform with instant patient consultation appointment booking.'
    },
    {
      id: 'custombuild',
      title: 'NexFlow Systems Architecture',
      badge: '100% Bespoke',
      metric: 'Bespoke React + Node',
      category: 'Custom Enterprise',
      accent: '#4338CA',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      description: 'Handwritten React + Node architecture, live operational dashboard, API webhooks, and workflows.'
    }
  ];

  const total = projects.length;
  const angleStep = 360 / total;
  // Radius calculation for 3D cylinder
  const radius = 420;

  const rotateTo = (index) => {
    setActiveIndex(index);
    const target = -index * angleStep;
    setRotationAngle(target);
    currentRotationRef.current = target;
  };

  const handleNext = () => {
    const next = (activeIndex + 1) % total;
    rotateTo(next);
  };

  const handlePrev = () => {
    const prev = (activeIndex - 1 + total) % total;
    rotateTo(prev);
  };

  // Mouse & Touch Drag Handlers
  const handlePointerDown = (e) => {
    setIsDragging(true);
    startXRef.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = clientX - startXRef.current;
    const newAngle = currentRotationRef.current + deltaX * 0.25;
    setRotationAngle(newAngle);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    // Snap to closest project
    const normalizedAngle = -rotationAngle;
    const snappedIndex = Math.round(normalizedAngle / angleStep);
    const positiveIndex = ((snappedIndex % total) + total) % total;
    rotateTo(positiveIndex);
  };

  return (
    <section className="relative py-14 sm:py-24 overflow-hidden bg-[#FAF6EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#7D4047]/10 border border-[#7D4047]/20 text-[#7D4047] text-xs font-bold tracking-widest uppercase">
            <Layers className="w-3.5 h-3.5" />
            <span>3D Spatial Gallery Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#111111] tracking-tight font-display">
            Explore 8 Live Client Architectures in 3D Orbit
          </h2>
          <p className="text-sm text-[#5A534A] max-w-xl mx-auto">
            Drag to rotate the 3D cylinder, or click any card to inspect its tactile conversion architecture.
          </p>
        </div>

        {/* 3D Orbit Viewport Stage */}
        <div 
          ref={containerRef}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          style={{ perspective: '1600px', perspectiveOrigin: '50% 50%' }}
          className="relative h-[480px] sm:h-[540px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
        >
          {/* Central Cylinder Axis */}
          <div
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateY(${rotationAngle}deg)`,
              transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className="relative w-full max-w-[360px] h-[400px] flex items-center justify-center"
          >
            {projects.map((project, idx) => {
              const cardAngle = idx * angleStep;
              const isActive = idx === activeIndex;

              return (
                <div
                  key={project.id}
                  style={{
                    position: 'absolute',
                    transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden'
                  }}
                  className={`w-[82vw] max-w-[340px] h-[390px] rounded-3xl p-5 border transition-all duration-300 flex flex-col justify-between ${
                    isActive 
                      ? 'bg-white shadow-2xl border-[#7D4047] ring-2 ring-[#7D4047]/20 scale-105' 
                      : 'bg-white/75 backdrop-blur-md border-[#E5DDCF] opacity-65 hover:opacity-90 shadow-md'
                  }`}
                >
                  {/* Card Thumbnail */}
                  <div className="relative h-44 rounded-2xl overflow-hidden border border-[#E5DDCF]/80">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/70 backdrop-blur-md text-white border border-white/20">
                        {project.badge}
                      </span>
                    </div>
                    <div className="absolute bottom-2.5 right-2.5">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-[#FAF6EF]/90 text-[#111111] border border-[#E5DDCF]">
                        {project.metric}
                      </span>
                    </div>
                  </div>

                  {/* Card Information */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#7D4047]">
                      {project.category}
                    </span>
                    <h3 className="text-base font-bold text-[#111111] line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#5A534A] line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Card Action Trigger */}
                  <div className="pt-3 border-t border-[#E5DDCF] flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#5A534A]">Live Staging</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSelectProject) {
                          onSelectProject(project.id);
                        } else {
                          window.location.href = `/demos?project=${project.id}`;
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#7D4047] hover:bg-[#683238] text-white text-xs font-bold shadow-xs active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-[#7D4047] focus-visible:outline-none"
                    >
                      <span>Inspect Demo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Orbit Controls & Project Indicator Dots */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-xl mx-auto pt-2">
          
          {/* Arrow Triggers */}
          <button
            type="button"
            onClick={handlePrev}
            className="p-3 rounded-full bg-white border border-[#E5DDCF] hover:border-[#7D4047] text-[#111111] shadow-xs hover:shadow-md transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-[#7D4047] focus-visible:outline-none"
            aria-label="Previous 3D project"
          >
            <ArrowLeft className="w-4 h-4 text-[#7D4047]" />
          </button>

          {/* Indicator Pills */}
          <div className="flex items-center gap-2">
            {projects.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => rotateTo(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === activeIndex 
                    ? 'w-8 h-2.5 bg-[#7D4047]' 
                    : 'w-2.5 h-2.5 bg-[#E5DDCF] hover:bg-[#7D4047]/50'
                }`}
                aria-label={`Jump to ${p.title}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="p-3 rounded-full bg-white border border-[#E5DDCF] hover:border-[#7D4047] text-[#111111] shadow-xs hover:shadow-md transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-[#7D4047] focus-visible:outline-none"
            aria-label="Next 3D project"
          >
            <ArrowRight className="w-4 h-4 text-[#7D4047]" />
          </button>

        </div>

      </div>
    </section>
  );
}
