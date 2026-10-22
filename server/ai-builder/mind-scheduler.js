/**
 * Autonomous Mind 3-Hour Scheduler:
 * Continuously connects the Web Builder Agent's mind to the live internet,
 * updating its design intelligence, trends, and rules every 3 hours.
 */

import { loadMindBrain, updateMindFromInternet } from './agent-mind.js';

const THREE_HOURS_MS = 3 * 60 * 60 * 1000; // 10,800,000 ms

let schedulerInterval = null;
let catchupTimeout = null;
let nextSyncTimestamp = null;
let isUpdating = false;

/**
 * Format remaining milliseconds into human-readable string (e.g. "2h 45m" or "Just updated")
 */
function formatRemaining(ms) {
  if (ms <= 0) return 'Syncing shortly...';
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

/**
 * Perform an autonomous sync cycle and reschedule next run
 */
async function performSyncCycle(reason = '3_hour_schedule') {
  if (isUpdating) {
    console.log('[MindScheduler] Sync already in progress, skipping duplicate call.');
    return;
  }

  isUpdating = true;
  console.log(`[MindScheduler] 🕒 Triggering autonomous internet sync (${reason})...`);

  try {
    const result = await updateMindFromInternet();
    nextSyncTimestamp = Date.now() + THREE_HOURS_MS;
    console.log(`[MindScheduler] ✓ Sync finished successfully. Next sync in 3 hours (${new Date(nextSyncTimestamp).toLocaleTimeString()}).`);
    return result;
  } catch (err) {
    console.error('[MindScheduler] Error during autonomous sync:', err.message);
  } finally {
    isUpdating = false;
  }
}

/**
 * Start the autonomous background scheduler
 */
export function startAutonomousMindScheduler() {
  if (schedulerInterval) {
    clearInterval(schedulerInterval);
    schedulerInterval = null;
  }

  const brain = loadMindBrain();
  const lastSyncTime = brain.lastInternetSync ? new Date(brain.lastInternetSync).getTime() : 0;
  const elapsedSinceLastSync = Date.now() - lastSyncTime;

  console.log(`[MindScheduler] Initializing 3-Hour Autonomous Loop (Elapsed since last sync: ${Math.round(elapsedSinceLastSync / 60000)} mins)...`);

  // If more than 3 hours passed since last sync (or never synced), sync immediately
  if (elapsedSinceLastSync >= THREE_HOURS_MS || isNaN(elapsedSinceLastSync)) {
    console.log('[MindScheduler] Last sync was > 3 hours ago. Triggering immediate refresh...');
    performSyncCycle('initial_boot_stale');
    nextSyncTimestamp = Date.now() + THREE_HOURS_MS;
  } else {
    const remainingTime = THREE_HOURS_MS - elapsedSinceLastSync;
    nextSyncTimestamp = Date.now() + remainingTime;
    console.log(`[MindScheduler] Next scheduled 3-hour sync in ${formatRemaining(remainingTime)}.`);
    
    // Set a one-shot timeout for the remaining time, then proceed with the recurring interval
    catchupTimeout = setTimeout(() => {
      performSyncCycle('first_scheduled_catchup');
      schedulerInterval = setInterval(() => {
        performSyncCycle('recurring_3_hour_interval');
      }, THREE_HOURS_MS);
      if (schedulerInterval && schedulerInterval.unref) schedulerInterval.unref();
    }, remainingTime);
    if (catchupTimeout && catchupTimeout.unref) catchupTimeout.unref();
  }

  // Setup main 3-hour recurring interval if not already pending on catchup
  if (!schedulerInterval && !catchupTimeout) {
    schedulerInterval = setInterval(() => {
      performSyncCycle('recurring_3_hour_interval');
    }, THREE_HOURS_MS);
    if (schedulerInterval && schedulerInterval.unref) schedulerInterval.unref();
  }

  return {
    started: true,
    intervalMs: THREE_HOURS_MS,
    nextSyncTimestamp
  };
}

/**
 * Stop the background scheduler cleanly
 */
export function stopAutonomousMindScheduler() {
  if (schedulerInterval) {
    clearInterval(schedulerInterval);
    schedulerInterval = null;
  }
  if (catchupTimeout) {
    clearTimeout(catchupTimeout);
    catchupTimeout = null;
  }
  console.log('[MindScheduler] Background scheduler stopped.');
}

/**
 * Force an immediate manual refresh of the mind via internet
 */
export async function forceMindRefresh() {
  const result = await performSyncCycle('admin_manual_trigger');
  nextSyncTimestamp = Date.now() + THREE_HOURS_MS;
  return {
    ...result,
    nextSyncTimestamp,
    remainingFormatted: formatRemaining(THREE_HOURS_MS)
  };
}

/**
 * Get comprehensive real-time status of the Agent Mind and internet connection
 */
export function getMindStatus() {
  const brain = loadMindBrain();
  const now = Date.now();
  const remainingMs = nextSyncTimestamp ? Math.max(0, nextSyncTimestamp - now) : THREE_HOURS_MS;

  return {
    isOnline: true,
    isUpdating,
    syncStatus: brain.syncStatus || 'ONLINE_CONNECTED',
    version: brain.version,
    cycleCount: brain.updateCycleCount || 0,
    lastInternetSync: brain.lastInternetSync,
    nextSyncTimestamp: nextSyncTimestamp ? new Date(nextSyncTimestamp).toISOString() : null,
    remainingMs,
    remainingFormatted: formatRemaining(remainingMs),
    totalTrendsLearned: (brain.liveTrendsLearned || []).length,
    activeTrends: (brain.liveTrendsLearned || []).slice(0, 10),
    syncHistory: brain.syncHistory || [],
    recentThinkingLogs: brain.recentThinkingLogs || []
  };
}
