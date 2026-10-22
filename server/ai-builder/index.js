import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv, callLLM } from './llm-provider.js';
import { buildWebsitePrompt } from './prompt-architect.js';
import { thinkAndPlanWebsite } from './agent-mind.js';
import { generateClientWebsite } from './generator.js';
import { runSelfHealingLoop } from './healer.js';
import { generateAdminTour, applyModifications } from './tour-guide.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, '..', '..', '.env');
loadEnv(envPath);

/**
 * Main Autonomous Orchestrator:
 * Executes the entire cognitive lifecycle from order intake & internet research to
 * 5-stage thinking reasoning, error-free website build, and tour generation.
 */
export async function orchestrateAutonomousBuild(order) {
  const startTime = Date.now();
  console.log(`[AI Agent Mind] 🧠 Starting cognitive autonomous build for Order ${order.id} (${order.client_name})...`);

  // Step 1: Autonomous Cognitive Thinking & Live Internet Research Loop
  let promptData = null;
  let thoughtStream = [];
  let mindMetrics = null;

  try {
    const mindPlan = await thinkAndPlanWebsite(order);
    promptData = mindPlan.promptData;
    thoughtStream = mindPlan.thoughtStream;
    mindMetrics = mindPlan.mindMetrics;
    console.log(`[AI Agent Mind] Thought loop completed (${thoughtStream.length} stages, Confidence: ${mindMetrics.confidenceScore}%)`);
  } catch (err) {
    console.warn('[AI Agent Mind] Warning in cognitive mind loop, using fallback prompt architect:', err.message);
    promptData = buildWebsitePrompt(order);
  }

  // Step 2: AI Code Generation (via Free LLM APIs or High-End Studio Synthesizer)
  let rawAiOutput = null;
  try {
    const llmRes = await callLLM({
      prompt: promptData.prompt,
      systemInstruction: promptData.systemInstruction,
    });
    if (llmRes.text) {
      rawAiOutput = llmRes.text;
      console.log(`[AI Agent] Generated code using provider: ${llmRes.provider}`);
    } else {
      console.log('[AI Agent] Generating code using WebCraft Studio Engine (100% reliable)...');
    }
  } catch (err) {
    console.warn('[AI Agent] LLM call error, using Studio synthesizer:', err.message);
  }

  // Step 3: Scaffold and write website files
  const buildResult = generateClientWebsite(order, promptData, rawAiOutput);

  // Step 4: Self-Healing & Error Resolution Loop
  const healResult = runSelfHealingLoop(buildResult.indexPath);

  // Step 5: Admin Tour & Walkthrough Generation with Cognitive Thought Stream
  const tourData = generateAdminTour(order, buildResult, healResult, thoughtStream, mindMetrics);

  const durationMs = Date.now() - startTime;
  console.log(`[AI Agent] Build completed for ${order.id} in ${durationMs}ms (Health: ${healResult.healthScore}%)`);

  return {
    success: true,
    orderId: order.id,
    durationMs,
    promptData,
    thoughtStream,
    mindMetrics,
    buildResult,
    healResult,
    tourData,
    previewUrl: `/client-demos/${order.id}/index.html`,
    clientPreviewToken: `preview_${order.id}_${Math.random().toString(36).substring(2, 9)}`,
  };
}

/**
 * Executes requested revisions and re-heals the build
 */
export function orchestrateRevision(order, modificationText, source = 'admin') {
  const projectDir = path.join(__dirname, '..', '..', 'client-builds', order.id);
  const indexPath = path.join(projectDir, 'index.html');

  applyModifications(indexPath, modificationText);
  const healResult = runSelfHealingLoop(indexPath);

  return {
    success: true,
    orderId: order.id,
    source,
    modificationText,
    healResult,
    updatedAt: new Date().toISOString()
  };
}
