import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  X, CheckCircle2, Mail, Copy, 
  Check, FileText, ChevronDown, ChevronUp, 
  ArrowRight, ShieldCheck, Sparkles 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateWebsiteProductionPlan } from '../utils/planGenerator';
import { api } from '../services/api';

export default function PaymentModal({ orderDetails, onClose }) {
  const [orderId] = useState(() => 'TWC-' + Math.floor(100000 + Math.random() * 900000));
  const [trackingToken, setTrackingToken] = useState(() => 'TK-' + Math.floor(100000 + Math.random() * 900000));
  const [copiedToken, setCopiedToken] = useState(false);
  const [copiedPlan, setCopiedPlan] = useState(false);
  const [showPlanDetails, setShowPlanDetails] = useState(false);

  // Generate automated website production plan safely
  const planData = orderDetails ? generateWebsiteProductionPlan({
    ...orderDetails,
    orderId,
  }) : null;

  // Automatically save to database upon mount (Zero payment needed!)
  useEffect(() => {
    if (!orderDetails || !planData) return;
    let isMounted = true;

    async function registerOrder() {
      try {
        const res = await api.createOrder({
          orderId,
          trackingToken,
          clientName: planData.clientName,
          clientPhone: planData.clientPhone,
          clientEmail: orderDetails.clientEmail || null,
          websiteType: planData.websiteType,
          finalBudget: planData.finalBudget,
          advanceAmount: 0,
          customInstructions: orderDetails.customInstructions || '',
          cloudAssetLink: planData.cloudLink || '',
          customNotes: planData.notes || '',
          blueprint: planData.plainText,
          clientRating: orderDetails.clientRating || 5,
          clientFeedback: orderDetails.clientFeedback || '',
          reviewAgreement: orderDetails.reviewAgreement ? 1 : 0,
          paymentStatus: 'zero_online_payment',
          orderStatus: 'order_placed',
        }, orderDetails.files || []);

        if (res && res.trackingToken) {
          setTrackingToken(res.trackingToken);
        }

        if (isMounted) {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#7D4047', '#2E2E2E', '#DDD5CD', '#ffffff']
          });
        }
      } catch (err) {
        console.warn('Backend DB registration notice:', err);
      }

      // Automated background email dispatch attempt to thewebcraft404@gmail.com
      try {
        fetch('https://formsubmit.co/ajax/thewebcraft404@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            subject: `NEW ORDER REQUEST: ${planData.clientName} (${orderId}) - Saved in Database`,
            client_name: planData.clientName,
            phone: planData.clientPhone,
            website_type: planData.websiteType,
            payment_status: 'Zero Online Payment (Direct Consultation)',
            budget: `Rs. ${planData.finalBudget.toLocaleString('en-IN')}`,
            cloud_assets: planData.cloudLink || 'None provided',
            client_notes: planData.notes || 'None',
            production_blueprint: planData.plainText,
            database_id: orderId,
          })
        }).catch(() => {});
      } catch (_) {}
    }

    registerOrder();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!orderDetails || !planData) return null;

  const handleCopyPlan = () => {
    navigator.clipboard.writeText(planData.plainText);
    setCopiedPlan(true);
    setTimeout(() => setCopiedPlan(false), 3000);
  };

  const directGmailLink = `mailto:thewebcraft404@gmail.com?subject=${encodeURIComponent(`Website Project Request: ${planData.clientName} [${orderId}]`)}&body=${encodeURIComponent(planData.plainText)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden my-4 border border-[#DDD5CD] transition-all">
        
        {/* Header Strip */}
        <div className="bg-[#2E2E2E] text-white p-5 sm:p-6 flex items-center justify-between border-b border-neutral-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#7D4047] flex items-center justify-center text-white shrink-0">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-base sm:text-lg text-white">
                Website Order Submitted Successfully!
              </h2>
              <p className="text-xs text-[#DDD5CD]/80">
                Database ID: <span className="font-mono text-amber-300 font-bold">{orderId}</span> &bull; Saved in Studio DB
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 space-y-5 text-left">
          
          {/* Status Banner */}
          <div className="flex items-start gap-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading font-bold text-base text-emerald-950">
                Specifications Registered with Engineering Team
              </h3>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Client: <strong>{planData.clientName}</strong> (+91 {planData.clientPhone}) &bull; Package: <span className="capitalize font-semibold">{planData.websiteType}</span>
              </p>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-white/80 px-2 py-0.5 rounded-md border border-emerald-300 mt-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero Online Payment Required &bull; Direct Consultation</span>
              </div>
            </div>
          </div>

          {/* Owner Tracking Token Card */}
          <div className="bg-gradient-to-br from-[#2A2326] via-[#1E1E1E] to-[#2A2326] text-white p-5 rounded-2xl border border-[#7D4047]/60 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 font-mono flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Your Unique Tracking Token Generated
              </span>
              <span className="text-[10px] text-gray-400 font-mono">100% Unique ID</span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-black/40 p-3.5 rounded-xl border border-white/10">
              <div>
                <span className="text-[10px] text-gray-400 block font-semibold">Owner Tracking Token:</span>
                <span className="text-2xl font-black text-amber-300 font-mono tracking-wider">{trackingToken}</span>
                <span className="text-[10px] text-gray-400 block font-mono mt-0.5">Order ID: <strong className="text-white">{orderId}</strong></span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(trackingToken);
                    setCopiedToken(true);
                    setTimeout(() => setCopiedToken(false), 2500);
                  }}
                  className="flex-1 sm:flex-none px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95"
                >
                  {copiedToken ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedToken ? 'Token Copied!' : 'Copy Token'}</span>
                </button>

                <Link
                  to={`/track?id=${trackingToken}`}
                  onClick={onClose}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#7D4047] hover:bg-[#67333a] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-wine active:scale-95"
                >
                  <span>Track Project ↗</span>
                </Link>
              </div>
            </div>

            <p className="text-[11px] text-gray-300 leading-relaxed">
              Use either your <strong className="font-mono text-amber-300">{trackingToken}</strong> or <strong className="font-mono text-white">{orderId}</strong> on the Tracking Page anytime to inspect your 5-stage website milestones.
            </p>
          </div>

          {/* Consultation Notice */}
          <div className="bg-[#F1ECE6]/60 border border-[#DDD5CD] rounded-2xl p-4 space-y-2 text-xs text-[#2E2E2E]">
            <span className="font-bold text-[#7D4047] uppercase tracking-wider block text-[11px]">
              Next Steps &amp; Milestone Schedule
            </span>
            <p className="leading-relaxed text-[#625f5c]">
              No online payment is charged on this website. Our Lead Developer <strong>Rakshit Patel</strong> will personally review your specifications and reach out via message or email within <strong>2 hours</strong> to confirm wireframes. <strong>Payment is done on WhatsApp only after you see your website completed and approved, right before it goes live on the browser.</strong>
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 font-semibold text-[11px] text-[#2E2E2E]">
              <span>Direct WhatsApp:</span>
              <a 
                href={`https://wa.me/919428298134?text=${encodeURIComponent(`Hello Rakshit, I have submitted my website order.\n\nOrder ID: ${orderId}\nTracking Token: ${trackingToken}\nClient: ${planData.clientName}\nPackage: ${planData.websiteType}\nBudget: Rs. ${planData.finalBudget.toLocaleString('en-IN')}\n\nPlease confirm my milestone schedule!`)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="font-mono text-emerald-800 font-bold hover:underline"
                title="Chat on WhatsApp"
              >
                +91 94282 98134
              </a>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full font-bold">
                WhatsApp Chat Only &bull; No Calls
              </span>
            </div>
          </div>

          {/* Direct Tracking Link Callout */}
          <div className="bg-[#7D4047]/10 border-2 border-[#7D4047]/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-[#7D4047] uppercase tracking-wider block">Live Order Tracking Link</span>
              <p className="text-xs text-[#2E2E2E]">Track your 5-stage development progress anytime using your Order ID.</p>
            </div>
            <Link
              to={`/track?id=${orderId}`}
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#7D4047] hover:bg-[#67333a] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all shrink-0"
            >
              <span>Track Live Progress</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Quick Action Dispatch Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <a
              href={directGmailLink}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-[#2E2E2E] hover:bg-[#111] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <Mail className="w-4 h-4 text-[#DDD5CD]" />
              <span>Email Specifications</span>
            </a>

            <button
              type="button"
              onClick={handleCopyPlan}
              className="py-3 px-4 rounded-xl bg-[#7D4047] hover:bg-[#67333a] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-wine"
            >
              {copiedPlan ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedPlan ? 'Blueprint Copied!' : 'Copy Project Blueprint'}</span>
            </button>
          </div>

          {/* Copyable Plan Button & Expandable Preview */}
          <div className="pt-2 border-t border-[#DDD5CD] space-y-2">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleCopyPlan}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7D4047] hover:underline"
              >
                {copiedPlan ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedPlan ? 'Blueprint Copied to Clipboard!' : 'Copy Project Blueprint'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowPlanDetails(!showPlanDetails)}
                className="inline-flex items-center gap-1 text-xs text-[#625f5c] hover:text-[#2E2E2E] font-semibold"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{showPlanDetails ? 'Hide Blueprint' : 'View Blueprint'}</span>
                {showPlanDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Expandable Project Plan Viewer */}
            {showPlanDetails && (
              <div className="bg-[#1C1C1C] text-[#F1ECE6] p-4 rounded-xl font-mono text-[11px] leading-relaxed max-h-56 overflow-y-auto whitespace-pre-wrap border border-neutral-700 shadow-inner">
                {planData.plainText}
              </div>
            )}
          </div>

          {/* Close Window */}
          <div className="pt-1 text-center">
            <button
              onClick={onClose}
              className="text-xs text-[#625f5c] hover:text-[#2E2E2E] underline font-medium"
            >
              Done &amp; Close Window
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
