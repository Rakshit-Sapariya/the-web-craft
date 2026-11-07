import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, CheckCircle2, Clock, ArrowRight, Mail, 
  FileText, ShieldCheck, AlertCircle, Phone, Globe, Layers, Eye, KeyRound, Hash,
  Shield, Lock, Unlock, EyeOff
} from 'lucide-react';
import { api } from '../services/api';
import { COMPANY_CONFIG } from '../data/pricingData';
import WebCraftWatermark from '../components/WebCraftWatermark';

export default function TrackingPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('id') || '');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  // Zero-PII Studio Sandbox Demo credentials for public testing (Real customer tokens & IDs are strictly hidden)
  const sampleTokens = [
    { id: 'TK-DEMO-2026', label: 'Sandbox Owner Token' },
  ];

  const sampleOrders = [
    { id: 'TWC-DEMO-001', label: 'Public Demo ID' },
  ];

  const handleSearch = async (searchQuery) => {
    const q = (searchQuery !== undefined ? searchQuery : query).trim();
    if (!q) return;

    setLoading(true);
    setError('');
    try {
      const data = await api.lookupOrder(q);
      if (data.success && data.order) {
        setOrder(data.order);
        setTimeout(() => {
          document.getElementById('order-telemetry-result')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
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
      case 'wireframe_ready':
      case 'wireframe_design': return 1;
      case 'development_active':
      case 'building': return 2;
      case 'demo_ready':
      case 'tour_ready':
      case 'client_preview': return 3;
      case 'launched':
      case 'final_ready':
      case 'completed': return 4;
      default: return 0;
    }
  };

  const currentStageIndex = order ? getStageIndex(order.order_status) : 0;

  return (
    <div className="py-12 sm:py-20 bg-[#FFF7E8] min-h-screen relative overflow-hidden">
      {/* Signature WebCraft Watermark Emblem in Background (from Photo 2) */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 w-[400px] sm:w-[560px] aspect-square pointer-events-none select-none opacity-[0.08] sm:opacity-[0.10] -z-0 flex items-center justify-center">
        <WebCraftWatermark className="w-full h-full" variant="original" opacity="opacity-100" />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1E8D8] border border-[#E2D7C3] text-[#355CDE] text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>Live Project Telemetry</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#000000] tracking-tight">
            Track Your Website Development Progress
          </h1>
          <p className="text-xs sm:text-sm text-[#3D362E] max-w-xl mx-auto">
            Enter your Order ID (e.g. <strong className="font-mono text-[#000000]">TWC-XXXXXX</strong>), Owner Token (e.g. <strong className="font-mono text-[#355CDE]">TK-XXXXXX</strong>), or registered phone number to view live milestones directly from our studio database.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="bg-[#F1E8D8] rounded-2xl p-3 sm:p-4 border border-[#E2D7C3] mb-8">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#3D362E] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Order ID (e.g. TWC-892401), Token (e.g. TK-892401) or Phone..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E2D7C3] text-sm text-[#000000] bg-white font-medium focus:outline-none focus:ring-2 focus:ring-[#355CDE]"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="py-2.5 px-6 rounded-full bg-[#355CDE] hover:bg-[#2447B8] active:scale-[0.98] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
            >
              {loading ? <span>Searching Database...</span> : <span>Track Project</span>}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Credentials Bar */}
          <div className="mt-4 pt-3.5 border-t border-[#E2D7C3] space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-1 text-xs">
              <span className="font-semibold text-[#000000] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#355CDE]" />
                Quick Test Credentials (1-Click Fill &amp; Track):
              </span>
              <span className="text-[11px] text-[#3D362E]">
                Click any chip to test live milestones
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              {/* Owner Tokens Group */}
              <div className="flex flex-wrap items-center gap-1.5 bg-[#FFF7E8] p-1.5 rounded-xl border border-[#E2D7C3]">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#355CDE] px-1.5 py-0.5 flex items-center gap-1">
                  <KeyRound className="w-3 h-3 text-[#355CDE]" />
                  Owner Tokens:
                </span>
                {sampleTokens.map(item => {
                  const isActive = query.trim().toUpperCase() === item.id.toUpperCase();
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => { setQuery(item.id); handleSearch(item.id); }}
                      aria-label={`Test search with token ${item.id}`}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold tracking-wide antialiased transition-all duration-150 cursor-pointer ${
                        isActive
                          ? 'bg-[#355CDE] text-white border border-[#2447B8] shadow-sm'
                          : 'bg-white text-[#000000] border border-[#E2D7C3] hover:border-[#355CDE] hover:text-[#355CDE]'
                      }`}
                    >
                      <span>{item.id}</span>
                      <span className={`text-[10px] font-sans font-medium ${isActive ? 'text-white/80' : 'text-[#3D362E]'}`}>
                        ({item.label})
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Order IDs Group */}
              <div className="flex flex-wrap items-center gap-1.5 bg-[#FFF7E8] p-1.5 rounded-xl border border-[#E2D7C3]">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#000000] px-1.5 py-0.5 flex items-center gap-1">
                  <Hash className="w-3 h-3 text-[#3D362E]" />
                  Order IDs:
                </span>
                {sampleOrders.map(item => {
                  const isActive = query.trim().toUpperCase() === item.id.toUpperCase();
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => { setQuery(item.id); handleSearch(item.id); }}
                      aria-label={`Test search with order ID ${item.id}`}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold tracking-wide antialiased transition-all duration-150 cursor-pointer ${
                        isActive
                          ? 'bg-[#000000] text-white border border-neutral-800 shadow-sm'
                          : 'bg-white text-[#000000] border border-[#E2D7C3] hover:border-[#355CDE] hover:text-[#355CDE]'
                      }`}
                    >
                      <span>{item.id}</span>
                      <span className={`text-[10px] font-sans font-medium ${isActive ? 'text-neutral-300' : 'text-[#3D362E]'}`}>
                        ({item.label})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-xs flex items-center gap-2 mb-8">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Skeleton Loader during search */}
        {loading && (
          <div className="bg-[#F1E8D8] rounded-xl p-6 border border-[#E2D7C3] space-y-4 animate-pulse">
            <div className="flex items-center justify-between pb-4 border-b border-[#E2D7C3]">
              <div className="space-y-2">
                <div className="h-6 bg-[#E2D7C3]/60 rounded w-48" />
                <div className="h-4 bg-[#E2D7C3]/40 rounded w-24" />
              </div>
              <div className="h-8 bg-[#E2D7C3]/50 rounded w-32" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-2">
              <div className="h-16 bg-[#E2D7C3]/30 rounded-lg" />
              <div className="h-16 bg-[#E2D7C3]/30 rounded-lg" />
              <div className="h-16 bg-[#E2D7C3]/30 rounded-lg" />
              <div className="h-16 bg-[#E2D7C3]/30 rounded-lg" />
            </div>
          </div>
        )}

        {/* Loaded Order Telemetry */}
        {order && (
          <div id="order-telemetry-result" className="space-y-6 animate-in fade-in duration-300">
            
            {/* Live Website Demo Alert Banner (Unlocked for verified owner) */}
            {order.has_preview_access && (order.order_status === 'demo_ready' || order.order_status === 'launched') && (
              <div className="bg-[#000000] text-white p-5 sm:p-6 rounded-xl border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider font-mono border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Live Staging Demo Ready
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">100% Verified Clean Code</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-white">Your bespoke single-page website is ready for review!</h4>
                  <p className="text-xs text-gray-300 max-w-xl">
                    Interact with your live responsive website, verify features, and request instant modifications.
                  </p>
                </div>
                <Link
                  to={order.ai_preview_token ? `/preview/${order.ai_preview_token}` : `/preview/${order.id}`}
                  className="px-5 py-2.5 rounded-lg bg-[#355CDE] hover:bg-[#2447B8] active:scale-[0.98] text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shrink-0 cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-white" />
                  <span>View Live Website ↗</span>
                </Link>
              </div>
            )}

            {/* Top Summary Card */}
            <div className="bg-[#F1E8D8] rounded-xl p-6 sm:p-8 border border-[#E2D7C3]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E2D7C3]">
                <div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-xl sm:text-2xl font-extrabold text-[#000000] font-heading">
                        {order.client_name}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-[#FFF7E8] text-[#355CDE] text-xs font-bold font-mono border border-[#E2D7C3]">
                        ID: {order.id}
                      </span>
                      {order.is_owner_verified ? (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold font-mono flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                          Owner Token: {order.tracking_token}
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-white text-neutral-600 border border-[#E2D7C3] text-xs font-bold font-mono flex items-center gap-1" title="Protected from other customers">
                          <Lock className="w-3 h-3 text-neutral-400" />
                          Token: Hidden (Owner Access Only)
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#3D362E]">
                      Booked on {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} &bull; Phone: +91 {order.client_phone}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-1">
                  <div className="text-right">
                    <span className="text-[11px] text-[#3D362E] block">Final Price</span>
                    {order.is_owner_verified && order.final_budget !== null ? (
                      <span className="text-xl font-black text-[#000000] font-mono">₹{order.final_budget.toLocaleString('en-IN')}</span>
                    ) : (
                      <span className="text-xs font-bold text-neutral-500 font-mono flex items-center gap-1 justify-end" title="Financial agreements are confidential">
                        <Lock className="w-3 h-3 text-neutral-400" />
                        Confidential
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Project Registered &bull; Direct Consultation
                  </span>
                </div>
              </div>

              {/* 5-Stage Visual Progress Bar */}
              <div className="py-6 space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#355CDE] flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    <span>Live Production Roadmap</span>
                  </h3>
                  <span className="text-xs font-mono font-bold text-[#000000]">
                    {Math.round(((currentStageIndex + 1) / stages.length) * 100)}% Completed
                  </span>
                </div>

                {/* Animated Horizontal Progress Bar Strip */}
                <div className="w-full h-2.5 bg-[#FFF7E8] border border-[#E2D7C3] rounded-full overflow-hidden p-0.5">
                  <div 
                    className="h-full bg-gradient-to-r from-[#355CDE] to-emerald-600 rounded-full transition-all duration-1000 ease-out"
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
                        className={`p-4 rounded-xl border transition-all duration-300 flex items-start gap-4 ${
                          isCurrent
                            ? 'bg-[#FFF7E8] border-[#355CDE] shadow-sm ring-1 ring-[#355CDE]/30 scale-[1.01]'
                            : isPassed
                            ? 'bg-emerald-50/70 border-emerald-200'
                            : 'bg-[#FFF7E8]/60 border-[#E2D7C3] opacity-60'
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 transition-transform ${
                          isPassed
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : isCurrent
                            ? 'bg-[#355CDE] text-white'
                            : 'bg-[#E2D7C3] text-[#3D362E]'
                        }`}>
                          {isPassed ? <CheckCircle2 className="w-5 h-5" /> : stage.step}
                        </div>

                        <div className="flex-1 space-y-0.5">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-[#000000]">{stage.title}</h4>
                            {isCurrent && (
                              <span className="text-[10px] font-bold bg-[#355CDE] text-white px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                                Current Milestone
                              </span>
                            )}
                            {isPassed && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                                <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                                Completed
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#3D362E]">{stage.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Client Custom Instructions Brief */}
              {order.custom_instructions && (
                <div className="pt-4 border-t border-[#E2D7C3] space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#000000] flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#355CDE]" />
                    <span>Your Submitted Custom Instructions ({order.custom_instructions.length} Chars)</span>
                  </h4>
                  <div className="bg-[#FFF7E8] p-4 rounded-xl border border-[#E2D7C3] text-xs text-[#000000] leading-relaxed whitespace-pre-wrap">
                    {order.custom_instructions}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-[#E2D7C3] flex flex-col sm:flex-row items-center justify-between gap-3">
                <a
                  href={`https://wa.me/919428298134?text=${encodeURIComponent(`Hello The WebCraft, I am tracking my website project (${order.id}) for ${order.client_name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
                >
                  <Phone className="w-4 h-4" />
                  <span>Direct WhatsApp Lead Desk</span>
                </a>

                <a
                  href={`mailto:${COMPANY_CONFIG.email}?subject=${encodeURIComponent(`Project Status Inquiry: Order ${order.id}`)}&body=${encodeURIComponent(`Hello Rakshit Patel,\n\nI am tracking my website project (${order.id}) for ${order.client_name}.\n\nPlease provide me with an update on current milestone progress.\n\nThank you!`)}`}
                  className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-[#355CDE] hover:bg-[#2447B8] active:scale-[0.98] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Developer Desk</span>
                </a>

                <Link
                  to="/demos"
                  className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-white border border-[#E2D7C3] hover:border-[#355CDE] text-[#000000] text-xs font-semibold text-center transition-all flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-[#355CDE]" />
                  <span>Browse Demos</span>
                </Link>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
