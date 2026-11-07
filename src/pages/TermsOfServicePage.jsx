import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, FileText, ArrowLeft, CheckCircle2, Lock } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="bg-[#FFF7E8] text-[#000000] min-h-screen pb-16">
      {/* Header */}
      <div className="bg-[#000000] text-white py-12 border-b border-neutral-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#355CDE] hover:underline mb-4 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Studio Home</span>
          </Link>
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#355CDE]">
              LEGAL CHARTER • LAST REVISED OCTOBER 2026
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Terms of Service &amp; Studio Agreement
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
              These terms govern all custom web development services, client specification submissions, asset handovers, and project delivery provided by THE WEBCRAFT.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-[#F1E8D8] rounded-xl border border-[#E2D7C3] p-6 sm:p-10 shadow-xs space-y-8 text-xs sm:text-sm text-[#3D362E] leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#000000] border-b border-[#E2D7C3] pb-2">
              1. Studio Overview &amp; Engagement Scope
            </h2>
            <p>
              THE WEBCRAFT operates as a bespoke web engineering studio founded by Rakshit Patel. We specialize in handcrafted, high-performance web applications built directly using modern React and Node.js. By submitting an order specification or commissioning a project, the client enters into a binding business agreement governed by these terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#000000] border-b border-[#E2D7C3] pb-2">
              2. Zero Online Upfront Payment Policy
            </h2>
            <p>
              Our studio operates under a client-first, zero-online-risk model. Submitting project briefs, design assets, and feature wishlists through this website carries zero financial charge. We do not require debit cards, credit cards, or online payment gateways during initial specification submission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#000000] border-b border-[#E2D7C3] pb-2">
              3. Demo Inspection &amp; Live Approval Milestone
            </h2>
            <p>
              Before any final billing occurs, THE WEBCRAFT delivers a fully functional, live interactive demo hosted on private staging servers. The client has full authorization to inspect responsiveness, booking forms, page speed, and interactive components.
            </p>
            <p>
              Final project settlement is processed directly via WhatsApp verification after the client approves the completed staging demo, and prior to production domain DNS cutover.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#000000] border-b border-[#E2D7C3] pb-2">
              4. Code Ownership &amp; Intellectual Property
            </h2>
            <p>
              Upon receipt of final milestone settlement:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#000000]">
              <li>The client receives 100% unrestricted intellectual property ownership of custom application source code, assets, and database schemas.</li>
              <li>THE WEBCRAFT retains zero recurring licensing claims or proprietary lock-in restrictions.</li>
              <li>Clean source repositories are transferred directly via GitHub or secure archive download.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#000000] border-b border-[#E2D7C3] pb-2">
              5. Out-of-Scope Revisions Policy
            </h2>
            <p>
              All projects include comprehensive refinement rounds within the agreed technical specification brief. Any structural architectural alterations, third-party API additions, or scope expansions requested after initial design sign-off will be quoted as a separate itemized add-on at transparent direct developer rates.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#000000] border-b border-[#E2D7C3] pb-2">
              6. Client Assets &amp; Content Warranty
            </h2>
            <p>
              Clients warrant that all logos, trademarks, photographs, and copy uploaded to the portal (up to 1 GB) are legally owned or appropriately licensed. THE WEBCRAFT does not assume liability for copyright infringement arising from client-provided materials.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-[#000000] border-b border-[#E2D7C3] pb-2">
              7. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              This agreement and any disputes arising from project fulfillment are governed under the laws of Gujarat, India. Both parties agree to submit to the exclusive jurisdiction of the competent courts in Ahmedabad, Gujarat.
            </p>
          </section>

          <div className="pt-4 border-t border-[#E2D7C3] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <span className="text-[#3D362E]">
              Direct Inquiries: <a href="mailto:thewebcraft404@gmail.com" className="font-mono text-[#000000] font-semibold hover:underline">thewebcraft404@gmail.com</a>
            </span>
            <Link
              to="/privacy-policy"
              className="text-[#355CDE] font-bold hover:underline"
            >
              Read Privacy Policy &rarr;
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
