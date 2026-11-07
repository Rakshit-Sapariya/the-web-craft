import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, Edit3, Smartphone, Monitor, ExternalLink, 
  RefreshCw, MessageCircle, AlertCircle, ArrowLeft, Send
} from 'lucide-react';
import { api } from '../services/api';

export default function ClientPreviewPage() {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('desktop'); // 'desktop' | 'mobile'
  const [showReviseModal, setShowReviseModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [actionSuccess, setActionSuccess] = useState(null);
  const [iframeKey, setIframeKey] = useState(1);

  const loadPreview = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getClientPreviewData(token);
      setOrderData(data);
    } catch (e) {
      setError(e.message || 'Could not load client preview.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPreview();
  }, [token]);

  const handleClientApprove = async () => {
    if (!window.confirm('Are you ready to finalize and approve this website? You will be connected to WhatsApp for payment & live launch.')) {
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.submitClientAction(token, 'approve', '');
      setActionSuccess(res.message);
      if (res.whatsappUrl) {
        window.open(res.whatsappUrl, '_blank');
      }
      loadPreview();
    } catch (e) {
      alert('Error approving website: ' + e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitRevision = async (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    setSubmitting(true);
    try {
      const res = await api.submitClientAction(token, 'revise', feedbackText);
      setActionSuccess('Changes requested successfully! The AI Agent has applied the updates.');
      setShowReviseModal(false);
      setFeedbackText('');
      setIframeKey(k => k + 1); // Refresh iframe
      loadPreview();
    } catch (e) {
      alert('Error requesting revision: ' + e.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F1ECE6] flex flex-col items-center justify-center space-y-4">
        <RefreshCw className="w-8 h-8 text-[#7D4047] animate-spin" />
        <p className="text-sm font-semibold text-gray-700">Loading Client Staging Preview...</p>
      </div>
    );
  }

  if (error || !orderData) {
    return (
      <div className="min-h-screen bg-[#F1ECE6] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-600" />
        <h2 className="text-2xl font-bold text-gray-900">Preview Link Expired or Not Found</h2>
        <p className="text-sm text-gray-600 max-w-md">
          {error || 'The preview for this order could not be retrieved. Please verify the URL or contact The WebCraft.'}
        </p>
        <Link to="/" className="px-5 py-2.5 rounded-xl bg-[#7D4047] text-white text-xs font-bold">
          Return to Studio Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white overflow-hidden">
      
      {/* TOP FLOATING CLIENT ACTION HEADER */}
      <header className="h-16 bg-[#2E2E2E] border-b border-white/10 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-lg z-30">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Studio</span>
          </Link>
          <div className="h-4 w-px bg-white/20" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-white truncate max-w-[150px] sm:max-w-[250px]">
                {orderData.clientName}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono uppercase tracking-wider">
                {orderData.ai_status === 'final_ready' ? '✅ Approved' : 'Draft Preview'}
              </span>
            </div>
            <span className="text-[10px] text-gray-400 hidden sm:block">
              Order: {orderData.orderId} &bull; The WebCraft Autonomous Staging
            </span>
          </div>
        </div>

        {/* Center: Device Viewport Switcher */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setViewMode('desktop')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === 'desktop' ? 'bg-[#7D4047] text-white shadow-sm' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === 'mobile' ? 'bg-[#7D4047] text-white shadow-sm' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
        </div>

        {/* Right: Client Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={orderData.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold flex items-center gap-1.5 border border-white/10"
            title="Open in new tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Open Full</span>
          </a>

          <button
            onClick={() => setShowReviseModal(true)}
            className="px-3 sm:px-4 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1.5 border border-amber-500/30 transition-all active:scale-95"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Request Changes</span>
          </button>

          <button
            onClick={handleClientApprove}
            disabled={submitting || orderData.ai_status === 'final_ready'}
            className="px-3 sm:px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all disabled:opacity-50"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{orderData.ai_status === 'final_ready' ? 'Approved' : 'Approve Website'}</span>
          </button>
        </div>
      </header>

      {/* NOTICE BANNER IF APPROVED OR UPDATED */}
      {actionSuccess && (
        <div className="bg-emerald-600 text-white text-xs px-4 py-2 text-center font-medium flex items-center justify-center gap-2">
          <span>{actionSuccess}</span>
          <button onClick={() => setActionSuccess(null)} className="underline font-bold ml-2">Dismiss</button>
        </div>
      )}

      {/* MAIN IFRAME VIEWPORT */}
      <main className="flex-1 bg-gray-950 flex items-center justify-center p-2 sm:p-4 overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white ${
            viewMode === 'mobile' ? 'w-[375px] max-w-full my-auto ring-8 ring-gray-800' : 'w-full'
          }`}
        >
          <iframe
            key={iframeKey}
            src={orderData.demoUrl}
            title={`${orderData.clientName} Preview`}
            className="w-full h-full border-none"
            sandbox="allow-scripts allow-forms allow-same-origin allow-modals"
          />
        </div>
      </main>

      {/* REQUEST CHANGES MODAL */}
      {showReviseModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#2E2E2E] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-amber-400" />
                <span>Request Modifications to Website</span>
              </h3>
              <p className="text-xs text-gray-300">
                Type the exact changes you want (colors, text, services, or phone numbers). Our Autonomous AI WebCraft Agent will apply them and update your preview.
              </p>
            </div>

            <form onSubmit={handleSubmitRevision} className="space-y-4">
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Example: Please change the phone number to 9825012345, update the main title to 'Luxury Bridal Makeup Studio', and make the packages bold..."
                rows={5}
                required
                className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
              />

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviseModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-gray-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold flex items-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>AI Agent Updating...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Changes to Agent</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
