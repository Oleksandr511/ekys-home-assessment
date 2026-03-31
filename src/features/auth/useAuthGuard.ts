import { useEffect } from 'react';
import { useAuthStore } from './store';

/**
 * Hook that checks token expiry on mount and periodically
 * Logs out user if token is expired
 */
export const useAuthGuard = () => {
  const { checkTokenExpiry, handleTokenExpiry } = useAuthStore();

  useEffect(() => {
    // Check on mount
    if (checkTokenExpiry()) {
      handleTokenExpiry();
    }

    // Check periodically (every minute)
    const interval = setInterval(() => {
      if (checkTokenExpiry()) {
        handleTokenExpiry();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [checkTokenExpiry, handleTokenExpiry]);
};
