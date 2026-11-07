import React from 'react';
import { 
  GitCommit, Clock, AlertCircle, 
  HelpCircle, ShieldCheck, RefreshCw, FileText, ArrowRight 
} from 'lucide-react';
import { PROCESS_STAGES, COMPANY_CONFIG } from '../data/pricingData';

export default function ProcessRoadmap() {
  return (
    <section id="process" className="py-8 sm:py-20 bg-[#FFF7E8] border-t border-[#E2D7C3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-16 space-y-2 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1E8D8] border border-[#E2D7C3] text-[#000000] text-xs font-bold uppercase tracking-wider">
            <RefreshCw className="w-3.5 h-3.5 text-[#355CDE]" />
            <span>Transparent Roadmap</span>
          </div>
          <h2 className="text-xl sm:text-4xl font-extrabold text-[#000000] tracking-tight px-2 leading-snug">
            How Your Website Is Created: From Booking to Launch
          </h2>
          <p className="text-xs sm:text-base text-[#3D362E]">
            No guesswork, no unexpected delays. Here is our exact 5-step collaborative journey.
          </p>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="md:hidden text-center text-[11px] font-bold text-[#355CDE] mb-3 flex items-center justify-center gap-1">
          <span>Swipe horizontally through 5 stages</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>

        {/* 5-Step Process Timeline - Directional Progressive Notch System */}
        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-[#E2D7C3] -translate-y-8 z-0" />

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-2 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-5 md:gap-6 relative z-10 no-scrollbar">
            {PROCESS_STAGES.map((stage) => {
              const shapeClass = 
                stage.step === '01' ? 'rounded-2xl rounded-tl-none' :
                stage.step === '02' ? 'rounded-2xl rounded-tr-none' :
                stage.step === '03' ? 'rounded-2xl rounded-bl-none' :
                stage.step === '04' ? 'rounded-2xl rounded-br-none' :
                'rounded-3xl rounded-t-sm border-t-2 border-t-[#355CDE]';

              return (
                <div 
                  key={stage.step}
                  className={`min-w-[240px] max-w-[260px] md:min-w-0 md:max-w-none snap-start bg-[#F1E8D8] ${shapeClass} border border-[#E2D7C3] p-4 sm:p-6 hover:border-[#355CDE] group transition-all duration-200 flex flex-col justify-between relative overflow-hidden shrink-0 md:shrink shadow-xs`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-tl-xl rounded-br-xl rounded-tr-xs rounded-bl-xs bg-[#355CDE] text-white font-heading font-black text-xs sm:text-sm flex items-center justify-center group-hover:bg-[#2447B8] transition-colors shadow-xs">
                        {stage.step}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-bold text-[#3D362E] bg-[#E2D7C3]/60 px-2.5 py-0.5 rounded-full">
                        {stage.duration}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-xs sm:text-sm text-[#000000] leading-snug mb-1 sm:mb-2">
                      {stage.title}
                    </h3>

                    <p className="text-[11px] sm:text-xs text-[#3D362E] leading-relaxed line-clamp-3 sm:line-clamp-none">
                      {stage.desc}
                    </p>
                  </div>

                  {stage.policyNote && (
                    <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-[#E2D7C3] text-[10px] sm:text-[11px] font-semibold text-[#355CDE] flex items-start gap-1.5">
                      <AlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 mt-0.5" />
                      <span className="line-clamp-2 sm:line-clamp-none">{stage.policyNote}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Highlight Box: Revisions & Cancellation Policy Clarification - Architectural Silhouette */}
        <div className="mt-6 sm:mt-14 bg-[#F1E8D8] rounded-[32px] rounded-bl-sm border border-[#E2D7C3] p-5 sm:p-8 shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-center">
            
            <div className="lg:col-span-12 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#355CDE] uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                <span>Fair Scope &amp; Transparent Revisions Policy</span>
              </div>
              <h3 className="text-base sm:text-2xl font-extrabold text-[#000000]">
                What Happens When You Request Changes After Seeing the Website Demo?
              </h3>
              <p className="text-xs sm:text-sm text-[#3D362E] leading-relaxed">
                Standard minor adjustments (color tweaks, text updates, replacing photos) are carried out seamlessly.
              </p>
              <div className="bg-[#FFF7E8] border border-[#E2D7C3] p-4 sm:p-5 rounded-2xl rounded-tr-sm space-y-2 text-xs text-[#000000] shadow-xs">
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#355CDE] shrink-0 mt-1.5" />
                  <span><strong>Included Free:</strong> Fixing typos, minor spacing/color tweaks, and bug fixes before final handover.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#355CDE] shrink-0 mt-1.5" />
                  <span><strong>Additional Scope:</strong> New extra pages or major redesigns outside initial brief are billed transparently.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#355CDE] shrink-0 mt-1.5" />
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
