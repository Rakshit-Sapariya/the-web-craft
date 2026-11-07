import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, ShieldCheck, Lock, EyeOff, Ban, 
  Terminal, CheckCircle2, Zap, Server, Shield,
  ArrowRight, ArrowUpRight, Cpu, FileCode2, Check, ExternalLink
} from 'lucide-react';

const SECURITY_PILLARS = [
  {
    id: 'sqli',
    icon: ShieldCheck,
    title: 'Anti-SQL Injection Shield',
    badge: 'SQLi Immune',
    categoryGroup: 'database',
    categoryLabel: 'Database Security',
    desc: 'All database queries use synchronized prepared statements. No malicious SQL payloads can execute or tamper with records.',
    defense: 'Parameterized Query Pipeline',
    testResult: "Injection Payload (' OR 1=1 --) Blocked",
    scope: 'Client Orders, Admin Auth, Search Queries',
    techSpec: 'sqlite3.prepare(SQL).run(...params) with typed argument sanitization.'
  },
  {
    id: 'xss',
    icon: Lock,
    title: 'XSS & Input Sanitization',
    badge: 'XSS Protected',
    categoryGroup: 'database',
    categoryLabel: 'Code Purity',
    desc: 'Form inputs, client briefs, and search queries are stripped of malicious script vectors and angle brackets before processing.',
    defense: 'HTML Entity Encoding & DOMPurify',
    testResult: '<script> Vectors Neutralized (0 Vulnerabilities)',
    scope: 'Order Briefs, Contact Forms, Review Submissions',
    techSpec: 'Regex sanitization removing executable script tags and attribute event handlers.'
  },
  {
    id: 'ddos',
    icon: Zap,
    title: 'Anti-DDoS & Bot Rate Limiting',
    badge: 'Anti-DDoS Active',
    categoryGroup: 'network',
    categoryLabel: 'Network Protection',
    desc: 'Built-in Express IP rate-limiters throttle brute-force spam submissions and prevent automated botnet denial-of-service.',
    defense: 'IP Bucket Token Rate Limiting',
    testResult: 'Automated Botnet Flood Throttled (HTTP 429)',
    scope: 'API Endpoints, Form Submissions, Asset Uploads',
    techSpec: 'Express rate-limiter set to 60 requests/minute per client IP.'
  },
  {
    id: 'traversal',
    icon: Ban,
    title: 'Malicious File Traversal Blocker',
    badge: 'Traversal Shield',
    categoryGroup: 'privacy',
    categoryLabel: 'Asset Protection',
    desc: 'Asset uploads strictly block .exe, .bat, .sh, and .php executables. Sanitized filenames prevent directory traversal (../) exploits.',
    defense: 'MIME-Type Whitelist & Path Normalization',
    testResult: 'Executable Uploads (.php/.sh/.exe) Rejected',
    scope: '1 GB Asset Portal, Client Logos, Design Files',
    techSpec: 'Strict filename sanitization regex rejecting ../ and executable MIME headers.'
  },
  {
    id: 'adfree',
    icon: EyeOff,
    title: '100% Ad-Free Guarantee',
    badge: 'Zero Ads Ever',
    categoryGroup: 'privacy',
    categoryLabel: 'Privacy Charter',
    desc: 'Zero third-party ads, zero tracking scripts, zero spyware cookies, and zero annoying popups. Your clients experience 100% pure brand focus.',
    defense: 'Zero-Telemetry Architecture',
    testResult: '0 Third-Party Trackers or Cookies Detected',
    scope: 'Entire Web Frontend, Mobile & Desktop View',
    techSpec: 'Zero external telemetry beacons, ad networks, or invasive user tracking.'
  },
  {
    id: 'csp',
    icon: ShieldAlert,
    title: 'Anti-Clickjacking & Strict CSP',
    badge: 'CSP Enforced',
    categoryGroup: 'network',
    categoryLabel: 'Header Hardening',
    desc: 'Production-grade Content Security Policy (CSP), strict frameguard (X-Frame-Options DENY), and nosniff protection enforced.',
    defense: 'HTTP Security Headers & Frameguard',
    testResult: 'iFrame Embedding Denied (X-Frame-Options: DENY)',
    scope: 'Client Portals, Checkout Flows, Booking Engine',
    techSpec: 'X-Frame-Options: DENY, X-Content-Type-Options: nosniff, and strict CSP headers.'
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Shields', count: 6 },
  { id: 'database', label: 'Database & Code', count: 2 },
  { id: 'network', label: 'Network & DDoS', count: 2 },
  { id: 'privacy', label: 'Assets & Privacy', count: 2 },
];

export default function SecurityShieldSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeShieldId, setActiveShieldId] = useState('sqli');

  const filteredPillars = SECURITY_PILLARS.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.categoryGroup === selectedCategory;
  });

  const activeShield = SECURITY_PILLARS.find(p => p.id === activeShieldId) || filteredPillars[0] || SECURITY_PILLARS[0];
  const ActiveIcon = activeShield.icon;

  return (
    <section id="security" className="py-12 sm:py-20 bg-[#000000] text-white relative overflow-hidden border-y border-[#E2D7C3]/20">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#355CDE] text-xs font-bold uppercase tracking-wider shadow-xs">
            <Shield className="w-3.5 h-3.5 text-[#355CDE]" />
            <span>Cybersecurity Architecture &bull; 100% Zero-Ad Standard</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug font-heading">
            Production-Grade Security Architecture
          </h2>

          <p className="text-xs sm:text-base text-[#FFF7E8]/80 leading-relaxed">
            Every website engineered by <strong>THE WEBCRAFT</strong> adheres to strict sanitization standards, prepared statements, and privacy by design, delivered with an uncompromising <strong className="text-[#355CDE]">Strict 100% Zero-Ad Policy</strong>.
          </p>
        </div>

        {/* 3-Part Architectural Protocol Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
          <div className="bg-[#111111] p-4 sm:p-5 rounded-2xl rounded-tr-sm border border-white/10 text-center space-y-1 shadow-xs">
            <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono">OWASP 2026</div>
            <div className="text-sm font-bold text-white">0 Vulnerability Vectors</div>
            <p className="text-[11px] text-[#DDD5CD]/70 font-semibold">Synchronized Prepared Statements</p>
          </div>

          <div className="bg-[#111111] p-4 sm:p-5 rounded-2xl rounded-t-sm border border-white/10 text-center space-y-1 shadow-xs">
            <div className="text-xl sm:text-2xl font-extrabold text-[#355CDE] font-mono">100% Zero-Ad</div>
            <div className="text-sm font-bold text-white">Zero Spyware Trackers</div>
            <p className="text-[11px] text-[#DDD5CD]/70 font-semibold">0 Ad Cookies or Telemetry Popups</p>
          </div>

          <div className="bg-[#111111] p-4 sm:p-5 rounded-2xl rounded-tl-sm border border-white/10 text-center space-y-1 shadow-xs">
            <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono">60 Req / Min</div>
            <div className="text-sm font-bold text-white">Automated Anti-DDoS</div>
            <p className="text-[11px] text-[#DDD5CD]/70 font-semibold">Express Token Bucket Rate Limiting</p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  const firstMatch = SECURITY_PILLARS.find(p => cat.id === 'all' || p.categoryGroup === cat.id);
                  if (firstMatch) setActiveShieldId(firstMatch.id);
                }}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-[#355CDE] text-white shadow-sm'
                    : 'bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-2 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-white text-[#355CDE] font-extrabold' : 'bg-white/10 text-neutral-400'
                }`}>
                  {cat.id === 'all' ? SECURITY_PILLARS.length : SECURITY_PILLARS.filter(p => p.categoryGroup === cat.id).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Core Showcase: Split Architectural Spotlight + Verified Shield Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column (5 Cols): Live Security Shield Dossier & Telemetry Inspector */}
          {activeShield && (
            <div className="lg:col-span-5 bg-[#111111] rounded-3xl rounded-tl-sm border-2 border-[#355CDE]/40 p-6 sm:p-8 space-y-6 shadow-soft flex flex-col justify-between sticky top-28">
              
              <div className="space-y-4">
                {/* Header Strip with Live Status & Verified Badge */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#355CDE]">
                      Security Defense Dossier
                    </span>
                  </div>
                  <span className="font-mono text-[10px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    {activeShield.badge}
                  </span>
                </div>

                {/* Icon and Title */}
                <div className="flex items-start gap-4 pt-1">
                  <div className="w-12 h-12 rounded-2xl rounded-tr-sm bg-[#355CDE]/20 border border-[#355CDE]/40 text-[#355CDE] flex items-center justify-center shrink-0 shadow-xs">
                    <ActiveIcon className="w-6 h-6 text-[#355CDE]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#355CDE] block">
                      {activeShield.categoryLabel}
                    </span>
                    <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white mt-0.5">
                      {activeShield.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#FFF7E8]/80 leading-relaxed">
                  {activeShield.desc}
                </p>

                {/* Technical Implementation Audit Box */}
                <div className="bg-white/5 rounded-2xl rounded-br-sm p-4 border border-white/10 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400 text-[11px]">Defense Standard:</span>
                    <span className="font-bold text-white text-[11px]">{activeShield.defense}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400 text-[11px]">Audit Simulation:</span>
                    <span className="font-mono text-emerald-400 text-[11px] font-bold">{activeShield.testResult}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400 text-[11px]">Protected Scope:</span>
                    <span className="font-medium text-neutral-300 text-[11px]">{activeShield.scope}</span>
                  </div>
                  <div className="pt-2 border-t border-white/10">
                    <span className="text-[10px] font-mono text-[#FFF7E8]/60 block leading-relaxed">
                      <code>{activeShield.techSpec}</code>
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Verification Action Link */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <Link
                  to="/privacy-policy"
                  className="w-full py-3.5 px-5 rounded-full bg-[#355CDE] hover:bg-[#2447B8] active:scale-[0.98] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md"
                >
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span>Inspect Full Studio Cybersecurity Charter</span>
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </Link>
                <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Integrated in every custom build by default</span>
                </div>
              </div>

            </div>
          )}

          {/* Right Column (7 Cols): Interactive Security Pillars Matrix */}
          <div className="lg:col-span-7 space-y-3.5">
            <div className="flex items-center justify-between pb-1 px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Active Architectural Pillars ({filteredPillars.length} Shields)
              </span>
              <span className="text-[11px] text-neutral-400">
                Click any shield card to inspect dossier
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {filteredPillars.map((p, idx) => {
                const Icon = p.icon;
                const isSelected = activeShield && activeShield.id === p.id;
                const shapeClass = idx % 2 === 0 ? 'rounded-2xl rounded-tr-sm' : 'rounded-2xl rounded-bl-sm';

                return (
                  <div
                    key={p.id}
                    onClick={() => setActiveShieldId(p.id)}
                    className={`p-5 ${shapeClass} border cursor-pointer transition-all duration-200 flex flex-col justify-between group shadow-xs hover:shadow-md relative ${
                      isSelected
                        ? 'border-[#355CDE] bg-white/10 ring-2 ring-[#355CDE]/50'
                        : 'border-white/10 bg-white/5 hover:border-[#355CDE]/60 hover:bg-white/[0.08]'
                    }`}
                  >
                    <div>
                      {/* Card Top: Icon & Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-9 h-9 rounded-xl rounded-br-sm flex items-center justify-center shrink-0 transition-colors ${
                          isSelected ? 'bg-[#355CDE] text-white' : 'bg-[#355CDE]/20 text-[#355CDE]'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                          isSelected 
                            ? 'bg-[#355CDE] text-white border-[#355CDE]' 
                            : 'bg-white/10 text-[#355CDE] border-white/10'
                        }`}>
                          {p.badge}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="font-heading font-bold text-sm sm:text-base text-white group-hover:text-[#355CDE] transition-colors mb-1.5">
                        {p.title}
                      </h4>

                      {/* Description */}
                      <p className="text-[11px] sm:text-xs text-[#FFF7E8]/70 leading-relaxed mb-3">
                        {p.desc}
                      </p>
                    </div>

                    {/* Card Footer: Defense Tag & Inspect Trigger */}
                    <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="text-[10px] font-mono text-neutral-400 truncate pr-2">
                        {p.defense}
                      </span>
                      <span className="text-[#355CDE] font-bold inline-flex items-center gap-0.5 text-[11px] shrink-0 group-hover:translate-x-0.5 transition-transform">
                        <span>Inspect</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Live Security Verification Bar - Smooth Capsule Frame */}
            <div className="mt-4 p-4 sm:p-5 rounded-2xl rounded-bl-sm sm:rounded-full bg-[#111111] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-inner">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="text-white font-semibold">
                  Live Firewall &amp; Zero-Ad Policy Active
                </span>
                <span className="text-emerald-400 font-mono text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 hidden md:inline-block">
                  Rate Limiters Engaged &bull; SQLite WAL Prepared
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-white/80 shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>0 Third-Party Ad Trackers Allowed</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
