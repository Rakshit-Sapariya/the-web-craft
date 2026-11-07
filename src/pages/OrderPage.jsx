import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Lock, MessageSquare, Phone, Mail } from 'lucide-react';
import OrderForm from '../components/OrderForm';
import ContactSection from '../components/ContactSection';
import PaymentModal from '../components/PaymentModal';

export default function OrderPage({ selectedCategory, prefilledBudget, onProceedToPayment }) {
  const [searchParams] = useSearchParams();
  const [activeOrderData, setActiveOrderData] = useState(null);

  const queryCategory = searchParams.get('category') || selectedCategory || 'landing';
  const queryBudget = searchParams.get('budget') ? parseInt(searchParams.get('budget'), 10) : (prefilledBudget || null);
  const queryAddons = searchParams.get('addons') ? searchParams.get('addons').split(',').filter(Boolean) : [];

  const handlePaymentInitiate = (payload) => {
    setActiveOrderData(payload);
    if (onProceedToPayment) {
      onProceedToPayment(payload);
    }
  };

  return (
    <div className="space-y-8 sm:space-y-16 pb-12 sm:pb-20 bg-[#FFF7E8]">
      {/* Page Header */}
      <div className="relative overflow-hidden bg-[#F1E8D8] border-b border-[#E2D7C3] py-8 sm:py-12">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF7E8] border border-[#E2D7C3] text-[#355CDE] text-xs font-bold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5 text-[#355CDE]" />
            <span>Direct Client Onboarding</span>
          </div>
          <h1 className="text-xl sm:text-4xl font-extrabold text-[#000000] tracking-tight font-heading px-2 leading-snug">
            Order Your Custom Website &amp; Connect
          </h1>
          <p className="text-xs sm:text-base text-[#3D362E] max-w-2xl mx-auto leading-relaxed">
            Fill in your project specifications, upload your assets (up to 1 GB), and submit your order. <strong className="text-[#355CDE]">Zero online payment required</strong>: our team will review and connect with you directly!
          </p>
        </div>
      </div>

      {/* The Core Order Form */}
      <OrderForm
        preselectedCategory={queryCategory}
        prefilledBudget={queryBudget}
        prefilledAddons={queryAddons}
        onProceedToPayment={handlePaymentInitiate}
        hideHeader={true}
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
