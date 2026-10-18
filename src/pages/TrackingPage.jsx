import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, CheckCircle2, Clock, ArrowRight, Mail, 
  FileText, ShieldCheck, AlertCircle, Sparkles, Phone, Globe, Layers, Eye
} from 'lucide-react';
import { api } from '../services/api';
import { COMPANY_CONFIG } from '../data/pricingData';

export default function TrackingPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('id') || '');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  const sampleIds = ['TWC-892401', 'TWC-741952', 'TWC-615298'];

  const handleSearch = async (searchQuery) => {
    const q = searchQuery || query;
    if (!q.trim()) return;

    setLoading(true);
    setError('');
    try {
      const data = await api.lookupOrder(q);
      if (data.success && data.order) {
        setOrder(data.order);
      } else {
        setError('No active project found with this Order ID or Phone number.');
        setOrder(null);
      }
    } catch (err) {
      setError(err.message || 'No project found with this ID or phone number.');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialId = searchParams.get('id');
    if (initialId) {
      handleSearch(initialId);
    }
  }, [searchParams]);

  const stages = [
    { key: 'order_placed', step: '01', title: 'Order Placed & Brief Stored', desc: 'Project specs and custom instructions saved in database.' },
    { key: 'wireframe_ready', step: '02', title: 'Wireframe & Visual Mockup', desc: 'High-fidelity layout prototypes prepared for client review.' },
    { key: 'development_active', step: '03', title: 'Handcrafted Clean-Code Development', desc: 'Building responsive React frontend with sub-second loading speed.' },
    { key: 'demo_ready', step: '04', title: 'Client Demo Review & Minor Revisions', desc: 'Private live staging walkthrough with client for final approval.' },
    { key: 'launched', step: '05', title: 'Domain Connection & Final Launch', desc: 'SSL certificate installed, live deployment, and 100% code handover.' }
  ];

  const getStageIndex = (status) => {
    switch (status) {
      case 'order_placed': return 0;
      case 'wireframe_ready': return 1;
      case 'development_active': return 2;
      case 'demo_ready': return 3;
      case 'launched': return 4;
      default: return 0;
    }
  };

  const currentStageIndex = order ? getStageIndex(order.order_status) : 0;

  return (
    <div className="py-12 sm:py-20 bg-[#F1ECE6] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DDD5CD]/60 border border-[#DDD5CD] text-[#7D4047] text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>Live Project Telemetry</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2E2E2E] tracking-tight">
            Track Your Website Development Progress
          </h1>
          <p className="text-xs sm:text-sm text-[#625f5c] max-w-xl mx-auto">
            Enter your Order ID (e.g. <strong className="font-mono text-[#2E2E2E]">TWC-XXXXXX</strong>) or registered phone number to view live milestones directly from our studio database.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 border-2 border-[#DDD5CD] shadow-soft mb-8">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#625f5c] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Order ID (e.g. TWC-892401) or Phone..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#DDD5CD] text-sm text-[#2E2E2E] font-medium focus:outline-none focus:ring-2 focus:ring-[#7D4047]"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="py-3 px-6 rounded-xl bg-[#7D4047] hover:bg-[#67333a] text-white text-xs font-bold uppercase tracking-wider shadow-wine transition-all flex items-center justify-center gap-2"
            >
              {loading ? <span>Searching Database...</span> : <span>Track Project</span>}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo ID pills */}
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-[#DDD5CD]/60 text-xs text-[#625f5c]">
            <span>Try sample order IDs:</span>
            {sampleIds.map(id => (
              <button
                key={id}
                type="button"
                onClick={() => { setQuery(id); handleSearch(id); }}
                className="px-2 py-0.5 rounded-md bg-[#F1ECE6] hover:bg-[#DDD5CD] text-[#7D4047] font-mono text-[11px] font-bold transition-colors"
              >
                {id}
              </button>
            ))}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-xs flex items-center gap-2 mb-8">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Loaded Order Telemetry */}
        {order && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* Top Summary Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#DDD5CD] shadow-elevated">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#DDD5CD]/60">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl sm:text-2xl font-extrabold text-[#2E2E2E] font-heading">
                      {order.client_name}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#7D4047]/10 text-[#7D4047] text-xs font-bold font-mono">
                      {order.id}
                    </span>
                  </div>
                  <p className="text-xs text-[#625f5c] mt-1">
                    Booked on {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} &bull; Phone: +91 {order.client_phone}
                  </p>
                </div>

                <div className="flex flex-col sm:items-end gap-1">
                  <div className="text-right">
                    <span className="text-[11px] text-[#625f5c] block">Agreed Budget</span>
                    <span className="text-xl font-black text-[#2E2E2E] font-mono">₹{order.final_budget.toLocaleString('en-IN')}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Project Registered &bull; Direct Consultation
                  </span>
                </div>
              </div>

              {/* 5-Stage Visual Progress Bar */}
              <div className="py-6 space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#7D4047] flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    <span>Live Production Roadmap</span>
                  </h3>
                  <span className="text-xs font-mono font-bold text-[#2E2E2E]">
                    {Math.round(((currentStageIndex + 1) / stages.length) * 100)}% Completed
                  </span>
                </div>

                {/* Animated Horizontal Progress Bar Strip */}
                <div className="w-full h-2.5 bg-[#DDD5CD]/60 rounded-full overflow-hidden p-0.5">
                  <div 
                    className="h-full bg-gradient-to-r from-[#7D4047] via-[#98535c] to-emerald-600 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${((currentStageIndex + 1) / stages.length) * 100}%` }}
                  />
                </div>

                <div className="space-y-3.5">
                  {stages.map((stage, idx) => {
                    const isPassed = idx < currentStageIndex;
                    const isCurrent = idx === currentStageIndex;

                    return (
                      <div 
                        key={stage.key}
                        className={`p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 hover-glow-card ${
                          isCurrent
                            ? 'bg-[#7D4047]/5 border-[#7D4047] shadow-sm ring-1 ring-[#7D4047]/30 scale-[1.01]'
                            : isPassed
                            ? 'bg-emerald-50/50 border-emerald-200'
                            : 'bg-[#F1ECE6]/40 border-[#DDD5CD]/60 opacity-60'
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 transition-transform ${
                          isPassed
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : isCurrent
                            ? 'bg-[#7D4047] text-white animate-pulse-ring'
                            : 'bg-[#DDD5CD] text-[#625f5c]'
                        }`}>
                          {isPassed ? <CheckCircle2 className="w-5 h-5" /> : stage.step}
                        </div>

                        <div className="flex-1 space-y-0.5">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-[#2E2E2E]">{stage.title}</h4>
                            {isCurrent && (
                              <span className="text-[10px] font-bold bg-[#7D4047] text-white px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm animate-pulse">
                                Current Milestone
                              </span>
                            )}
                            {isPassed && (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">Completed ✓</span>
                            )}
                          </div>
                          <p className="text-xs text-[#625f5c]">{stage.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Client Custom Instructions Brief */}
              {order.custom_instructions && (
                <div className="pt-4 border-t border-[#DDD5CD]/60 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#2E2E2E] flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#7D4047]" />
                    <span>Your Submitted Custom Instructions ({order.custom_instructions.length} Chars)</span>
                  </h4>
                  <div className="bg-[#F1ECE6]/50 p-4 rounded-xl border border-[#DDD5CD] text-xs text-[#2E2E2E] leading-relaxed whitespace-pre-wrap">
                    {order.custom_instructions}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-[#DDD5CD]/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                <a
                  href={`mailto:${COMPANY_CONFIG.email}?subject=${encodeURIComponent(`Project Status Inquiry: Order ${order.id}`)}&body=${encodeURIComponent(`Hello Rakshit Patel,\n\nI am tracking my website project (${order.id}) for ${order.client_name}.\n\nPlease provide me with an update on current milestone progress.\n\nThank you!`)}`}
                  className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-[#7D4047] hover:bg-[#67333a] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Developer Desk ({COMPANY_CONFIG.email})</span>
                </a>

                <Link
                  to="/demos"
                  className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-white border border-[#DDD5CD] hover:border-[#7D4047] text-[#2E2E2E] text-xs font-semibold text-center transition-all flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-[#7D4047]" />
                  <span>Browse Demos Portfolio</span>
                </Link>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
