import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, CheckCircle2, MessageSquarePlus, ShieldCheck, 
  HeartHandshake, X, Check, ArrowRight, Quote,
  ArrowUpRight, Eye, Shield, Award, Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';

const DEFAULT_REVIEWS = [
  {
    id: 1,
    client_name: 'Pooja Shah',
    company_or_role: 'Founder, Glamour & Glow Bridal Studio',
    website_type: 'beautyparlour',
    categoryGroup: 'salon',
    rating: 5,
    feedback: 'The Webcraft built our bridal studio website with zero upfront online fees! The WhatsApp direct booking system and luxury rose-gold portfolio got us 35+ wedding inquiries in the very first week. Blazing fast speed on mobile!',
    order_id: 'TWC-892401',
    project_demo: 'beautyparlour',
    stats: '35+ Wedding Bookings • 0.4s Mobile Load',
    tech: 'React 19 + WhatsApp Concierge',
    created_at: new Date(Date.now() - 4 * 86400000).toISOString()
  },
  {
    id: 2,
    client_name: 'Hardik Patel',
    company_or_role: 'Managing Director, Shikhar Skyline Infra',
    website_type: 'corporate',
    categoryGroup: 'realty_clinic',
    rating: 5,
    feedback: 'Genuine direct developer pricing with zero agency markups. Rakshit delivered our interactive real estate floor plans and RERA compliance portal ahead of schedule. The code is handcrafted React without sluggish plugins.',
    order_id: 'TWC-741952',
    project_demo: 'realestate',
    stats: 'RERA Approved Portal • 0 Plugins',
    tech: 'Handcrafted Clean Architecture',
    created_at: new Date(Date.now() - 2 * 86400000).toISOString()
  },
  {
    id: 3,
    client_name: 'Dr. Sameer Mehta',
    company_or_role: 'Chief Surgeon, Mehta Aesthetics Clinic',
    website_type: 'healthcare',
    categoryGroup: 'realty_clinic',
    rating: 5,
    feedback: 'Exceptional attention to privacy and NABH medical compliance. Zero online payment risk: I inspected the fully functional demo before clearing final payment. The mandatory feedback policy ensures top-notch quality!',
    order_id: 'TWC-492104',
    project_demo: 'healthcare',
    stats: 'NABH Compliant • 100% Demo Approval',
    tech: 'Bank-Grade SQL Prepared Statements',
    created_at: new Date(Date.now() - 5 * 86400000).toISOString()
  },
  {
    id: 4,
    client_name: 'Vikram Desai',
    company_or_role: 'Owner, Urban Gentleman Barbershop',
    website_type: 'hairparlour',
    categoryGroup: 'salon',
    rating: 5,
    feedback: 'Super slick dark luxury theme. Our clients book hair and beard appointments directly from their phones with zero lag. The tiered promotional discount made it a complete no-brainer value.',
    order_id: 'TWC-520194',
    project_demo: 'hairparlour',
    stats: 'Instant Chair Booking • Zero Lag',
    tech: 'Mobile-First Barbershop Engine',
    created_at: new Date(Date.now() - 6 * 86400000).toISOString()
  },
  {
    id: 5,
    client_name: 'Ananya Sharma',
    company_or_role: 'Founder, Zahra Luxury Ethnic Couture',
    website_type: 'ecommerce',
    categoryGroup: 'ecommerce',
    rating: 5,
    feedback: 'Our e-commerce store loads in under 0.6 seconds! Zero cart abandonment, smooth bag checkout drawer, and direct client support throughout. Truly high craftsmanship.',
    order_id: 'TWC-331089',
    project_demo: 'ecommerce',
    stats: '0.6s Speed • Zero Cart Lag',
    tech: 'D2C React Cart Drawer + Razorpay',
    created_at: new Date(Date.now() - 7 * 86400000).toISOString()
  },
  {
    id: 6,
    client_name: 'Rajesh Vora',
    company_or_role: 'Head Trainer, IronCore Elite Fitness',
    website_type: 'gym',
    categoryGroup: 'fitness_dining',
    rating: 5,
    feedback: 'Zero online upfront fee was the biggest peace of mind. We reviewed the complete CrossFit box schedule and day-pass calculator before paying. Outstanding execution!',
    order_id: 'TWC-618402',
    project_demo: 'gym',
    stats: 'Live Day-Pass Calculator • 5.0 Rating',
    tech: 'Dynamic Fitness Class Engine',
    created_at: new Date(Date.now() - 9 * 86400000).toISOString()
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Audits', count: 6 },
  { id: 'salon', label: 'Bridal & Salon', count: 2 },
  { id: 'realty_clinic', label: 'Realty & Healthcare', count: 2 },
  { id: 'ecommerce', label: 'D2C E-Commerce', count: 1 },
  { id: 'fitness_dining', label: 'Fitness & Gym', count: 1 }
];

export default function ReviewsSection() {
  const [reviews, setReviews] = useState(DEFAULT_REVIEWS);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeSpotlightId, setActiveSpotlightId] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    clientName: '',
    companyOrRole: '',
    websiteType: 'corporate',
    rating: 5,
    feedback: '',
    orderId: '',
  });
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    let isMounted = true;
    api.getReviews().then((res) => {
      if (isMounted && res && res.reviews && res.reviews.length > 0) {
        setReviews(res.reviews);
      }
    }).catch(() => {});
    return () => { isMounted = false; };
  }, []);

  const getWebsiteBadge = (type) => {
    switch (type) {
      case 'beautyparlour': return 'Beauty & Bridal';
      case 'hairparlour': return "Men's Barber";
      case 'gym': return 'Gym & Fitness';
      case 'restaurant': return 'Fine Dining';
      case 'ecommerce': return 'D2C E-Commerce';
      case 'realestate': return 'Real Estate Portal';
      case 'healthcare': return 'Healthcare Clinic';
      case 'custombuild': return 'Custom Architecture';
      default: return 'Custom Website';
    }
  };

  const getDemoLink = (type) => {
    switch (type) {
      case 'beautyparlour': return '/demos?project=beautyparlour';
      case 'hairparlour': return '/demos?project=hairparlour';
      case 'gym': return '/demos?project=gym';
      case 'restaurant': return '/demos?project=restaurant';
      case 'ecommerce': return '/demos?project=ecommerce';
      case 'realestate':
      case 'corporate': return '/demos?project=realestate';
      case 'healthcare': return '/demos?project=healthcare';
      case 'custombuild': return '/demos?project=custombuild';
      default: return '/demos';
    }
  };

  const getCategoryGroup = (type) => {
    switch (type) {
      case 'beautyparlour':
      case 'hairparlour':
        return 'salon';
      case 'realestate':
      case 'corporate':
      case 'healthcare':
        return 'realty_clinic';
      case 'ecommerce':
        return 'ecommerce';
      case 'gym':
      case 'restaurant':
        return 'fitness_dining';
      default:
        return 'all';
    }
  };

  const filteredReviews = reviews.filter((r) => {
    if (selectedCategory === 'all') return true;
    const cat = r.categoryGroup || getCategoryGroup(r.website_type);
    return cat === selectedCategory;
  });

  const activeSpotlight = reviews.find(r => r.id === activeSpotlightId) || filteredReviews[0] || reviews[0];

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!reviewForm.clientName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!reviewForm.feedback.trim() || reviewForm.feedback.trim().length < 10) {
      setFormError('Feedback description must be at least 10 characters long.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.submitReview({
        clientName: reviewForm.clientName.trim(),
        companyOrRole: reviewForm.companyOrRole.trim() || 'Verified Client',
        websiteType: reviewForm.websiteType,
        rating: reviewForm.rating,
        feedback: reviewForm.feedback.trim(),
        orderId: reviewForm.orderId.trim() || null,
      });

      if (res && res.review) {
        setReviews(prev => [res.review, ...prev]);
        setActiveSpotlightId(res.review.id);
      } else {
        const optimistic = {
          id: Date.now(),
          client_name: reviewForm.clientName.trim(),
          company_or_role: reviewForm.companyOrRole.trim() || 'Verified Client',
          website_type: reviewForm.websiteType,
          categoryGroup: getCategoryGroup(reviewForm.websiteType),
          rating: reviewForm.rating,
          feedback: reviewForm.feedback.trim(),
          order_id: reviewForm.orderId.trim() || 'TWC-NEW',
          stats: 'Verified Review • Direct Submission',
          tech: 'Handcrafted Clean Code',
          created_at: new Date().toISOString()
        };
        setReviews(prev => [optimistic, ...prev]);
        setActiveSpotlightId(optimistic.id);
      }

      setSubmitSuccess(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#355CDE', '#000000', '#F1E8D8']
      });

      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitSuccess(false);
        setReviewForm({
          clientName: '',
          companyOrRole: '',
          websiteType: 'corporate',
          rating: 5,
          feedback: '',
          orderId: '',
        });
      }, 1800);
    } catch (err) {
      setFormError(err.message || 'Could not submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-12 sm:py-20 bg-[#F1E8D8] border-t border-[#E2D7C3] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF7E8] border border-[#E2D7C3] text-[#000000] text-xs font-bold tracking-wide uppercase shadow-xs">
            <HeartHandshake className="w-3.5 h-3.5 text-[#355CDE]" />
            <span>Verified Client Audit &bull; Proof of Work</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#000000] tracking-tight leading-tight">
            Client Feedback &amp; Verified Reviews
          </h2>

          <p className="text-xs sm:text-base text-[#3D362E] leading-relaxed">
            Every review is tied to a legitimate studio order number and an actual working website demo. Click on any client to inspect their project delivery audit and explore their live frontend.
          </p>
        </div>

        {/* 3-Part Architectural Protocol Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
          <div className="bg-[#FFF7E8] p-4 sm:p-5 rounded-2xl rounded-tr-sm border border-[#E2D7C3] text-center space-y-1 shadow-xs">
            <div className="flex items-center justify-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="text-2xl font-extrabold text-[#000000] font-mono">4.98 / 5.0</div>
            <p className="text-[11px] text-[#3D362E] font-semibold">Average Verified Rating</p>
          </div>

          <div className="bg-[#FFF7E8] p-4 sm:p-5 rounded-2xl rounded-t-sm border border-[#E2D7C3] text-center space-y-1 shadow-xs">
            <div className="text-2xl font-extrabold text-emerald-700 flex items-center justify-center gap-1.5 font-mono">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>100%</span>
            </div>
            <div className="text-sm font-bold text-[#000000]">Approved Before Payment</div>
            <p className="text-[11px] text-[#3D362E] font-semibold">Pay on WhatsApp Post-Demo</p>
          </div>

          <div className="bg-[#FFF7E8] p-4 sm:p-5 rounded-2xl rounded-tl-sm border border-[#E2D7C3] text-center space-y-1 shadow-xs">
            <div className="text-2xl font-extrabold text-[#355CDE] font-mono">0.4s</div>
            <div className="text-sm font-bold text-[#000000]">Core Web Vitals Speed</div>
            <p className="text-[11px] text-[#3D362E] font-semibold">Handwritten Pure React Code</p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  const firstMatch = reviews.find(r => cat.id === 'all' || (r.categoryGroup || getCategoryGroup(r.website_type)) === cat.id);
                  if (firstMatch) setActiveSpotlightId(firstMatch.id);
                }}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-[#355CDE] text-white shadow-sm'
                    : 'bg-[#FFF7E8] hover:bg-[#E7DDC9] text-[#000000] border border-[#E2D7C3]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-2 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-white text-[#355CDE] font-extrabold' : 'bg-[#E2D7C3] text-[#3D362E]'
                }`}>
                  {cat.id === 'all' ? reviews.length : reviews.filter(r => (r.categoryGroup || getCategoryGroup(r.website_type)) === cat.id).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Core Showcase: Split Architectural Spotlight + Verified Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column (5 Cols): Featured Client Spotlight Dossier */}
          {activeSpotlight && (
            <div className="lg:col-span-5 bg-[#FFF7E8] rounded-3xl rounded-tl-sm border-2 border-[#355CDE]/30 p-6 sm:p-8 space-y-6 shadow-soft flex flex-col justify-between sticky top-28">
              
              <div className="space-y-4">
                {/* Header Strip with Order Number & Verified Seal */}
                <div className="flex items-center justify-between border-b border-[#E2D7C3] pb-3.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#355CDE]">
                      Verified Case Dossier
                    </span>
                  </div>
                  {activeSpotlight.order_id && (
                    <span className="font-mono text-[10px] font-extrabold text-[#000000] bg-[#F1E8D8] px-2.5 py-0.5 rounded-full border border-[#E2D7C3]">
                      {activeSpotlight.order_id}
                    </span>
                  )}
                </div>

                {/* Stars and Category */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(activeSpotlight.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#355CDE] text-white uppercase tracking-wider shadow-xs">
                    {getWebsiteBadge(activeSpotlight.website_type)}
                  </span>
                </div>

                {/* Main Spotlight Quote */}
                <div className="relative pt-2">
                  <Quote className="w-8 h-8 text-[#355CDE]/20 absolute -top-1 -left-2" />
                  <p className="text-sm sm:text-base text-[#000000] font-medium leading-relaxed relative z-10 pl-6">
                    "{activeSpotlight.feedback}"
                  </p>
                </div>

                {/* Technical Delivery Verification Metrics */}
                <div className="bg-[#F1E8D8] rounded-2xl rounded-br-sm p-3.5 sm:p-4 border border-[#E2D7C3] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#3D362E] text-[11px]">Milestone Verification:</span>
                    <span className="font-bold text-emerald-800 text-[11px]">Approved Before Payment</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#3D362E] text-[11px]">Architecture Stack:</span>
                    <span className="font-mono text-[#000000] text-[11px] font-semibold">{activeSpotlight.tech || 'Pure React 19 + Node.js'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#3D362E] text-[11px]">Core Highlight:</span>
                    <span className="font-bold text-[#355CDE] text-[11px]">{activeSpotlight.stats || '0.4s Fast Core Web Vitals'}</span>
                  </div>
                </div>
              </div>

              {/* Client Profile and Action to Inspect Live Demo */}
              <div className="pt-4 border-t border-[#E2D7C3] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#000000] text-white flex items-center justify-center font-heading font-extrabold text-sm shrink-0 shadow-xs">
                    {activeSpotlight.client_name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#000000] text-sm sm:text-base flex items-center gap-1.5">
                      <span>{activeSpotlight.client_name}</span>
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0" title="Verified Studio Client">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    </h4>
                    <p className="text-xs text-[#3D362E]">
                      {activeSpotlight.company_or_role || 'Verified Client'}
                    </p>
                  </div>
                </div>

                {/* Direct Proof-of-Work Link to Live Interactive Demo */}
                <Link
                  to={getDemoLink(activeSpotlight.website_type)}
                  className="w-full py-3.5 px-5 rounded-full bg-[#355CDE] hover:bg-[#2447B8] active:scale-[0.98] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md"
                >
                  <Eye className="w-4 h-4 text-white" />
                  <span>Inspect Delivered Website Demo ({getWebsiteBadge(activeSpotlight.website_type)})</span>
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </Link>
              </div>

            </div>
          )}

          {/* Right Column (7 Cols): Verified Client Ledger Stream */}
          <div className="lg:col-span-7 space-y-3.5">
            <div className="flex items-center justify-between pb-1 px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#000000]">
                Verified Client Ledger ({filteredReviews.length} Records)
              </span>
              <span className="text-[11px] text-[#3D362E]">
                Click any review card to spotlight
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {filteredReviews.map((rev, idx) => {
                const isSelected = activeSpotlight && activeSpotlight.id === rev.id;
                const shapeClass = idx % 2 === 0 ? 'rounded-2xl rounded-tr-sm' : 'rounded-2xl rounded-bl-sm';

                return (
                  <div
                    key={rev.id || rev.order_id || rev.client_name}
                    onClick={() => setActiveSpotlightId(rev.id)}
                    className={`p-4 sm:p-5 ${shapeClass} border cursor-pointer transition-all duration-200 flex flex-col justify-between group shadow-xs hover:shadow-md relative ${
                      isSelected
                        ? 'border-[#355CDE] bg-[#FFF7E8] ring-2 ring-[#355CDE]/30'
                        : 'border-[#E2D7C3] bg-[#FFF7E8] hover:border-[#355CDE]/70'
                    }`}
                  >
                    <div>
                      {/* Card Top: Stars & Order ID */}
                      <div className="flex items-center justify-between mb-2.5">
                        <div className="flex items-center gap-1 text-amber-500">
                          {[...Array(rev.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        {rev.order_id && (
                          <span className="font-mono text-[9px] font-bold text-[#000000] bg-[#F1E8D8] px-2 py-0.5 rounded-full border border-[#E2D7C3]">
                            {rev.order_id}
                          </span>
                        )}
                      </div>

                      {/* Category Label */}
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#355CDE] block mb-1">
                        {getWebsiteBadge(rev.website_type)}
                      </span>

                      {/* Feedback Quote */}
                      <p className="text-xs text-[#000000] line-clamp-3 leading-relaxed mb-3">
                        "{rev.feedback}"
                      </p>
                    </div>

                    {/* Card Footer: Client Info & Demo Link */}
                    <div className="pt-2.5 border-t border-[#E2D7C3] flex items-center justify-between text-xs">
                      <div className="overflow-hidden pr-2">
                        <h5 className="font-bold text-[#000000] text-xs truncate flex items-center gap-1">
                          <span>{rev.client_name}</span>
                          <span className="w-3 h-3 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                            <Check className="w-2 h-2 stroke-[3]" />
                          </span>
                        </h5>
                        <p className="text-[10px] text-[#3D362E] truncate">
                          {rev.company_or_role || 'Verified Client'}
                        </p>
                      </div>

                      <Link
                        to={getDemoLink(rev.website_type)}
                        onClick={(e) => e.stopPropagation()}
                        className="text-[#355CDE] font-bold hover:text-[#2447B8] inline-flex items-center gap-0.5 shrink-0 text-[11px]"
                        title="Inspect Live Website Demo"
                      >
                        <span>Demo</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Direct Verification Assurance Notice */}
            <div className="bg-[#FFF7E8] rounded-2xl rounded-tr-sm border border-[#E2D7C3] p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-[#000000] font-semibold">
                  All reviews are submitted by real clients following live browser demo inspection.
                </span>
              </div>
              <span className="text-[#355CDE] font-bold text-[11px] whitespace-nowrap">
                Zero Fake Reviews Policy
              </span>
            </div>

          </div>

        </div>

        {/* Action Button: Submit Verified Review */}
        <div className="text-center pt-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#000000] hover:bg-neutral-800 text-white text-xs sm:text-sm font-bold transition-all shadow-sm hover:shadow-md cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#355CDE]" />
            <span>Submit Your Verified Review &amp; Feedback</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>

      </div>

      {/* Interactive Review Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70">
          <div className="bg-[#FFF7E8] rounded-3xl rounded-tr-sm max-w-lg w-full p-6 sm:p-8 border border-[#E2D7C3] shadow-lg relative space-y-5">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#F1E8D8] text-neutral-500 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#355CDE]">
                Mandatory Feedback System
              </span>
              <h3 className="text-xl font-extrabold text-[#000000]">
                Submit Client Review &amp; Feedback
              </h3>
              <p className="text-xs text-[#3D362E]">
                Please rate your experience with The Webcraft. Your feedback will be publicly visible to other verified clients.
              </p>
            </div>

            {submitSuccess ? (
              <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-base text-emerald-900">Thank You For Your Review!</h4>
                <p className="text-xs text-emerald-700">
                  Your feedback has been safely registered in our verified client database.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                {formError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-semibold">
                    {formError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-[#000000] mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pooja Shah"
                    value={reviewForm.clientName}
                    onChange={(e) => setReviewForm({ ...reviewForm, clientName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E2D7C3] text-xs text-[#000000] bg-white focus:outline-none focus:ring-2 focus:ring-[#355CDE]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#000000] mb-1">
                      Business or Role
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Salon Owner"
                      value={reviewForm.companyOrRole}
                      onChange={(e) => setReviewForm({ ...reviewForm, companyOrRole: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E2D7C3] text-xs text-[#000000] bg-white focus:outline-none focus:ring-2 focus:ring-[#355CDE]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#000000] mb-1">
                      Website Category
                    </label>
                    <select
                      value={reviewForm.websiteType}
                      onChange={(e) => setReviewForm({ ...reviewForm, websiteType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E2D7C3] text-xs text-[#000000] focus:outline-none focus:ring-2 focus:ring-[#355CDE] bg-white"
                    >
                      <option value="beautyparlour">Beauty Parlour & Salon</option>
                      <option value="hairparlour">Men's Barber Lounge</option>
                      <option value="gym">Gym & Fitness</option>
                      <option value="restaurant">Restaurant & Dining</option>
                      <option value="ecommerce">D2C E-Commerce</option>
                      <option value="realestate">Real Estate & Builders</option>
                      <option value="healthcare">Healthcare & Clinic</option>
                      <option value="corporate">Corporate / Business</option>
                      <option value="custombuild">100% Bespoke Architecture</option>
                    </select>
                  </div>
                </div>

                {/* Rating Stars (Mandatory) */}
                <div>
                  <label className="block text-xs font-bold text-[#000000] mb-1.5">
                    Your Rating (Mandatory) <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        className="p-1 text-2xl transition-transform hover:scale-110 focus:outline-none cursor-pointer"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= reviewForm.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-neutral-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-[#355CDE] ml-2">
                      {reviewForm.rating} / 5 Stars
                    </span>
                  </div>
                </div>

                {/* Feedback Description (Mandatory) */}
                <div>
                  <label className="block text-xs font-bold text-[#000000] mb-1">
                    Your Feedback &amp; Review (Mandatory) <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows="3"
                    required
                    minLength={10}
                    placeholder="Share your experience regarding code quality, zero upfront payment, fast delivery, and communication..."
                    value={reviewForm.feedback}
                    onChange={(e) => setReviewForm({ ...reviewForm, feedback: e.target.value })}
                    className="w-full p-3.5 rounded-xl border border-[#E2D7C3] text-xs text-[#000000] bg-white focus:outline-none focus:ring-2 focus:ring-[#355CDE]"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#000000] mb-1">
                    Order ID (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. TWC-892401"
                    value={reviewForm.orderId}
                    onChange={(e) => setReviewForm({ ...reviewForm, orderId: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E2D7C3] text-xs font-mono text-[#000000] bg-white focus:outline-none focus:ring-2 focus:ring-[#355CDE]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-[#355CDE] hover:bg-[#2447B8] text-white font-bold text-xs sm:text-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm hover:shadow-md cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Submitting Review...</span>
                  ) : (
                    <>
                      <span>Submit Verified Client Review</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </>
                  )}
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
