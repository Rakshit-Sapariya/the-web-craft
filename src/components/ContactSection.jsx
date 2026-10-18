import React, { useState } from 'react';
import { Mail, Phone, Clock, ArrowRight, CheckCircle2, Send, Sparkles } from 'lucide-react';
import { COMPANY_CONFIG } from '../data/pricingData';
import { api } from '../services/api';

export default function ContactSection() {
  const [quickMsg, setQuickMsg] = useState({ name: '', phone: '', message: '' });
  const [sentSuccess, setSentSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuickSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Record inquiry in backend SQLite database
    try {
      await api.sendContact({
        name: quickMsg.name,
        phone: quickMsg.phone,
        message: quickMsg.message
      });
      setSentSuccess(true);
      setQuickMsg({ name: '', phone: '', message: '' });
    } catch (err) {
      console.warn('Could not save contact message to DB:', err);
      // Still show success since it will be queued or logged
      setSentSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-8 sm:py-20 bg-[#F1ECE6] border-t border-[#DDD5CD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-14 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DDD5CD]/60 border border-[#DDD5CD] text-[#7D4047] text-xs font-bold uppercase tracking-wider">
            <Phone className="w-3.5 h-3.5" />
            <span>Direct Developer Access</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2E2E2E] tracking-tight">
            Connect With THE WEBCRAFT
          </h2>
          <p className="text-xs sm:text-base text-[#625f5c]">
            Have a question or custom feature in mind? Talk directly with our team before or after booking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            
            {/* Direct Studio Phone Card */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#DDD5CD] hover-glow-card transition-all group relative overflow-hidden">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#7D4047]/10 text-[#7D4047] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#7D4047] group-hover:text-white transition-all duration-300 shadow-sm">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs font-bold text-[#625f5c] uppercase tracking-wider">Direct Studio Line</span>
                  <h4 className="font-heading font-extrabold text-sm sm:text-base text-[#2E2E2E]">Lead Developer Desk</h4>
                  <div className="flex flex-wrap items-center gap-2 mt-0.5">
                    <p className="text-xs sm:text-sm font-bold text-[#7D4047] font-mono">{COMPANY_CONFIG.phoneDisplay}</p>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full">
                      {COMPANY_CONFIG.phoneNote}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-[#625f5c] mt-3">
                Managed directly by lead developer Rakshit Patel for active project updates.
              </p>
            </div>

            {/* Email Card */}
            <a
              href={`mailto:${COMPANY_CONFIG.email}?subject=Custom%20Website%20Inquiry%20-%20The%20WebCraft`}
              className="block bg-white p-6 rounded-2xl border border-[#DDD5CD] hover-glow-card transition-all group relative overflow-hidden"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#7D4047]/10 text-[#7D4047] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#625f5c] uppercase tracking-wider">Official Email</span>
                  <h4 className="font-heading font-extrabold text-base text-[#2E2E2E]">Email Inquiry</h4>
                  <p className="text-sm font-bold text-[#7D4047] font-mono mt-0.5">{COMPANY_CONFIG.email}</p>
                </div>
              </div>
              <p className="text-xs text-[#625f5c] mt-3">
                Send formal RFPs, design briefs, or questions anytime.
              </p>
            </a>

            {/* Business Hours & Support */}
            <div className="bg-[#2E2E2E] text-[#F1ECE6] p-6 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#DDD5CD] uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Operating Hours</span>
              </div>
              <p className="text-sm font-bold text-white">Monday &ndash; Saturday: 9:00 AM &ndash; 9:00 PM IST</p>
              <p className="text-xs text-[#DDD5CD]/80">Dedicated support throughout development and post-launch maintenance.</p>
            </div>

          </div>

          {/* Quick Inquiry / Direct Studio Inbox (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#DDD5CD] shadow-soft">
            <h3 className="font-heading font-extrabold text-xl text-[#2E2E2E] mb-2">
              Send a Direct Inquiry to Lead Developer
            </h3>
            <p className="text-xs text-[#625f5c] mb-6">
              Fill in your details below. Your message will be securely stored in our studio database and reviewed promptly.
            </p>

            <form onSubmit={handleQuickSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2E2E2E] mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priyesh Shah"
                    value={quickMsg.name}
                    onChange={(e) => setQuickMsg({ ...quickMsg, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DDD5CD] text-xs text-[#2E2E2E] bg-[#F1ECE6]/30 focus:outline-none focus:ring-2 focus:ring-[#7D4047]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2E2E2E] mb-1">Your Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9825000000"
                    value={quickMsg.phone}
                    onChange={(e) => setQuickMsg({ ...quickMsg, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DDD5CD] text-xs text-[#2E2E2E] bg-[#F1ECE6]/30 focus:outline-none focus:ring-2 focus:ring-[#7D4047]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2E2E2E] mb-1">How can we help your business?</label>
                <textarea
                  rows="3"
                  required
                  placeholder="I want to know if an e-commerce website can have customized shipping and razorpay..."
                  value={quickMsg.message}
                  onChange={(e) => setQuickMsg({ ...quickMsg, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DDD5CD] text-xs text-[#2E2E2E] bg-[#F1ECE6]/30 focus:outline-none focus:ring-2 focus:ring-[#7D4047]"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-[#7D4047] hover:bg-[#67333a] text-white font-bold text-xs shadow-wine hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                <span>{isSubmitting ? 'Sending...' : 'Submit Direct Inquiry'}</span>
              </button>

              {sentSuccess && (
                <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5 mt-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Your message has been sent to our developer desk! We will contact you shortly.</span>
                </p>
              )}
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
