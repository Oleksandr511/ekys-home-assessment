export type AuthStatus =
  | "logged_out"
  | "logging_in"
  | "logged_in"
  | "refreshing"
  | "expired";

export interface User {
  id: string;
  email: string;
  fullName: string;
}

export interface Session {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

export interface AuthState {
  status: AuthStatus;
  user: User | null;
  session: Session | null;
  error: string | null;
  pendingDeepLinkStep: number | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setError: (error: string | null) => void;
  checkTokenExpiry: () => boolean;
  refresh: (refreshToken: string) => Promise<void>;
  handleTokenExpiry: () => void;
  setPendingDeepLinkStep: (step: number | null) => void;
  clearPendingDeepLinkStep: () => void;
}
