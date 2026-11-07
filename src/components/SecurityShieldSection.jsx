import React from 'react';
import { 
  ShieldAlert, ShieldCheck, Lock, EyeOff, Ban, 
  Terminal, CheckCircle2, Zap, Server, Shield
} from 'lucide-react';

export default function SecurityShieldSection() {
  const securityPillars = [
    {
      icon: ShieldCheck,
      title: 'Anti-SQL Injection Shield',
      desc: 'All database queries use synchronized prepared statements. No malicious SQL payloads can execute or tamper with records.',
      badge: 'SQLi Immune',
    },
    {
      icon: Lock,
      title: 'XSS & Injection Sanitization',
      desc: 'Form inputs, client briefs, and search queries are stripped of malicious script vectors and angle brackets before processing.',
      badge: 'XSS Protected',
    },
    {
      icon: Zap,
      title: 'Anti-DDoS & Bot Rate Limiting',
      desc: 'Built-in Express IP rate-limiters throttle brute-force spam submissions and prevent automated botnet denial-of-service.',
      badge: 'Anti-DDoS Active',
    },
    {
      icon: Ban,
      title: 'Malicious File Traversal Blocker',
      desc: 'Asset uploads strictly block .exe, .bat, .sh, and .php executables. Sanitized filenames prevent directory traversal (../) exploits.',
      badge: 'Traversal Shield',
    },
    {
      icon: EyeOff,
      title: '100% Ad-Free Guarantee',
      desc: 'Zero third-party ads, zero tracking scripts, zero spyware cookies, and zero annoying popups. Your clients experience 100% pure brand focus.',
      badge: 'Zero Ads Ever',
    },
    {
      icon: ShieldAlert,
      title: 'Anti-Clickjacking & Strict CSP',
      desc: 'Military-grade Content Security Policy (CSP), frameguard (X-Frame-Options DENY), and MIME-sniffing protection enforced.',
      badge: 'CSP Enforced',
    },
  ];

  return (
    <section className="py-8 sm:py-16 bg-[#2E2E2E] text-white relative overflow-hidden border-y border-neutral-700">
      {/* Subtle Ambient Glowing Orbs */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#7D4047]/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute -bottom-10 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-12 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider shimmer-badge">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Unbreakable Security &amp; 100% Ad-Free Guarantee</span>
          </div>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug font-heading">
            Hardened Cybersecurity Architecture
          </h2>
          <p className="text-xs sm:text-base text-[#DDD5CD]/80 leading-relaxed">
            Every website engineered by <strong>THE WEBCRAFT</strong> is fortified against hacker attacks, malicious code injections, and automated bot raids — delivered with a <strong className="text-emerald-400">Strict 100% Zero-Ad Policy</strong>.
          </p>
        </div>

        {/* Security Pillars 2-Column Mobile, 3-Column Desktop Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {securityPillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div 
                key={idx}
                className="bg-white/5 border border-white/10 hover:border-emerald-500/40 p-4 sm:p-6 rounded-2xl transition-all duration-300 hover-glow-card relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-300">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/10 text-emerald-300 border border-white/10">
                      {p.badge}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-white group-hover:text-emerald-300 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#DDD5CD]/70 mt-1.5 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Security Verification Bar */}
        <div className="mt-6 sm:mt-10 p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="text-white font-semibold">
              Live Firewall &amp; Zero-Ad Policy Active
            </span>
            <span className="text-[#DDD5CD]/60 hidden sm:inline">&bull;</span>
            <span className="text-emerald-400 font-mono text-[11px] hidden sm:inline">
              Rate Limiters Engaged &bull; SQLite WAL Prepared
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[#DDD5CD]/80">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>0 Third-Party Ad Trackers Allowed</span>
          </div>
        </div>

      </div>
    </section>
  );
}
