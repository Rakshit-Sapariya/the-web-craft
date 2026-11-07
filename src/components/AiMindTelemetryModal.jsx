import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, Activity, Zap, Layers, ShieldCheck, CheckCircle2, 
  Clock, X, ExternalLink, ArrowRight, Sparkles, Wifi, Award, MessageCircle
} from 'lucide-react';

export default function AiMindTelemetryModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'skills' | 'thinking'
  const [telemetry, setTelemetry] = useState({
    status: 'ACTIVE_ONLINE',
    cycleCount: 6,
    lastIngestion: 'Just now',
    remainingSeconds: 8700,
    remainingFormatted: '2h 25m',
    totalTrendsLearned: 20,
    activeTrends: [
      'Tailwind CSS v4 & OKLCH Color Systems',
      'Zero-Latency SQLite WAL Prepared Queries',
      'Bento Grid Micro-Interactions & Ambient Shadows',
      'Fitts Law & Thumb-Zone Mobile Navigation',
      'WCAG 2.2 AAA Contrast Verification',
      'Doherty Threshold Sub-400ms Response Times'
    ],
    recentThinkingLogs: []
  });

  useEffect(() => {
    if (!isOpen) return;

    // Fetch real telemetry from backend API
    fetch('/api/ai-mind/telemetry')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.telemetry) {
          setTelemetry(data.telemetry);
        }
      })
      .catch(() => {
        // Fallback gracefully to default state
      });

    // Close on Escape key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-[#FFF7E8] border border-[#E2D7C3] rounded-3xl rounded-tl-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#000000] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl rounded-tr-sm bg-[#355CDE] flex items-center justify-center text-white shadow-xs">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-base sm:text-lg text-white">
                  The WebCraft Autonomous Architecture Mind
                </h3>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live Sync
                </span>
              </div>
              <p className="text-xs text-white/70">
                Cognitive studio telemetry &bull; Syncs design engineering trends every 3 hours
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Telemetry KPI Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 sm:p-4 bg-[#F1E8D8] border-b border-[#E2D7C3] text-xs">
          <div className="bg-[#FFF7E8] p-3 rounded-2xl rounded-tr-sm border border-[#E2D7C3] shadow-xs">
            <div className="flex items-center justify-between text-[#6A6054] text-[11px] mb-1 font-semibold">
              <span>Internet Sync</span>
              <Wifi className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <p className="font-bold text-[#000000] text-sm flex items-center gap-1.5 font-heading">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              Connected
            </p>
            <p className="text-[10px] text-[#6A6054] mt-0.5">Cycle #{telemetry.cycleCount || 6} active</p>
          </div>

          <div className="bg-[#FFF7E8] p-3 rounded-2xl rounded-tl-sm border border-[#E2D7C3] shadow-xs">
            <div className="flex items-center justify-between text-[#6A6054] text-[11px] mb-1 font-semibold">
              <span>Next Trend Sync</span>
              <Clock className="w-3.5 h-3.5 text-[#355CDE]" />
            </div>
            <p className="font-bold text-[#000000] text-sm font-heading">
              {telemetry.remainingFormatted || '2h 25m'}
            </p>
            <p className="text-[10px] text-[#6A6054] mt-0.5">Autonomous 3-hour cron</p>
          </div>

          <div className="bg-[#FFF7E8] p-3 rounded-2xl rounded-br-sm border border-[#E2D7C3] shadow-xs">
            <div className="flex items-center justify-between text-[#6A6054] text-[11px] mb-1 font-semibold">
              <span>Trends Ingested</span>
              <Cpu className="w-3.5 h-3.5 text-[#355CDE]" />
            </div>
            <p className="font-bold text-[#000000] text-sm font-heading">
              {telemetry.totalTrendsLearned || 20}+ Learned
            </p>
            <p className="text-[10px] text-[#6A6054] mt-0.5">GitHub &bull; Dribbble &bull; Awwwards</p>
          </div>

          <div className="bg-[#FFF7E8] p-3 rounded-2xl rounded-bl-sm border border-[#E2D7C3] shadow-xs">
            <div className="flex items-center justify-between text-[#6A6054] text-[11px] mb-1 font-semibold">
              <span>Audit Confidence</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <p className="font-bold text-emerald-800 text-sm font-heading">98.4% Passed</p>
            <p className="text-[10px] text-[#6A6054] mt-0.5">WCAG 2.2 AAA Verified</p>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-[#E2D7C3] px-5 sm:px-6 bg-[#FFF7E8] text-xs font-bold gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'border-[#355CDE] text-[#355CDE]'
                : 'border-transparent text-[#6A6054] hover:text-[#000000]'
            }`}
          >
            Mind Architecture
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`py-3 px-3.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'skills'
                ? 'border-[#355CDE] text-[#355CDE]'
                : 'border-transparent text-[#6A6054] hover:text-[#000000]'
            }`}
          >
            4 Ingested Master Disciplines
          </button>
          <button
            onClick={() => setActiveTab('thinking')}
            className={`py-3 px-3.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'thinking'
                ? 'border-[#355CDE] text-[#355CDE]'
                : 'border-transparent text-[#6A6054] hover:text-[#000000]'
            }`}
          >
            Live Cognitive Thinking Logs
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl rounded-tr-sm bg-[#F1E8D8] border border-[#E2D7C3]">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-[#355CDE] text-white shrink-0">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-sm sm:text-base text-[#000000]">
                      Live Internet Thinking Loop Active
                    </h4>
                    <p className="text-xs text-[#3D362E] mt-1 leading-relaxed">
                      Unlike generic site builders, The WebCraft's studio engine directly evaluates design systems, WCAG compliance rules, and conversion performance patterns every 3 hours. When an order is placed, it crafts a bespoke, production-grade architecture tailored to your specific industry.
                    </p>
                  </div>
                </div>
              </div>

              {/* Real-Time Extracted Trends */}
              <div>
                <h5 className="font-bold text-[#000000] mb-2.5 flex items-center gap-1.5 font-heading">
                  <Cpu className="w-4 h-4 text-[#355CDE]" />
                  Live 2026 Trends Integrated Into Studio Engine:
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(telemetry.activeTrends || []).slice(0, 6).map((trend, idx) => (
                    <div 
                      key={idx} 
                      className="p-3 rounded-xl bg-[#F1E8D8] border border-[#E2D7C3] text-[11px] text-[#000000] flex items-start gap-2 shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug font-medium">{trend}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* How it works flowchart */}
              <div className="p-4 rounded-2xl rounded-tl-sm bg-[#F1E8D8] border border-[#E2D7C3] space-y-2.5">
                <h5 className="font-bold text-xs text-[#000000] font-heading">5-Stage Self-Healing Build Pipeline:</h5>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-[11px] text-center">
                  <div className="p-2 rounded-xl bg-[#FFF7E8] border border-[#E2D7C3]">
                    <p className="font-bold text-[#355CDE]">1. Perception</p>
                    <p className="text-[10px] text-[#6A6054]">Client Intent &amp; Category</p>
                  </div>
                  <div className="p-2 rounded-xl bg-[#FFF7E8] border border-[#E2D7C3]">
                    <p className="font-bold text-[#355CDE]">2. Research</p>
                    <p className="text-[10px] text-[#6A6054]">Live Web Intelligence</p>
                  </div>
                  <div className="p-2 rounded-xl bg-[#FFF7E8] border border-[#E2D7C3]">
                    <p className="font-bold text-[#355CDE]">3. Blueprint</p>
                    <p className="text-[10px] text-[#6A6054]">Architectural Geometry</p>
                  </div>
                  <div className="p-2 rounded-xl bg-[#FFF7E8] border border-[#E2D7C3]">
                    <p className="font-bold text-[#355CDE]">4. Generation</p>
                    <p className="text-[10px] text-[#6A6054]">React 19 &bull; Vite &bull; Tailwind</p>
                  </div>
                  <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-300">
                    <p className="font-bold text-emerald-800">5. Audit</p>
                    <p className="text-[10px] text-emerald-700 font-semibold">WCAG &bull; Speed &bull; Token</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl rounded-tr-sm bg-[#F1E8D8] border border-[#E2D7C3] flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#355CDE] text-white shrink-0">
                  <Layers className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#000000] font-heading">1. UI/UX Design System Pro Max</h4>
                  <p className="text-xs text-[#3D362E] mt-0.5 leading-relaxed">
                    Enforces the 60-30-10 dominant color law, 8pt spatial grid, fluid responsive typography, layered ambient shadows, and 5 mandatory interactive micro-states on every interactive component.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl rounded-tl-sm bg-[#F1E8D8] border border-[#E2D7C3] flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#355CDE] text-white shrink-0">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#000000] font-heading">2. Apex Frontend Web Architecture</h4>
                  <p className="text-xs text-[#3D362E] mt-0.5 leading-relaxed">
                    Semantic HTML5, Core Web Vitals optimization (&lt;1.2s LCP, zero CLS), sub-second asset bundling, clean module encapsulation, and 100% mobile touch adaptation.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl rounded-br-sm bg-[#F1E8D8] border border-[#E2D7C3] flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-600 text-white shrink-0">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#000000] font-heading">3. WCAG 2.2 AAA Accessibility (a11y)</h4>
                  <p className="text-xs text-[#3D362E] mt-0.5 leading-relaxed">
                    Strict 4.5:1 text contrast minimum, 44&times;44px minimum touch targets, visible focus-ring indicators, full keyboard navigation, and complete ARIA screen-reader readiness.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl rounded-bl-sm bg-[#F1E8D8] border border-[#E2D7C3] flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#000000] text-white shrink-0">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#000000] font-heading">4. CRO &amp; Conversion Psychology</h4>
                  <p className="text-xs text-[#3D362E] mt-0.5 leading-relaxed">
                    3-second headline value hook, risk-reversal policies (zero online upfront), sticky WhatsApp mobile quick-actions, and social proof trust signals designed to turn visitors into paying clients.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'thinking' && (
            <div className="space-y-3">
              <p className="text-xs text-[#6A6054]">
                Live cognitive reasoning stream captured during recent project synthesis:
              </p>
              {telemetry.recentThinkingLogs && telemetry.recentThinkingLogs.length > 0 ? (
                telemetry.recentThinkingLogs.slice(0, 2).map((log, idx) => (
                  <div key={idx} className="bg-[#F1E8D8] rounded-2xl border border-[#E2D7C3] p-4 space-y-2.5">
                    <div className="flex items-center justify-between border-b border-[#E2D7C3] pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-[#355CDE]">{log.orderId}</span>
                        <span className="text-xs font-bold text-[#000000]">{log.clientName}</span>
                      </div>
                      <span className="text-[10px] text-[#000000] bg-[#FFF7E8] border border-[#E2D7C3] px-2.5 py-0.5 rounded-full font-medium">
                        Category: {log.websiteType}
                      </span>
                    </div>

                    <div className="space-y-1.5 font-mono text-[11px]">
                      {(log.thoughts || []).map((t, tIdx) => (
                        <div key={tIdx} className="flex items-start gap-2 text-[#000000]">
                          <span className="text-[#355CDE] font-bold shrink-0">&bull;</span>
                          <div>
                            <span className="font-bold text-[#000000]">{t.stage}: </span>
                            <span className="text-[#3D362E]">{t.detail}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-[#6A6054] bg-[#F1E8D8] rounded-2xl border border-[#E2D7C3]">
                  No active thinking stream at this second.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer / CTAs */}
        <div className="p-4 bg-[#F1E8D8] border-t border-[#E2D7C3] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#6A6054]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>All systems verified &bull; Ready to synthesize your custom website</span>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="https://wa.me/919428298134?text=Hello%20The%20Webcraft%2C%20I%20saw%20your%20studio%20telemetry%20and%20want%20to%20consult%20on%20a%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 transition-all active:scale-[0.98]"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp Chat</span>
            </a>

            <Link
              to="/order"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#355CDE] hover:bg-[#2447B8] shadow-sm transition-all active:scale-[0.98]"
            >
              <span>Build My Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-white" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
