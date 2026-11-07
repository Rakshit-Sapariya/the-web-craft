import React from 'react';
import { 
  GitCommit, Clock, CheckCircle2, AlertCircle, Sparkles, 
  HelpCircle, ShieldCheck, RefreshCw, FileText, ArrowRight 
} from 'lucide-react';
import { PROCESS_STAGES, COMPANY_CONFIG } from '../data/pricingData';

export default function ProcessRoadmap() {
  return (
    <section id="process" className="py-8 sm:py-20 bg-[#F1ECE6] border-t border-[#DDD5CD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-16 space-y-2 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DDD5CD]/60 border border-[#DDD5CD] text-[#7D4047] text-xs font-bold uppercase tracking-wider">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Transparent Roadmap</span>
          </div>
          <h2 className="text-xl sm:text-4xl font-extrabold text-[#2E2E2E] tracking-tight px-2 leading-snug">
            How Your Website Is Created: From Booking to Launch
          </h2>
          <p className="text-xs sm:text-base text-[#625f5c]">
            No guesswork, no unexpected delays. Here is our exact 5-step collaborative journey.
          </p>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="md:hidden text-center text-[11px] font-bold text-[#7D4047] mb-3 flex items-center justify-center gap-1">
          <span>Swipe horizontally through 5 stages</span>
          <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
        </div>

        {/* 5-Step Process Timeline (Horizontal Snap on Mobile, Grid on Desktop) */}
        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-[#DDD5CD] -translate-y-8 z-0" />

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-2 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-5 md:gap-6 relative z-10 no-scrollbar">
            {PROCESS_STAGES.map((stage) => (
              <div 
                key={stage.step}
                className="min-w-[240px] max-w-[260px] md:min-w-0 md:max-w-none snap-start bg-white rounded-xl sm:rounded-2xl border border-[#DDD5CD] p-4 sm:p-6 shadow-soft hover-glow-card group transition-all flex flex-col justify-between relative overflow-hidden shrink-0 md:shrink"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#7D4047] text-white font-heading font-black text-xs sm:text-sm flex items-center justify-center shadow-wine group-hover:scale-110 group-hover:bg-[#67333a] transition-transform duration-300">
                      {stage.step}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold text-[#625f5c] bg-[#DDD5CD]/40 px-2 py-0.5 rounded-md">
                      {stage.duration}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xs sm:text-sm text-[#2E2E2E] leading-snug mb-1 sm:mb-2">
                    {stage.title}
                  </h3>

                  <p className="text-[11px] sm:text-xs text-[#625f5c] leading-relaxed line-clamp-3 sm:line-clamp-none">
                    {stage.desc}
                  </p>
                </div>

                {stage.policyNote && (
                  <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-[#DDD5CD]/60 text-[10px] sm:text-[11px] font-semibold text-[#7D4047] flex items-start gap-1.5">
                    <AlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 mt-0.5" />
                    <span className="line-clamp-2 sm:line-clamp-none">{stage.policyNote}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Highlight Box: Revisions & Cancellation Policy Clarification (Compact on Mobile) */}
        <div className="mt-6 sm:mt-14 bg-white rounded-xl sm:rounded-2xl border-2 border-[#DDD5CD] p-4 sm:p-8 shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-center">
            
            <div className="lg:col-span-12 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#7D4047] uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                <span>Fair Scope &amp; Transparent Revisions Policy</span>
              </div>
              <h3 className="text-base sm:text-2xl font-extrabold text-[#2E2E2E]">
                What Happens When You Request Changes After Seeing the Website Demo?
              </h3>
              <p className="text-xs sm:text-sm text-[#625f5c] leading-relaxed">
                Standard minor adjustments (color tweaks, text updates, replacing photos) are carried out seamlessly.
              </p>
              <div className="bg-[#F1ECE6]/60 border border-[#DDD5CD] p-3 sm:p-3.5 rounded-xl space-y-2 text-xs text-[#2E2E2E]">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Included Free:</strong> Fixing typos, minor spacing/color tweaks, and bug fixes before final handover.</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-[#7D4047] shrink-0 mt-0.5" />
                  <span><strong>Additional Scope:</strong> New extra pages or major redesigns outside initial brief are billed transparently.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero Upfront Risk:</strong> No online payment required on website. Pay on WhatsApp only after you see your website completed, and before it goes live on the browser.</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
