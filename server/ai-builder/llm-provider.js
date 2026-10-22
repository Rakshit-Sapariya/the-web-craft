import fs from 'node:fs';
import path from 'node:path';

// Load .env file manually if exists
export function loadEnv(envPath) {
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

/**
 * Universal Multi-Provider LLM Caller
 * Supports:
 * - Google Gemini (Gemini 2.5 Flash / Pro) - 1M Context, Free
 * - Groq (Llama-3.3-70b-versatile) - Ultra-fast, Free
 * - OpenRouter (openrouter/free models) - Free
 * - Intelligent Studio Fallback Generator (always works, 0-cost, 0-config)
 */
export async function callLLM({ prompt, systemInstruction = '', maxTokens = 4096 }) {
  const geminiKey = process.env.GEMINI_API_KEY;
  const groqKey = process.env.GROQ_API_KEY;
  const openRouterKey = process.env.OPENROUTER_API_KEY;

  // 1. Try Google Gemini (Largest Context & Free)
  if (geminiKey) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`;
      const payload = {
        contents: [
          {
            role: 'user',
            parts: [{ text: (systemInstruction ? systemInstruction + '\n\n' : '') + prompt }]
          }
        ],
        generationConfig: {
          maxOutputTokens: maxTokens,
          temperature: 0.7,
        }
      };

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(6000)
      });

      if (res.ok) {
        const data = await res.json();
        const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidate) {
          return { provider: 'gemini-2.5-flash', text: candidate };
        }
      }
    } catch (err) {
      console.warn('[AI Builder] Gemini call failed, trying next provider:', err.message);
    }
  }

  // 2. Try Groq (Ultra-fast, Llama 3.3 70B, Free)
  if (groqKey) {
    try {
      const url = 'https://api.groq.com/openai/v1/chat/completions';
      const messages = [];
      if (systemInstruction) messages.push({ role: 'system', content: systemInstruction });
      messages.push({ role: 'user', content: prompt });

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages,
          max_tokens: maxTokens,
          temperature: 0.7
        }),
        signal: AbortSignal.timeout(6000)
      });

      if (res.ok) {
        const data = await res.json();
        const answer = data.choices?.[0]?.message?.content;
        if (answer) {
          return { provider: 'groq-llama-3.3', text: answer };
        }
      }
    } catch (err) {
      console.warn('[AI Builder] Groq call failed, trying next provider:', err.message);
    }
  }

  // 3. Try OpenRouter (Free zero-cost models)
  if (openRouterKey) {
    try {
      const url = 'https://openrouter.ai/api/v1/chat/completions';
      const messages = [];
      if (systemInstruction) messages.push({ role: 'system', content: systemInstruction });
      messages.push({ role: 'user', content: prompt });

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openRouterKey}`,
          'HTTP-Referer': 'https://the-webcraft.studio',
          'X-Title': 'The WebCraft Studio'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.3-70b-instruct:free',
          messages,
          max_tokens: maxTokens,
        }),
        signal: AbortSignal.timeout(6000)
      });

      if (res.ok) {
        const data = await res.json();
        const answer = data.choices?.[0]?.message?.content;
        if (answer) {
          return { provider: 'openrouter-free', text: answer };
        }
      }
    } catch (err) {
      console.warn('[AI Builder] OpenRouter call failed:', err.message);
    }
  }

  // 4. Return Heuristic Studio fallback indication
  return { provider: 'webcraft-studio-heuristic', text: null };
}
