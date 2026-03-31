import { create } from 'zustand';
import { AuthState, User, Session } from './types';
import { apiLogin, apiMe, apiRefresh } from '../common/api.mocks';

export const useAuthStore = create<AuthState>((set) => ({
  status: 'logged_out',
  user: null,
  session: null,
  error: null,

  login: async (email: string, password: string) => {
    set({ status: 'logging_in', error: null });
    try {
      const { user, session } = await apiLogin(email, password);
      set({
        status: 'logged_in',
        user,
        session,
        error: null,
      });
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Login failed';
      set({
        status: 'logged_out',
        error,
      });
      throw err;
    }
  },

  logout: () => {
    set({
      status: 'logged_out',
      user: null,
      session: null,
      error: null,
    });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  checkTokenExpiry: () => {
    const state = useAuthStore.getState();
    if (!state.session) return true;

    const expiresAt = new Date(state.session.expiresAt).getTime();
    const now = Date.now();
    return now >= expiresAt;
  },

  refresh: async (refreshToken: string) => {
    set({ status: 'refreshing', error: null });
    try {
      const { session } = await apiRefresh(refreshToken);
      set({
        status: 'logged_in',
        session,
        error: null,
      });
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Refresh failed';
      set({
        status: 'logged_out',
        user: null,
        session: null,
        error,
      });
      throw err;
    }
  },

  handleTokenExpiry: () => {
    set({
      status: 'expired',
      user: null,
      session: null,
      error: 'Session expired. Please login again.',
    });
  },
}));
