import React from 'react';
import { Code2, Zap, ShieldCheck, MessageCircle, UserCheck, Lock } from 'lucide-react';

export default function FeaturesGrid() {
  const engineeringPillars = [
    {
      num: '01',
      title: 'Handcrafted Clean React & Node.js',
      desc: 'No heavy CMS builders or bloated page-builder plugins. We hand-write lightweight, modular components for security, longevity, and search visibility.'
    },
    {
      num: '02',
      title: 'Sub-Second Loading & Google Core Vitals',
      desc: 'Optimized asset bundles under 50 KB, instant first-paint times, and 95+ Google PageSpeed ratings to maximize customer conversion.'
    },
    {
      num: '03',
      title: 'Bank-Grade SQL Prepared Statements',
      desc: 'Sanitized input pipelines, automated rate limiting, and zero third-party telemetry trackers ensure client and customer data remain confidential.'
    }
  ];

  const collaborationPillars = [
    {
      num: '04',
      title: 'Zero Online Upfront Fee Model',
      desc: 'Submit your requirements, wireframes, and design references with complete financial peace of mind. Pay on WhatsApp only after you approve the completed demo.'
    },
    {
      num: '05',
      title: 'Direct 1-on-1 Access with Rakshit Patel',
      desc: 'No ticketing delays or intermediary account managers. You collaborate directly with the lead developer throughout design, coding, and launch.'
    },
    {
      num: '06',
      title: '1 GB Asset Vault & Complete IP Handover',
      desc: 'Upload high-resolution design files, brand guides, and videos up to 1 GB. Upon milestone settlement, you own 100% of the repository and database code.'
    }
  ];

  return (
    <section className="py-10 sm:py-16 bg-[#FFF7E8] border-t border-[#E2D7C3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12 space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#355CDE] block font-bold">
            STUDIO METHODOLOGY • ZERO TEMPLATE BLOAT
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold text-[#000000] tracking-tight">
            How THE WEBCRAFT Delivers Better Web Experiences
          </h2>
          <p className="text-xs sm:text-sm text-[#3D362E] leading-relaxed">
            We operate as a technical engineering studio, prioritizing code purity, site speed, and transparent developer relationships.
          </p>
        </div>

        {/* 2-Column Editorial Capability Matrix - Architectural Complementary Asymmetry */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Column A: Technical Architecture (Top-Left Architectural Notch) */}
          <div className="bg-[#F1E8D8] rounded-3xl rounded-tr-lg border-t-4 border-t-[#355CDE] border border-[#E2D7C3] p-6 sm:p-8 space-y-6 shadow-soft">
            <div className="flex items-center justify-between border-b border-[#E2D7C3] pb-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#355CDE]" />
                <h3 className="font-heading font-bold text-sm sm:text-base text-[#000000]">
                  Technical Architecture &amp; Performance
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#355CDE] bg-[#355CDE]/10 px-2.5 py-0.5 rounded-full">
                PURE CODE
              </span>
            </div>

            <div className="space-y-3.5">
              {engineeringPillars.map((item) => (
                <div key={item.num} className="p-3.5 rounded-2xl rounded-bl-sm bg-[#FFF7E8]/80 border border-[#E2D7C3]/70 space-y-1 shadow-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-[#355CDE]">
                      {item.num}.
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-[#000000]">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#3D362E] leading-relaxed pl-5">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Column B: Collaboration & Delivery (Top-Right Architectural Notch) */}
          <div className="bg-[#F1E8D8] rounded-3xl rounded-tl-lg border-t-4 border-t-[#000000] border border-[#E2D7C3] p-6 sm:p-8 space-y-6 shadow-soft">
            <div className="flex items-center justify-between border-b border-[#E2D7C3] pb-3">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#355CDE]" />
                <h3 className="font-heading font-bold text-sm sm:text-base text-[#000000]">
                  Client Collaboration &amp; Financial Peace
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#355CDE] bg-[#355CDE]/10 px-2.5 py-0.5 rounded-full">
                DIRECT ACCESS
              </span>
            </div>

            <div className="space-y-3.5">
              {collaborationPillars.map((item) => (
                <div key={item.num} className="p-3.5 rounded-2xl rounded-br-sm bg-[#FFF7E8]/80 border border-[#E2D7C3]/70 space-y-1 shadow-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-[#355CDE]">
                      {item.num}.
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-[#000000]">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#3D362E] leading-relaxed pl-5">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
