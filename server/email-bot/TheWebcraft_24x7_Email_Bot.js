/**
 * ==============================================================================
 * THE WEBCRAFT - 24/7 ZERO-SERVER AI EMAIL AUTO-RESPONDER BOT
 * ==============================================================================
 * 
 * Works 24/7/365 on Google Cloud (Google Apps Script) without ANY server or PC turned on!
 * 100% Free Forever.
 * 
 * Capabilities:
 * - Detects new incoming emails to thewebcraft404@gmail.com
 * - Ignores automated spam/newsletters/no-reply senders
 * - Uses Google Gemini AI (Free API) to understand client requests and draft 
 *   a genuine, context-aware, respectful, human-like studio response
 * - Seamless fallback template if Gemini API key is not yet set
 * - Thread-safe: Replies directly inside the conversation thread
 * - Applies 'WEBCRAFT_REPLIED' label to prevent duplicate responses
 * ==============================================================================
 */

// CONFIGURATION
const CONFIG = {
  STUDIO_NAME: 'THE WEBCRAFT',
  LEAD_ENGINEER: 'Rakshit Patel',
  STUDIO_PHONE: '+91 94282 98134',
  PHONE_NOTE: 'WhatsApp Chat Only • No Direct Calls',
  STUDIO_EMAIL: 'thewebcraft404@gmail.com',
  TRACKING_URL: 'https://the-webcraft.studio/track',
  PRICING_START: '₹19,500',
  PROCESSED_LABEL: 'WEBCRAFT_REPLIED',
  
  // (Optional) Get your permanent free API key from https://aistudio.google.com/
  // If empty, the bot automatically uses our smart studio response generator!
  GEMINI_API_KEY: '', // Paste your free Gemini API key here
};

/**
 * Main trigger function - run every 1 to 5 minutes automatically via Time-Driven Trigger
 */
function checkAndAutoReplyEmails() {
  const label = getOrCreateLabel(CONFIG.PROCESSED_LABEL);
  
  // Find unread inbox messages from the past 2 days not yet replied by the bot
  const searchQuery = `in:inbox is:unread -label:${CONFIG.PROCESSED_LABEL} newer_than:2d`;
  const threads = GmailApp.search(searchQuery, 0, 10);

  if (threads.length === 0) {
    Logger.log('[THE WEBCRAFT BOT] No new pending client emails found.');
    return;
  }

  Logger.log(`[THE WEBCRAFT BOT] Found ${threads.length} thread(s) to process.`);

  for (let i = 0; i < threads.length; i++) {
    const thread = threads[i];
    const messages = thread.getMessages();
    const lastMessage = messages[messages.length - 1];

    const sender = lastMessage.getFrom();
    const subject = lastMessage.getSubject();
    const body = lastMessage.getPlainBody();

    // Safety checks: Skip automated mailers, bounces, or emails sent by our own address
    if (shouldSkipSender(sender, subject)) {
      Logger.log(`[SKIPPED] Automated or self email from: ${sender}`);
      thread.addLabel(label);
      continue;
    }

    Logger.log(`[PROCESSING] Email from: ${sender} | Subject: "${subject}"`);

    // Generate genuine human-like contextual response
    const replyBody = generateGenuineReply(sender, subject, body);

    try {
      // Reply directly in thread
      thread.reply(replyBody, {
        name: `${CONFIG.STUDIO_NAME} | ${CONFIG.LEAD_ENGINEER}`,
        replyTo: CONFIG.STUDIO_EMAIL,
      });

      // Mark as processed so it never loops or double-replies
      thread.addLabel(label);
      thread.markRead();

      Logger.log(`[SUCCESS] Auto-reply sent to ${sender}`);
    } catch (err) {
      Logger.log(`[ERROR] Failed to reply to ${sender}: ${err.toString()}`);
    }
  }
}

/**
 * Filter out marketing bots, notifications, and automated service emails
 */
function shouldSkipSender(sender, subject) {
  const senderLower = sender.toLowerCase();
  const subjectLower = subject.toLowerCase();

  // Skip self
  if (senderLower.includes(CONFIG.STUDIO_EMAIL.toLowerCase())) return true;

  // Common automated bots & newsletters
  const automatedKeywords = [
    'no-reply', 'noreply', 'mailer-daemon', 'bounce', 'postmaster',
    'notification', 'donotreply', 'billing', 'accounts.google.com',
    'linkedin', 'facebookmail', 'instagram', 'twitter', 'github.com',
    'digest', 'security alert', 'promo', 'newsletter'
  ];

  for (const keyword of automatedKeywords) {
    if (senderLower.includes(keyword) || subjectLower.includes(keyword)) {
      return true;
    }
  }

  return false;
}

/**
 * Generates an intelligent, genuine response tailored to the client's query
 */
function generateGenuineReply(sender, subject, body) {
  const senderClean = cleanSenderName(sender);

  // Try AI reply if Gemini API Key is provided
  if (CONFIG.GEMINI_API_KEY && CONFIG.GEMINI_API_KEY.trim() !== '') {
    try {
      const aiReply = fetchGeminiAIReply(senderClean, subject, body);
      if (aiReply && aiReply.trim().length > 50) {
        return aiReply;
      }
    } catch (e) {
      Logger.log(`[AI ERROR] Falling back to studio template: ${e.toString()}`);
    }
  }

  // High-Grade Studio Fallback Template (Context-Aware)
  return buildStudioTemplateReply(senderClean, subject, body);
}

