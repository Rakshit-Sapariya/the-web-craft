import React, { useState, useEffect } from 'react';
import { 
  FileUp, AlertCircle, CheckCircle, ShieldAlert, ArrowRight, 
  HelpCircle, Link as LinkIcon, DollarSign, Phone, User, Globe, 
  FileText, X, Sparkles, Lock, IndianRupee, Edit3
} from 'lucide-react';
import { WEBSITE_TYPES, COMPANY_CONFIG } from '../data/pricingData';
import { useOrderOffer } from '../utils/orderTracker';

export default function OrderForm({ preselectedCategory, prefilledBudget, onProceedToPayment }) {
  const { isOfferActive, orderCount } = useOrderOffer();
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    websiteType: 'landing',
    customNotes: '',
    customInstructions: '',
    cloudAssetLink: '',
    finalBudget: 13000,
    acceptedTerms: false,
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileError, setFileError] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const MAX_FILE_SIZE_BYTES = 1024 * 1024 * 1024; // 1 GB (1,073,741,824 bytes)

  // Sync when pre-selected from Demos or Estimator
  useEffect(() => {
    if (preselectedCategory) {
      const matched = WEBSITE_TYPES.find(t => t.id === preselectedCategory);
      setFormData(prev => ({
        ...prev,
        websiteType: preselectedCategory,
        finalBudget: matched ? (isOfferActive ? Math.round(matched.basePrice * 0.85) : matched.basePrice) : prev.finalBudget,
      }));
    }
  }, [preselectedCategory, isOfferActive]);

  useEffect(() => {
    if (prefilledBudget) {
      setFormData(prev => ({ ...prev, finalBudget: prefilledBudget }));
    }
  }, [prefilledBudget]);

  // When website type changes, update default budget if not explicitly set
  const handleTypeChange = (typeId) => {
    const selected = WEBSITE_TYPES.find(t => t.id === typeId);
    setFormData(prev => ({
      ...prev,
      websiteType: typeId,
      finalBudget: selected ? (isOfferActive ? Math.round(selected.basePrice * 0.85) : selected.basePrice) : prev.finalBudget,
    }));
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
      errors.clientPhone = 'Please enter a valid 10-digit phone / WhatsApp number.';
    }
    if (!formData.websiteType) {
      errors.websiteType = 'Please select a website type.';
    }
    if (!formData.finalBudget || formData.finalBudget < 10000) {
      errors.finalBudget = 'Minimum budget should be at least ₹10,000.';
    }
    if (!formData.acceptedTerms) {
      errors.acceptedTerms = 'You must acknowledge that the ₹5,000 booking fee is non-refundable upon cancellation.';
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
        tokenAdvance: COMPANY_CONFIG.tokenAdvance,
        remainingBalance: Math.max(0, formData.finalBudget - COMPANY_CONFIG.tokenAdvance),
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
            Submit your requirements below and lock your project slot with a mandatory <strong>₹5,000 online token advance</strong>. The remaining balance is payable only after your website is built and approved!
          </p>
        </div>

        {/* The Main Form Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#DDD5CD] shadow-elevated overflow-hidden">
          
          {/* Header Strip with 15% discount badge */}
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
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>
                {isOfferActive 
                  ? `15% Discount Active (Slot #${Math.min(10, orderCount + 1)} of 10)` 
                  : 'Direct Studio Onboarding'}
              </span>
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
                    WhatsApp / Phone Number <span className="text-red-500">*</span>
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
                    <span>4. Custom Website Instructions & Specific Wishlist (તમારી મનપસંદ જરૂરિયાતો)</span>
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-mono">
                    <span className={`font-bold ${formData.customInstructions.length >= 6800 ? 'text-red-600' : 'text-[#7D4047]'}`}>
                      {formData.customInstructions.length.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[#625f5c]">/ 7,000 Characters</span>
                  </div>
                </div>

                <p className="text-xs text-[#625f5c] mb-3 leading-relaxed">
                  તમારી વેબસાઇટમાં તમને જે પણ જોઈતું હોય (જેમ કે: ક્યા-ક્યા ખાસ પેજીસ જોઈએ, ક્યા કલર્સ, ફોન્ટ્સ, ઓનલાઇન બુકિંગ, વોટ્સએપ ઓર્ડર બટન, સ્પેશિયલ ફીચર્સ કે તમને ગમતી કોઈ રેફરન્સ વેબસાઇટ્સની લિંક) તે બધું અહીં પોતાની રીતે વિગતવાર લખી શકો છો. <strong>(મહત્તમ 7,000 અક્ષરોની લિમિટ)</strong>
                </p>

                <div className="relative">
                  <textarea
                    rows="4"
                    maxLength={7000}
                    placeholder="અહીં તમારી તમામ જરૂરિયાતો વિગતવાર લખો... / Write all your custom requirements here in detail (e.g. I need a responsive booking calendar, product catalog with WhatsApp checkout, gold & dark wine luxury theme, client review slider, and FAQ section)..."
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

            {/* Step 5: Final Client Budget */}
            <div className="pt-4 border-t border-[#DDD5CD]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#7D4047] flex items-center gap-2 mb-4">
                <IndianRupee className="w-4 h-4" />
                <span>5. Final Client Budget</span>
              </h3>

              <div className="bg-[#F1ECE6]/50 border border-[#DDD5CD] p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#2E2E2E]">
                    Your Anticipated Final Budget (INR) <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-[#625f5c]">
                    {isOfferActive 
                      ? 'Starting baseline is ₹13,000. 15% discount will be applied during final billing.' 
                      : 'Starting baseline is ₹13,000. ₹5,000 advance; balance upon full demo satisfaction.'}
                  </p>
                </div>
                <div className="relative w-full sm:w-56">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-base text-[#7D4047]">₹</span>
                  <input
                    type="number"
                    min="10000"
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

            {/* Step 5: Mandatory ₹5,000 Advance & Strict Cancellation Disclaimer */}
            <div className="pt-4 border-t border-[#DDD5CD]">
              <div className="bg-red-50/60 border-2 border-[#7D4047]/30 rounded-2xl p-5 sm:p-6 space-y-4">
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#7D4047] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-[#2E2E2E]">
                      Mandatory Booking Advance: ₹5,000 Online Payment
                    </h4>
                    <p className="text-xs text-[#625f5c] mt-1 leading-relaxed">
                      To prevent slot abandonment and initiate instant design & development, an online advance payment of <strong>₹5,000</strong> is compulsory. The remaining balance (<strong>₹{(formData.finalBudget - 5000).toLocaleString('en-IN')}</strong>) is payable only after your website is completed and you approve the live demo.
                    </p>
                  </div>
                </div>

                {/* Cancellation Disclaimer Highlight */}
                <div className="bg-white border border-red-200 rounded-xl p-3.5 text-xs text-red-700 leading-relaxed font-medium">
                  <strong>Notice on Order Cancellation:</strong> Once you pay the ₹5,000 advance and confirm the order, our developer team is booked immediately. Therefore, <strong>if you cancel your order after paying ₹5,000, it is STRICTLY NON-REFUNDABLE.</strong>
                </div>

                {/* Mandatory Agreement Checkbox */}
                <label className="flex items-start gap-3 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={formData.acceptedTerms}
                    onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#7D4047] focus:ring-[#7D4047] accent-[#7D4047]"
                  />
                  <span className="text-xs font-bold text-[#2E2E2E]">
                    I acknowledge that a ₹5,000 token advance is allocated for developer scheduling, and my custom website specifications will be registered in the studio database. <span className="text-red-500">*</span>
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
                <span>Confirm Website Order Booking (Advance ₹5,000)</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#625f5c] mt-3">
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  Direct SQLite Database Registration
                </span>
                <span>&bull;</span>
                <span>Payment on Consultation with Lead Developer</span>
                <span>&bull;</span>
                <span>Direct Line: +91 85114 39894 <span className="font-semibold text-amber-700">(Only Message, Not Call)</span></span>
              </div>
            </div>

          </form>

        </div>

      </div>
    </section>
  );
}
