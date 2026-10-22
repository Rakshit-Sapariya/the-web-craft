import React from 'react';
import { Code2, Zap, ShieldCheck, MessageCircle, UserCheck, Lock } from 'lucide-react';

export default function FeaturesGrid() {
  const features = [
    {
      icon: Lock,
      title: 'Anti-Hacker & 100% Ad-Free',
      desc: 'Bank-grade SQLite prepared statements, XSS input sanitization, DDoS throttling, and strictly zero third-party ads or trackers.'
    },
    {
      icon: Code2,
      title: 'Handcrafted Clean Code',
      desc: 'No heavy bloated site builders. We write bespoke, lightweight HTML/React & CSS for top-notch security and speed.'
    },
    {
      icon: Zap,
      title: 'Blazing Fast Performance',
      desc: 'Sub-second loading times tuned for 95+ Google PageSpeed scores, keeping bounce rates low and conversions high.'
    },
    {
      icon: ShieldCheck,
      title: '1 GB Asset Upload Portal',
      desc: 'Send all your design references, high-res photos, PDFs, and Figma assets directly with our 1 GB limit support.'
    },
    {
      icon: MessageCircle,
      title: 'Direct WhatsApp Desk (Chat Only)',
      desc: 'No ticketing queues. Chat directly with the lead developer on WhatsApp at +91 94282 98134 (WhatsApp Only • No Direct Calls) throughout the project lifecycle.'
    },
    {
      icon: UserCheck,
      title: 'Direct 1-on-1 Developer Access',
      desc: 'Work directly with lead developer Rakshit Patel. Zero middleman markups, agency overheads, or delayed communication.'
    }
  ];

  return (
    <section className="py-8 sm:py-16 bg-[#DDD5CD]/20 border-t border-[#DDD5CD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12 space-y-1.5 sm:space-y-3">
          <h2 className="text-xl sm:text-3xl font-extrabold text-[#2E2E2E]">
            Why Modern Businesses Choose THE WEBCRAFT
          </h2>
          <p className="text-xs sm:text-sm text-[#625f5c]">
            Designed for businesses that require high conversion, reliability, and honest developer communication.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div 
                key={i} 
                className="bg-white p-3.5 sm:p-7 rounded-xl sm:rounded-2xl border border-[#DDD5CD] shadow-soft hover-glow-card group cursor-default transition-all relative overflow-hidden flex flex-col justify-between"
              >
                {/* Subtle wine hover accent stripe */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#7D4047] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#7D4047]/10 text-[#7D4047] flex items-center justify-center mb-2.5 sm:mb-5 group-hover:bg-[#7D4047] group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm shrink-0">
                    <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="font-heading font-bold sm:font-extrabold text-xs sm:text-base text-[#2E2E2E] mb-1 sm:mb-2 group-hover:text-[#7D4047] transition-colors leading-snug">
                    {f.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#625f5c] leading-relaxed line-clamp-3 sm:line-clamp-none">
                    {f.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
