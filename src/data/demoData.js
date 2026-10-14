export const demoCategories = [
  {
    id: 'ecommerce',
    title: 'E-Commerce Store',
    tagline: 'High-converting online store with seamless checkout experience',
    badge: 'Trending Category',
    stats: { speed: '0.8s load', conversion: '+42% avg', mobile: '100% responsive' },
    previewName: 'LuxeCraft Furnishings',
    demoType: 'ecommerce',
    description: 'Complete e-commerce frontend with interactive cart, product variants, coupon codes, and high-converting product pages.'
  },
  {
    id: 'corporate',
    title: 'Corporate / Business',
    tagline: 'Authoritative, trustworthy agency & B2B enterprise presence',
    badge: 'Enterprise Grade',
    stats: { trustScore: '99.4%', leadGen: '3x inquiries', seo: 'Optimized' },
    previewName: 'Vanguard Global Advisory',
    demoType: 'corporate',
    description: 'Polished corporate website with interactive service modules, ROI calculators, team profiles, and lead capture funnels.'
  },
  {
    id: 'portfolio',
    title: 'Creative Portfolio',
    tagline: 'Sleek, minimalist digital stage for creators & studios',
    badge: 'Award-Winning Aesthetics',
    stats: { aesthetics: 'A+ Minimalist', gallery: 'High Res', smooth: '60 FPS' },
    previewName: 'Aura Studio & Architects',
    demoType: 'portfolio',
    description: 'Modern visual portfolio featuring dynamic project grids, interactive image modals, client lists, and clean contact cards.'
  },
  {
    id: 'landing',
    title: 'High-Converting Landing Page',
    tagline: 'Laser-focused single page engineered for maximum sales & leads',
    badge: 'Fastest Delivery (48h)',
    stats: { bounceRate: '-35%', speed: '98 Mobile Score', cta: 'Multi-point' },
    previewName: 'HyperSync Cloud App',
    demoType: 'landing',
    description: 'High-velocity sales landing page equipped with sticky conversion bar, interactive FAQ accordion, social proof badges, and comparison table.'
  }
];

export const ecommerceProducts = [
  {
    id: 1,
    name: 'Artisan Walnut Lounge Chair',
    category: 'Seating',
    price: 18499,
    originalPrice: 24999,
    rating: 4.9,
    reviews: 128,
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80',
    description: 'Handcrafted premium solid American walnut with top-grain Italian leather cushioning.'
  },
  {
    id: 2,
    name: 'Minimalist Brass Arc Floor Lamp',
    category: 'Lighting',
    price: 8999,
    originalPrice: 12500,
    rating: 4.8,
    reviews: 94,
    tag: 'New',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
    description: 'Hand-brushed brass finish with touch dimming and warm ambient temperature control.'
  },
  {
    id: 3,
    name: 'Nordic Oak Floating Work Desk',
    category: 'Workspace',
    price: 22999,
    originalPrice: 28000,
    rating: 5.0,
    reviews: 62,
    tag: 'Limited Edition',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80',
    description: 'Integrated cable management tray, magnetic storage track, and water-repellent wax finish.'
  },
  {
    id: 4,
    name: 'Sculptural Ceramic Stoneware Vase',
    category: 'Decor',
    price: 3499,
    originalPrice: 4999,
    rating: 4.7,
    reviews: 45,
    tag: 'Popular',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80',
    description: 'Organic asymmetric matte ceramic vase curated for contemporary botanical arrangements.'
  }
];

export const corporateServices = [
  {
    icon: 'TrendingUp',
    title: 'Strategic Market Advisory',
    description: 'Data-driven expansion strategies that help companies scale operations across emerging digital landscapes.'
  },
  {
    icon: 'ShieldCheck',
    title: 'Enterprise Architecture & Cloud',
    description: 'Fault-tolerant, zero-downtime cloud migration designed for strict regulatory compliance.'
  },
  {
    icon: 'Cpu',
    title: 'AI & Process Automation',
    description: 'Custom autonomous agent pipelines reducing operational overhead and accelerating decision velocity.'
  },
  {
    icon: 'Users',
    title: 'Organizational Transformation',
    description: 'Equipping leadership teams with agile frameworks to sustainably increase company valuation.'
  }
];

export const portfolioProjects = [
  {
    id: 1,
    title: 'The Monolith Pavilion',
    category: 'Architecture',
    year: '2025',
    location: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    aspect: 'span-2'
  },
  {
    id: 2,
    title: 'Solitude & Concrete Residence',
    category: 'Interior Design',
    year: '2024',
    location: 'Zurich, Switzerland',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
    aspect: 'span-1'
  },
  {
    id: 3,
    title: 'Nordic Light Gallery',
    category: 'Cultural Space',
    year: '2025',
    location: 'Oslo, Norway',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80',
    aspect: 'span-1'
  },
  {
    id: 4,
    title: 'Aethelgard Timber Retreat',
    category: 'Eco-Architecture',
    year: '2024',
    location: 'British Columbia',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    aspect: 'span-2'
  }
];

export const landingFaqs = [
  {
    q: 'How fast can HyperSync be implemented?',
    a: 'Under 10 minutes. Our zero-configuration API links seamlessly into your existing database and payment streams.'
  },
  {
    q: 'Can I migrate from existing tools without downtime?',
    a: 'Yes, our automated bidirectional sync ensures your historical data transfers safely with zero business interruption.'
  },
  {
    q: 'Is there enterprise multi-seat support?',
    a: 'All plans include fine-grained role-based permissions, SSO authentication (SAML/Okta), and audit logging.'
  }
];
