import React, { useState } from 'react';
import { 
  GitCommit, Clock, AlertCircle, ShieldCheck, 
  RefreshCw, Check, ArrowRight, Layers, Cpu, Terminal, Sparkles
} from 'lucide-react';
import { PROCESS_STAGES } from '../data/pricingData';

/**
 * SpatialIsometricPipeline
 * An isometric 3D architectural pipeline transforming the 5-step roadmap into
 * floating spatial tiers with specular edge lighting, stage selection, and zero-slop metrics.
 */
export default function SpatialIsometricPipeline() {
  const [selectedStage, setSelectedStage] = useState('01');

  const isometricStages = [
    {
      step: '01',
      title: 'Architectural Discovery & Blueprint',
      duration: 'Day 1 • 2–4 Hours',
      elevation: 'translate-y-0',
      icon: Terminal,
      accent: '#7D4047',
      desc: 'We analyze your business, identify high-intent conversion bottlenecks, and draft the bespoke structural component blueprint.',
      spec: 'Audit: Google Business Schema + Wireframe Grid'
    },
    {
      step: '02',
      title: 'AI High-Speed Synthesis Matrix',
      duration: 'Day 2 • 6–12 Hours',
      elevation: '-translate-y-2',
      icon: Cpu,
      accent: '#355CDE',
      desc: 'Using frontier LLMs strictly as high-speed compilers, we synthesize handwritten React 19 components and bespoke Tailwind tokens.',
      spec: 'Speed: Sub-180ms TTFB Baseline + Clean Code Handover'
    },
    {
      step: '03',
      title: 'Surgical Human Code Audit',
      duration: 'Day 3 • 4–8 Hours',
      elevation: '-translate-y-4',
      icon: Layers,
      accent: '#15803D',
      desc: 'Rakshit Patel personally audits every line: removing all AI slop, calibrating WCAG AAA contrast, and tuning 5-state micro-interactions.',
      spec: 'Standard: 100/100 Lighthouse + Zero-Hallucination Guard'
    },
    {
      step: '04',
      title: 'Live Escrow Staging Inspection',
      duration: 'Day 4 • Review Window',
      elevation: '-translate-y-6',
      icon: ShieldCheck,
      accent: '#D97706',
      desc: 'Your fully functional website is launched on a private staging portal. You inspect and test every button before clearing final payment.',
      spec: 'Guarantee: Zero Upfront Advance • 100% Satisfaction or ₹0'
    },
    {
      step: '05',
      title: 'Production Launch & Domain Handover',
      duration: 'Day 5 • Final Handshake',
      elevation: '-translate-y-8',
      icon: Sparkles,
      accent: '#7D4047',
      desc: 'We configure DNS, activate edge SSL certificates, verify Google Search Console indexing, and hand over complete source code ownership.',
      spec: 'Assets: 1-Year Hosting + SSL + Full Source Code'
    }
  ];

  const currentStage = isometricStages.find((s) => s.step === selectedStage) || isometricStages[0];

  return (
    <section className="relative py-16 sm:py-24 bg-[#FAF6EF] border-t border-[#E5DDCF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#355CDE]/10 border border-[#355CDE]/20 text-[#355CDE] text-xs font-bold tracking-widest uppercase">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>3D Spatial Process Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#111111] tracking-tight font-display">
            The 5-Stage Spatial Engineering Pipeline
          </h2>
          <p className="text-sm text-[#5A534A] max-w-xl mx-auto">
            Click through our isometric pipeline stages to inspect the exact collaborative process from booking to final live launch.
          </p>
        </div>

        {/* Isometric 3D Stepper Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative pt-4">
          {isometricStages.map((stage) => {
            const isSelected = stage.step === selectedStage;
            const Icon = stage.icon;

            return (
              <div
                key={stage.step}
                onClick={() => setSelectedStage(stage.step)}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '800px'
                }}
                className={`cursor-pointer rounded-3xl p-5 border transition-all duration-300 flex flex-col justify-between relative group ${
                  isSelected
                    ? 'bg-white shadow-xl border-[#7D4047] ring-2 ring-[#7D4047]/20 -translate-y-2'
                    : 'bg-white/70 backdrop-blur-md border-[#E5DDCF] hover:border-[#7D4047]/50 hover:-translate-y-1'
                }`}
              >
                {/* Step Marker Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    style={{ backgroundColor: stage.accent }}
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-mono font-bold text-xs shadow-xs"
                  >
                    {stage.step}
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FAF6EF] border border-[#E5DDCF] text-[#5A534A]">
                    {stage.duration}
                  </span>
                </div>

                {/* Stage Info */}
                <div className="space-y-1.5">
                  <h3 className="text-xs sm:text-sm font-bold text-[#111111] group-hover:text-[#7D4047] transition-colors">
                    {stage.title}
                  </h3>
                  <p className="text-[11px] text-[#5A534A] line-clamp-3 leading-relaxed">
                    {stage.desc}
                  </p>
                </div>

                {/* Status Bar */}
                <div className="pt-4 mt-3 border-t border-[#E5DDCF]/80 flex items-center justify-between text-[10px] font-bold">
                  <span className={isSelected ? 'text-[#7D4047]' : 'text-[#5A534A]'}>
                    {isSelected ? 'Active Inspection' : 'Click to Inspect'}
                  </span>
                  <ArrowRight className={`w-3 h-3 transition-transform ${isSelected ? 'translate-x-1 text-[#7D4047]' : 'text-[#5A534A]'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Spotlight Box for Selected Stage */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DDCF] shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#7D4047]/10 text-[#7D4047]">
                Stage {currentStage.step} Spotlight
              </span>
              <span className="text-xs text-[#5A534A]">&bull;</span>
              <span className="text-xs font-semibold text-[#5A534A]">{currentStage.duration}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#111111]">
              {currentStage.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#5A534A] leading-relaxed">
              {currentStage.desc}
            </p>
            <div className="pt-2 text-xs font-mono font-semibold text-[#15803D] flex items-center gap-2">
              <Check className="w-4 h-4 text-[#15803D]" />
              <span>{currentStage.spec}</span>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <a
              href="https://wa.me/919428298134?text=Hi%20Rakshit,%20I%20have%20a%20question%20about%20your%20website%20pipeline"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7D4047] hover:bg-[#683238] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-[#7D4047] focus-visible:outline-none"
            >
              <span>Discuss Project on WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
