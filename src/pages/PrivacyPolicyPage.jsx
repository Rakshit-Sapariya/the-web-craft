import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Lock, EyeOff, FileText, CheckCircle2, 
  ArrowLeft, Printer, Mail, Phone, MessageCircle, Server, UserCheck, 
  AlertCircle, Database, Globe, Key, Clock, ShieldAlert, Sparkles,
  RefreshCw
} from 'lucide-react';
import { COMPANY_CONFIG } from '../data/pricingData';

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState('intro');

  const lastUpdated = 'October 19, 2026';

  const sections = [
    { id: 'intro', label: '1. Studio Identity & Overview' },
    { id: 'collection', label: '2. Information We Collect' },
    { id: 'usage', label: '3. Purpose & Data Processing' },
    { id: 'zero-ads', label: '4. Zero-Ad & Anti-Tracking Pledge' },
    { id: 'security', label: '5. Technical Fortification & Security' },
    { id: 'ip-ownership', label: '6. Code Ownership & Client IP' },
    { id: 'cookies', label: '7. Cookies & Storage Policy' },
    { id: 'third-party', label: '8. Third-Party Integrations' },
    { id: 'rights', label: '9. Your Statutory Rights (DPDP & GDPR)' },
    { id: 'retention', label: '10. Data Retention & Instant Purge' },
    { id: 'contact', label: '11. Privacy Officer & Studio Desk' },
  ];

  const handlePrint = () => {
    window.print();
  };

  const scrollTo = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-[#F1ECE6] text-[#2E2E2E] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#DDD5CD]">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#7D4047] hover:text-[#67333a] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex text-xs font-mono text-[#625f5c]">
              Last Fortified: {lastUpdated}
            </span>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#DDD5CD] hover:border-[#7D4047] text-xs font-bold text-[#2E2E2E] hover:text-[#7D4047] transition-all shadow-sm"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Policy</span>
            </button>
          </div>
        </div>

        {/* Page Hero */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase tracking-wider shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Client Confidentiality & Privacy Charter</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#2E2E2E] tracking-tight">
            Privacy Policy & Data Security Charter
          </h1>

          <p className="text-sm sm:text-base text-[#625f5c] max-w-2xl mx-auto leading-relaxed">
            At <strong>THE WEBCRAFT</strong>, privacy is not a checkbox—it is engineered into every line of code we write. Here is our complete, transparent policy on how client data, project briefs, and proprietary assets are protected.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-[#625f5c]">
            <span className="px-3 py-1 rounded-md bg-white border border-[#DDD5CD] font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> India DPDP Act 2023 Aligned
            </span>
            <span className="px-3 py-1 rounded-md bg-white border border-[#DDD5CD] font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> GDPR Transparency Standard
            </span>
            <span className="px-3 py-1 rounded-md bg-white border border-[#DDD5CD] font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> OWASP Top 10 Fortified
            </span>
          </div>
        </div>

        {/* Key Privacy Pillars (4 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <div className="bg-white p-5 rounded-2xl border-2 border-[#DDD5CD] hover:border-[#7D4047] transition-all shadow-soft space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <EyeOff className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-sm text-[#2E2E2E]">Zero Data Selling</h3>
            <p className="text-xs text-[#625f5c] leading-relaxed">
              We never sell, rent, broker, or monetize your contact records or business blueprints to third-party ad networks or brokers.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border-2 border-[#DDD5CD] hover:border-[#7D4047] transition-all shadow-soft space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-sm text-[#2E2E2E]">100% Ad-Free Guarantee</h3>
            <p className="text-xs text-[#625f5c] leading-relaxed">
              No invasive marketing pixels, banner ads, tracking beacons, or cross-site fingerprinting scripts exist anywhere in our code.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border-2 border-[#DDD5CD] hover:border-[#7D4047] transition-all shadow-soft space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-sm text-[#2E2E2E]">Zero Card Data Stored</h3>
            <p className="text-xs text-[#625f5c] leading-relaxed">
              Zero upfront online payments required. We do not store or process debit/credit card numbers or UPI PINs on web servers.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border-2 border-[#DDD5CD] hover:border-[#7D4047] transition-all shadow-soft space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Key className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-sm text-[#2E2E2E]">100% Client Code Ownership</h3>
            <p className="text-xs text-[#625f5c] leading-relaxed">
              Once project milestones are completed and handed over, you own all bespoke source code, visual designs, and copy outright.
            </p>
          </div>
        </div>

        {/* Content Layout: Sticky Table of Contents + Policy Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Table of Contents (Desktop Sticky) */}
          <aside className="lg:col-span-4 sticky top-24 space-y-4">
            <div className="bg-white rounded-2xl border border-[#DDD5CD] p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#DDD5CD]">
                <FileText className="w-4 h-4 text-[#7D4047]" />
                <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-[#2E2E2E]">
                  Policy Table of Contents
                </h3>
              </div>
              <nav className="space-y-1 text-xs">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all font-medium flex items-center justify-between ${
                      activeSection === s.id
                        ? 'bg-[#7D4047] text-white shadow-xs font-bold'
                        : 'text-[#625f5c] hover:bg-[#F1ECE6] hover:text-[#2E2E2E]'
                    }`}
                  >
                    <span>{s.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Quick Contact Card */}
            <div className="bg-[#2E2E2E] text-white rounded-2xl p-5 space-y-3 shadow-soft">
              <div className="flex items-center gap-2 text-[#DDD5CD]">
                <ShieldAlert className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider">Privacy Assistance</span>
              </div>
              <p className="text-xs text-[#DDD5CD]/80 leading-relaxed">
                Need your archived project brief deleted immediately or want an export of your inquiry records?
              </p>
              <div className="pt-2 text-xs space-y-1.5 text-[#DDD5CD]">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#DDD5CD] shrink-0" />
                  <a href="mailto:thewebcraft404@gmail.com" className="hover:underline font-mono text-white">
                    thewebcraft404@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <a 
                    href="https://wa.me/919428298134" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:underline font-mono text-emerald-400 font-semibold text-xs"
                    title="Chat on WhatsApp"
                  >
                    +91 94282 98134 <span className="text-[10px] text-emerald-300 font-sans font-bold">(WhatsApp Only &bull; No Calls)</span>
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Policy Document Body */}
          <main className="lg:col-span-8 bg-white rounded-3xl border border-[#DDD5CD] p-6 sm:p-10 shadow-soft space-y-12 leading-relaxed text-sm text-[#4a4745]">
            
            {/* Section 1 */}
            <section id="intro" className="space-y-4 scroll-mt-28">
              <div className="flex items-center gap-2">
                <span className="w-2 h-6 rounded-full bg-[#7D4047]" />
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#2E2E2E]">
                  1. Studio Identity &amp; Scope of Policy
                </h2>
              </div>
              <p>
                This Privacy Policy governs the manner in which <strong>THE WEBCRAFT</strong> (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;, or &quot;the Studio&quot;) collects, maintains, fortifies, uses, and discloses information gathered from clients, prospective business partners, and visitors of our website located at <code className="bg-[#F1ECE6] px-2 py-0.5 rounded text-[#7D4047] font-mono text-xs">the-webcraft.studio</code> and related service endpoints.
              </p>
              <p>
                By accessing our platform, configuring website packages through our price estimator, tracking development milestones via <Link to="/track" className="text-[#7D4047] font-semibold underline hover:text-[#67333a]">/track</Link>, or submitting an inquiry via our booking form, you acknowledge the terms outlined in this document.
              </p>
              <div className="bg-[#F1ECE6] border-l-4 border-[#7D4047] p-4 rounded-r-xl text-xs text-[#2E2E2E]">
                <strong>Developer Commitment:</strong> We are a dedicated engineering team, not an advertising or data aggregation firm. Your information is requested exclusively to design, engineer, and deploy your custom web software.
              </div>
            </section>

            {/* Section 2 */}
            <section id="collection" className="space-y-4 scroll-mt-28">
              <div className="flex items-center gap-2">
                <span className="w-2 h-6 rounded-full bg-[#7D4047]" />
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#2E2E2E]">
                  2. Information We Collect
                </h2>
              </div>
              <p>
                We adhere strictly to the principle of <em>Data Minimization</em> under international privacy best practices and the Digital Personal Data Protection (DPDP) Act of India. We only collect details that are directly required to scope and build your web software:
              </p>
              <div className="space-y-3">
                <div className="border border-[#DDD5CD] rounded-xl p-4">
                  <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#2E2E2E] mb-1">
                    A. Client-Provided Project Data
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-[#625f5c]">
                    <li>Full Name / Primary Contact Representative</li>
                    <li>Business or Brand Name and Business Domain/Niche</li>
                    <li>Direct Email Address and Contact Mobile Number</li>
                    <li>Selected Website Tier (e.g. Landing Page, E-Commerce, Custom Portal)</li>
                    <li>Target Project Budget bracket &amp; feature requirement checkboxes</li>
                    <li>Design preferences, reference URLs, and client-uploaded mockup assets</li>
                  </ul>
                </div>

                <div className="border border-[#DDD5CD] rounded-xl p-4">
                  <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#2E2E2E] mb-1">
                    B. Automatically Collected Technical Metadata
                  </h4>
                  <p className="text-xs text-[#625f5c] leading-relaxed">
                    To maintain firewall uptime, mitigate brute-force denial-of-service attempts, and ensure API stability, our server logs capture temporary connection headers:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-[#625f5c] mt-1">
                    <li>Anonymized IP addresses (for rate-limiting spam requests)</li>
                    <li>Browser user-agent and OS version (for responsive layout rendering tests)</li>
                    <li>Timestamped server error traces (stored locally for 30 days and purged automatically)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="usage" className="space-y-4 scroll-mt-28">
              <div className="flex items-center gap-2">
                <span className="w-2 h-6 rounded-full bg-[#7D4047]" />
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#2E2E2E]">
                  3. Purpose &amp; How We Process Your Data
                </h2>
              </div>
              <p>Your data is processed strictly under lawful, legitimate business grounds:</p>
              <ul className="space-y-2 text-xs text-[#625f5c]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Architecture &amp; Quotation:</strong> Reviewing your business scope to generate an accurate architectural blueprint and guaranteed direct pricing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Milestone Consultation:</strong> Direct technical contact with Lead Developer Rakshit Patel to review wireframes, functional demos, and revisions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>In-App Order Tracking:</strong> Providing secure lookup credentials on our tracking page (<Link to="/track" className="text-[#7D4047] font-semibold underline">/track</Link>) so you can observe live progress in real-time.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Cybersecurity &amp; Abuse Prevention:</strong> Verifying form submissions to prevent robotic distributed injection attacks and server flooding.</span>
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section id="zero-ads" className="space-y-4 scroll-mt-28">
              <div className="flex items-center gap-2">
                <span className="w-2 h-6 rounded-full bg-[#7D4047]" />
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#2E2E2E]">
                  4. The Zero-Ad &amp; Anti-Surveillance Pledge
                </h2>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 font-bold">
                  <EyeOff className="w-5 h-5 text-emerald-700" />
                  <span>Our Guaranteed Ad-Free Environment</span>
                </div>
                <p className="text-xs text-emerald-950 leading-relaxed">
                  Unlike conventional templates, website builders, or free hosting traps, <strong>THE WEBCRAFT operates on a strict zero-surveillance architecture</strong>:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="bg-white/80 p-3 rounded-xl border border-emerald-200">
                    <span className="font-bold text-emerald-900 block mb-1">❌ No Ad Retargeting</span>
                    No Meta Pixels, Google Tag Manager remarketing, or TikTok beacons tracking you across other apps.
                  </div>
                  <div className="bg-white/80 p-3 rounded-xl border border-emerald-200">
                    <span className="font-bold text-emerald-900 block mb-1">❌ No Spyware Cookies</span>
                    No third-party tracking cookies observing your browsing history outside our web application.
                  </div>
                  <div className="bg-white/80 p-3 rounded-xl border border-emerald-200">
                    <span className="font-bold text-emerald-900 block mb-1">❌ No Data Brokering</span>
                    We do not license, sell, or trade your contact info with third-party email blasts or cold telecallers.
                  </div>
                  <div className="bg-white/80 p-3 rounded-xl border border-emerald-200">
                    <span className="font-bold text-emerald-900 block mb-1">❌ No Third-Party Popups</span>
                    Zero affiliate banners, zero forced sponsored links, and zero promotional overlays.
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section id="security" className="space-y-4 scroll-mt-28">
              <div className="flex items-center gap-2">
                <span className="w-2 h-6 rounded-full bg-[#7D4047]" />
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#2E2E2E]">
                  5. Technical Fortification &amp; Data Security
                </h2>
              </div>
              <p>
                We treat application security with military-grade rigor. Our backend infrastructure and storage engines are reinforced with active defenses:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="border border-[#DDD5CD] rounded-xl p-4 space-y-1.5">
                  <div className="flex items-center gap-2 font-heading font-bold text-[#2E2E2E]">
                    <Database className="w-4 h-4 text-[#7D4047]" />
                    <span>SQL Injection Immunity</span>
                  </div>
                  <p className="text-[#625f5c]">
                    All database operations utilize parameterized prepared statements in SQLite. Malicious query injections cannot alter or leak table records.
                  </p>
                </div>

                <div className="border border-[#DDD5CD] rounded-xl p-4 space-y-1.5">
                  <div className="flex items-center gap-2 font-heading font-bold text-[#2E2E2E]">
                    <ShieldAlert className="w-4 h-4 text-blue-600" />
                    <span>Military-Grade CSP &amp; XSS Shield</span>
                  </div>
                  <p className="text-[#625f5c]">
                    Helmet headers enforce Content Security Policy, strict X-Frame-Options (DENY to prevent clickjacking), and automatic input HTML-entity sanitization.
                  </p>
                </div>

                <div className="border border-[#DDD5CD] rounded-xl p-4 space-y-1.5">
                  <div className="flex items-center gap-2 font-heading font-bold text-[#2E2E2E]">
                    <Server className="w-4 h-4 text-purple-600" />
                    <span>Anti-DDoS IP Rate-Limiting</span>
                  </div>
                  <p className="text-[#625f5c]">
                    Smart request throttling limits rapid-fire automated script bot submissions, maintaining 99.9% server availability.
                  </p>
                </div>

                <div className="border border-[#DDD5CD] rounded-xl p-4 space-y-1.5">
                  <div className="flex items-center gap-2 font-heading font-bold text-[#2E2E2E]">
                    <Lock className="w-4 h-4 text-emerald-600" />
                    <span>End-to-End TLS / HTTPS</span>
                  </div>
                  <p className="text-[#625f5c]">
                    All data in transit between your browser and our servers is encrypted using modern TLS cryptographic ciphers (HTTPS).
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section id="ip-ownership" className="space-y-4 scroll-mt-28">
              <div className="flex items-center gap-2">
                <span className="w-2 h-6 rounded-full bg-[#7D4047]" />
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#2E2E2E]">
                  6. Client Source Code Ownership &amp; Intellectual Property
                </h2>
              </div>
              <p>
                Unlike subscription platforms that hold your website hostage inside proprietary walled gardens (Wix, Squarespace, Shopify locks), <strong>THE WEBCRAFT enforces absolute client independence:</strong>
              </p>
              <div className="bg-[#F1ECE6] p-4 rounded-2xl border border-[#DDD5CD] space-y-2 text-xs">
                <p>
                  &bull; <strong>100% Code Ownership:</strong> Upon settlement of agreed project milestones, all customized frontend files, React components, Tailwind styling sheets, and backend endpoints belong entirely to you.
                </p>
                <p>
                  &bull; <strong>Zero Vendor Lock-In:</strong> You receive complete clean source archives. You are free to self-host, migrate to AWS, Vercel, VPS, or pass the code to an internal engineering team at any time.
                </p>
                <p>
                  &bull; <strong>Non-Disclosure Guarantee:</strong> All proprietary logic, custom pricing structures, business strategies, and client databases shared during consultation are treated with strict confidentiality.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section id="cookies" className="space-y-4 scroll-mt-28">
              <div className="flex items-center gap-2">
                <span className="w-2 h-6 rounded-full bg-[#7D4047]" />
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#2E2E2E]">
                  7. Cookies &amp; Local Storage Policy
                </h2>
              </div>
              <p>
                We do not deploy marketing or targeting cookies. We use only strictly essential browser storage tokens:
              </p>
              <table className="w-full text-xs text-left border border-[#DDD5CD] rounded-xl overflow-hidden">
                <thead className="bg-[#2E2E2E] text-white">
                  <tr>
                    <th className="p-3">Storage Key</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Function</th>
                    <th className="p-3">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDD5CD] text-[#625f5c]">
                  <tr>
                    <td className="p-3 font-mono text-[#7D4047] font-semibold">order_offer_count</td>
                    <td className="p-3">Local Storage</td>
                    <td className="p-3">Tracks early-bird offer quota status for initial clients</td>
                    <td className="p-3">Persistent / Client Deletable</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-[#7D4047] font-semibold">draft_order_cache</td>
                    <td className="p-3">Session Storage</td>
                    <td className="p-3">Prevents accidental data loss if form is refreshed during editing</td>
                    <td className="p-3">Cleared on tab close</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-[#7D4047] font-semibold">admin_auth_token</td>
                    <td className="p-3">Secure Header</td>
                    <td className="p-3">Restricted authorization for studio administrator access</td>
                    <td className="p-3">Per session</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* Section 8 */}
            <section id="third-party" className="space-y-4 scroll-mt-28">
              <div className="flex items-center gap-2">
                <span className="w-2 h-6 rounded-full bg-[#7D4047]" />
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#2E2E2E]">
                  8. Third-Party Integrations &amp; Cloud Infrastructure
                </h2>
              </div>
              <p>
                We do not integrate arbitrary third-party analytics scripts. Where infrastructure is utilized (e.g. Vercel for production edge delivery, GitHub for version control, or standard SMTP for transactional email dispatch), each provider complies with international data security standards (SOC 2, ISO 27001).
              </p>
            </section>

            {/* Section 9 */}
            <section id="rights" className="space-y-4 scroll-mt-28">
              <div className="flex items-center gap-2">
                <span className="w-2 h-6 rounded-full bg-[#7D4047]" />
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#2E2E2E]">
                  9. Your Statutory Rights (DPDP Act &amp; GDPR)
                </h2>
              </div>
              <p>
                Regardless of your physical jurisdiction, we uphold fundamental data privacy rights for every client:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-white border border-[#DDD5CD] rounded-xl space-y-1">
                  <span className="font-bold text-[#2E2E2E] flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-[#7D4047]" />
                    Right to Access &amp; Portability
                  </span>
                  <p className="text-[#625f5c]">You may request a machine-readable JSON copy of all requirements submitted under your phone or email.</p>
                </div>

                <div className="p-3.5 bg-white border border-[#DDD5CD] rounded-xl space-y-1">
                  <span className="font-bold text-[#2E2E2E] flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5 text-[#7D4047]" />
                    Right to Rectification
                  </span>
                  <p className="text-[#625f5c]">You can update or correct phone numbers, business names, or feature briefs at any point during active scoping.</p>
                </div>

                <div className="p-3.5 bg-white border border-[#DDD5CD] rounded-xl space-y-1">
                  <span className="font-bold text-[#2E2E2E] flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
                    Right to Erasure (Be Forgotten)
                  </span>
                  <p className="text-[#625f5c]">Request permanent purging of your records from our live SQLite database upon conclusion of service.</p>
                </div>

                <div className="p-3.5 bg-white border border-[#DDD5CD] rounded-xl space-y-1">
                  <span className="font-bold text-[#2E2E2E] flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    Right to Revoke Consent
                  </span>
                  <p className="text-[#625f5c]">Withdraw ongoing consultation at any stage prior to final milestone sign-off without penalties.</p>
                </div>
              </div>
            </section>

            {/* Section 10 */}
            <section id="retention" className="space-y-4 scroll-mt-28">
              <div className="flex items-center gap-2">
                <span className="w-2 h-6 rounded-full bg-[#7D4047]" />
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#2E2E2E]">
                  10. Data Retention &amp; Instant Purge Policy
                </h2>
              </div>
              <p>
                We do not hoard inactive data indefinitely. Completed or closed inquiries are automatically archived, and full record purging can be executed on-demand within <strong>24 business hours</strong> of an email verification request sent to our studio desk.
              </p>
            </section>

            {/* Section 11 */}
            <section id="contact" className="space-y-4 scroll-mt-28">
              <div className="flex items-center gap-2">
                <span className="w-2 h-6 rounded-full bg-[#7D4047]" />
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#2E2E2E]">
                  11. Privacy Officer &amp; Studio Desk
                </h2>
              </div>
              <p>
                For questions regarding this policy, to exercise your statutory rights, or to report any security vulnerability:
              </p>
              
              <div className="bg-[#2E2E2E] text-white p-6 rounded-2xl space-y-4 shadow-elevated">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <h3 className="font-heading font-extrabold text-base text-white">THE WEBCRAFT</h3>
                    <p className="text-xs text-[#DDD5CD]">Custom Web Development Studio &bull; Lead Engineer: Rakshit Patel</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold self-start sm:self-auto">
                    Active Privacy Desk
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#DDD5CD]">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider">Official Inquiries &amp; Privacy Desk</span>
                    <a href="mailto:thewebcraft404@gmail.com" className="font-mono text-emerald-400 font-semibold hover:underline block">
                      thewebcraft404@gmail.com
                    </a>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider">Direct WhatsApp Desk</span>
                    <div className="font-mono text-white font-semibold">
                      <a href="https://wa.me/919428298134" target="_blank" rel="noopener noreferrer" className="hover:underline text-emerald-400">
                        +91 94282 98134
                      </a>{' '}
                      <span className="text-emerald-300 text-[10px] font-sans font-bold">(WhatsApp Chat Only &bull; No Calls)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-[#DDD5CD]/70">
                  Response SLA: All legitimate data requests and inquiries receive a direct technical response within 12-24 business hours.
                </div>
              </div>
            </section>

          </main>

        </div>

      </div>
    </div>
  );
}
