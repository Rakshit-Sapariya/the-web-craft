import React, { useState } from 'react';
import { 
  Code2, Cpu, Database, Zap, ShieldCheck, CheckCircle2, 
  ArrowRight, Layers, LayoutDashboard, Terminal, Activity, 
  Settings, Check, Sparkles, Server, Lock, ExternalLink
} from 'lucide-react';

export default function CustomBuildDemo({ onOrderDesign, isMobileView }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedModules, setSelectedModules] = useState(['auth', 'payment', 'notifications']);
  const [simulatedAction, setSimulatedAction] = useState(false);

  const availableModules = [
    { id: 'auth', name: 'Role-Based Authentication & OTP', desc: 'Secure staff and customer login with phone OTP verification.', latency: '18ms' },
    { id: 'payment', name: 'Custom UPI & Automated Reconciliation', desc: 'Direct bank settlement with instant webhook verification.', latency: '35ms' },
    { id: 'notifications', name: 'Automated SMS & Email Dispatcher', desc: 'Auto-send PDF invoices and order status directly to clients.', latency: '42ms' },
    { id: 'crm', name: 'Custom CRM & Client Pipeline Board', desc: 'Manage inbound client inquiries and lead status in real-time.', latency: '22ms' },
    { id: 'analytics', name: 'Executive Revenue & Conversion Dashboard', desc: 'Live operational metrics with zero third-party tracking scripts.', latency: '15ms' },
  ];

  const toggleModule = (id) => {
    setSelectedModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const handleSimulateWebhook = () => {
    setSimulatedAction(true);
    setTimeout(() => setSimulatedAction(false), 3000);
  };

  return (
    <div className="bg-[#0f1115] text-[#F1ECE6] font-sans antialiased min-h-screen">
      
      {/* 1. Custom Build Platform Header */}
      <header className="bg-[#161920] border-b border-neutral-800 sticky top-0 z-20 px-4 py-3">
        <div className={`mx-auto flex items-center justify-between ${isMobileView ? 'flex-col gap-2' : 'max-w-7xl h-16'}`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#7D4047] text-white flex items-center justify-center font-bold shadow-sm">
              <Cpu className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-lg text-white tracking-tight">NexFlow Systems</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-mono px-2 py-0.5 rounded border border-emerald-500/30">v3.4 Production</span>
              </div>
              <p className="text-[10px] text-neutral-400 font-mono">Bespoke Custom Web Architecture &bull; Gujarat Enterprise</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('modules')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'modules' ? 'bg-[#7D4047] text-white' : 'text-neutral-300 hover:text-white'
              }`}
            >
              Custom Modules
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'dashboard' ? 'bg-[#7D4047] text-white' : 'text-neutral-300 hover:text-white'
              }`}
            >
              Live Portal Demo
            </button>
            <button
              onClick={onOrderDesign}
              className="px-4 py-2 rounded-xl bg-[#7D4047] hover:bg-[#67333a] text-white text-xs font-bold transition-all shadow-wine flex items-center gap-1.5"
            >
              <span>Order Custom Build</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Custom Architecture Hero */}
      <section className="relative overflow-hidden pt-10 pb-12 border-b border-neutral-800 bg-gradient-to-b from-[#161920] to-[#0f1115]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-800 border border-neutral-700 text-xs text-amber-300 font-mono">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>100% Handwritten Code &bull; 99/100 Lighthouse Performance</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Bespoke Web Platform Engineered for Exact Commercial Operations.
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
              Built from scratch for enterprises that have outgrown rigid templates and bulky WordPress plugins. 
              We engineer custom business portals, automated lead dispatch engines, dynamic calculators, and secure client databases.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Bloated Plugins</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Sub-Second Server Response</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Client Code Ownership</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Main Showcase */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {activeTab === 'dashboard' ? (
          /* Live Interactive Custom Portal Dashboard */
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#161920] p-4 sm:p-5 rounded-2xl border border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Live Operations Console</span>
                    <span className="text-[11px] font-mono text-neutral-400">(Simulated Client Production)</span>
                  </h3>
                  <p className="text-xs text-neutral-400">Real-time telemetry showing live transactions, server load, and automated webhook pipelines.</p>
                </div>
              </div>

              <button
                onClick={handleSimulateWebhook}
                disabled={simulatedAction}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold flex items-center gap-2 transition-all"
              >
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>{simulatedAction ? 'Webhook Triggered & Sent!' : 'Simulate API Event'}</span>
              </button>
            </div>

            {/* Metric KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#161920] border border-neutral-800 rounded-xl p-4 space-y-1">
                <span className="text-[11px] text-neutral-400 font-mono">Today's Transactions</span>
                <p className="text-xl sm:text-2xl font-black text-white font-mono">₹1,84,500</p>
                <span className="text-[10px] text-emerald-400 font-semibold">+18.4% vs last week</span>
              </div>
              <div className="bg-[#161920] border border-neutral-800 rounded-xl p-4 space-y-1">
                <span className="text-[11px] text-neutral-400 font-mono">Active Client Sessions</span>
                <p className="text-xl sm:text-2xl font-black text-white font-mono">1,420</p>
                <span className="text-[10px] text-emerald-400 font-semibold">Zero dropped packets</span>
              </div>
              <div className="bg-[#161920] border border-neutral-800 rounded-xl p-4 space-y-1">
                <span className="text-[11px] text-neutral-400 font-mono">API Response Speed</span>
                <p className="text-xl sm:text-2xl font-black text-white font-mono">28 ms</p>
                <span className="text-[10px] text-emerald-400 font-semibold">Edge CDN Cached</span>
              </div>
              <div className="bg-[#161920] border border-neutral-800 rounded-xl p-4 space-y-1">
                <span className="text-[11px] text-neutral-400 font-mono">Platform Availability</span>
                <p className="text-xl sm:text-2xl font-black text-white font-mono">99.98%</p>
                <span className="text-[10px] text-emerald-400 font-semibold">High Availability SLA</span>
              </div>
            </div>

            {/* Custom Interactive Workflow Table */}
            <div className="bg-[#161920] border border-neutral-800 rounded-2xl overflow-hidden shadow-elevated">
              <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#7D4047]" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Live Pipeline Queue</h4>
                </div>
                <span className="text-[11px] text-neutral-400 font-mono">Auto-refreshed</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-black/40 text-neutral-400 uppercase text-[10px] border-b border-neutral-800">
                    <tr>
                      <th className="py-3 px-4">Tracking ID</th>
                      <th className="py-3 px-4">Client / Organization</th>
                      <th className="py-3 px-4">Custom Module</th>
                      <th className="py-3 px-4">Settlement</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/80 text-neutral-300">
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 text-white font-bold">#NX-9821</td>
                      <td className="py-3 px-4">Shreeji Logistics LLP, SG Highway</td>
                      <td className="py-3 px-4">Automated Fleet Dispatch &bull; GPS Webhook</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">₹28,500</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Delivered</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 text-white font-bold">#NX-9822</td>
                      <td className="py-3 px-4">Apex Diagnostic Laboratory, Navrangpura</td>
                      <td className="py-3 px-4">Patient Report Portal &bull; SMS Alert Engine</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">₹16,400</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30">Processing</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 text-white font-bold">#NX-9823</td>
                      <td className="py-3 px-4">Patelex Metals Private Limited, GIDC Vatva</td>
                      <td className="py-3 px-4">B2B Custom Quotation & GST Calculator</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">₹42,000</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Delivered</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          /* Interactive Custom Module Builder */
          <div className="space-y-6">
            <div className="bg-[#161920] p-5 rounded-2xl border border-neutral-800 space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Settings className="w-4 h-4 text-amber-300" />
                <span>Interactive Module Configurator</span>
              </h3>
              <p className="text-xs text-neutral-300">
                Pick the custom features needed for your bespoke business website. We engineer each module with pure clean code.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableModules.map((module) => {
                const isSelected = selectedModules.includes(module.id);
                return (
                  <div
                    key={module.id}
                    onClick={() => toggleModule(module.id)}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-[#7D4047] bg-[#7D4047]/10' 
                        : 'border-neutral-800 bg-[#161920] hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <span className="font-bold text-sm text-white flex items-center gap-2">
                          <span>{module.name}</span>
                          {isSelected && <span className="text-[10px] font-mono px-2 py-0.5 bg-[#7D4047] text-white rounded">Included</span>}
                        </span>
                        <p className="text-xs text-neutral-400">{module.desc}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        isSelected ? 'bg-[#7D4047] border-[#7D4047] text-white' : 'border-neutral-700 bg-neutral-800'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                      <span>Execution Speed: <strong className="text-emerald-400">{module.latency}</strong></span>
                      <span>100% Handcrafted</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. Real Client Verified Case Study */}
        <div className="mt-10 bg-[#161920] border border-neutral-800 rounded-3xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
              <span>★ ★ ★ ★ ★</span>
              <span className="text-neutral-400 font-normal ml-1">Ahmedabad Enterprise Case Study</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-200 italic leading-relaxed">
              "We needed a custom booking and transport dispatch system without paying ₹12,000 every single month for bloated SaaS tools. 
              <strong> Rakshit Patel at THE WEBCRAFT</strong> coded our entire frontend and webhook logic from scratch in 6 days. 
              Page load dropped from 4.2 seconds to 0.4 seconds, and our customer conversions went up by 42%!"
            </p>
            <div className="flex items-center gap-3 pt-1">
              <div className="w-8 h-8 rounded-full bg-[#7D4047] text-white flex items-center justify-center font-bold text-xs">
                KS
              </div>
              <div>
                <p className="text-xs font-bold text-white">Kavit Shah</p>
                <p className="text-[11px] text-neutral-400">Managing Director, LogiTrack Solutions (SG Highway, Ahmedabad)</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#0f1115] border border-neutral-800 p-5 rounded-2xl space-y-3 text-center">
            <span className="text-[11px] text-neutral-400 font-mono uppercase tracking-wider block">Custom Build Baseline</span>
            <div className="text-3xl font-black text-white font-mono">₹18,500</div>
            <p className="text-[11px] text-neutral-400">
              Only <strong>₹5,000 advance token</strong> to begin coding. Settle balance after live demo approval.
            </p>
            <button
              onClick={onOrderDesign}
              className="w-full py-2.5 rounded-xl bg-[#7D4047] hover:bg-[#67333a] text-white text-xs font-bold transition-all shadow-wine"
            >
              Order This Custom Build
            </button>
          </div>
        </div>
      </main>

    </div>
  );
}
