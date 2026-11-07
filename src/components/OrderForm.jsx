import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileUp, AlertCircle, CheckCircle, ShieldAlert, ArrowRight, 
  HelpCircle, Link as LinkIcon, DollarSign, User, Globe, 
  FileText, X, Sparkles, Lock, IndianRupee, Edit3, ShieldCheck,
  Star, HeartHandshake, Sliders, Check
} from 'lucide-react';
import { WEBSITE_TYPES, ADDON_OPTIONS } from '../data/pricingData';
import { useOrderOffer } from '../utils/orderTracker';

export default function OrderForm({ preselectedCategory, prefilledBudget, prefilledAddons, onProceedToPayment }) {
  const offer = useOrderOffer();

  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    websiteType: 'landing',
    selectedAddons: prefilledAddons || [],
    customNotes: '',
    customInstructions: '',
    cloudAssetLink: '',
    finalBudget: 9750,
    clientRating: 5,
    clientFeedback: '',
    reviewAgreement: false,
    acceptedTerms: false,
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileError, setFileError] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const MAX_FILE_SIZE_BYTES = 1024 * 1024 * 1024; // 1 GB (1,073,741,824 bytes)

  // Sync when pre-selected from Demos or Estimator
  useEffect(() => {
    const targetType = preselectedCategory || formData.websiteType || 'landing';
    const matched = WEBSITE_TYPES.find(t => t.id === targetType);
    const base = matched ? matched.basePrice : 19500;
    const currentAddons = prefilledAddons || formData.selectedAddons || [];
    const addonsTotal = currentAddons.reduce((sum, aId) => {
      const a = ADDON_OPTIONS.find(opt => opt.id === aId);
      return sum + (a ? a.price : 0);
    }, 0);
    const discountedBase = offer.isOfferActive ? offer.applyDiscount(base) : base;

    setFormData(prev => ({
      ...prev,
      websiteType: targetType,
      selectedAddons: currentAddons,
      finalBudget: prefilledBudget || (discountedBase + addonsTotal),
    }));
  }, [preselectedCategory, prefilledBudget, prefilledAddons, offer.isOfferActive, offer.discountPercent]);

  // When website type changes, update price with active tier discount + active addons (no discount on addons)
  const handleTypeChange = (typeId) => {
    const selected = WEBSITE_TYPES.find(t => t.id === typeId);
    const base = selected ? selected.basePrice : 19500;
    const addonsTotal = (formData.selectedAddons || []).reduce((sum, aId) => {
      const a = ADDON_OPTIONS.find(opt => opt.id === aId);
      return sum + (a ? a.price : 0);
    }, 0);
    const discountedBase = offer.isOfferActive ? offer.applyDiscount(base) : base;

    setFormData(prev => ({
      ...prev,
      websiteType: typeId,
      finalBudget: discountedBase + addonsTotal,
    }));
  };

  // Toggle optional addon feature (added at regular flat price without discount)
  const handleToggleAddon = (addonId) => {
    setFormData(prev => {
      const exists = (prev.selectedAddons || []).includes(addonId);
      const newAddons = exists
        ? prev.selectedAddons.filter(id => id !== addonId)
        : [...(prev.selectedAddons || []), addonId];

      const selected = WEBSITE_TYPES.find(t => t.id === prev.websiteType);
      const base = selected ? selected.basePrice : 19500;
      const addonsTotal = newAddons.reduce((sum, aId) => {
        const a = ADDON_OPTIONS.find(opt => opt.id === aId);
        return sum + (a ? a.price : 0);
      }, 0);
      const discountedBase = offer.isOfferActive ? offer.applyDiscount(base) : base;

      return {
        ...prev,
        selectedAddons: newAddons,
        finalBudget: discountedBase + addonsTotal,
      };
    });
  };

  // Handle file selection with 1 GB check
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFileError('');

    let totalSize = uploadedFiles.reduce((acc, f) => acc + f.size, 0);
    const validFiles = [];

    for (const file of files) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setFileError(`File "${file.name}" exceeds the 1 GB maximum limit (${(file.size / (1024 * 1024 * 1024)).toFixed(2)} GB). Please compress or use a Google Drive cloud link.`);
        return;
      }
      if (totalSize + file.size > MAX_FILE_SIZE_BYTES) {
        setFileError('Total cumulative uploaded files exceed the 1 GB limit. Please provide files under 1 GB or share a cloud drive link.');
        return;
      }
      totalSize += file.size;
      validFiles.push({
        name: file.name,
        size: file.size,
        type: file.type || 'Custom Format',
        sizeFormatted: formatBytes(file.size),
      });
    }

    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    setFileError('');
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validate = () => {
    const errors = {};
    if (!formData.clientName.trim()) {
      errors.clientName = 'Please enter your full name.';
    }
    if (!formData.clientPhone.trim() || formData.clientPhone.trim().length < 10) {
      errors.clientPhone = 'Please enter a valid 10-digit phone number.';
    }
    if (!formData.websiteType) {
      errors.websiteType = 'Please select a website type.';
    }
    if (!formData.finalBudget || formData.finalBudget < 5000) {
      errors.finalBudget = 'Minimum price should be at least ₹5,000.';
    }
    // Mandatory Feedback & Review Validation
    if (!formData.clientRating) {
      errors.clientRating = 'Mandatory: Please select your expectation rating (1 to 5 stars).';
    }
    if (!formData.clientFeedback.trim() || formData.clientFeedback.trim().length < 10) {
      errors.clientFeedback = 'Mandatory Feedback: Please write your project expectations or feedback (minimum 10 characters).';
    }
    if (!formData.reviewAgreement) {
      errors.reviewAgreement = 'Mandatory Review Policy: You must agree to provide verified feedback upon demo inspection.';
    }
    if (!formData.acceptedTerms) {
      errors.acceptedTerms = 'Please check the box to confirm your project specifications.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onProceedToPayment({
        ...formData,
        files: uploadedFiles,
        tokenAdvance: 0,
        remainingBalance: formData.finalBudget,
        clientRating: formData.clientRating,
        clientFeedback: formData.clientFeedback,
        reviewAgreement: formData.reviewAgreement,
        appliedTier: offer.tier,
        discountPercent: offer.discountPercent,
      });
    }
  };

  const currentType = WEBSITE_TYPES.find(t => t.id === formData.websiteType);

  return (
    <section id="order-form" className="py-8 sm:py-20 bg-[#F1ECE6] border-t border-[#DDD5CD]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-12 space-y-2 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DDD5CD]/60 border border-[#DDD5CD] text-[#7D4047] text-xs font-bold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" />
            <span>Secure Order & Booking</span>
          </div>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-[#2E2E2E] tracking-tight px-2 leading-snug">
            Order Your Custom Website
          </h2>
          <p className="text-xs sm:text-base text-[#625f5c]">
            Submit your requirements below. Zero online payment required—our engineering team will review your specifications and connect directly via message or email!
          </p>
        </div>

        {/* The Main Form Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#DDD5CD] shadow-elevated overflow-hidden">
          
          {/* Header Strip */}
          <div className="bg-[#2E2E2E] text-[#F1ECE6] p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#7D4047] flex items-center justify-center text-white font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-white text-base">Client Onboarding Portal</h4>
                <p className="text-xs text-[#DDD5CD]">THE WEBCRAFT &bull; Direct Developer Desk</p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 bg-[#7D4047] px-3.5 py-1.5 rounded-full text-xs font-bold text-white shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Direct Studio Onboarding &bull; Zero Online Upfront</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-10 space-y-6 sm:space-y-8">
            
            {/* Step 1: Client Personal Details */}
            <div>
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#7D4047] flex items-center gap-2 mb-3 sm:mb-4">
                <User className="w-4 h-4" />
                <span>1. Client Contact Details</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2E2E2E] mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Patel"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className={`w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border text-xs sm:text-sm text-[#2E2E2E] bg-[#F1ECE6]/30 focus:outline-none focus:ring-2 focus:ring-[#7D4047] transition-all ${
                      formErrors.clientName ? 'border-red-500 ring-1 ring-red-500' : 'border-[#DDD5CD]'
                    }`}
                  />
                  {formErrors.clientName && (
                    <p className="text-xs text-red-500 mt-1">{formErrors.clientName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2E2E2E] mb-1.5">
                    Phone / Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={formData.clientPhone}
                    onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                    className={`w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border text-xs sm:text-sm text-[#2E2E2E] bg-[#F1ECE6]/30 focus:outline-none focus:ring-2 focus:ring-[#7D4047] transition-all ${
                      formErrors.clientPhone ? 'border-red-500 ring-1 ring-red-500' : 'border-[#DDD5CD]'
                    }`}
                  />
                  {formErrors.clientPhone && (
                    <p className="text-xs text-red-500 mt-1">{formErrors.clientPhone}</p>
                  )}
                </div>
              </div>

              <div className="mt-3 sm:mt-4">
                <label className="block text-xs font-bold text-[#2E2E2E] mb-1.5">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="e.g. rahul@business.com"
                  value={formData.clientEmail}
                  onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-[#DDD5CD] text-xs sm:text-sm text-[#2E2E2E] bg-[#F1ECE6]/30 focus:outline-none focus:ring-2 focus:ring-[#7D4047]"
                />
              </div>
            </div>

            {/* Step 2: Website Type Selection */}
            <div className="pt-4 border-t border-[#DDD5CD]">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#7D4047] flex items-center gap-2 mb-3 sm:mb-4">
                <Globe className="w-4 h-4" />
                <span>2. Select Type of Website</span>
              </h3>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                {WEBSITE_TYPES.map((type) => {
                  const isChecked = formData.websiteType === type.id;
                  return (
                    <label
                      key={type.id}
                      onClick={() => handleTypeChange(type.id)}
                      className={`p-2.5 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 flex flex-col justify-between hover-glow-card relative group ${
                        isChecked
                          ? 'border-[#7D4047] bg-[#7D4047]/5 shadow-elevated scale-[1.02] ring-2 ring-[#7D4047]/20'
                          : 'border-[#DDD5CD] bg-[#F1ECE6]/30 hover:bg-white hover:border-[#7D4047]/40'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs sm:text-sm text-[#2E2E2E] line-clamp-1">{type.name}</span>
                          <input
                            type="radio"
                            name="websiteType"
                            checked={isChecked}
                            onChange={() => handleTypeChange(type.id)}
                            className="accent-[#7D4047] shrink-0 ml-1"
                          />
                        </div>
                        <p className="text-[10px] sm:text-xs text-[#625f5c] mt-1 line-clamp-2">{type.idealFor}</p>
                      </div>
                      <div className="mt-2 pt-1.5 sm:mt-3 sm:pt-2 border-t border-[#DDD5CD]/60 text-[11px] sm:text-xs font-bold text-[#7D4047]">
                        Base: ₹{type.basePrice.toLocaleString('en-IN')}
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* Choose Optional Features & Integrations (Second Division) */}
              <div className="mt-6 pt-5 border-t border-[#DDD5CD]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#7D4047] flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#7D4047]" />
                    <span>Choose Optional Features &amp; Integrations</span>
                  </h4>
                  <span className="text-[10px] sm:text-xs text-[#625f5c]">
                    Select any optional features to include in your build
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                  {ADDON_OPTIONS.map((addon) => {
                    const isChecked = (formData.selectedAddons || []).includes(addon.id);
                    return (
                      <label
                        key={addon.id}
                        className={`flex items-start gap-2.5 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 hover-glow-card ${
                          isChecked
                            ? 'border-[#7D4047] bg-[#7D4047]/5 shadow-sm ring-1 ring-[#7D4047]/30'
                            : 'border-[#DDD5CD] bg-[#F1ECE6]/30 hover:border-[#7D4047]/40 hover:bg-white'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleAddon(addon.id)}
                          className="mt-0.5 rounded text-[#7D4047] focus:ring-[#7D4047] accent-[#7D4047] cursor-pointer"
                        />
                        <div className="text-xs flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-bold text-[#2E2E2E] leading-snug">{addon.name}</span>
                          </div>
                          <div className="mt-1 flex items-baseline gap-1.5 flex-wrap">
                            <span className="font-bold text-[#7D4047] font-mono">
                              +₹{addon.price.toLocaleString('en-IN')}
                            </span>
                            {addon.popular && (
                              <span className="text-[9px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-1.5 py-0.2 rounded-full ml-auto">
                                Popular
                              </span>
                            )}
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 3: Custom Assets Upload (1 GB Limit) */}
            <div className="pt-4 border-t border-[#DDD5CD]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#7D4047] flex items-center gap-2">
                  <FileUp className="w-4 h-4" />
                  <span>3. Custom Assets & Reference Materials</span>
                </h3>
                <span className="text-xs font-bold text-[#2E2E2E] bg-[#DDD5CD]/60 px-2.5 py-0.5 rounded-full">
                  Max Limit: 1 GB (Any format)
                </span>
              </div>

              <p className="text-xs text-[#625f5c] mb-3">
                Upload your brand logo, content drafts, images, UI wireframes, PDFs, or design ZIP files. We accept any format up to <strong>1 GB</strong>.
              </p>

              {/* Upload Drop Zone */}
              <div className="border-2 border-dashed border-[#DDD5CD] hover:border-[#7D4047] rounded-2xl p-6 text-center bg-[#F1ECE6]/30 transition-all">
                <FileUp className="w-10 h-10 text-[#7D4047] mx-auto mb-2 opacity-80" />
                <label className="cursor-pointer">
                  <span className="px-4 py-2 rounded-xl bg-[#2E2E2E] text-white text-xs font-bold hover:bg-[#7D4047] transition-all inline-block shadow-sm">
                    Select Files from Device
                  </span>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <p className="text-[11px] text-[#625f5c] mt-2">
                  Supports ZIP, RAR, PDF, DOCX, PNG, JPG, SVG, Figma exports (Max 1 GB)
                </p>
              </div>

              {/* File Error Notice */}
              {fileError && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{fileError}</span>
                </div>
              )}

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-bold text-[#2E2E2E]">Selected Files ({uploadedFiles.length}):</p>
                  <div className="divide-y divide-[#DDD5CD] border border-[#DDD5CD] rounded-xl overflow-hidden bg-white">
                    {uploadedFiles.map((file, idx) => (
                      <div key={idx} className="p-3 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <FileText className="w-4 h-4 text-[#7D4047] shrink-0" />
                          <span className="font-semibold text-[#2E2E2E] truncate max-w-xs">{file.name}</span>
                          <span className="text-[#625f5c] font-mono text-[11px]">({file.sizeFormatted})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="p-1 hover:bg-[#DDD5CD]/40 rounded text-red-600"
                          title="Remove file"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cloud Link Alternative */}
              <div className="mt-4">
                <label className="block text-xs font-bold text-[#2E2E2E] mb-1.5 flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5 text-[#7D4047]" />
                  <span>Or Share Cloud Folder Link (Google Drive / WeTransfer / Dropbox)</span>
                </label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/drive/folders/..."
                  value={formData.cloudAssetLink}
                  onChange={(e) => setFormData({ ...formData, cloudAssetLink: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DDD5CD] text-xs text-[#2E2E2E] bg-[#F1ECE6]/30 focus:outline-none focus:ring-2 focus:ring-[#7D4047]"
                />
              </div>
            </div>

            {/* Step 4: Custom Website Instructions Slot (Max 7,000 Characters Limit) */}
            <div className="pt-4 border-t border-[#DDD5CD]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#7D4047] flex items-center gap-2">
                    <Edit3 className="w-4 h-4" />
                    <span>4. Custom Website Instructions & Specific Wishlist</span>
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-mono">
                    <span className={`font-bold ${formData.customInstructions.length >= 6800 ? 'text-red-600' : 'text-[#7D4047]'}`}>
                      {formData.customInstructions.length.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[#625f5c]">/ 7,000 Characters</span>
                  </div>
                </div>

                <p className="text-xs text-[#625f5c] mb-3 leading-relaxed">
                  Specify everything you want in your website (e.g. required custom pages, color palette, typography preferences, online booking flows, direct inquiry forms, special interactive features, or links to reference sites you admire). <strong>(Strict 7,000 character limit)</strong>
                </p>

                <div className="relative">
                  <textarea
                    rows="4"
                    maxLength={7000}
                    placeholder="Write all your custom requirements here in detail (e.g. I need a responsive booking calendar, product catalog with direct inquiry form, luxury minimalist theme, client review slider, and FAQ section)..."
                    value={formData.customInstructions}
                    onChange={(e) => setFormData({ ...formData, customInstructions: e.target.value })}
                    className="w-full p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-[#DDD5CD] text-xs sm:text-sm text-[#2E2E2E] bg-[#F1ECE6]/30 focus:outline-none focus:ring-2 focus:ring-[#7D4047] transition-all leading-relaxed"
                  ></textarea>

                  {/* Live Character counter & advice */}
                  <div className="mt-1.5 flex items-center justify-between text-[11px] text-[#625f5c]">
                    <span>
                      {formData.customInstructions.length >= 7000 ? (
                        <span className="text-red-600 font-bold">Maximum limit of 7,000 characters reached!</span>
                      ) : (
                        <span>{(7000 - formData.customInstructions.length).toLocaleString('en-IN')} characters remaining</span>
                      )}
                    </span>
                    <span className="text-[10px] text-[#7D4047] font-semibold">Strict 7,000 Character Cap</span>
                  </div>
                </div>
              </div>

            {/* Step 5: Final Price */}
            <div className="pt-4 border-t border-[#DDD5CD]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#7D4047] flex items-center gap-2 mb-4">
                <IndianRupee className="w-4 h-4" />
                <span>5. Final Price</span>
              </h3>

              {/* Active Tier Discount Banner */}
              {offer.isOfferActive && (
                <div className="mb-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-[#7D4047]/10 to-amber-500/10 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <Sparkles className="w-5 h-5 text-emerald-600 animate-pulse shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-900">
                          {offer.badgeText} Active!
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                          {offer.discountPercent}% OFF
                        </span>
                      </div>
                      <p className="text-xs text-[#625f5c] mt-0.5">
                        Standard package price is slashed from ₹{currentType?.basePrice.toLocaleString('en-IN')} to <strong>₹{offer.applyDiscount(currentType?.basePrice || 19500).toLocaleString('en-IN')}</strong> (Save ₹{((currentType?.basePrice || 19500) - offer.applyDiscount(currentType?.basePrice || 19500)).toLocaleString('en-IN')})!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-[#F1ECE6]/50 border border-[#DDD5CD] p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#2E2E2E]">
                    Final Price (INR) <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-[#625f5c]">
                    {offer.isOfferActive ? (
                      <span>
                        Starting discounted baseline is <strong>₹{offer.applyDiscount(19500).toLocaleString('en-IN')}</strong> (slashed from ₹19,500). Pay on WhatsApp after you see your completed website, before it goes live on the browser.
                      </span>
                    ) : (
                      <span>Starting baseline is ₹19,500. Pay on WhatsApp after you see your completed website, before it goes live on the browser.</span>
                    )}
                  </p>
                </div>
                <div className="relative w-full sm:w-56">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-base text-[#7D4047]">₹</span>
                  <input
                    type="number"
                    min="5000"
                    step="500"
                    value={formData.finalBudget}
                    onChange={(e) => setFormData({ ...formData, finalBudget: parseInt(e.target.value) || 0 })}
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-[#DDD5CD] font-mono font-bold text-base text-[#2E2E2E] focus:outline-none focus:ring-2 focus:ring-[#7D4047]"
                  />
                </div>
              </div>
              {formErrors.finalBudget && (
                <p className="text-xs text-red-500 mt-1">{formErrors.finalBudget}</p>
              )}
            </div>

            {/* Step 6: Mandatory Feedback & Review Commitment */}
            <div className="pt-4 border-t border-[#DDD5CD]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#7D4047] flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-[#7D4047]" />
                  <span>6. Mandatory Client Feedback &amp; Review Commitment</span>
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200 shrink-0">
                  Mandatory for All Clients *
                </span>
              </div>

              <p className="text-xs text-[#625f5c] mb-4 leading-relaxed">
                In accordance with The Webcraft's 100% transparency policy, verified client review &amp; feedback is strictly mandatory for all orders upon live staging demo walkthrough to guarantee top craftsmanship.
              </p>

              <div className="bg-[#F1ECE6]/60 border border-[#DDD5CD] rounded-2xl p-4 sm:p-5 space-y-4">
                {/* Expectation Rating */}
                <div>
                  <label className="block text-xs font-bold text-[#2E2E2E] mb-1.5">
                    Initial Expectation &amp; Trust Rating <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData(prev => ({ ...prev, clientRating: star }))}
                        className="p-1 hover:scale-110 transition-transform focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 sm:w-7 sm:h-7 ${
                            star <= formData.clientRating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-neutral-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-[#7D4047] ml-2">
                      {formData.clientRating} / 5 Stars
                    </span>
                  </div>
                  {formErrors.clientRating && (
                    <p className="text-xs text-red-600 font-bold mt-1">{formErrors.clientRating}</p>
                  )}
                </div>

                {/* Client Feedback / Expectations description */}
                <div>
                  <label className="block text-xs font-bold text-[#2E2E2E] mb-1">
                    Your Expectations &amp; Project Feedback <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows="3"
                    required
                    minLength={10}
                    placeholder="Tell us your expectations regarding speed, design quality, zero-advance trust, or key business goals (minimum 10 characters)..."
                    value={formData.clientFeedback}
                    onChange={(e) => setFormData(prev => ({ ...prev, clientFeedback: e.target.value }))}
                    className="w-full p-3.5 rounded-xl border border-[#DDD5CD] text-xs text-[#2E2E2E] bg-white focus:outline-none focus:ring-2 focus:ring-[#7D4047]"
                  />
                  {formErrors.clientFeedback && (
                    <p className="text-xs text-red-600 font-bold mt-1">{formErrors.clientFeedback}</p>
                  )}
                </div>

                {/* Mandatory Review Agreement Checkbox */}
                <div className="pt-2 border-t border-[#DDD5CD]/70">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.reviewAgreement}
                      onChange={(e) => setFormData(prev => ({ ...prev, reviewAgreement: e.target.checked }))}
                      className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#7D4047] focus:ring-[#7D4047] accent-[#7D4047]"
                    />
                    <span className="text-xs font-bold text-[#2E2E2E]">
                      I commit to providing an honest, verified public review and rating upon inspecting my live working demo. <span className="text-red-500">*</span>
                    </span>
                  </label>
                  {formErrors.reviewAgreement && (
                    <p className="text-xs text-red-600 font-bold mt-1 ml-7">{formErrors.reviewAgreement}</p>
                  )}
                </div>

              </div>
            </div>

            {/* Step 7: Direct Booking & Zero Online Payment Notice */}
            <div className="pt-4 border-t border-[#DDD5CD]">
              <div className="bg-emerald-50/70 border-2 border-emerald-500/30 rounded-2xl p-5 sm:p-6 space-y-4">
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-[#2E2E2E]">
                      Direct Booking &bull; Zero Online Payment Required
                    </h4>
                    <p className="text-xs text-[#625f5c] mt-1 leading-relaxed">
                      You do not need to pay anything on this website. When you submit your requirements, your custom brief and uploaded assets are saved directly into our studio database, and Lead Developer <strong>Rakshit Patel</strong> will personally reach out via message or email to finalize milestones. <strong>Payment is done on WhatsApp only after you see your website completed, and before it goes live on the browser.</strong>
                    </p>
                  </div>
                </div>

                {/* Terms Agreement Checkbox */}
                <label className="flex items-start gap-3 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={formData.acceptedTerms}
                    onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#7D4047] focus:ring-[#7D4047] accent-[#7D4047]"
                  />
                  <span className="text-xs font-bold text-[#2E2E2E]">
                    I confirm that the submitted project specifications are accurate, and I agree to the{' '}
                    <Link to="/privacy-policy" target="_blank" className="text-[#7D4047] underline hover:text-[#67333a]">
                      Privacy Policy &amp; Security Charter
                    </Link>{' '}
                    and direct milestone consultation. <span className="text-red-500">*</span>
                  </span>
                </label>
                {formErrors.acceptedTerms && (
                  <p className="text-xs text-red-600 font-bold">{formErrors.acceptedTerms}</p>
                )}

              </div>
            </div>

            {/* Submission CTA */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-[#7D4047] hover:bg-[#67333a] text-white font-bold text-base shadow-wine hover:shadow-2xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 active:scale-[0.99] group"
              >
                <span>Submit Website Request (Zero Online Payment)</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#625f5c] mt-3">
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  Direct SQLite Database Registration
                </span>
                <span>&bull;</span>
                <span>No Upfront Credit Card or UPI Required</span>
                <span>&bull;</span>
                <a
                  href="https://wa.me/919428298134?text=Hello%20The%20Webcraft%2C%20I%20am%20submitting%20a%20project%20inquiry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-700 font-medium inline-flex items-center gap-1"
                  title="Chat on WhatsApp"
                >
                  <span>WhatsApp: <strong className="font-mono text-emerald-800">+91 94282 98134</strong> <span className="font-semibold text-emerald-700">(WhatsApp Only &bull; No Calls)</span></span>
                </a>
              </div>
            </div>

          </form>

        </div>

      </div>
    </section>
  );
}
