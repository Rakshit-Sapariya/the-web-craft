import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const MAX_PROMO_ORDERS = 300;
export const DEFAULT_INITIAL_ORDERS = 6;
const STORAGE_KEY = 'twc_confirmed_orders_count';

/**
 * Calculates current tier based on order count (300 orders path):
 * - First 100 clients (0 - 99): 50% discount
 * - Second 100 clients (100 - 199): 25% discount
 * - Last 100 clients (200 - 299): 15% discount
 * - 300+ orders: All discounts automatically removed (0% discount)
 */
export function calculateTier(count) {
  const num = Math.max(0, parseInt(count, 10) || 0);

  if (num < 100) {
    const tierSlotsLeft = 100 - num;
    const totalSlotsLeft = 300 - num;
    return {
      orderCount: num,
      isOfferActive: true,
      tier: 1,
      tierName: 'Tier 1: First 100 Clients (50% OFF)',
      discountPercent: 50,
      tierSlotsLeft,
      totalSlotsLeft,
      badgeText: 'Tier 1: 50% FLAT DISCOUNT',
      announcement: '⚡ Tier 1 Exclusive: First 100 Clients Get 50% OFF!',
      headlineHighlight: 'First 100 Clients Get 50% Flat Discount'
    };
  } else if (num < 200) {
    const tierSlotsLeft = 200 - num;
    const totalSlotsLeft = 300 - num;
    return {
      orderCount: num,
      isOfferActive: true,
      tier: 2,
      tierName: 'Tier 2: Next 100 Clients (25% OFF)',
      discountPercent: 25,
      tierSlotsLeft,
      totalSlotsLeft,
      badgeText: 'Tier 2: 25% FLAT DISCOUNT',
      announcement: '⚡ Tier 2 Special: Next 100 Clients Get 25% OFF!',
      headlineHighlight: 'Next 100 Clients Get 25% Flat Discount'
    };
  } else if (num < 300) {
    const tierSlotsLeft = 300 - num;
    const totalSlotsLeft = 300 - num;
    return {
      orderCount: num,
      isOfferActive: true,
      tier: 3,
      tierName: 'Tier 3: Final 100 Clients (15% OFF)',
      discountPercent: 15,
      tierSlotsLeft,
      totalSlotsLeft,
      badgeText: 'Tier 3: 15% FLAT DISCOUNT',
      announcement: '⚡ Tier 3 Final Wave: Final 100 Clients Get 15% OFF!',
      headlineHighlight: 'Final 100 Clients Get 15% Flat Discount'
    };
  } else {
    return {
      orderCount: num,
      isOfferActive: false,
      tier: 4,
      tierName: 'Promotion Concluded (Standard Pricing)',
      discountPercent: 0,
      tierSlotsLeft: 0,
      totalSlotsLeft: 0,
      badgeText: 'Standard Studio Pricing',
      announcement: 'Bespoke Web Studio: Direct Booking • Custom Web Engineering • Zero Online Upfront',
      headlineHighlight: 'Handcrafted Bespoke Web Engineering'
    };
  }
}

export function getOrderCount() {
  if (typeof window === 'undefined') return DEFAULT_INITIAL_ORDERS;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored !== null) {
    const val = parseInt(stored, 10);
    if (!isNaN(val)) return val;
  }
  return DEFAULT_INITIAL_ORDERS;
}

export function isEarlyBirdActive() {
  return getOrderCount() < MAX_PROMO_ORDERS;
}

export function getSlotsRemaining() {
  const current = getOrderCount();
  return Math.max(0, MAX_PROMO_ORDERS - current);
}

export function setOrderCount(newCount) {
  const safeCount = Math.max(0, parseInt(newCount, 10) || 0);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, safeCount.toString());
    window.dispatchEvent(new CustomEvent('twc_order_count_updated', { detail: safeCount }));
  }
  // Sync with backend API
  api.setOfferCount(safeCount).catch(() => {});
  return safeCount;
}

export function incrementOrderCount() {
  const current = getOrderCount();
  return setOrderCount(current + 1);
}

export function resetOrderCount() {
  return setOrderCount(DEFAULT_INITIAL_ORDERS);
}

// Quick Simulator triggers for owner / developer verification
export function setTier1() {
  return setOrderCount(DEFAULT_INITIAL_ORDERS); // Tier 1: 50% OFF (6 orders in, 94 left)
}

export function setTier2() {
  return setOrderCount(115); // Tier 2: 25% OFF (115 orders in, 85 left in tier)
}

export function setTier3() {
  return setOrderCount(220); // Tier 3: 15% OFF (220 orders in, 80 left in tier)
}

export function setExpire300() {
  return setOrderCount(300); // Concluded: 0% discount (All discounts removed)
}

/**
 * React Hook for reactive 300 Customers Tier Offer state
 */
export function useOrderOffer() {
  const [offerState, setOfferState] = useState(() => calculateTier(getOrderCount()));

  useEffect(() => {
    // 1. Initial sync with backend
    let isMounted = true;
    api.getOfferStatus().then((res) => {
      if (isMounted && res && typeof res.orderCount === 'number') {
        localStorage.setItem(STORAGE_KEY, res.orderCount.toString());
        setOfferState(calculateTier(res.orderCount));
      }
    }).catch(() => {});

    // 2. Listen to custom event and cross-tab storage changes
    const handleUpdate = (e) => {
      const count = e.detail !== undefined ? e.detail : getOrderCount();
      setOfferState(calculateTier(count));
    };

    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        setOfferState(calculateTier(getOrderCount()));
      }
    };

    window.addEventListener('twc_order_count_updated', handleUpdate);
    window.addEventListener('storage', handleStorage);

    return () => {
      isMounted = false;
      window.removeEventListener('twc_order_count_updated', handleUpdate);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const applyDiscount = (price) => {
    if (!offerState.isOfferActive || offerState.discountPercent <= 0) {
      return price;
    }
    const factor = (100 - offerState.discountPercent) / 100;
    return Math.round(price * factor);
  };

  return {
    ...offerState,
    applyDiscount,
    setOrderCount,
    incrementOrderCount,
    resetOrderCount,
    setTier1,
    setTier2,
    setTier3,
    setExpire300,
  };
}
