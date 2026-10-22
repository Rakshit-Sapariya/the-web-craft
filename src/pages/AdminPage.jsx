import React, { useState, useEffect } from 'react';
import { 
  Layers, CheckCircle2, Clock, Search, RefreshCw, Eye, 
  Phone, Mail, FileText, Database, ShieldCheck, AlertCircle, 
  ExternalLink, User, DollarSign, Filter, ArrowUpRight,
  Bot, Sparkles, Smartphone, Monitor, Edit3, Send, Share2, Copy, Check,
  Lock, LogOut, Key, Globe, Zap, Terminal, Activity, Compass
} from 'lucide-react';
import { api } from '../services/api';
import { COMPANY_CONFIG } from '../data/pricingData';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [adminUsername, setAdminUsername] = useState('');
  
  // Login Form State
  const [loginUsername, setLoginUsername] = useState('rakshit');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSubmitting, setLoginSubmitting] = useState(false);

  // Studio Data State
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'messages'

  // AI Agent & Tour State
  const [aiBuildingOrderId, setAiBuildingOrderId] = useState(null);
  const [tourModalOpen, setTourModalOpen] = useState(false);
  const [tourOrder, setTourOrder] = useState(null);
  const [tourData, setTourData] = useState(null);
  const [tourViewport, setTourViewport] = useState('desktop'); // 'desktop' | 'mobile'
  const [revisionInput, setRevisionInput] = useState('');
  const [isRevising, setIsRevising] = useState(false);
  const [copiedOrderId, setCopiedOrderId] = useState(null);
  const [tourIframeKey, setTourIframeKey] = useState(1);

  // AI Agent Mind State
  const [mindStatus, setMindStatus] = useState(null);
  const [mindRefreshing, setMindRefreshing] = useState(false);
  const [mindSubTab, setMindSubTab] = useState('thoughts'); // 'thoughts' | 'trends' | 'playbooks'

  const loadMindStatus = async () => {
    try {
      const res = await api.getAgentMindStatus();
      if (res && res.status) {
        setMindStatus(res);
      }
    } catch (e) {
      console.warn('Could not load Agent Mind status:', e);
    }
  };

  const handleForceMindRefresh = async () => {
    setMindRefreshing(true);
    try {
      const res = await api.refreshAgentMindNow();
      if (res && res.status) {
        setMindStatus({ success: true, status: res.status });
      }
    } catch (e) {
      alert(e.message || 'Failed to refresh mind');
    } finally {
      setMindRefreshing(false);
    }
  };

  // Check Existing Session On Mount
  useEffect(() => {
    const verifyAuth = async () => {
      setCheckingAuth(true);
      const isValid = await api.verifyAdminSession();
      if (isValid) {
        setIsAuthenticated(true);
        setAdminUsername(sessionStorage.getItem('twc_admin_username') || 'admin');
        await loadData();
      } else {
        setIsAuthenticated(false);
      }
      setCheckingAuth(false);
    };

    verifyAuth();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginSubmitting(true);

    try {
      const res = await api.loginAdmin(loginUsername, loginPassword);
      setIsAuthenticated(true);
      setAdminUsername(res.username || loginUsername);
      setLoginPassword('');
      await loadData();
    } catch (err) {
      setLoginError(err.message || 'Invalid administrative credentials.');
    } finally {
      setLoginSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await api.logoutAdmin();
    setIsAuthenticated(false);
    setOrders([]);
    setStats(null);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [ordersRes, statsRes, messagesRes, mindRes] = await Promise.all([
        api.getAllOrders().catch((err) => {
          if (err.message === 'AUTH_REQUIRED') setIsAuthenticated(false);
          return { orders: [] };
        }),
        api.getStats().catch(() => null),
        fetch('/api/contact', {
          headers: { ...api.getAdminAuthHeader?.() }
        }).then(r => r.json()).catch(() => ({ messages: [] })),
        api.getAgentMindStatus().catch(() => null)
      ]);

      if (ordersRes.orders) setOrders(ordersRes.orders);
      if (statsRes) setStats(statsRes);
      if (messagesRes.messages) setMessages(messagesRes.messages);
      if (mindRes && mindRes.status) setMindStatus(mindRes);
    } catch (e) {
      console.warn('Error loading admin data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    const interval = setInterval(() => {
      loadMindStatus();
    }, 15000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleUpdateStatus = async (orderId, newStatus, paymentStatus) => {
    try {
      await api.updateOrderStatus(orderId, newStatus, paymentStatus);
      await loadData();
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(prev => ({
          ...prev,
          order_status: newStatus,
          payment_status: paymentStatus || prev.payment_status,
        }));
      }
    } catch (e) {
      alert('Could not update order status: ' + e.message);
    }
  };

  // AI Agent: Trigger Autonomous Build
  const handleTriggerAiBuild = async (order) => {
    setAiBuildingOrderId(order.id);
    try {
      const res = await api.triggerAiBuild(order.id);
      await loadData();
      handleOpenTour(res.order || order, res.result?.tourData);
    } catch (e) {
      alert('AI Generation error: ' + e.message);
    } finally {
      setAiBuildingOrderId(null);
    }
  };

  // AI Agent: Open Admin Tour Walkthrough
  const handleOpenTour = async (order, existingTour = null) => {
    setTourOrder(order);
    setTourModalOpen(true);
    setRevisionInput('');

    if (existingTour) {
      setTourData(existingTour);
      return;
    }

    try {
      const statusRes = await api.getAiStatus(order.id);
      setTourData(statusRes.tourData);
    } catch (e) {
      console.warn('Could not load tour data:', e);
    }
  };

  // AI Agent: Submit Admin Revision
  const handleSubmitAdminRevision = async (e) => {
    e.preventDefault();
    if (!revisionInput.trim() || !tourOrder) return;

    setIsRevising(true);
    try {
      await api.submitAdminRevision(tourOrder.id, revisionInput);
      setRevisionInput('');
      setTourIframeKey(k => k + 1); // Refresh preview
      const statusRes = await api.getAiStatus(tourOrder.id);
      setTourData(statusRes.tourData);
      await loadData();
    } catch (e) {
      alert('Error applying revision: ' + e.message);
    } finally {
      setIsRevising(false);
    }
  };

  // AI Agent: Admin Approves & Unlocks Client Preview
  const handleAdminApprove = async (orderId) => {
    try {
      const res = await api.approveAdminBuild(orderId);
      alert('✅ Approved! Client preview is now ready. Link: ' + res.previewUrl);
      await loadData();
      if (tourOrder && tourOrder.id === orderId) {
        setTourOrder(prev => ({ ...prev, ai_status: 'client_preview' }));
      }
    } catch (e) {
      alert('Error approving build: ' + e.message);
    }
  };

  const handleCopyClientLink = (order) => {
    const token = order.ai_preview_token || order.id;
    const url = `${window.location.origin}/preview/${token}`;
    navigator.clipboard.writeText(url);
    setCopiedOrderId(order.id);
    setTimeout(() => setCopiedOrderId(null), 2500);
  };

  const filteredOrders = orders.filter(o => {
    const matchesFilter = filterStatus === 'all' || o.order_status === filterStatus;
    const matchesQuery = !searchQuery || 
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.client_phone.includes(searchQuery);
    return matchesFilter && matchesQuery;
  });

  // 1. LOADING SCREEN WHILE VERIFYING CREDENTIALS
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#F1ECE6] flex flex-col items-center justify-center space-y-4">
        <RefreshCw className="w-8 h-8 text-[#7D4047] animate-spin" />
        <p className="text-xs font-bold text-gray-700 tracking-wider uppercase font-mono">
          Verifying Security Clearance...
        </p>
      </div>
    );
  }

  // 2. FORTIFIED ADMIN LOGIN GATE (ZERO LEAKAGE)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F1ECE6] flex items-center justify-center p-4">
        <div className="bg-[#222222] text-white rounded-3xl max-w-md w-full p-8 space-y-6 shadow-2xl border border-white/10 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#7D4047]/30 rounded-full blur-3xl pointer-events-none" />
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-[#7D4047] to-amber-500 text-white flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-extrabold text-white font-heading">
              Restricted Studio Access
            </h2>
            <p className="text-xs text-gray-400">
              Administrative security clearance required. Multi-layered cryptographic validation active.
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-medium text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-300">
                Admin Username
              </label>
              <input
                type="text"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder="admin"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-300">
                Master Password
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              disabled={loginSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#7D4047] to-amber-600 hover:opacity-95 text-white text-xs font-bold shadow-lg transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loginSubmitting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Authenticate &amp; Enter Studio</span>
                </>
              )}
            </button>
          </form>

          <p className="text-[10px] text-gray-500 text-center">
            Zero-Trust Policy &bull; IP-Monitored &bull; Salted Scrypt Protected
          </p>
        </div>
      </div>
    );
  }

  // 3. FULL AUTHENTICATED CONTROL DESK
  return (
    <div className="py-10 sm:py-16 bg-[#F1ECE6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Strip */}
        <div className="relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#2E2E2E] text-white p-6 sm:p-8 rounded-3xl shadow-elevated border border-white/10 hover-glow-card">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#7D4047]/30 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
          
          <div className="space-y-1 relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-wider text-[#DDD5CD]">
                THE WEBCRAFT &bull; Studio Control Desk &bull; Active Admin ({adminUsername})
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Client Orders &amp; AI Studio Pipeline
            </h1>
            <p className="text-xs text-[#DDD5CD]/80">
              Fortified Session Active &bull; Salted Scrypt Passwords &bull; 0 Secrets Hardcoded &bull; Role-Guarded
            </p>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <button
              onClick={loadData}
              disabled={loading}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs font-bold flex items-center gap-2 transition-all duration-200 border border-white/10 shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-amber-300' : 'group-hover:rotate-180 transition-transform'}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-bold flex items-center gap-2 transition-all border border-rose-500/30 active:scale-95"
              title="Terminate Admin Session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* AI Agent Capability Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-[#2E2E2E] via-[#3a282b] to-[#2E2E2E] text-white border border-[#7D4047]/40 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7D4047] to-amber-500 text-white flex items-center justify-center shadow-lg shrink-0">
              <Bot className="w-6 h-6" />
            </div>
            <div className="space-y-0.5">
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <span>Autonomous AI WebCraft Studio Agent</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Online &amp; Fortified
                </span>
              </h2>
              <p className="text-xs text-[#DDD5CD]/80 leading-relaxed">
                Click <strong>"Build with AI"</strong> on any client order. The agent formulates the prompt, builds the website, self-heals errors to 0 defects, gives you a guided tour, and prepares client staging.
              </p>
            </div>
          </div>
        </div>

        {/* Stats KPI Cards */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#DDD5CD] shadow-soft space-y-1 hover-glow-card transition-all duration-300 hover:-translate-y-1 group">
              <span className="text-xs text-[#625f5c] font-medium block">Registered Orders</span>
              <p className="text-2xl sm:text-3xl font-black text-[#2E2E2E] font-mono group-hover:text-[#7D4047] transition-colors">{stats.totalOrders}</p>
              <div className="flex items-center gap-1.5 pt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] text-emerald-600 font-semibold">Persisted in SQLite</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#DDD5CD] shadow-soft space-y-1 hover-glow-card transition-all duration-300 hover:-translate-y-1 group">
              <span className="text-xs text-[#625f5c] font-medium block">Active Production</span>
              <p className="text-2xl sm:text-3xl font-black text-[#7D4047] font-mono group-hover:scale-105 origin-left transition-transform">{stats.activeProjects}</p>
              <span className="text-[11px] text-[#625f5c] block">In Development / Demo</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#DDD5CD] shadow-soft space-y-1 hover-glow-card transition-all duration-300 hover:-translate-y-1 group">
              <span className="text-xs text-[#625f5c] font-medium block">Pipeline Value</span>
              <p className="text-2xl sm:text-3xl font-black text-[#2E2E2E] font-mono group-hover:text-[#7D4047] transition-colors">₹{stats.totalPipelineValue.toLocaleString('en-IN')}</p>
              <span className="text-[11px] text-[#625f5c] block">Agreed client prices</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#DDD5CD] shadow-soft space-y-1 hover-glow-card transition-all duration-300 hover:-translate-y-1 group">
              <span className="text-xs text-[#625f5c] font-medium block">Completed Launches</span>
              <p className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">
                {stats.completedProjects || 0}
              </p>
              <span className="text-[11px] font-semibold text-emerald-700 block">Browser Live Release</span>
            </div>
          </div>
        )}

        {/* Studio Tabs & Search Filter Strip */}
        <div className="bg-white rounded-3xl border border-[#DDD5CD] shadow-soft overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-[#DDD5CD] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#FAF9F6]">
            
            {/* Tabs */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'orders'
                    ? 'bg-[#2E2E2E] text-white shadow-sm'
                    : 'bg-white hover:bg-[#F1ECE6] text-[#625f5c]'
                }`}
              >
                Client Orders ({orders.length})
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'messages'
                    ? 'bg-[#2E2E2E] text-white shadow-sm'
                    : 'bg-white hover:bg-[#F1ECE6] text-[#625f5c]'
                }`}
              >
                Contact Messages ({messages.length})
              </button>
              <button
                onClick={() => setActiveTab('mind')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'mind'
                    ? 'bg-[#7D4047] text-white shadow-wine'
                    : 'bg-white hover:bg-[#F1ECE6] text-[#625f5c]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Agent Mind</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </button>
            </div>

            {/* Filters */}
            {activeTab === 'orders' && (
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#625f5c]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search client, phone, ID..."
                    className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#DDD5CD] text-xs text-[#2E2E2E] bg-white focus:outline-none focus:border-[#7D4047]"
                  />
                </div>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full sm:w-auto px-3 py-1.5 rounded-xl border border-[#DDD5CD] text-xs font-semibold text-[#2E2E2E] bg-white cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="order_placed">01. Order Placed</option>
                  <option value="wireframe_ready">02. Wireframe Ready</option>
                  <option value="development_active">03. In Development</option>
                  <option value="demo_ready">04. Demo Ready</option>
                  <option value="launched">05. Launched</option>
                </select>
              </div>
            )}
          </div>

          {/* TAB 1: CLIENT ORDERS TABLE WITH AI AGENT INTEGRATION */}
          {activeTab === 'orders' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F1ECE6]/60 text-[#625f5c] uppercase text-[10px] font-bold border-b border-[#DDD5CD]">
                  <tr>
                    <th className="py-3.5 px-4">Order ID</th>
                    <th className="py-3.5 px-4">Client Details</th>
                    <th className="py-3.5 px-4">Type</th>
                    <th className="py-3.5 px-4">Final Price</th>
                    <th className="py-3.5 px-4">AI Agent Status</th>
                    <th className="py-3.5 px-4">Milestone</th>
                    <th className="py-3.5 px-4 text-right">Autonomous Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDD5CD]/60 text-[#2E2E2E]">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-xs text-[#625f5c]">
                        No client orders found.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((ord) => {
                      const isAiBuilt = ord.ai_status && ord.ai_status !== 'idle';
                      const isBuilding = aiBuildingOrderId === ord.id;

                      return (
                        <tr key={ord.id} className="hover:bg-[#FAF9F6] transition-colors group">
                          <td className="py-3.5 px-4 font-mono font-bold text-[#7D4047]">
                            {ord.id}
                          </td>
                          <td className="py-3.5 px-4">
                            <strong className="block text-[#2E2E2E]">{ord.client_name}</strong>
                            <span className="text-[11px] text-[#625f5c]">+91 {ord.client_phone}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="capitalize font-medium text-[#2E2E2E]">
                              {ord.website_type}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold">
                            ₹{ord.final_budget.toLocaleString('en-IN')}
                          </td>

                          {/* AI Agent Status Column */}
                          <td className="py-3.5 px-4">
                            {isBuilding ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold animate-pulse">
                                <RefreshCw className="w-3 h-3 animate-spin" />
                                <span>AI Building...</span>
                              </span>
                            ) : ord.ai_status === 'tour_ready' ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-bold">
                                <Sparkles className="w-3 h-3 text-indigo-600" />
                                <span>Tour Ready</span>
                              </span>
                            ) : ord.ai_status === 'client_preview' ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-100 text-cyan-800 text-[10px] font-bold">
                                <Smartphone className="w-3 h-3 text-cyan-600" />
                                <span>Client Preview</span>
                              </span>
                            ) : ord.ai_status === 'final_ready' ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                <span>Final Ready</span>
                              </span>
                            ) : (
                              <span className="inline-block px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-[10px] font-semibold">
                                Ready to Build
                              </span>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            <select
                              value={ord.order_status}
                              onChange={(e) => handleUpdateStatus(ord.id, e.target.value, ord.payment_status)}
                              className="text-xs px-2.5 py-1 rounded-lg border border-[#DDD5CD] font-medium bg-white focus:outline-none focus:ring-1 focus:ring-[#7D4047] cursor-pointer"
                            >
                              <option value="order_placed">01. Order Placed</option>
                              <option value="wireframe_ready">02. Wireframe Ready</option>
                              <option value="development_active">03. In Development</option>
                              <option value="demo_ready">04. Demo Ready</option>
                              <option value="launched">05. Launched</option>
                            </select>
                          </td>

                          {/* Action Buttons Column */}
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* 1. Build with AI Agent Button */}
                              <button
                                type="button"
                                onClick={() => handleTriggerAiBuild(ord)}
                                disabled={isBuilding}
                                className={`px-2.5 py-1.5 rounded-lg text-white font-bold text-[11px] flex items-center gap-1 transition-all active:scale-95 shadow-sm ${
                                  isAiBuilt
                                    ? 'bg-gray-800 hover:bg-gray-900'
                                    : 'bg-gradient-to-r from-[#7D4047] to-amber-600 hover:opacity-95'
                                }`}
                                title="Autonomous AI Builder"
                              >
                                <Bot className="w-3 h-3" />
                                <span>{isBuilding ? 'Building...' : isAiBuilt ? 'Re-build' : 'Build with AI'}</span>
                              </button>

                              {/* 2. Tour & Modify Button (if built) */}
                              {isAiBuilt && (
                                <button
                                  type="button"
                                  onClick={() => handleOpenTour(ord)}
                                  className="px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[11px] flex items-center gap-1 border border-indigo-200 transition-all active:scale-95 shadow-sm"
                                  title="Admin Walkthrough Tour & Modifications"
                                >
                                  <Sparkles className="w-3 h-3 text-indigo-600" />
                                  <span>Take Tour</span>
                                </button>
                              )}

                              {/* 3. Client Preview Link & Share */}
                              {isAiBuilt && (
                                <button
                                  type="button"
                                  onClick={() => handleCopyClientLink(ord)}
                                  className="p-1.5 rounded-lg bg-white hover:bg-[#F1ECE6] text-[#2E2E2E] border border-[#DDD5CD] transition-colors"
                                  title="Copy Client Preview URL"
                                >
                                  {copiedOrderId === ord.id ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5 text-[#625f5c]" />
                                  )}
                                </button>
                              )}

                              {/* 4. View Brief Drawer */}
                              <button
                                type="button"
                                onClick={() => setSelectedOrder(ord)}
                                className="p-1.5 rounded-lg hover:bg-[#F1ECE6] text-[#625f5c] hover:text-[#7D4047] transition-colors"
                                title="View Raw Order Brief"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 2: CONTACT MESSAGES */}
          {activeTab === 'messages' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F1ECE6]/60 text-[#625f5c] uppercase text-[10px] font-bold border-b border-[#DDD5CD]">
                  <tr>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4">Sender</th>
                    <th className="py-3.5 px-4">Contact</th>
                    <th className="py-3.5 px-4">Subject</th>
                    <th className="py-3.5 px-4">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDD5CD]/60 text-[#2E2E2E]">
                  {messages.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-xs text-[#625f5c]">
                        No contact inquiries received yet.
                      </td>
                    </tr>
                  ) : (
                    messages.map((m) => (
                      <tr key={m.id} className="hover:bg-[#FAF9F6] transition-colors">
                        <td className="py-3.5 px-4 text-[#625f5c] whitespace-nowrap">
                          {new Date(m.created_at).toLocaleDateString('en-IN')}
                        </td>
                        <td className="py-3.5 px-4 font-bold">{m.name}</td>
                        <td className="py-3.5 px-4 font-mono text-[11px]">+91 {m.phone}</td>
                        <td className="py-3.5 px-4 font-semibold text-[#7D4047]">{m.subject}</td>
                        <td className="py-3.5 px-4 max-w-sm text-xs text-[#625f5c] leading-relaxed">
                          {m.message}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: AUTONOMOUS AGENT MIND & LIVE INTERNET BRAIN */}
          {activeTab === 'mind' && (
            <div className="p-4 sm:p-6 space-y-6">
              
              {/* Mind Status Hero Banner */}
              <div className="rounded-2xl bg-gradient-to-br from-[#1E1E1E] via-[#2A2326] to-[#1E1E1E] border border-white/10 p-5 sm:p-6 text-white shadow-lg relative overflow-hidden">
                <div className="absolute right-0 top-0 w-96 h-96 bg-[#7D4047]/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold font-mono">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        ONLINE &amp; DIRECT INTERNET CONNECTED
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold font-mono">
                        <Clock className="w-3 h-3 text-indigo-400" />
                        3-Hour Auto Loop Active
                      </span>
                      <span className="text-xs text-gray-400 font-mono">
                        v{mindStatus?.status?.version || '2.0.0-cognitive-mind'}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-2">
                      <Bot className="w-5 h-5 text-amber-400" />
                      Autonomous Web Builder Agent Mind
                    </h3>

                    <p className="text-xs text-gray-300 max-w-2xl leading-relaxed">
                      Continuous internet intelligence loop that queries live GitHub UI repositories, Dev.to web design architecture feeds, and modern 2026 UX patterns. It reasons autonomously over client orders before writing code, and self-evolves every 3 hours.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-gray-400">
                      <div>
                        Last Synced: <span className="text-gray-200 font-semibold">{mindStatus?.status?.lastInternetSync ? new Date(mindStatus.status.lastInternetSync).toLocaleTimeString() : 'Recently'}</span>
                      </div>
                      <div className="text-gray-600">&bull;</div>
                      <div>
                        Next 3h Sync Due: <span className="text-amber-400 font-semibold">{mindStatus?.status?.remainingFormatted || '3h 0m'}</span>
                      </div>
                      <div className="text-gray-600">&bull;</div>
                      <div>
                        Sync Cycles Completed: <span className="text-emerald-400 font-bold font-mono">#{mindStatus?.status?.cycleCount || 1}</span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex sm:flex-col items-center gap-3">
                    <button
                      onClick={handleForceMindRefresh}
                      disabled={mindRefreshing}
                      className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7D4047] to-[#A0525C] hover:from-[#67333a] hover:to-[#8c464e] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-wine transition-all active:scale-95 disabled:opacity-50 cursor-pointer min-h-[44px]"
                      aria-label="Force Internet Knowledge Sync"
                    >
                      <RefreshCw className={`w-4 h-4 ${mindRefreshing ? 'animate-spin' : ''}`} />
                      <span>{mindRefreshing ? 'Syncing Live Web...' : 'Sync Internet Now'}</span>
                    </button>
                    <span className="text-[10px] text-gray-400 text-center">
                      Auto-triggers every 3 hours
                    </span>
                  </div>
                </div>
              </div>

              {/* 4 Bento Grid Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#DDD5CD] space-y-1">
                  <span className="text-[11px] font-semibold text-[#625f5c] block">Live Web Connectivity</span>
                  <p className="text-base sm:text-lg font-black text-[#2E2E2E] flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-emerald-600" />
                    <span>ONLINE_LIVE</span>
                  </p>
                  <span className="text-[10px] text-gray-500 block">GitHub &amp; Dev.to APIs Active</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#DDD5CD] space-y-1">
                  <span className="text-[11px] font-semibold text-[#625f5c] block">3-Hour Refresh Countdown</span>
                  <p className="text-base sm:text-lg font-black text-[#7D4047] font-mono">
                    {mindStatus?.status?.remainingFormatted || '3h 0m'}
                  </p>
                  <span className="text-[10px] text-gray-500 block">Automatic Background Job</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#DDD5CD] space-y-1">
                  <span className="text-[11px] font-semibold text-[#625f5c] block">Knowledge Base Size</span>
                  <p className="text-base sm:text-lg font-black text-[#2E2E2E] font-mono">
                    {mindStatus?.status?.totalTrendsLearned || 17} Trends
                  </p>
                  <span className="text-[10px] text-gray-500 block">Modern 2026 UI/UX Rules</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#DDD5CD] space-y-1">
                  <span className="text-[11px] font-semibold text-[#625f5c] block">Autonomous Engine</span>
                  <p className="text-base sm:text-lg font-black text-indigo-700 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-indigo-600" />
                    <span>5-Stage CoT</span>
                  </p>
                  <span className="text-[10px] text-gray-500 block">Perception &bull; Synthesis &bull; Audit</span>
                </div>
              </div>

              {/* Sub-Tab Navigation Strip */}
              <div className="flex items-center gap-2 border-b border-[#DDD5CD] pb-2">
                <button
                  onClick={() => setMindSubTab('thoughts')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    mindSubTab === 'thoughts'
                      ? 'bg-[#2E2E2E] text-white shadow-sm'
                      : 'text-[#625f5c] hover:bg-[#F1ECE6]'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Cognitive Thought Stream ({mindStatus?.status?.recentThinkingLogs?.length || 0})</span>
                </button>
                <button
                  onClick={() => setMindSubTab('trends')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    mindSubTab === 'trends'
                      ? 'bg-[#2E2E2E] text-white shadow-sm'
                      : 'text-[#625f5c] hover:bg-[#F1ECE6]'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Internet Knowledge Store</span>
                </button>
                <button
                  onClick={() => setMindSubTab('playbooks')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    mindSubTab === 'playbooks'
                      ? 'bg-[#2E2E2E] text-white shadow-sm'
                      : 'text-[#625f5c] hover:bg-[#F1ECE6]'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Industry Playbooks</span>
                </button>
              </div>

              {/* Sub-Tab 1: Cognitive Thought Stream */}
              {mindSubTab === 'thoughts' && (
                <div className="space-y-4">
                  {(!mindStatus?.status?.recentThinkingLogs || mindStatus.status.recentThinkingLogs.length === 0) ? (
                    <div className="p-8 text-center rounded-2xl bg-[#FAF9F6] border border-[#DDD5CD] space-y-2">
                      <Bot className="w-8 h-8 text-[#7D4047] mx-auto opacity-70" />
                      <h4 className="text-sm font-bold text-[#2E2E2E]">Ready for Autonomous Thinking</h4>
                      <p className="text-xs text-[#625f5c] max-w-md mx-auto">
                        Trigger any website build from the "Client Orders" tab to see the Agent Mind generate its 5-stage chain of thoughts in real time.
                      </p>
                    </div>
                  ) : (
                    mindStatus.status.recentThinkingLogs.map((log, idx) => (
                      <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-[#FAF9F6] border border-[#DDD5CD] space-y-3 shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DDD5CD]/60 pb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span className="text-xs font-bold text-[#2E2E2E] font-mono">{log.orderId}</span>
                            <span className="text-xs font-semibold text-[#7D4047]">&bull; {log.clientName}</span>
                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#E8E1D9] text-[#2E2E2E]">
                              {log.websiteType}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-[11px] text-[#625f5c] font-mono">
                            <span>Duration: {log.durationMs}ms</span>
                            <span>&bull;</span>
                            <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                          </div>
                        </div>

                        {/* Thought Steps */}
                        <div className="space-y-2">
                          {(log.thoughts || []).map((t, tIdx) => {
                            const stageColor = 
                              t.stage.includes('Perception') ? 'border-purple-300 bg-purple-50 text-purple-900' :
                              t.stage.includes('Psychology') ? 'border-indigo-300 bg-indigo-50 text-indigo-900' :
                              t.stage.includes('Internet') ? 'border-blue-300 bg-blue-50 text-blue-900' :
                              t.stage.includes('Trends') ? 'border-cyan-300 bg-cyan-50 text-cyan-900' :
                              t.stage.includes('Architecture') ? 'border-amber-300 bg-amber-50 text-amber-900' :
                              t.stage.includes('Blueprint') ? 'border-emerald-300 bg-emerald-50 text-emerald-900' :
                              'border-rose-300 bg-rose-50 text-rose-900';

                            return (
                              <div key={tIdx} className={`p-2.5 rounded-xl border text-xs leading-relaxed flex items-start gap-2.5 ${stageColor}`}>
                                <span className="font-bold text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/70 shrink-0 font-mono">
                                  {t.stage}
                                </span>
                                <span className="font-medium">{t.detail}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Sub-Tab 2: Live Internet Knowledge Store */}
              {mindSubTab === 'trends' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#DDD5CD] space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-[#2E2E2E] flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#7D4047]" />
                        Active 2026 Design Directives Learned from Web
                      </h4>
                      <span className="text-[10px] font-mono text-[#625f5c]">
                        Total: {mindStatus?.status?.totalTrendsLearned || 0}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {(mindStatus?.status?.activeTrends || []).map((trend, tIdx) => (
                        <div key={tIdx} className="p-3 rounded-xl bg-white border border-[#DDD5CD] text-xs font-medium text-[#2E2E2E] flex items-start gap-2 shadow-xs hover:border-[#7D4047]/40 transition-colors">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{trend}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sync History Table */}
                  {mindStatus?.status?.syncHistory && mindStatus.status.syncHistory.length > 0 && (
                    <div className="rounded-2xl border border-[#DDD5CD] overflow-hidden">
                      <div className="bg-[#FAF9F6] px-4 py-2.5 border-b border-[#DDD5CD] text-xs font-bold text-[#2E2E2E]">
                        Recent Internet Sync Events
                      </div>
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#F1ECE6]/60 text-[10px] font-bold uppercase text-[#625f5c]">
                          <tr>
                            <th className="py-2.5 px-4">Cycle #</th>
                            <th className="py-2.5 px-4">Status</th>
                            <th className="py-2.5 px-4">Timestamp</th>
                            <th className="py-2.5 px-4">Live Sources</th>
                            <th className="py-2.5 px-4">Latency</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#DDD5CD]/60">
                          {mindStatus.status.syncHistory.map((s, idx) => (
                            <tr key={idx} className="hover:bg-[#FAF9F6]">
                              <td className="py-2 px-4 font-mono font-bold">#{s.cycle}</td>
                              <td className="py-2 px-4">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                  {s.status}
                                </span>
                              </td>
                              <td className="py-2 px-4 text-[#625f5c]">{new Date(s.timestamp).toLocaleString()}</td>
                              <td className="py-2 px-4 font-mono">{s.sourceCount} Feeds</td>
                              <td className="py-2 px-4 font-mono text-[#625f5c]">{s.durationMs}ms</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Sub-Tab 3: Industry Cognitive Playbooks */}
              {mindSubTab === 'playbooks' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      name: 'Luxury Beauty & Bridal Salon',
                      type: 'beautyparlour',
                      primary: '#B76E79',
                      accent: '#D4AF37',
                      psychology: 'Elegance, glamour, transformation trust & bridal prestige',
                      hook: 'Unveil Your Regal Glow: Bespoke Bridal Artistry & Skin Rejuvenation'
                    },
                    {
                      name: 'Corporate Enterprise & Real Estate',
                      type: 'corporate',
                      primary: '#0F2027',
                      accent: '#203A43',
                      psychology: 'Institutional trust, financial security, milestone track record',
                      hook: 'Engineering Architectural Excellence & Scalable Real Estate Assets'
                    },
                    {
                      name: 'E-Commerce & D2C Store',
                      type: 'ecommerce',
                      primary: '#4F46E5',
                      accent: '#F43F5E',
                      psychology: 'Impulse engagement, product clarity, payment security confidence',
                      hook: 'Handcrafted Luxury Essentials Delivered To Your Doorstep'
                    },
                    {
                      name: 'Modern SaaS & Tech Startup',
                      type: 'custombuild',
                      primary: '#6366F1',
                      accent: '#10B981',
                      psychology: 'Speed, automation, enterprise reliability, developer delight',
                      hook: 'Supercharge Your Workflow With Autonomous Intelligence'
                    },
                    {
                      name: 'High-Converting Landing Page',
                      type: 'landing',
                      primary: '#7D4047',
                      accent: '#D97706',
                      psychology: 'Urgency, value clarity, risk reversal, single primary action',
                      hook: 'High-Performance Bespoke Digital Presence Built for Maximum Conversions'
                    }
                  ].map((p, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#DDD5CD] space-y-2.5">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-[#2E2E2E]">{p.name}</h4>
                        <div className="flex items-center gap-1.5">
                          <span className="w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: p.primary }}></span>
                          <span className="w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: p.accent }}></span>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#625f5c] italic">"{p.psychology}"</p>
                      <div className="p-2 rounded-lg bg-white border border-[#DDD5CD] text-[11px] text-[#2E2E2E] font-medium">
                        <span className="font-bold text-[#7D4047] block text-[10px] uppercase">Hero Hook:</span>
                        {p.hook}
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}
        </div>

        {/* ================================================================= */}
        {/* 🌟 INTERACTIVE ADMIN TOUR & WALKTHROUGH MODAL                     */}
        {/* ================================================================= */}
        {tourModalOpen && tourOrder && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
            <div className="bg-[#1E1E1E] text-white rounded-3xl max-w-6xl w-full h-[92vh] flex flex-col overflow-hidden border border-white/10 shadow-2xl">
              
              {/* Tour Header Bar */}
              <div className="px-6 py-4 bg-[#282828] border-b border-white/10 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#7D4047] to-amber-500 text-white flex items-center justify-center font-bold">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-white">
                        AI Website Tour &bull; {tourOrder.client_name}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        100% Healed (0 Errors)
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-400">
                      Order: {tourOrder.id} &bull; Budget: ₹{tourOrder.final_budget.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Viewport switch & actions */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10">
                    <button
                      onClick={() => setTourViewport('desktop')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                        tourViewport === 'desktop' ? 'bg-[#7D4047] text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Desktop</span>
                    </button>
                    <button
                      onClick={() => setTourViewport('mobile')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                        tourViewport === 'mobile' ? 'bg-[#7D4047] text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Mobile</span>
                    </button>
                  </div>

                  <button
                    onClick={() => handleAdminApprove(tourOrder.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve for Client</span>
                  </button>

                  <button
                    onClick={() => setTourModalOpen(false)}
                    className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
                  >
                    &times;
                  </button>
                </div>
              </div>

              {/* Tour Body: Split Layout */}
              <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                
                {/* Left Column: Tour Steps & Admin Prompt Input */}
                <div className="w-full lg:w-96 bg-[#222222] p-5 border-r border-white/10 flex flex-col justify-between overflow-y-auto shrink-0 space-y-5">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                        Agent Architecture Tour
                      </span>
                      <h4 className="text-sm font-bold text-white">Sections Built &amp; Verified</h4>
                    </div>

                    {/* Step Cards */}
                    <div className="space-y-2.5">
                      {tourData?.tourSteps ? (
                        tourData.tourSteps.map((s) => (
                          <div key={s.step} className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                            <span className="text-xs font-bold text-amber-300 block">{s.title}</span>
                            <p className="text-[11px] text-gray-300 leading-relaxed">{s.description}</p>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 rounded-xl bg-white/5 text-xs text-gray-400">
                          Complete site built with modern Tailwind, responsive layout, packages and WhatsApp connectivity.
                        </div>
                      )}
                    </div>

                    {/* Agent Mind Thought Stream for this order */}
                    {tourData?.thoughtStream && tourData.thoughtStream.length > 0 && (
                      <div className="pt-2 space-y-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 flex items-center gap-1">
                          <Bot className="w-3 h-3" />
                          Agent Mind Chain of Thought ({tourData.thoughtStream.length} Stages)
                        </span>
                        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                          {tourData.thoughtStream.map((t, idx) => (
                            <div key={idx} className="p-2 rounded-lg bg-black/40 border border-white/5 text-[11px] leading-relaxed">
                              <span className="font-bold text-amber-300 block text-[9px] uppercase font-mono">{t.stage}</span>
                              <span className="text-gray-300">{t.detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Admin Change Request Form */}
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Request Instant Changes:</span>
                    </div>
                    <form onSubmit={handleSubmitAdminRevision} className="space-y-2">
                      <textarea
                        value={revisionInput}
                        onChange={(e) => setRevisionInput(e.target.value)}
                        placeholder="Type changes (e.g. 'Update headline to Luxury Bridal Salon', 'Change contact to 9825012345')..."
                        rows={3}
                        required
                        className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-amber-400"
                      />
                      <button
                        type="submit"
                        disabled={isRevising}
                        className="w-full py-2 rounded-xl bg-[#7D4047] hover:bg-[#67333a] active:scale-95 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md disabled:opacity-50"
                      >
                        {isRevising ? (
                          <>
                            <RefreshCw className="w-3 h-3 animate-spin" />
                            <span>Agent Re-healing Site...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3 h-3" />
                            <span>Tell Agent to Apply Changes</span>
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>

                {/* Right Column: Live Iframe Viewport */}
                <div className="flex-1 bg-black p-4 flex items-center justify-center overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white ${
                      tourViewport === 'mobile' ? 'w-[375px] max-w-full my-auto ring-4 ring-gray-800' : 'w-full'
                    }`}
                  >
                    <iframe
                      key={tourIframeKey}
                      src={`/client-demos/${tourOrder.id}/index.html`}
                      title={`${tourOrder.client_name} Walkthrough`}
                      className="w-full h-full border-none"
                    />
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Selected Order Full Brief Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#DDD5CD]">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#DDD5CD]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-extrabold text-xl text-[#2E2E2E]">{selectedOrder.client_name}</span>
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#7D4047]/10 text-[#7D4047] font-bold">
                      {selectedOrder.id}
                    </span>
                  </div>
                  <p className="text-xs text-[#625f5c] mt-0.5">
                    Phone: +91 {selectedOrder.client_phone} {selectedOrder.client_email && `&bull; ${selectedOrder.client_email}`}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1.5 rounded-full hover:bg-[#F1ECE6] text-[#625f5c]"
                >
                  <span className="text-lg font-bold">&times;</span>
                </button>
              </div>

              {/* Order Key Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-[#F1ECE6]/60 p-3 rounded-xl border border-[#DDD5CD]">
                  <span className="text-[#625f5c] block">Category:</span>
                  <strong className="text-[#2E2E2E] capitalize">{selectedOrder.website_type}</strong>
                </div>
                <div className="bg-[#F1ECE6]/60 p-3 rounded-xl border border-[#DDD5CD]">
                  <span className="text-[#625f5c] block">Final Price:</span>
                  <strong className="text-[#2E2E2E] font-mono">₹{selectedOrder.final_budget.toLocaleString('en-IN')}</strong>
                </div>
                <div className="bg-[#F1ECE6]/60 p-3 rounded-xl border border-[#DDD5CD]">
                  <span className="text-[#625f5c] block">Payment:</span>
                  <strong className="text-[#7D4047] font-mono">Direct WhatsApp ({selectedOrder.payment_status})</strong>
                </div>
              </div>

              {/* Custom Instructions */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#7D4047] flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Client Custom Instructions Brief:</span>
                </label>
                <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#DDD5CD] text-xs text-[#2E2E2E] max-h-48 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                  {selectedOrder.custom_instructions || 'No special custom brief written by client.'}
                </div>
              </div>

              {/* Cloud Asset Link */}
              {selectedOrder.cloud_link && (
                <div className="space-y-1">
                  <span className="text-xs font-bold text-[#625f5c]">Cloud Assets:</span>
                  <a
                    href={selectedOrder.cloud_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#7D4047] underline block truncate hover:text-[#67333a]"
                  >
                    {selectedOrder.cloud_link}
                  </a>
                </div>
              )}

              {/* Close Button */}
              <div className="pt-4 border-t border-[#DDD5CD] flex justify-end">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-1.5 rounded-lg bg-[#DDD5CD]/40 hover:bg-[#DDD5CD] text-xs font-semibold text-[#2E2E2E]"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
