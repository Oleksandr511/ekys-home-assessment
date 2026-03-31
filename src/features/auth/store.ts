import { create } from "zustand";
import type { AuthState } from "./types";
import { apiLogin, apiRefresh } from "../common/api.mocks";

export const useAuthStore = create<AuthState>((set, get) => ({
  status: "logged_out",
  user: null,
  session: null,
  error: null,
  pendingDeepLinkStep: null,

  login: async (email: string, password: string) => {
    set({ status: "logging_in", error: null });
    try {
      const { user, session } = await apiLogin(email, password);
      set({
        status: "logged_in",
        user,
        session,
        error: null,
      });
    } catch (err) {
      const error = err instanceof Error ? err.message : "Login failed";
      set({
        status: "logged_out",
        error,
      });
    }
  },

  logout: () => {
    set({
      status: "logged_out",
      user: null,
      session: null,
      error: null,
      pendingDeepLinkStep: null,
    });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  setPendingDeepLinkStep: (step: number | null) => {
    set({ pendingDeepLinkStep: step });
  },

  clearPendingDeepLinkStep: () => {
    set({ pendingDeepLinkStep: null });
  },

  checkTokenExpiry: () => {
    const state = get();
    // Only check expiry if there's an actual session (user is logged in)
    if (!state.session) return false;

    const expiresAt = new Date(state.session.expiresAt).getTime();
    const now = Date.now();
    return now >= expiresAt;
  },

  refresh: async (refreshToken: string) => {
    set({ status: "refreshing", error: null });
    try {
      const { session } = await apiRefresh(refreshToken);
      set({
        status: "logged_in",
        session,
        error: null,
      });
    } catch (err) {
      const error = err instanceof Error ? err.message : "Refresh failed";
      set({
        status: "logged_out",
        user: null,
        session: null,
        error,
      });
    }
  },

  handleTokenExpiry: () => {
    set({
      status: "expired",
      user: null,
      session: null,
      error: "Session expired. Please login again.",
      pendingDeepLinkStep: null,
    });
  },
}));