/**
 * Call Gemini 2.5 Flash (Google Free Tier) for human-grade contextual reply
 */
function fetchGeminiAIReply(senderName, subject, clientMessage) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${CONFIG.GEMINI_API_KEY.trim()}`;

  const systemInstruction = `You are the lead email response assistant for "THE WEBCRAFT" (Web Development Studio) led by Lead Engineer Rakshit Patel.
You are replying directly to a potential client or partner named "${senderName}".
Rules:
1. Tone: Highly professional, warm, polite, confident, genuine, human (never sound like a generic robot or canned autoresponder).
2. Key Studio Principles to mention naturally:
   - We build custom tailored websites, high-conversion landing pages, corporate portals, and bespoke web platforms (packages start at ${CONFIG.PRICING_START}).
   - Zero upfront online fees on website: Clients review their working live demo first; payment is settled only upon demo satisfaction.
   - 100% Client Source Code Ownership: No vendor lock-in.
   - For fast coordination, Lead Engineer Rakshit Patel is available on WhatsApp/SMS: ${CONFIG.STUDIO_PHONE} (${CONFIG.PHONE_NOTE}).
3. Specifically address what the client mentioned in their email ("${subject}").
4. Keep the email concise (3-4 brief paragraphs), well-formatted, and sign off as:
   Warm regards,
   Rakshit Patel | Lead Developer
   THE WEBCRAFT Web Development Studio
   Studio Line: ${CONFIG.STUDIO_PHONE} (${CONFIG.PHONE_NOTE})
   Email: ${CONFIG.STUDIO_EMAIL}`;

  const payload = {
    contents: [
      {
        parts: [
          {
            text: `${systemInstruction}\n\nClient Subject: ${subject}\nClient Message:\n${clientMessage.substring(0, 1500)}`
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 600,
    }
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(url, options);
  const responseData = JSON.parse(response.getContentText());

  if (responseData.candidates && responseData.candidates.length > 0) {
    return responseData.candidates[0].content.parts[0].text;
  }

  return null;
}

/**
 * Contextual smart fallback template if Gemini key is not configured
 */
function buildStudioTemplateReply(senderName, subject, body) {
  const greeting = senderName ? `Hello ${senderName},` : 'Hello,';
  
  // Detect inquiry topic
  const lowerBody = (subject + ' ' + body).toLowerCase();
  let inquiryFocus = 'your custom website inquiry';
  if (lowerBody.includes('ecommerce') || lowerBody.includes('shop') || lowerBody.includes('store')) {
    inquiryFocus = 'your E-Commerce store & product catalog platform';
  } else if (lowerBody.includes('landing') || lowerBody.includes('lead')) {
    inquiryFocus = 'your high-conversion Landing Page';
  } else if (lowerBody.includes('custom') || lowerBody.includes('app') || lowerBody.includes('portal')) {
    inquiryFocus = 'your bespoke custom web architecture & web app';
  } else if (lowerBody.includes('pricing') || lowerBody.includes('quote') || lowerBody.includes('cost')) {
    inquiryFocus = 'your pricing estimation and project quote';
  }

  return `${greeting}

Thank you for reaching out to THE WEBCRAFT regarding ${inquiryFocus}.

This is an automated confirmation from our studio desk to let you know that your message has been received directly in our production queue. Lead Engineer Rakshit Patel is reviewing your specifications and will follow up with tailored wireframe thoughts and project milestones within 2 to 4 business hours.

Here is how we work at THE WEBCRAFT:
1. Zero Upfront Online Payment: We never ask for upfront credit cards or online deposits. We build and show you a working live private demo first.
2. 100% Client Ownership: Once approved and handed over, you own the entire source code, design assets, and database architecture outright.
3. Transparent Pricing: Direct developer pricing starting from ${CONFIG.PRICING_START} with direct 1-on-1 engineer access.

If your requirement is urgent or you would like to share design references, Figma files, or project PDFs right away:
- Direct Studio Line: ${CONFIG.STUDIO_PHONE} (${CONFIG.PHONE_NOTE})
- Studio Email: ${CONFIG.STUDIO_EMAIL}

We look forward to building a high-performance web platform for your business!

Warm regards,

Rakshit Patel
Lead Full-Stack Web Engineer
THE WEBCRAFT - Custom Web Development Studio
Direct Line: ${CONFIG.STUDIO_PHONE} (${CONFIG.PHONE_NOTE})
Official Desk: ${CONFIG.STUDIO_EMAIL}`;
}

/**
 * Extracts first name cleanly from sender string (e.g. "Rahul Sharma <rahul@gmail.com>" -> "Rahul")
 */
function cleanSenderName(senderStr) {
  if (!senderStr) return '';
  let name = senderStr;
  if (senderStr.includes('<')) {
    name = senderStr.split('<')[0].replace(/["']/g, '').trim();
  }
  return name.split(' ')[0] || '';
}

/**
 * Helper to get or create Gmail label
 */
function getOrCreateLabel(name) {
  let label = GmailApp.getUserLabelByName(name);
  if (!label) {
    label = GmailApp.createLabel(name);
  }
  return label;
}
