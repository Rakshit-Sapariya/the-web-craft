/**
 * Web Intelligence Grabber:
 * Direct connection to live internet feeds, trending design repositories,
 * CSS/UI patterns, and niche-specific web architecture insights.
 */

// User-Agent required by public APIs like GitHub
const USER_AGENT = 'TheWebCraft-AgentMind/2.0 (Studio Intelligent Engine)';

/**
 * Curated high-converting design knowledge base used as a baseline
 * and resilient fallback if internet connection experiences latency or rate-limiting.
 */
export const CORE_DESIGN_FOUNDATION = {
  modernPrinciples2026: [
    'Subtle ambient borders: border-zinc-200/80 dark:border-white/10',
    'Layered ambient shadows: shadow-[0_8px_30px_rgb(0,0,0,0.06)]',
    'Bento Grid asymmetric responsive cards with micro-hover lift (hover:-translate-y-1)',
    'Floating pill navigation with backdrop-blur-md and rounded-full styling',
    'High-contrast direct WhatsApp CTA with pulsing ping indicator',
    'WCAG 2.2 compliant touch targets (min 44px) and minimum 4.5:1 text contrast ratio',
    'Interactive micro-states: active:scale-95, focus-visible:ring-2'
  ],
  curatedPalettes: {
    beauty: {
      primary: '#B76E79',
      accent: '#D4AF37',
      bgLight: '#FFFBF9',
      bgDark: '#1A1416',
      name: 'Rose Gold & Champagne Luxury'
    },
    corporate: {
      primary: '#0F2027',
      accent: '#203A43',
      bgLight: '#F8FAFC',
      bgDark: '#0B132B',
      name: 'Executive Navy & Platinum Trust'
    },
    ecommerce: {
      primary: '#4F46E5',
      accent: '#F43F5E',
      bgLight: '#FFFFFF',
      bgDark: '#0F172A',
      name: 'Modern Indigo & Coral Pulse'
    },
    tech: {
      primary: '#6366F1',
      accent: '#10B981',
      bgLight: '#F8FAFC',
      bgDark: '#0B0F19',
      name: 'Cyber Indigo & Emerald Neon'
    },
    studio: {
      primary: '#7D4047',
      accent: '#D97706',
      bgLight: '#F1ECE6',
      bgDark: '#2E2E2E',
      name: 'Bespoke Wine & Warm Sand'
    }
  }
};

/**
 * Fetch latest trending web design and Tailwind UI repositories from GitHub
 */
async function fetchTrendingWebRepos() {
  try {
    const url = 'https://api.github.com/search/repositories?q=tailwind+ui+landing-page&sort=stars&order=desc&per_page=6';
    const res = await fetch(url, {
      headers: { 
        'User-Agent': USER_AGENT,
        'Accept': 'application/vnd.github.v3+json'
      },
      signal: AbortSignal.timeout(6000)
    });

    if (res.ok) {
      const data = await res.json();
      return (data.items || []).map(repo => ({
        name: repo.name,
        description: repo.description,
        topics: repo.topics || [],
        stars: repo.stargazers_count,
        url: repo.html_url
      }));
    }
  } catch (err) {
    console.warn('[WebGrabber] GitHub trends fetch skipped:', err.message);
  }
  return [];
}

/**
 * Fetch latest frontend UI/UX architecture trends from Dev.to Community API
 */
async function fetchDevCommunityTrends() {
  try {
    const url = 'https://dev.to/api/articles?tag=webdev&top=7&per_page=6';
    const res = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT },
      signal: AbortSignal.timeout(6000)
    });

    if (res.ok) {
      const data = await res.json();
      return (data || []).map(article => ({
        title: article.title,
        tags: article.tag_list || [],
        readablePublishDate: article.readable_publish_date,
        url: article.url
      }));
    }
  } catch (err) {
    console.warn('[WebGrabber] Dev.to trends fetch skipped:', err.message);
  }
  return [];
}

/**
 * Grab targeted web intelligence for a specific niche / industry keyword
 */
export async function grabNicheWebIntelligence(nicheKeyword = 'web design') {
  const sanitized = encodeURIComponent(nicheKeyword.trim());
  let nicheTrends = [];

  try {
    const url = `https://api.github.com/search/repositories?q=${sanitized}+website+tailwind&sort=stars&order=desc&per_page=3`;
    const res = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT },
      signal: AbortSignal.timeout(5000)
    });

    if (res.ok) {
      const data = await res.json();
      nicheTrends = (data.items || []).map(item => ({
        title: item.name,
        summary: item.description || 'Modern high-converting web architecture',
        stars: item.stargazers_count
      }));
    }
  } catch (err) {
    console.warn(`[WebGrabber] Niche intelligence fetch for "${nicheKeyword}" skipped:`, err.message);
  }

  return {
    niche: nicheKeyword,
    insights: nicheTrends.length > 0 ? nicheTrends : [
      { title: `${nicheKeyword} Hero & Value Matrix`, summary: 'High-converting above-the-fold headline with instant trust signals' },
      { title: `${nicheKeyword} Interactive Showcase`, summary: 'Responsive cards with interactive badges and visual before/after proofs' }
    ]
  };
}

/**
 * Master Internet Grabber: Connects to live internet sources,
 * aggregates trends, extracts actionable design principles,
 * and compiles fresh intelligence for the Agent Mind.
 */
export async function grabLiveInternetIntelligence() {
  const startTime = Date.now();
  console.log('[WebGrabber] 🌐 Connecting to live internet streams...');

  const [githubRepos, devArticles] = await Promise.all([
    fetchTrendingWebRepos(),
    fetchDevCommunityTrends()
  ]);

  const isLive = (githubRepos.length > 0 || devArticles.length > 0);
  const fetchedCount = githubRepos.length + devArticles.length;

  // Extract actionable design patterns from live findings
  const extractedInsights = [];

  if (githubRepos.length > 0) {
    extractedInsights.push(...githubRepos.slice(0, 3).map(r => `Trending Repository: ${r.name} - ${r.description || 'Modern UI architecture'}`));
  }
  if (devArticles.length > 0) {
    extractedInsights.push(...devArticles.slice(0, 3).map(a => `Community Architecture Insight: "${a.title}" (Topics: ${(a.tags || []).slice(0, 3).join(', ')})`));
  }

  // Always augment with core 2026 design foundation for foolproof reliability
  const combinedPrinciples = [
    ...CORE_DESIGN_FOUNDATION.modernPrinciples2026,
    ...extractedInsights
  ];

  const durationMs = Date.now() - startTime;
  console.log(`[WebGrabber] Finished internet grab in ${durationMs}ms (Live Sources: ${fetchedCount}, Status: ${isLive ? 'ONLINE_LIVE' : 'CACHED_BASELINE'})`);

  return {
    status: isLive ? 'ONLINE_LIVE' : 'CACHED_BASELINE',
    isLive,
    sourceCount: fetchedCount,
    timestamp: new Date().toISOString(),
    durationMs,
    principles: combinedPrinciples,
    trendingRepos: githubRepos,
    trendingArticles: devArticles,
    palettes: CORE_DESIGN_FOUNDATION.curatedPalettes
  };
}
