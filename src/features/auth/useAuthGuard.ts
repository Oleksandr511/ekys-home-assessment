import { useEffect } from "react";
import { useAuthStore } from "./store";

/**
 * Hook that checks token expiry on mount and periodically
 * Logs out user if token is expired
 */
export const useAuthGuard = () => {
  const status = useAuthStore((state) => state.status);
  const checkTokenExpiry = useAuthStore((state) => state.checkTokenExpiry);
  const handleTokenExpiry = useAuthStore((state) => state.handleTokenExpiry);

  useEffect(() => {
    if (status !== "logged_in" && status !== "refreshing") {
      return;
    }

    const checkAndHandleExpiry = () => {
      if (checkTokenExpiry()) {
        handleTokenExpiry();
      }
    };

    // Check on mount
    checkAndHandleExpiry();

    // Check periodically (every minute)
    const interval = setInterval(() => {
      checkAndHandleExpiry();
    }, 60000);

    return () => clearInterval(interval);
  }, [status, checkTokenExpiry, handleTokenExpiry]);
};
