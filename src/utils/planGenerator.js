import { WEBSITE_TYPES, COMPANY_CONFIG } from '../data/pricingData';

export function generateWebsiteProductionPlan(order) {
  const categoryNames = {
    landing: 'High-Converting Landing Page',
    portfolio: 'Creative Portfolio / Personal Brand',
    corporate: 'Corporate / Business Website',
    ecommerce: 'E-Commerce Online Store',
    beautyparlour: 'Luxury Beauty Salon & Bridal Studio',
    hairparlour: "Men's Barber Lounge & Hair Studio",
    gym: 'Gym, CrossFit & Fitness Center',
    restaurant: 'Fine Dining Restaurant & Table Reservation',
    custombuild: 'Custom Build Website & Architecture',
    custom: 'Custom Web Application',
  };

  const typeName = categoryNames[order.websiteType] || order.websiteType;
  const advancePaid = 0;
  const remaining = order.finalBudget || 13000;
  const orderDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  // Category-specific sitemap blueprint
  const sitemaps = {
    beautyparlour: [
      '1. Header (Salon Brand, Address, Quick Call/WhatsApp)',
      '2. Hero (Bridal Glamour Headline, 20% Wedding Season Offer, VIP Booking CTA)',
      '3. Packages Grid (HD Airbrush Bridal, Pre-Bridal Radiance, Hair Spa, Korean Facials)',
      '4. Real Transformation Gallery (Before/After Bridal Looks)',
      '5. Interactive Appointment Booking Form (Date, Time, Beautician, WhatsApp Confirmation)',
      '6. Verified Client Reviews & Local Testimonials',
      '7. Footer (Sindhu Bhavan/Drive-in Address, Timings 10am-8pm, Map Link)',
    ],
    hairparlour: [
      '1. Header (Barber Logo, Phone, Chair Booking Link)',
      '2. Hero (Sharp Cuts & Beard Craftsmanship, Espresso Bar Callout)',
      '3. Grooming Menu (Fade Haircuts, Royal Beard Sculpting, Charcoal Detox, Hair Spa)',
      '4. Master Stylist Profiles (Senior Barbers & Experience)',
      '5. Barber Chair Booking Widget (Stylist Selection, Slot, WhatsApp pass)',
      '6. Customer Grooming Reviews & Google 4.9★ Badge',
      '7. Footer (Location, Valet Parking, Operating Hours)',
    ],
    gym: [
      '1. Header (IronCore Fitness Logo, Free Trial Button)',
      '2. Hero (15,000 Sq.Ft Training Facility, CrossFit & Olympic Barbells)',
      '3. Facilities Tour (Cardio Zone, Heavy Dumbbells, Steam & Sauna, CrossFit)',
      '4. Membership Tiers (Monthly ₹2,200, 3-Month ₹5,499, Annual Elite ₹13,999)',
      '5. Free 1-Day Trial Pass Claim Form (Instant WhatsApp QR pass)',
      '6. Certified Trainer Credentials & Transformation Stories',
      '7. Footer (Prahladnagar Branch, Contact 85114 39894, Timings 6am-10pm)',
    ],
    restaurant: [
      '1. Header (Brand, Sindhu Bhavan Location, Valet Parking)',
      '2. Hero (Royal Awadhi Feast, Times Food Award 2025, Courtyard Sitar Ambiance)',
      '3. A La Carte Menu (Clay Oven Kebabs, Dal Bukhara, Biryanis, Shahi Desserts)',
      '4. Interactive Table Reservation Engine (Guests, Date, Slot, Seating Ambiance)',
      '5. Chef Signature Story & Authentic Spices Heritage',
      '6. Zomato 4.9★ & Google Diner Reviews',
      '7. Footer (Map, 12pm-11:30pm Timings, Private Dining Inquiries)',
    ],
    ecommerce: [
      '1. Top Announcement Bar (Code ROYAL15 & Free Delivery above ₹1,999)',
      '2. Brand Navigation with Bag Counter & Search',
      '3. Hero (Festive Silk & Handloom Couture, New Arrivals)',
      '4. Featured Product Catalog with Size Selectors (S, M, L, XL) & Instant Add-to-Bag',
      '5. Slide-Over Cart Drawer with Live Subtotal & Free Shipping Progress Bar',
      '6. Trust Pillars (100% Handloom Certified, 7-Day Doorstep Exchange, COD)',
      '7. Verified Customer Reviews from Ahmedabad, Mumbai, Bengaluru',
      '8. Footer (Tracking links, WhatsApp support, Policy)',
    ],
    realestate: [
      '1. Official RERA Registration Strip & Possession Date',
      '2. Hero (Luxury 3 & 4 BHK Riverfront Sky Living, ₹1.42 Cr* Onwards)',
      '3. Interactive Floor Plan Switcher (3 BHK, 4 BHK, 5 BHK Penthouse)',
      '4. Instant PDF Brochure Download Modal on WhatsApp',
      '5. World-Class Amenities (Infinity Pool, Sky Lounge, EV Charging)',
      '6. Private Sample Flat Visit Scheduler (Chauffeur pickup)',
      '7. Location Advantages & Connectivity Matrix (SG Highway, Airport, Metro)',
    ],
    healthcare: [
      '1. Emergency Helpline Strip & NABH Accreditation',
      '2. Hero (Precision Painless Laser Dentistry, 15,000+ Happy Smiles)',
      '3. Chief Doctor Profile (Dr. Harshil Mehta, BDS, MDS, Gold Medalist)',
      '4. Specialized Treatments Grid (Invisible Aligners, German Implants, Root Canal)',
      '5. In-Clinic Patient Appointment Booking Form (Satellite vs Navrangpura)',
      '6. Patient Before/After Smile Rehabilitations',
      '7. Footer (Clinic Timings, ISO Certification, Google Reviews)',
    ],
    custombuild: [
      '1. Platform Header (Brand Identity, Status Indicator, Fast Navigation)',
      '2. Hero (Bespoke Operational Architecture Headline, 99/100 Speed, Direct Developer CTA)',
      '3. Interactive Live Pipeline & Real-Time Operational Telemetry Console',
      '4. Custom Modules Showcase (Auth/OTP, Custom Payment Webhooks, WhatsApp Dispatcher, Analytics)',
      '5. Interactive Custom Module Configurator & Pricing Calculator',
      '6. Gujarat Enterprise Case Studies & Verified Client Accolades',
      '7. Secure Inquiry & Custom Brief Submission Portal (1 GB Assets Support)',
    ],
    default: [
      '1. Header (Brand Identity, Phone, Email, Quick Navigation)',
      '2. Hero Section (Clear Value Proposition, Primary Booking CTA)',
      '3. Core Services / Products Showcase with Pricing',
      '4. Social Proof & Verified Client Testimonials',
      '5. Lead Capture & Online Booking Form',
      '6. Transparent FAQ & Guarantees',
      '7. Footer (Contact Details, Policies, Copyright)',
    ],
  };

  const selectedSitemap = sitemaps[order.websiteType] || sitemaps.default;

  // Plain Text formatted for Email and WhatsApp
  const plainTextPlan = `=====================================================
THE WEBCRAFT - CLIENT PROJECT PRODUCTION BLUEPRINT
=====================================================
Generated Automatically Upon Project Request & Database Registration
Client: ${order.clientName}
Date: ${orderDate}
Direct Lead: Rakshit Patel (+91 85114 39894 - Only Message)
Online Payment: None Required (Direct Consultation on WhatsApp/Call)
Target Project Value: Rs. ${(order.finalBudget || 13000).toLocaleString('en-IN')}

-----------------------------------------------------
1. CLIENT PROFILE & SCOPE
-----------------------------------------------------
Client Full Name: ${order.clientName}
WhatsApp / Phone: +91 ${order.clientPhone}
Email: ${order.clientEmail || 'Direct WhatsApp contact preferred'}
Website Category: ${typeName}
Assets Uploaded: ${order.files?.length || 0} file(s)
${order.files?.length > 0 ? order.files.map((f, i) => `  - [File ${i + 1}] ${f.name} (${f.sizeFormatted})`).join('\n') : '  - No direct uploads attached'}
Cloud Drive Link: ${order.cloudAssetLink || 'None provided (direct files / WhatsApp)'}

-----------------------------------------------------
2. CLIENT'S CUSTOM INSTRUCTIONS & WISHLIST (MAX 7,000 CHARS)
-----------------------------------------------------
${order.customInstructions ? order.customInstructions : (order.customNotes ? order.customNotes : 'No special custom notes provided. Deliver standard high-performance agency layout.')}

-----------------------------------------------------
3. TAILORED SITEMAP & PAGE STRUCTURE
-----------------------------------------------------
${selectedSitemap.join('\n')}

-----------------------------------------------------
3. TECHNICAL STACK & ARCHITECTURE
-----------------------------------------------------
- Framework: React 18+ / Next.js Fast Static-Site Architecture
- Styling: Tailwind CSS custom tokens (#F1ECE6, #DDD5CD, #7D4047, #2E2E2E)
- Icons: Lucide React (feather lightweight vectors)
- Forms & Webhooks: Direct WhatsApp link integration & Form validation
- Performance Target: 95+ PageSpeed Mobile, < 1.0s First Contentful Paint
- Responsive Support: 100% Mobile, Tablet, and Desktop fluid layouts

-----------------------------------------------------
4. 5-STAGE PRODUCTION SCHEDULE
-----------------------------------------------------
- Day 1-2: Wireframing & Brand Mockup Approval
  (Align on color codes, layout structure, typography)
- Day 3-4: Clean-Code Frontend Development
  (Code components, navigation, product cards, booking forms)
- Day 5-6: Interactivity & Feature Integration
  (WhatsApp notification dispatch, cart/scheduler mechanics, mobile tuning)
- Day 7-8: Private Staging Demo Walkthrough
  (Share private link with client for review and minor textual tweaks)
- Launch Day: Final Balance Settlement & Domain Handover
  (Connect custom domain, install SSL certificate, transfer code ownership)

-----------------------------------------------------
5. REVISION & SCOPE POLICY NOTICE
-----------------------------------------------------
- Included: 2 rounds of minor text, typo, color, and image adjustments.
- Extra Charges: Out-of-scope structural redesigns or adding new pages.
- Deposit: Zero upfront online fees. Project settlement discussed upon demo satisfaction.

-----------------------------------------------------
Ready for immediate development by THE WEBCRAFT.
Lead Developer: Rakshit Patel
Official Email: ${COMPANY_CONFIG.email}
Official WhatsApp: ${COMPANY_CONFIG.whatsappDisplay} (Only Message, Not Call)
=====================================================`;

  return {
    orderId: order.orderId || 'TWC-' + Math.floor(100000 + Math.random() * 900000),
    clientName: order.clientName,
    clientPhone: order.clientPhone,
    clientEmail: order.clientEmail,
    websiteType: typeName,
    finalBudget: order.finalBudget || 13000,
    advancePaid,
    remaining,
    sitemap: selectedSitemap,
    plainText: plainTextPlan,
    cloudLink: order.cloudAssetLink,
    notes: order.customNotes,
  };
}
