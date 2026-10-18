import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Lock, Sparkles, MessageSquare, Phone, Mail } from 'lucide-react';
import OrderForm from '../components/OrderForm';
import ContactSection from '../components/ContactSection';
import PaymentModal from '../components/PaymentModal';

export default function OrderPage({ selectedCategory, prefilledBudget, onProceedToPayment }) {
  const [searchParams] = useSearchParams();
  const [activeOrderData, setActiveOrderData] = useState(null);

  const queryCategory = searchParams.get('category') || selectedCategory || 'landing';
  const queryBudget = parseInt(searchParams.get('budget')) || prefilledBudget || 13000;

  const handlePaymentInitiate = (payload) => {
    setActiveOrderData(payload);
    if (onProceedToPayment) {
      onProceedToPayment(payload);
    }
  };

  return (
    <div className="space-y-8 sm:space-y-16 pb-12 sm:pb-20">
      {/* Page Header */}
      <div className="relative overflow-hidden bg-[#DDD5CD]/30 border-b border-[#DDD5CD] py-8 sm:py-14">
        {/* Subtle Ambient Glowing Orbs */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#7D4047]/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute -bottom-10 left-1/3 w-64 h-64 bg-[#7D4047]/5 rounded-full blur-2xl pointer-events-none animate-pulse-glow" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#DDD5CD] text-[#7D4047] text-xs font-bold uppercase tracking-wider shadow-sm shimmer-badge">
            <Lock className="w-3.5 h-3.5" />
            <span>Direct Client Onboarding</span>
          </div>
          <h1 className="text-xl sm:text-4xl font-extrabold text-[#2E2E2E] tracking-tight font-heading px-2 leading-snug">
            Order Your Custom Website &amp; Connect
          </h1>
          <p className="text-xs sm:text-base text-[#625f5c] max-w-2xl mx-auto leading-relaxed">
            Fill in your project specifications, upload your assets (up to 1 GB), and submit your order. <strong className="text-[#7D4047]">Zero online payment required</strong>—our team will review and connect with you directly!
          </p>
        </div>
      </div>

      {/* The Core Order Form */}
      <OrderForm
        preselectedCategory={queryCategory}
        prefilledBudget={queryBudget}
        onProceedToPayment={handlePaymentInitiate}
      />

      {/* Direct Contact Section (Studio Line & Email) */}
      <ContactSection />

      {/* Payment Checkout & Confirmation Modal */}
      {activeOrderData && (
        <PaymentModal
          orderDetails={activeOrderData}
          onClose={() => setActiveOrderData(null)}
        />
      )}
    </div>
  );
}
