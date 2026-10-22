import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DemosPage from './pages/DemosPage';
import PricingPage from './pages/PricingPage';
import OrderPage from './pages/OrderPage';
import TrackingPage from './pages/TrackingPage';
import AdminPage from './pages/AdminPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ClientPreviewPage from './pages/ClientPreviewPage';
import DiscountPopupModal from './components/DiscountPopupModal';
import ErrorBoundary from './components/ErrorBoundary';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function MainLayout() {
  const { pathname } = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('landing');
  const [prefilledBudget, setPrefilledBudget] = useState(null);

  const isPreview = pathname.startsWith('/preview');

  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
  };

  const handleApplyEstimate = (estimate) => {
    setSelectedCategory(estimate.typeId);
    setPrefilledBudget(estimate.estimatedBudget);
  };

  const handleSelectTier = (typeId, budget) => {
    setSelectedCategory(typeId);
    setPrefilledBudget(budget);
  };

  return (
    <div className={`min-h-screen ${isPreview ? 'bg-gray-900' : 'bg-[#F1ECE6] text-[#2E2E2E] flex flex-col selection:bg-[#7D4047] selection:text-white'} overflow-x-hidden w-full max-w-[100vw]`}>
      {!isPreview && <Navbar />}

      {/* Early-Bird Discount Popup Announcement */}
      {!isPreview && <DiscountPopupModal />}

      <main className="flex-1">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/demos" 
              element={<DemosPage onSelectCategoryForOrder={handleSelectCategory} />} 
            />
            <Route 
              path="/pricing" 
              element={
                <PricingPage 
                  onApplyEstimate={handleApplyEstimate}
                  onSelectTier={handleSelectTier}
                />
              } 
            />
            <Route 
              path="/order" 
              element={
                <OrderPage 
                  selectedCategory={selectedCategory}
                  prefilledBudget={prefilledBudget}
                />
              } 
            />
            <Route path="/track" element={<TrackingPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/preview/:token" element={<ClientPreviewPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          </Routes>
        </ErrorBoundary>
      </main>

      {!isPreview && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <MainLayout />
    </BrowserRouter>
  );
}
