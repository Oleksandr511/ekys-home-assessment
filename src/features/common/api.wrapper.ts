import { useAuthStore } from '../auth/store';

/**
 * API Wrapper that automatically handles token refresh on 401 errors.
 * Implements refresh-then-retry pattern:
 * - If request fails with 401, attempt to refresh token once
 * - If refresh succeeds, retry original request once
 * - If refresh fails, logout and throw error
 */
export const withRefreshRetry = async <T,>(
  apiCall: (accessToken: string) => Promise<T>,
  refreshToken: string
): Promise<T> => {
  const authStore = useAuthStore.getState();

  try {
    // Try original request with current access token
    const result = await apiCall(authStore.session?.accessToken || '');
    return result;
  } catch (error: any) {
    // Check if error is 401 (unauthorized)
    const is401 = error.statusCode === 401;

    if (!is401) {
      // Not an auth error, just throw
      throw error;
    }

    // Token is expired, attempt to refresh
    try {
      await authStore.refresh(refreshToken);

      // Get new token from updated state
      const newAuthState = useAuthStore.getState();
      const newAccessToken = newAuthState.session?.accessToken;

      if (!newAccessToken) {
        throw new Error('Failed to get new access token');
      }

      // Retry original request with new token
      const result = await apiCall(newAccessToken);
      return result;
    } catch (refreshError) {
      // Refresh failed, logout and throw
      authStore.handleTokenExpiry();
      throw refreshError;
    }
  }
};
