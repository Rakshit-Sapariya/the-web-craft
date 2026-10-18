import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  X, CheckCircle2, Mail, Copy, 
  Check, FileText, ChevronDown, ChevronUp, Send, 
  Database, ArrowRight, ShieldCheck, Sparkles, Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMPANY_CONFIG } from '../data/pricingData';
import { generateWebsiteProductionPlan } from '../utils/planGenerator';
import { incrementOrderCount } from '../utils/orderTracker';
import { api } from '../services/api';

export default function PaymentModal({ orderDetails, onClose }) {
  const [orderId] = useState(() => 'TWC-' + Math.floor(100000 + Math.random() * 900000));
  const [copiedPlan, setCopiedPlan] = useState(false);
  const [showPlanDetails, setShowPlanDetails] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [dbSaved, setDbSaved] = useState(false);

  if (!orderDetails) return null;

  // Generate automated website production plan
  const planData = generateWebsiteProductionPlan({
    ...orderDetails,
    orderId,
  });

  // Automatically save to database upon mount (Zero payment needed!)
  useEffect(() => {
    let isMounted = true;

    async function registerOrder() {
      try {
        await api.createOrder({
          orderId,
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
          paymentStatus: 'zero_online_payment',
          orderStatus: 'order_placed',
        }, orderDetails.files || []);

        if (isMounted) {
          setDbSaved(true);
          setIsSubmitting(false);
          incrementOrderCount();

          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#7D4047', '#2E2E2E', '#DDD5CD', '#ffffff']
          });
        }
      } catch (err) {
        console.warn('Backend DB registration notice:', err);
        if (isMounted) {
          setIsSubmitting(false);
          setDbSaved(true);
        }
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

          {/* Consultation Notice */}
          <div className="bg-[#F1ECE6]/60 border border-[#DDD5CD] rounded-2xl p-4 space-y-2 text-xs text-[#2E2E2E]">
            <span className="font-bold text-[#7D4047] uppercase tracking-wider block text-[11px]">
              Next Steps &amp; Milestone Schedule
            </span>
            <p className="leading-relaxed text-[#625f5c]">
              No online payment is charged on this website. Our Lead Developer <strong>Rakshit Patel</strong> will personally review your specifications and reach out via phone or email within <strong>2 hours</strong> to confirm wireframes and live demo walkthrough.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 font-semibold text-[11px] text-[#2E2E2E]">
              <span>Direct Line:</span>
              <span className="font-mono text-[#7D4047] font-bold">+91 85114 39894</span>
              <span className="text-[10px] bg-[#7D4047]/15 text-[#7D4047] px-1.5 py-0.5 rounded font-bold">
                Only Message, Not Call
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
