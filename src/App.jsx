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

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('landing');
  const [prefilledBudget, setPrefilledBudget] = useState(13000);

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
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[#F1ECE6] text-[#2E2E2E] flex flex-col selection:bg-[#7D4047] selection:text-white overflow-x-hidden w-full max-w-[100vw]">
        {/* Navigation */}
        <Navbar />

        {/* Dedicated Routed Pages */}
        <main className="flex-1">
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
          </Routes>
        </main>

        {/* Persistent Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
