import React, { useState, useEffect } from 'react';
import { 
  Layers, CheckCircle2, Clock, Search, RefreshCw, Eye, 
  Phone, Mail, FileText, Database, ShieldCheck, AlertCircle, 
  ExternalLink, User, DollarSign, Filter, ArrowUpRight
} from 'lucide-react';
import { api } from '../services/api';
import { COMPANY_CONFIG } from '../data/pricingData';

export default function AdminPage() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'messages'

  const loadData = async () => {
    setLoading(true);
    try {
      const [ordersRes, statsRes, messagesRes] = await Promise.all([
        api.getAllOrders().catch(() => ({ orders: [] })),
        api.getStats().catch(() => null),
        fetch('/api/contact').then(r => r.json()).catch(() => ({ messages: [] }))
      ]);

      if (ordersRes.orders) setOrders(ordersRes.orders);
      if (statsRes) setStats(statsRes);
      if (messagesRes.messages) setMessages(messagesRes.messages);
    } catch (e) {
      console.warn('Error loading admin data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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

  const filteredOrders = orders.filter(o => {
    const matchesFilter = filterStatus === 'all' || o.order_status === filterStatus;
    const matchesQuery = !searchQuery || 
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.client_phone.includes(searchQuery);
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="py-10 sm:py-16 bg-[#F1ECE6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Strip */}
        <div className="relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#2E2E2E] text-white p-6 sm:p-8 rounded-3xl shadow-elevated border border-white/10 hover-glow-card">
          {/* Subtle Ambient Glow Orb */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#7D4047]/30 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
          
          <div className="space-y-1 relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-wider text-[#DDD5CD]">
                THE WEBCRAFT &bull; Studio Control Desk
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Client Orders &amp; Database Management
            </h1>
            <p className="text-xs text-[#DDD5CD]/80">
              Direct developer dashboard for Rakshit Patel. Real-time persistent SQLite database (<code>webcraft.db</code>).
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
            <a
              href={`mailto:${COMPANY_CONFIG.email}`}
              className="px-4 py-2.5 rounded-xl bg-[#7D4047] hover:bg-[#67333a] active:scale-95 text-white text-xs font-bold flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Studio Email Desk ({COMPANY_CONFIG.email})</span>
            </a>
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
              <span className="text-[11px] text-[#625f5c] block">Agreed client budgets</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#DDD5CD] shadow-soft space-y-1 hover-glow-card transition-all duration-300 hover:-translate-y-1 group">
              <span className="text-xs text-[#625f5c] font-medium block">Early-Bird Promo</span>
              <p className="text-2xl sm:text-3xl font-black text-[#2E2E2E] font-mono">
                {stats.slotsRemaining} Slots
              </p>
              <span className={`text-[11px] font-semibold inline-block px-2 py-0.5 rounded-full ${
                stats.isOfferActive ? 'bg-[#7D4047]/10 text-[#7D4047] shimmer-badge' : 'bg-gray-100 text-gray-600'
              }`}>
                {stats.isOfferActive ? '15% Off Active' : 'Promo Expired (10+ Orders)'}
              </span>
            </div>
          </div>
        )}

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl border border-[#DDD5CD] shadow-soft overflow-hidden">
          
          {/* Tab Selector & Controls */}
          <div className="p-4 sm:p-6 border-b border-[#DDD5CD] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#FAF9F6]">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('orders')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'orders'
                    ? 'bg-[#7D4047] text-white shadow-sm'
                    : 'bg-white text-[#2E2E2E] border border-[#DDD5CD] hover:border-[#7D4047]/40'
                }`}
              >
                Website Orders ({orders.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('messages')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'messages'
                    ? 'bg-[#7D4047] text-white shadow-sm'
                    : 'bg-white text-[#2E2E2E] border border-[#DDD5CD] hover:border-[#7D4047]/40'
                }`}
              >
                Inquiries ({messages.length})
              </button>
            </div>

            {/* Search & Filter */}
            {activeTab === 'orders' && (
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-[#625f5c] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by ID, name or phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-[#DDD5CD] bg-white focus:outline-none focus:ring-1 focus:ring-[#7D4047]"
                  />
                </div>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full sm:w-auto px-3 py-1.5 text-xs rounded-lg border border-[#DDD5CD] bg-white text-[#2E2E2E] font-medium focus:outline-none"
                >
                  <option value="all">All Stages</option>
                  <option value="order_placed">01. Order Placed</option>
                  <option value="wireframe_ready">02. Wireframe Ready</option>
                  <option value="development_active">03. Development Active</option>
                  <option value="demo_ready">04. Demo Ready</option>
                  <option value="launched">05. Launched</option>
                </select>
              </div>
            )}
          </div>

          {/* TAB 1: ORDERS TABLE */}
          {activeTab === 'orders' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F1ECE6]/60 text-[#625f5c] uppercase text-[10px] font-bold border-b border-[#DDD5CD]">
                  <tr>
                    <th className="py-3.5 px-4">Order ID</th>
                    <th className="py-3.5 px-4">Client Contact</th>
                    <th className="py-3.5 px-4">Package</th>
                    <th className="py-3.5 px-4">Budget</th>
                    <th className="py-3.5 px-4">Development Stage</th>
                    <th className="py-3.5 px-4">Payment</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDD5CD]/60 text-[#2E2E2E]">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-xs text-[#625f5c]">
                        No orders found matching the filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-[#FAF9F6] transition-colors group">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#7D4047] group-hover:underline">
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
                        <td className="py-3.5 px-4">
                          <select
                            value={ord.order_status}
                            onChange={(e) => handleUpdateStatus(ord.id, e.target.value, ord.payment_status)}
                            className="text-xs px-2.5 py-1 rounded-lg border border-[#DDD5CD] font-medium bg-white focus:outline-none focus:ring-1 focus:ring-[#7D4047] cursor-pointer hover:border-[#7D4047]/50 transition-colors"
                          >
                            <option value="order_placed">01. Order Placed</option>
                            <option value="wireframe_ready">02. Wireframe Ready</option>
                            <option value="development_active">03. In Development</option>
                            <option value="demo_ready">04. Demo Ready</option>
                            <option value="launched">05. Launched</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full inline-block ${
                            ord.payment_status === 'verified'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {ord.payment_status === 'verified' ? '✓ Verified' : 'Direct Request'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setSelectedOrder(ord)}
                              className="px-2.5 py-1 rounded-lg bg-[#F1ECE6] hover:bg-[#7D4047] text-[#7D4047] hover:text-white font-bold text-[11px] flex items-center gap-1 transition-all duration-200 active:scale-95 shadow-sm"
                            >
                              <Eye className="w-3 h-3" />
                              <span>View Brief</span>
                            </button>
                            <a
                              href={`/track?id=${ord.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg hover:bg-[#DDD5CD]/40 text-[#625f5c] hover:text-[#7D4047] transition-colors"
                              title="Open Client Tracking URL"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))
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

        </div>

        {/* Selected Order Full Brief Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 transition-all">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#DDD5CD] transform transition-all duration-300 scale-100 hover-glow-card">
              
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
                  <AlertCircle className="w-5 h-5 hidden" />
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
                  <span className="text-[#625f5c] block">Agreed Budget:</span>
                  <strong className="text-[#2E2E2E] font-mono">₹{selectedOrder.final_budget.toLocaleString('en-IN')}</strong>
                </div>
                <div className="bg-[#F1ECE6]/60 p-3 rounded-xl border border-[#DDD5CD]">
                  <span className="text-[#625f5c] block">Consultation:</span>
                  <strong className="text-[#7D4047] font-mono">Direct Request ({selectedOrder.payment_status})</strong>
                </div>
              </div>

              {/* 7,000 Character Custom Instructions Slot */}
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
                  <span className="text-xs font-bold text-[#625f5c]">Cloud Assets (Google Drive / Figma):</span>
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

              {/* Fast Status Update Controls */}
              <div className="pt-4 border-t border-[#DDD5CD] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#2E2E2E]">Update Milestone:</span>
                  <select
                    value={selectedOrder.order_status}
                    onChange={(e) => handleUpdateStatus(selectedOrder.id, e.target.value, selectedOrder.payment_status)}
                    className="text-xs px-3 py-1.5 rounded-lg border border-[#DDD5CD] font-medium bg-white"
                  >
                    <option value="order_placed">01. Order Placed</option>
                    <option value="wireframe_ready">02. Wireframe Ready</option>
                    <option value="development_active">03. In Development</option>
                    <option value="demo_ready">04. Demo Ready</option>
                    <option value="launched">05. Launched</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, selectedOrder.order_status, selectedOrder.payment_status === 'verified' ? 'pending' : 'verified')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedOrder.payment_status === 'verified'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-[#7D4047] text-white'
                    }`}
                  >
                    {selectedOrder.payment_status === 'verified' ? 'Settlement Verified ✓' : 'Mark Project Settled'}
                  </button>

                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="px-4 py-1.5 rounded-lg bg-[#DDD5CD]/40 hover:bg-[#DDD5CD] text-xs font-semibold text-[#2E2E2E]"
                  >
                    Close
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
