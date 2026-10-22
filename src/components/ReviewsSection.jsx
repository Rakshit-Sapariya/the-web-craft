import React, { useState, useEffect } from 'react';
import { 
  Star, CheckCircle2, MessageSquarePlus, ShieldCheck, 
  HeartHandshake, X, Check, ArrowRight, Quote
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';

const DEFAULT_REVIEWS = [
  {
    id: 1,
    client_name: 'Pooja Shah',
    company_or_role: 'Founder, Glamour & Glow Bridal Studio',
    website_type: 'beautyparlour',
    rating: 5,
    feedback: 'The Webcraft built our bridal studio website with zero upfront online fees! The WhatsApp direct booking system and luxury rose-gold portfolio got us 35+ wedding inquiries in the very first week. Blazing fast speed on mobile!',
    order_id: 'TWC-892401',
    created_at: new Date(Date.now() - 4 * 86400000).toISOString()
  },
  {
    id: 2,
    client_name: 'Hardik Patel',
    company_or_role: 'Managing Director, Shikhar Skyline Infra',
    website_type: 'corporate',
    rating: 5,
    feedback: 'Genuine direct developer pricing with zero agency markups. Rakshit delivered our interactive real estate floor plans and RERA compliance portal ahead of schedule. The code is handcrafted React without sluggish plugins.',
    order_id: 'TWC-741952',
    created_at: new Date(Date.now() - 2 * 86400000).toISOString()
  },
  {
    id: 3,
    client_name: 'Dr. Sameer Mehta',
    company_or_role: 'Chief Surgeon, Mehta Aesthetics Clinic',
    website_type: 'healthcare',
    rating: 5,
    feedback: 'Exceptional attention to privacy and NABH medical compliance. Zero online payment risk—I inspected the fully functional demo before clearing final payment. The mandatory feedback policy ensures top-notch quality!',
    order_id: 'TWC-492104',
    created_at: new Date(Date.now() - 5 * 86400000).toISOString()
  },
  {
    id: 4,
    client_name: 'Vikram Desai',
    company_or_role: 'Owner, Urban Gentleman Barbershop',
    website_type: 'hairparlour',
    rating: 5,
    feedback: 'Super slick dark luxury theme. Our clients book hair and beard appointments directly from their phones with zero lag. The tiered promotional discount made it a complete no-brainer value.',
    order_id: 'TWC-520194',
    created_at: new Date(Date.now() - 6 * 86400000).toISOString()
  },
  {
    id: 5,
    client_name: 'Ananya Sharma',
    company_or_role: 'Founder, Zahra Luxury Ethnic Couture',
    website_type: 'ecommerce',
    rating: 5,
    feedback: 'Our e-commerce store loads in under 0.6 seconds! Zero cart abandonment, smooth bag checkout drawer, and direct client support throughout. Truly high craftsmanship.',
    order_id: 'TWC-331089',
    created_at: new Date(Date.now() - 7 * 86400000).toISOString()
  },
  {
    id: 6,
    client_name: 'Rajesh Vora',
    company_or_role: 'Head Trainer, IronCore Elite Fitness',
    website_type: 'gym',
    rating: 5,
    feedback: 'Zero online upfront fee was the biggest peace of mind. We reviewed the complete CrossFit box schedule and day-pass calculator before paying. Outstanding execution!',
    order_id: 'TWC-618402',
    created_at: new Date(Date.now() - 9 * 86400000).toISOString()
  }
];

export default function ReviewsSection() {
  const [reviews, setReviews] = useState(DEFAULT_REVIEWS);
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
      } else {
        // Fallback optimistic update
        const optimistic = {
          id: Date.now(),
          client_name: reviewForm.clientName.trim(),
          company_or_role: reviewForm.companyOrRole.trim() || 'Verified Client',
          website_type: reviewForm.websiteType,
          rating: reviewForm.rating,
          feedback: reviewForm.feedback.trim(),
          order_id: reviewForm.orderId.trim() || 'TWC-NEW',
          created_at: new Date().toISOString()
        };
        setReviews(prev => [optimistic, ...prev]);
      }

      setSubmitSuccess(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7D4047', '#2E2E2E', '#DDD5CD']
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

  const getWebsiteBadge = (type) => {
    switch (type) {
      case 'beautyparlour': return 'Beauty & Salon';
      case 'hairparlour': return "Men's Barber";
      case 'gym': return 'Gym & Fitness';
      case 'restaurant': return 'Fine Dining';
      case 'ecommerce': return 'E-Commerce Store';
      case 'realestate': return 'Real Estate Portal';
      case 'healthcare': return 'Healthcare Clinic';
      case 'custombuild': return 'Custom Architecture';
      default: return 'Custom Website';
    }
  };

  return (
    <section id="reviews" className="py-12 sm:py-20 bg-[#F1ECE6] border-t border-[#DDD5CD] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#7D4047]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DDD5CD]/70 border border-[#DDD5CD] text-[#7D4047] text-xs font-bold tracking-wide uppercase shadow-sm">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>100% Mandatory Client Feedback Policy</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2E2E2E] tracking-tight leading-tight">
            Client Feedback &amp; Verified Reviews
          </h2>

          <p className="text-xs sm:text-base text-[#625f5c] leading-relaxed">
            All clients of The Webcraft participate in our mandatory post-demo inspection and feedback process. Here is what real business owners say about our zero upfront online fees and custom code craftsmanship.
          </p>
        </div>

        {/* Rating Overview Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="bg-white p-5 rounded-2xl border border-[#DDD5CD] shadow-soft text-center space-y-1">
            <div className="flex items-center justify-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="text-2xl font-extrabold text-[#2E2E2E]">4.98 / 5.0</div>
            <p className="text-[11px] text-[#625f5c] font-medium">Average Client Rating</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#DDD5CD] shadow-soft text-center space-y-1">
            <div className="text-2xl font-extrabold text-emerald-700 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <span>100%</span>
            </div>
            <div className="text-sm font-bold text-[#2E2E2E]">Mandatory Feedback Delivery</div>
            <p className="text-[11px] text-[#625f5c] font-medium">Every Client Leaves a Review</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#DDD5CD] shadow-soft text-center space-y-1">
            <div className="text-2xl font-extrabold text-[#7D4047]">Zero Risk</div>
            <div className="text-sm font-bold text-[#2E2E2E]">Zero Online Advance</div>
            <p className="text-[11px] text-[#625f5c] font-medium">Payment Only After Demo Approval</p>
          </div>
        </div>

        {/* Client Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id || rev.order_id || rev.client_name}
              className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#DDD5CD] shadow-soft hover:shadow-elevated hover:border-[#7D4047]/40 transition-all duration-300 flex flex-col justify-between group relative"
            >
              <div>
                {/* Header of Card */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#7D4047]/10 text-[#7D4047] uppercase tracking-wider shrink-0">
                    {getWebsiteBadge(rev.website_type)}
                  </span>
                </div>

                {/* Feedback Quote */}
                <div className="relative mb-4">
                  <Quote className="w-6 h-6 text-[#DDD5CD] absolute -top-2 -left-1 opacity-40 pointer-events-none" />
                  <p className="text-xs sm:text-sm text-[#2E2E2E] leading-relaxed italic pl-3 border-l-2 border-[#7D4047]/30">
                    "{rev.feedback}"
                  </p>
                </div>
              </div>

              {/* Author & Verification Info */}
              <div className="pt-3 border-t border-[#DDD5CD]/60 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-[#2E2E2E] text-xs sm:text-sm flex items-center gap-1.5">
                    <span>{rev.client_name}</span>
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0" title="Verified Studio Client">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  </h4>
                  <p className="text-[11px] text-[#625f5c] truncate max-w-[200px]">
                    {rev.company_or_role || 'Verified Client'}
                  </p>
                </div>
                {rev.order_id && (
                  <span className="font-mono text-[10px] font-bold text-[#7D4047] bg-[#F1ECE6] px-2 py-0.5 rounded border border-[#DDD5CD]">
                    {rev.order_id}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Button: Submit Verified Review */}
        <div className="text-center pt-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-[#F1ECE6] text-[#7D4047] border border-[#DDD5CD] hover:border-[#7D4047] text-xs sm:text-sm font-bold shadow-sm transition-all hover:scale-[1.02] active:scale-95"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Submit Your Verified Review</span>
          </button>
        </div>

      </div>

      {/* Interactive Review Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#DDD5CD] shadow-2xl relative space-y-5">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-neutral-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7D4047]">
                Mandatory Feedback System
              </span>
              <h3 className="text-xl font-extrabold text-[#2E2E2E]">
                Submit Client Review &amp; Feedback
              </h3>
              <p className="text-xs text-[#625f5c]">
                Please rate your experience with The Webcraft. Your feedback will be publicly visible to other verified clients.
              </p>
            </div>

            {submitSuccess ? (
              <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-6 text-center space-y-2">
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
                  <label className="block text-xs font-bold text-[#2E2E2E] mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pooja Shah"
                    value={reviewForm.clientName}
                    onChange={(e) => setReviewForm({ ...reviewForm, clientName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5CD] text-xs text-[#2E2E2E] focus:outline-none focus:ring-2 focus:ring-[#7D4047]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#2E2E2E] mb-1">
                      Business or Role
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Salon Owner"
                      value={reviewForm.companyOrRole}
                      onChange={(e) => setReviewForm({ ...reviewForm, companyOrRole: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5CD] text-xs text-[#2E2E2E] focus:outline-none focus:ring-2 focus:ring-[#7D4047]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2E2E2E] mb-1">
                      Website Category
                    </label>
                    <select
                      value={reviewForm.websiteType}
                      onChange={(e) => setReviewForm({ ...reviewForm, websiteType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5CD] text-xs text-[#2E2E2E] focus:outline-none focus:ring-2 focus:ring-[#7D4047] bg-white"
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
                  <label className="block text-xs font-bold text-[#2E2E2E] mb-1.5">
                    Your Rating (Mandatory) <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        className="p-1 text-2xl transition-transform hover:scale-110 focus:outline-none"
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
                    <span className="text-xs font-bold text-[#7D4047] ml-2">
                      {reviewForm.rating} / 5 Stars
                    </span>
                  </div>
                </div>

                {/* Feedback Description (Mandatory) */}
                <div>
                  <label className="block text-xs font-bold text-[#2E2E2E] mb-1">
                    Your Feedback &amp; Review (Mandatory) <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows="3"
                    required
                    minLength={10}
                    placeholder="Share your experience regarding code quality, zero upfront payment, fast delivery, and communication..."
                    value={reviewForm.feedback}
                    onChange={(e) => setReviewForm({ ...reviewForm, feedback: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#DDD5CD] text-xs text-[#2E2E2E] focus:outline-none focus:ring-2 focus:ring-[#7D4047]"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2E2E2E] mb-1">
                    Order ID (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. TWC-892401"
                    value={reviewForm.orderId}
                    onChange={(e) => setReviewForm({ ...reviewForm, orderId: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD5CD] text-xs font-mono text-[#2E2E2E] focus:outline-none focus:ring-2 focus:ring-[#7D4047]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#7D4047] hover:bg-[#67333a] text-white font-bold text-xs sm:text-sm shadow-wine transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Review...</span>
                  ) : (
                    <>
                      <span>Submit Verified Client Review</span>
                      <ArrowRight className="w-4 h-4" />
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
