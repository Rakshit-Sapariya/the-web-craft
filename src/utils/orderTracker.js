import { useState, useEffect } from 'react';

export const MAX_PROMO_ORDERS = 10;
export const DEFAULT_INITIAL_ORDERS = 6; // 6 orders done -> 4 slots remaining
const STORAGE_KEY = 'thewebcraft_confirmed_orders_count';

// Read current count from localStorage or fallback
export function getOrderCount() {
  if (typeof window === 'undefined') return DEFAULT_INITIAL_ORDERS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      const parsed = parseInt(stored, 10);
      return isNaN(parsed) ? DEFAULT_INITIAL_ORDERS : Math.max(0, parsed);
    }
  } catch (e) {
    console.warn('Could not read from localStorage:', e);
  }
  return DEFAULT_INITIAL_ORDERS;
}

// Check if early bird offer is still active
export function isEarlyBirdActive() {
  return getOrderCount() < MAX_PROMO_ORDERS;
}

// Calculate remaining promotional slots
export function getSlotsRemaining() {
  return Math.max(0, MAX_PROMO_ORDERS - getOrderCount());
}

// Update order count and notify all components
export function setOrderCount(count) {
  if (typeof window === 'undefined') return;
  const safeCount = Math.max(0, parseInt(count, 10) || 0);
  try {
    localStorage.setItem(STORAGE_KEY, safeCount.toString());
  } catch (e) {
    console.warn('Could not write to localStorage:', e);
  }
  window.dispatchEvent(new CustomEvent('webcraft_order_updated', {
    detail: { orderCount: safeCount, isOfferActive: safeCount < MAX_PROMO_ORDERS }
  }));
}

// Increment order count by 1 (e.g. when payment confirmed)
export function incrementOrderCount() {
  const current = getOrderCount();
  const next = current + 1;
  setOrderCount(next);
  return next;
}

// Reset order count for testing
export function resetOrderCount(count = DEFAULT_INITIAL_ORDERS) {
  setOrderCount(count);
}

// React Hook for reactive order & offer state across all pages and components
export function useOrderOffer() {
  const [orderState, setOrderState] = useState(() => {
    const count = getOrderCount();
    return {
      orderCount: count,
      isOfferActive: count < MAX_PROMO_ORDERS,
      slotsRemaining: Math.max(0, MAX_PROMO_ORDERS - count),
      discountPercent: count < MAX_PROMO_ORDERS ? 15 : 0,
    };
  });

  useEffect(() => {
    const syncState = () => {
      const count = getOrderCount();
      setOrderState({
        orderCount: count,
        isOfferActive: count < MAX_PROMO_ORDERS,
        slotsRemaining: Math.max(0, MAX_PROMO_ORDERS - count),
        discountPercent: count < MAX_PROMO_ORDERS ? 15 : 0,
      });
    };

    window.addEventListener('webcraft_order_updated', syncState);
    window.addEventListener('storage', syncState);

    return () => {
      window.removeEventListener('webcraft_order_updated', syncState);
      window.removeEventListener('storage', syncState);
    };
  }, []);

  return {
    ...orderState,
    incrementOrderCount,
    setOrderCount,
    resetOrderCount,
  };
}
