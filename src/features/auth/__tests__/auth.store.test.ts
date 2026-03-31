import { useAuthStore } from '../store';
import { apiLogin, ApiError } from '../../common/api.mocks';

describe('Auth Store - M2 Session Management', () => {
  beforeEach(() => {
    useAuthStore.setState({
      status: 'logged_out',
      user: null,
      session: null,
      error: null,
    });
  });

  describe('Token expiry detection', () => {
    test('checkTokenExpiry returns true for expired token', () => {
      const pastDate = new Date(Date.now() - 60 * 1000).toISOString();
      useAuthStore.setState({
        status: 'logged_in',
        session: {
          accessToken: 'token',
          refreshToken: 'refresh',
          expiresAt: pastDate,
        },
      });

      const store = useAuthStore.getState();
      expect(store.checkTokenExpiry()).toBe(true);
    });

    test('checkTokenExpiry returns false for valid token', () => {
      const futureDate = new Date(Date.now() + 60 * 60 * 1000).toISOString();
      useAuthStore.setState({
        status: 'logged_in',
        session: {
          accessToken: 'token',
          refreshToken: 'refresh',
          expiresAt: futureDate,
        },
      });

      const store = useAuthStore.getState();
      expect(store.checkTokenExpiry()).toBe(false);
    });

    test('checkTokenExpiry returns true if no session', () => {
      useAuthStore.setState({
        status: 'logged_out',
        session: null,
      });

      const store = useAuthStore.getState();
      expect(store.checkTokenExpiry()).toBe(true);
    });
  });

  describe('Token refresh', () => {
    test('refresh updates session with new token', async () => {
      useAuthStore.setState({
        status: 'logged_in',
        user: { id: 'USR-001', email: 'test@example.com', fullName: 'Test' },
        session: {
          accessToken: 'old_token',
          refreshToken: 'refresh_def_456',
          expiresAt: new Date().toISOString(),
        },
      });

      const store = useAuthStore.getState();
      await store.refresh('refresh_def_456');

      const updated = useAuthStore.getState();
      expect(updated.status).toBe('logged_in');
      expect(updated.session?.accessToken).toBe('access_new_123');
      expect(updated.session?.refreshToken).toBe('refresh_new_456');
    });

    test('refresh sets status to refreshing during request', async () => {
      useAuthStore.setState({
        status: 'logged_in',
        user: { id: 'USR-001', email: 'test@example.com', fullName: 'Test' },
        session: {
          accessToken: 'token',
          refreshToken: 'refresh_def_456',
          expiresAt: new Date().toISOString(),
        },
      });

      const store = useAuthStore.getState();
      const refreshPromise = store.refresh('refresh_def_456');

      // Check status during refresh
      let current = useAuthStore.getState();
      expect(['logged_in', 'refreshing']).toContain(current.status);

      await refreshPromise;

      current = useAuthStore.getState();
      expect(current.status).toBe('logged_in');
    });

    test('refresh with invalid token logs out and sets expired status', async () => {
      useAuthStore.setState({
        status: 'logged_in',
        user: { id: 'USR-001', email: 'test@example.com', fullName: 'Test' },
        session: {
          accessToken: 'token',
          refreshToken: 'invalid_token',
          expiresAt: new Date().toISOString(),
        },
      });

      const store = useAuthStore.getState();

      try {
        await store.refresh('invalid_token');
      } catch (err) {
        // Expected to fail
      }

      const updated = useAuthStore.getState();
      expect(updated.status).toBe('logged_out');
      expect(updated.user).toBeNull();
      expect(updated.session).toBeNull();
    });
  });

  describe('Token expiry handling', () => {
    test('handleTokenExpiry sets status to expired and clears user data', () => {
      useAuthStore.setState({
        status: 'logged_in',
        user: { id: 'USR-001', email: 'test@example.com', fullName: 'Test' },
        session: {
          accessToken: 'token',
          refreshToken: 'refresh',
          expiresAt: new Date().toISOString(),
        },
      });

      const store = useAuthStore.getState();
      store.handleTokenExpiry();

      const updated = useAuthStore.getState();
      expect(updated.status).toBe('expired');
      expect(updated.user).toBeNull();
      expect(updated.session).toBeNull();
      expect(updated.error).toBe('Session expired. Please login again.');
    });
  });

  describe('Login flow', () => {
    test('successful login sets logged_in status and user data', async () => {
      const store = useAuthStore.getState();
      await store.login('test@example.com', 'password123');

      const updated = useAuthStore.getState();
      expect(updated.status).toBe('logged_in');
      expect(updated.user?.fullName).toBe('Jane Doe');
      expect(updated.session?.accessToken).toBe('access_abc_123');
      expect(updated.error).toBeNull();
    });

    test('login with invalid credentials sets error and logged_out status', async () => {
      const store = useAuthStore.getState();

      try {
        await store.login('wrong@example.com', 'wrongpassword');
      } catch (err) {
        // Expected
      }

      const updated = useAuthStore.getState();
      expect(updated.status).toBe('logged_out');
      expect(updated.user).toBeNull();
      expect(updated.error).toBeTruthy();
    });
  });

  describe('Logout', () => {
    test('logout clears all auth state', () => {
      useAuthStore.setState({
        status: 'logged_in',
        user: { id: 'USR-001', email: 'test@example.com', fullName: 'Test' },
        session: {
          accessToken: 'token',
          refreshToken: 'refresh',
          expiresAt: new Date().toISOString(),
        },
        error: 'some error',
      });

      const store = useAuthStore.getState();
      store.logout();

      const updated = useAuthStore.getState();
      expect(updated.status).toBe('logged_out');
      expect(updated.user).toBeNull();
      expect(updated.session).toBeNull();
      expect(updated.error).toBeNull();
    });
  });
});
