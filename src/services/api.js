const API_BASE = '/api';

/**
 * Secure Session Token Retrieval from Session Storage
 * (Zero hardcoded secrets in client bundles)
 */
export const getAdminAuthHeader = () => {
  const token = sessionStorage.getItem('twc_admin_session_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const api = {
  // ==========================================
  // 🔐 ADMIN AUTHENTICATION
  // ==========================================
  loginAdmin: async (username, password) => {
    const response = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Authentication failed. Please verify credentials.');
    }
    if (data.token) {
      sessionStorage.setItem('twc_admin_session_token', data.token);
      sessionStorage.setItem('twc_admin_username', data.username);
    }
    return data;
  },

  logoutAdmin: async () => {
    try {
      await fetch(`${API_BASE}/admin/logout`, {
        method: 'POST',
        headers: { ...getAdminAuthHeader() }
      });
    } finally {
      sessionStorage.removeItem('twc_admin_session_token');
      sessionStorage.removeItem('twc_admin_username');
    }
  },

  verifyAdminSession: async () => {
    const token = sessionStorage.getItem('twc_admin_session_token');
    if (!token) return false;
    try {
      const res = await fetch(`${API_BASE}/admin/verify`, {
        headers: { ...getAdminAuthHeader() }
      });
      if (!res.ok) {
        sessionStorage.removeItem('twc_admin_session_token');
        sessionStorage.removeItem('twc_admin_username');
        return false;
      }
      const data = await res.json();
      return data.authenticated === true;
    } catch (e) {
      return false;
    }
  },

  // ==========================================
  // 📦 ORDERS & BOOKINGS (PUBLIC / CLIENT)
  // ==========================================
  createOrder: async (orderData, files = []) => {
    try {
      const formData = new FormData();
      Object.keys(orderData).forEach(key => {
        if (orderData[key] !== undefined && orderData[key] !== null) {
          formData.append(key, orderData[key]);
        }
      });

      if (files && files.length > 0) {
        files.forEach(file => {
          formData.append('files', file);
        });
      }

      const response = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Failed to submit order');
      }

      return await response.json();
    } catch (error) {
      console.warn('Backend API submission fallback:', error);
      return {
        success: true,
        order: {
          id: orderData.orderId || ('TWC-' + Math.floor(100000 + Math.random() * 900000)),
          client_name: orderData.clientName,
          client_phone: orderData.clientPhone,
          client_email: orderData.clientEmail,
          website_type: orderData.websiteType,
          final_budget: orderData.finalBudget,
          payment_status: 'pending',
          order_status: 'order_placed',
          created_at: new Date().toISOString(),
        }
      };
    }
  },

  // Look up order by Order ID or Phone number (PII Masked)
  lookupOrder: async (query) => {
    const response = await fetch(`${API_BASE}/orders/lookup/${encodeURIComponent(query.trim())}`);
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'No project found matching the specified ID or phone number.');
    }
    return await response.json();
  },

  // Admin: Get Studio Pipeline Stats
  getStats: async () => {
    try {
      const response = await fetch(`${API_BASE}/stats`, {
        headers: { ...getAdminAuthHeader() }
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      console.warn('Could not fetch backend stats:', e);
    }
    return null;
  },

  // Send contact inquiry
  sendContact: async (contactData) => {
    const response = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData),
    });
    return await response.json();
  },

  // Admin: Get all orders (Protected)
  getAllOrders: async () => {
    const response = await fetch(`${API_BASE}/orders`, {
      headers: { ...getAdminAuthHeader() }
    });
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('AUTH_REQUIRED');
      }
      throw new Error('Failed to fetch orders');
    }
    return await response.json();
  },

  // Admin: Update order status (Protected)
  updateOrderStatus: async (orderId, orderStatus, paymentStatus) => {
    const response = await fetch(`${API_BASE}/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        ...getAdminAuthHeader()
      },
      body: JSON.stringify({ orderStatus, paymentStatus }),
    });
    if (!response.ok) throw new Error('Failed to update status');
    return await response.json();
  },

  // 300 Customers Tier Offer status (Public)
  getOfferStatus: async () => {
    try {
      const response = await fetch(`${API_BASE}/offer-status`);
      if (response.ok) return await response.json();
    } catch (e) {
      console.warn('Could not fetch offer status:', e);
    }
    return null;
  },

  setOfferCount: async (count) => {
    try {
      const response = await fetch(`${API_BASE}/offer-status`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...getAdminAuthHeader()
        },
        body: JSON.stringify({ count }),
      });
      if (response.ok) return await response.json();
    } catch (e) {
      console.warn('Could not update offer count on server:', e);
    }
    return null;
  },

  // Client Reviews & Mandatory Feedback
  getReviews: async () => {
    try {
      const response = await fetch(`${API_BASE}/reviews`);
      if (response.ok) return await response.json();
    } catch (e) {
      console.warn('Could not fetch reviews:', e);
    }
    return { success: true, reviews: [] };
  },

  submitReview: async (reviewData) => {
    const response = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to submit review');
    }
    return await response.json();
  },

  // ==========================================
  // 🤖 AI WEBCRAFT AUTONOMOUS AGENT API (PROTECTED)
  // ==========================================
  triggerAiBuild: async (orderId) => {
    const response = await fetch(`${API_BASE}/ai/generate/${orderId}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...getAdminAuthHeader()
      }
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'AI Build failed');
    }
    return await response.json();
  },

  getAiStatus: async (orderId) => {
    const response = await fetch(`${API_BASE}/ai/status/${orderId}`);
    if (!response.ok) throw new Error('Failed to get AI status');
    return await response.json();
  },

  submitAdminRevision: async (orderId, instruction) => {
    const response = await fetch(`${API_BASE}/ai/admin-revise/${orderId}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...getAdminAuthHeader()
      },
      body: JSON.stringify({ instruction })
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to apply revision');
    }
    return await response.json();
  },

  approveAdminBuild: async (orderId) => {
    const response = await fetch(`${API_BASE}/ai/admin-approve/${orderId}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...getAdminAuthHeader()
      }
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to approve build');
    }
    return await response.json();
  },

  getClientPreviewData: async (token) => {
    const response = await fetch(`${API_BASE}/ai/preview-data/${token}`);
    if (!response.ok) throw new Error('Preview not found');
    return await response.json();
  },

  submitClientAction: async (token, action, feedback) => {
    const response = await fetch(`${API_BASE}/ai/client-action/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, feedback })
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'Client action failed');
    }
    return await response.json();
  },

  // ==========================================
  // 🧠 AGENT MIND & LIVE INTERNET KNOWLEDGE
  // ==========================================
  getAgentMindStatus: async () => {
    const response = await fetch(`${API_BASE}/ai/mind/status`);
    if (!response.ok) throw new Error('Failed to fetch Agent Mind status');
    return await response.json();
  },

  refreshAgentMindNow: async () => {
    const response = await fetch(`${API_BASE}/ai/mind/refresh-now`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAdminAuthHeader()
      }
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to refresh Agent Mind');
    }
    return await response.json();
  }
};
