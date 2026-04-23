/**
 * Advanced token manager with automatic refresh, expiration tracking, and diagnostics
 */

const TOKEN_KEY = 'tc_auth_token';
const USER_KEY = 'tc_auth_user';
const TOKEN_ISSUED_AT_KEY = 'tc_token_issued_at';
const TOKEN_EXPIRES_IN_KEY = 'tc_token_expires_in';
const AUTH_EVENT = 'tc-auth-changed';
const TOKEN_REFRESH_EVENT = 'tc-token-refresh';

// Token expiration buffer (refresh 5 minutes before expiry)
const REFRESH_BUFFER_MS = 5 * 60 * 1000;

class TokenManager {
  constructor() {
    this.refreshTimer = null;
    this.isRefreshing = false;
    this.refreshPromise = null;
  }

  /**
   * Get the stored token
   */
  getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  /**
   * Get token metadata (when it was issued and when it expires)
   */
  getTokenMetadata() {
    const issuedAt = sessionStorage.getItem(TOKEN_ISSUED_AT_KEY);
    const expiresIn = sessionStorage.getItem(TOKEN_EXPIRES_IN_KEY);
    
    return {
      issuedAt: issuedAt ? new Date(issuedAt) : null,
      expiresIn: expiresIn ? parseInt(expiresIn, 10) : null,
      expiresAt: issuedAt && expiresIn ? new Date(parseInt(issuedAt) + parseInt(expiresIn, 10)) : null,
    };
  }

  /**
   * Check if token is expired or close to expiry
   */
  isTokenExpired(bufferMs = 0) {
    const metadata = this.getTokenMetadata();
    if (!metadata.expiresAt) return true;
    
    const now = new Date();
    const expiryWithBuffer = new Date(metadata.expiresAt.getTime() - bufferMs);
    return now >= expiryWithBuffer;
  }

  /**
   * Get time until token expiration in milliseconds
   */
  getTimeUntilExpiry() {
    const metadata = this.getTokenMetadata();
    if (!metadata.expiresAt) return -1;
    
    const now = new Date();
    return Math.max(0, metadata.expiresAt.getTime() - now.getTime());
  }

  /**
   * Store token with metadata
   */
  storeToken(token, issuedAt = null, expiresIn = null) {
    if (!token) {
      this.clearToken();
      return;
    }

    sessionStorage.setItem(TOKEN_KEY, token);
    
    if (issuedAt) {
      const timestamp = typeof issuedAt === 'string' 
        ? new Date(issuedAt).getTime() 
        : issuedAt.getTime();
      sessionStorage.setItem(TOKEN_ISSUED_AT_KEY, timestamp.toString());
    }

    if (expiresIn) {
      sessionStorage.setItem(TOKEN_EXPIRES_IN_KEY, expiresIn.toString());
    }

    this.scheduleTokenRefresh();
    window.dispatchEvent(new Event(TOKEN_REFRESH_EVENT));
  }

  /**
   * Clear stored token
   */
  clearToken() {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_ISSUED_AT_KEY);
    sessionStorage.removeItem(TOKEN_EXPIRES_IN_KEY);
    this.cancelRefreshSchedule();
  }

  /**
   * Schedule automatic token refresh before expiry
   */
  scheduleTokenRefresh() {
    this.cancelRefreshSchedule();

    const timeUntilExpiry = this.getTimeUntilExpiry();
    if (timeUntilExpiry < 0) {
      // Token already expired
      this.clearToken();
      return;
    }

    const refreshIn = Math.max(0, timeUntilExpiry - REFRESH_BUFFER_MS);
    
    if (refreshIn > 0) {
      this.refreshTimer = setTimeout(() => {
        window.dispatchEvent(new Event(TOKEN_REFRESH_EVENT));
      }, refreshIn);
    }
  }

  /**
   * Cancel the scheduled token refresh
   */
  cancelRefreshSchedule() {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  /**
   * Get device diagnostics for troubleshooting
   */
  getDiagnostics() {
    const token = this.getToken();
    const metadata = this.getTokenMetadata();
    const now = new Date();
    
    return {
      hasToken: !!token,
      tokenLength: token ? token.length : 0,
      issuedAt: metadata.issuedAt?.toISOString() || 'N/A',
      expiresAt: metadata.expiresAt?.toISOString() || 'N/A',
      expiresIn: metadata.expiresIn || 'N/A',
      timeUntilExpiry: `${(this.getTimeUntilExpiry() / 1000).toFixed(0)}s`,
      isExpired: this.isTokenExpired(),
      isNearExpiry: this.isTokenExpired(REFRESH_BUFFER_MS),
      serverTime: now.toISOString(),
      deviceTime: now.getTime(),
      sessionStorageKeys: Object.keys(sessionStorage).filter(k => k.startsWith('tc_')),
    };
  }

  /**
   * Validate token vs server time (helps detect clock skew issues)
   */
  validateClockSync(serverTime) {
    const metadata = this.getTokenMetadata();
    if (!metadata.issuedAt || !metadata.expiresAt) {
      return { isSynced: true, skewMs: 0, issue: null };
    }

    const now = new Date();
    const serverDate = new Date(serverTime);
    const skewMs = Math.abs(now.getTime() - serverDate.getTime());

    // Flag if clock skew is more than 5 minutes
    const hasSkew = skewMs > 5 * 60 * 1000;

    return {
      isSynced: !hasSkew,
      skewMs,
      issue: hasSkew ? 'Device clock is out of sync with server' : null,
    };
  }
}

export default new TokenManager();
