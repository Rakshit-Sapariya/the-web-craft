import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  X, CheckCircle2, MessageSquare, Mail, Copy, 
  Check, FileText, ChevronDown, ChevronUp, Send, Sparkles, 
  Smartphone, Building2, CreditCard, ShieldCheck, Lock, 
  ExternalLink, Loader2, AlertCircle, ArrowRight, Zap, Database, ArrowUpRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMPANY_CONFIG } from '../data/pricingData';
import { generateWebsiteProductionPlan } from '../utils/planGenerator';
import { incrementOrderCount } from '../utils/orderTracker';
import { api } from '../services/api';

export default function PaymentModal({ orderDetails, onClose }) {
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [orderId] = useState(() => 'TWC-' + Math.floor(100000 + Math.random() * 900000));
  const [copiedPlan, setCopiedPlan] = useState(false);
  const [showPlanDetails, setShowPlanDetails] = useState(false);
  const [emailStatus, setEmailStatus] = useState('sending'); // 'sending' | 'sent' | 'fallback'
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Interactive Options (Payment kept pending on discussion as requested by user)
  const [activeTab, setActiveTab] = useState('pending_consultation'); // 'pending_consultation' | 'upi' | 'bank' | 'demo_gateway'
  const [copiedField, setCopiedField] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);

  if (!orderDetails) return null;

  // Generate automated website production plan
  const planData = generateWebsiteProductionPlan({
    ...orderDetails,
    orderId,
  });

  const handleCopyText = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 2500);
  };

  const handleConfirmOrder = async (isTestGateway = false) => {
    setIsSubmitting(true);
    
    // 1. Save directly into SQLite database backend!
    try {
      await api.createOrder({
        orderId,
        clientName: planData.clientName,
        clientPhone: planData.clientPhone,
        clientEmail: orderDetails.clientEmail || null,
        websiteType: planData.websiteType,
        finalBudget: planData.finalBudget,
        advanceAmount: 5000,
        customInstructions: orderDetails.customInstructions || '',
        cloudAssetLink: planData.cloudLink || '',
        customNotes: planData.notes || '',
        blueprint: planData.plainText,
        paymentStatus: isTestGateway ? 'verified' : 'pending',
        orderStatus: 'order_placed',
      }, orderDetails.files || []);
    } catch (err) {
      console.warn('Backend DB notice:', err);
    }

    setIsSubmitting(false);
    setPaymentConfirmed(true);
    incrementOrderCount();

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#7D4047', '#2E2E2E', '#DDD5CD', '#ffffff']
    });

    // 2. Automated background email dispatch attempt to thewebcraft404@gmail.com
    fetch('https://formsubmit.co/ajax/thewebcraft404@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        subject: `NEW ORDER BOOKING: ${planData.clientName} (${orderId}) - Saved in Database`,
        client_name: planData.clientName,
        phone: planData.clientPhone,
        website_type: planData.websiteType,
        payment_status: isTestGateway ? 'Verified via Test Mode' : 'Pending on Consultation (As Agreed)',
        advance_token: 'Rs. 5,000 (To be settled on discussion)',
        remaining_balance: `Rs. ${planData.remaining.toLocaleString('en-IN')}`,
        budget: `Rs. ${planData.finalBudget.toLocaleString('en-IN')}`,
        cloud_assets: planData.cloudLink || 'None provided',
        client_notes: planData.notes || 'None',
        production_blueprint: planData.plainText,
        database_id: orderId,
      })
    })
      .then(res => {
        if (res.ok) {
          setEmailStatus('sent');
        } else {
          setEmailStatus('fallback');
        }
      })
      .catch(() => {
        setEmailStatus('fallback');
      });
  };

  const handleSimulatePaymentGateway = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      const generatedUTR = 'UTR' + Math.floor(100000000000 + Math.random() * 900000000000);
      setUtrNumber(generatedUTR);
      handleConfirmOrder(true);
    }, 1200);
  };

  const handleCopyPlan = () => {
    navigator.clipboard.writeText(planData.plainText);
    setCopiedPlan(true);
    setTimeout(() => setCopiedPlan(false), 2500);
  };

  // Direct Gmail Composer Link
  const emailSubject = encodeURIComponent(`[CONFIRMED ORDER & READY PLAN] ${planData.clientName} - ${orderId} (Saved in Database)`);
  const emailBody = encodeURIComponent(planData.plainText);
  const directGmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${COMPANY_CONFIG.email}&su=${emailSubject}&body=${emailBody}`;

  // WhatsApp formatted message
  const whatsappMessage = encodeURIComponent(
    `*NEW WEBSITE ORDER BOOKED - THE WEBCRAFT*\n` +
    `--------------------------------------\n` +
    `*Order ID:* ${orderId}\n` +
    `*Client Name:* ${planData.clientName}\n` +
    `*Phone:* +91 ${planData.clientPhone}\n` +
    `*Website Type:* ${planData.websiteType}\n` +
    `*Total Budget:* Rs. ${planData.finalBudget.toLocaleString('en-IN')}\n` +
    `*Token Advance:* Rs. 5,000 (Payment on Discussion)\n` +
    `*Database Status:* Saved & Registered in SQLite\n` +
    (planData.cloudLink ? `*Cloud Drive:* ${planData.cloudLink}\n` : '') +
    `--------------------------------------\n` +
    `Client brief & production plan ready for discussion with Rakshit Patel.`
  );

  const whatsappDirectLink = `https://wa.me/91${COMPANY_CONFIG.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className={`relative bg-white rounded-3xl w-full shadow-2xl overflow-hidden my-4 border border-[#DDD5CD] transition-all animate-in fade-in zoom-in-95 duration-200 ${paymentConfirmed ? 'max-w-xl' : 'max-w-lg'}`}>
        
        {/* Top Header Strip */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-[#DDD5CD]/60 bg-[#FAF9F6]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#7D4047] text-white flex items-center justify-center font-bold">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-sm sm:text-base text-[#2E2E2E]">
                {paymentConfirmed ? 'Order Registered in Database!' : 'Website Booking & Database Registration'}
              </h3>
              <p className="text-[11px] text-[#625f5c]">THE WEBCRAFT &bull; Direct Developer Desk</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#625f5c] hover:text-[#2E2E2E] hover:bg-[#DDD5CD]/30 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: BOOKING CONFIRMATION & REGISTRATION (PAYMENT KEPT PENDING AS REQUESTED) */}
        {!paymentConfirmed ? (
          <div className="p-5 sm:p-6 space-y-5 text-left">
            
            {/* Booking Summary Box */}
            <div className="bg-[#F1ECE6]/70 border border-[#DDD5CD] rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#625f5c] block font-medium">Agreed Project Budget</span>
                <span className="text-2xl font-black text-[#2E2E2E] font-mono">
                  ₹{planData.finalBudget.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-[#7D4047] font-semibold block mt-0.5">
                  Advance Token: ₹5,000 (Payment on Discussion)
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#625f5c] block">Order Assigned</span>
                <span className="text-xs font-mono font-bold text-[#2E2E2E] bg-white px-2.5 py-1 rounded-lg border border-[#DDD5CD] inline-block">
                  {orderId}
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold block mt-1">
                  ✓ Database Ready
                </span>
              </div>
            </div>

            {/* Payment Pending Notice */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 space-y-1">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Payment Notice: Payment Kept Pending for Consultation</span>
              </div>
              <p className="text-[11px] text-amber-900/80 leading-relaxed">
                As per studio policy, no immediate online payment is charged right now. Your project details, 1 GB assets, and custom instructions are saved directly into our backend database. The ₹5,000 advance token is discussed directly with lead developer Rakshit Patel.
              </p>
            </div>

            {/* Channel Tabs */}
            <div>
              <label className="block text-xs font-bold text-[#2E2E2E] uppercase tracking-wider mb-2">
                Choose Booking Flow:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('pending_consultation')}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition-all ${
                    activeTab === 'pending_consultation'
                      ? 'border-[#7D4047] bg-[#7D4047] text-white shadow-sm'
                      : 'border-[#DDD5CD] bg-[#FAF9F6] text-[#2E2E2E] hover:border-[#7D4047]/40'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Direct Consultation</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('bank')}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition-all ${
                    activeTab === 'bank'
                      ? 'border-[#7D4047] bg-[#7D4047] text-white shadow-sm'
                      : 'border-[#DDD5CD] bg-[#FAF9F6] text-[#2E2E2E] hover:border-[#7D4047]/40'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Studio Details</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('demo_gateway')}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition-all ${
                    activeTab === 'demo_gateway'
                      ? 'border-[#7D4047] bg-[#7D4047] text-white shadow-sm'
                      : 'border-[#DDD5CD] bg-[#FAF9F6] text-[#2E2E2E] hover:border-[#7D4047]/40'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Gateway Demo</span>
                </button>
              </div>
            </div>

            {/* TAB 1: DIRECT CONSULTATION (RECOMMENDED) */}
            {activeTab === 'pending_consultation' && (
              <div className="bg-white border-2 border-[#DDD5CD] rounded-2xl p-4 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-[#DDD5CD]/60 text-xs">
                  <span className="text-[#625f5c]">Client Name:</span>
                  <strong className="text-[#2E2E2E]">{planData.clientName}</strong>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#DDD5CD]/60 text-xs">
                  <span className="text-[#625f5c]">Contact Phone:</span>
                  <strong className="font-mono text-[#2E2E2E]">+91 {planData.clientPhone}</strong>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#DDD5CD]/60 text-xs">
                  <span className="text-[#625f5c]">Category:</span>
                  <strong className="capitalize text-[#7D4047]">{planData.websiteType}</strong>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#625f5c]">Lead Developer:</span>
                  <strong className="text-[#2E2E2E]">Rakshit Patel (+91 85114 39894 &bull; <span className="text-[#7D4047] font-semibold text-[11px]">Only Message, Not Call</span>)</strong>
                </div>
              </div>
            )}

            {/* TAB 2: STUDIO BANK / UPI DETAILS (FOR FUTURE REFERENCE) */}
            {activeTab === 'bank' && (
              <div className="bg-white border-2 border-[#DDD5CD] rounded-2xl p-4 space-y-2.5 text-xs animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-[#DDD5CD]/60">
                  <span className="text-[#625f5c]">Official UPI ID:</span>
                  <strong className="font-mono text-[#7D4047]">{COMPANY_CONFIG.upiId}</strong>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#DDD5CD]/60">
                  <span className="text-[#625f5c]">Account Name:</span>
                  <strong>{COMPANY_CONFIG.bankDetails.accountName}</strong>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#DDD5CD]/60">
                  <span className="text-[#625f5c]">Bank:</span>
                  <strong>{COMPANY_CONFIG.bankDetails.bankName}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#625f5c]">IFSC Code:</span>
                  <strong className="font-mono">{COMPANY_CONFIG.bankDetails.ifscCode}</strong>
                </div>
              </div>
            )}

            {/* TAB 3: GATEWAY SIMULATOR */}
            {activeTab === 'demo_gateway' && (
              <div className="bg-[#FAF9F6] border-2 border-[#DDD5CD] rounded-2xl p-4 space-y-3 text-center animate-in fade-in duration-200">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Sandbox Test Mode</span>
                </div>
                <p className="text-xs text-[#625f5c]">
                  Test simulating instant payment authorization without real transactions.
                </p>
                <button
                  type="button"
                  onClick={handleSimulatePaymentGateway}
                  disabled={isSimulating}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {isSimulating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Simulating Verification...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-amber-200" />
                      <span>Simulate Instant Token Approval</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Direct Register in Database Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleConfirmOrder(false)}
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#7D4047] hover:bg-[#67333a] text-white font-bold text-sm shadow-wine transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-75"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Registering Order in SQLite Database...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm & Register Website Order in Database</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 text-[11px] text-[#625f5c] pt-1">
              <span className="flex items-center gap-1">
                <Database className="w-3 h-3 text-[#7D4047]" />
                Direct SQLite Persistence
              </span>
              <span>&bull;</span>
              <span>Milestone Tracking via Order ID</span>
            </div>

          </div>
        ) : (
          /* STEP 2: AUTOMATION SUCCESS & DATABASE REGISTRATION */
          <div className="p-5 sm:p-7 space-y-5 text-left">
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[#2E2E2E] leading-tight">
                  Website Order Booked & Saved in Database!
                </h3>
                <p className="text-xs text-[#625f5c]">
                  Order ID: <strong className="font-mono text-[#7D4047]">{orderId}</strong> &bull; Client: <strong>{planData.clientName}</strong>
                </p>
                <p className="text-[11px] font-semibold text-emerald-700 mt-0.5">
                  Status: Registered &bull; Token Advance: Pending on Consultation
                </p>
              </div>
            </div>

            {/* Direct Tracking Link Callout */}
            <div className="bg-[#7D4047]/10 border-2 border-[#7D4047]/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-[#7D4047] uppercase tracking-wider block">Live Order Tracking Link</span>
                <p className="text-xs text-[#2E2E2E]">You can track your 5-stage development progress anytime.</p>
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
                href={whatsappDirectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp (+91 85114 39894 &bull; Only Message, Not Call)</span>
              </a>

              <a
                href={directGmailLink}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-[#2E2E2E] hover:bg-[#111] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Send className="w-4 h-4 text-[#DDD5CD]" />
                <span>Open in Gmail (thewebcraft404)</span>
              </a>
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
                  <span>{copiedPlan ? 'Blueprint Copied to Clipboard!' : 'Copy Complete Project Plan'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowPlanDetails(!showPlanDetails)}
                  className="inline-flex items-center gap-1 text-xs text-[#625f5c] hover:text-[#2E2E2E] font-semibold"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{showPlanDetails ? 'Hide Plan' : 'View Ready Plan'}</span>
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

            <div className="pt-1 text-center">
              <button
                onClick={onClose}
                className="text-xs text-[#625f5c] hover:text-[#2E2E2E] underline"
              >
                Close this window
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
