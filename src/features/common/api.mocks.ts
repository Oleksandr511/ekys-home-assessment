import { User, Session } from "../auth/types";
import { OnboardingDraft } from "../onboarding/types";

// Helper to create a session that expires in 1 hour
const createSession = (accessToken: string, refreshToken: string): Session => {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();
  return {
    accessToken,
    refreshToken,
    expiresAt,
  };
};

// Mock email/password (for testing purposes)
const VALID_CREDENTIALS = {
  email: "test@example.com",
  password: "password123",
};

export class ApiError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly statusCode: number = 400,
  ) {
    super(message);
    this.name = "ApiError";
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  static isApiError(error: unknown): error is ApiError {
    return error instanceof ApiError;
  }

  static is401Error(error: unknown): boolean {
    return ApiError.isApiError(error) && error.statusCode === 401;
  }
}

/**
 * Mock login API
 * Valid credentials: test@example.com / password123
 */
export const apiLogin = async (
  email: string,
  password: string,
): Promise<{ user: User; session: Session }> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Validate email format
  if (!email.includes("@")) {
    throw new ApiError("INVALID_EMAIL", "Invalid email address", 400);
  }

  // Validate password
  if (!password || password.length < 3) {
    throw new ApiError(
      "INVALID_PASSWORD",
      "Password must be at least 3 characters",
      400,
    );
  }

  // Check credentials
  if (
    email !== VALID_CREDENTIALS.email ||
    password !== VALID_CREDENTIALS.password
  ) {
    throw new ApiError("INVALID_CREDENTIALS", "Invalid email or password", 401);
  }

  const user: User = {
    id: "USR-001",
    email: "jane.doe@example.com",
    fullName: "Jane Doe",
  };

  const session = createSession("access_abc_123", "refresh_def_456");

  return { user, session };
};

/**
 * Mock get current user API
 */
export const apiMe = async (accessToken: string): Promise<{ user: User }> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 400));

  if (!accessToken || accessToken !== "access_abc_123") {
    throw new ApiError("UNAUTHORIZED", "Invalid access token", 401);
  }

  return {
    user: {
      id: "USR-001",
      email: "jane.doe@example.com",
      fullName: "Jane Doe",
    },
  };
};

/**
 * Mock refresh token API
 */
export const apiRefresh = async (
  refreshToken: string,
): Promise<{ session: Session }> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (!refreshToken || refreshToken !== "refresh_def_456") {
    throw new ApiError("INVALID_REFRESH_TOKEN", "Invalid refresh token", 401);
  }

  const session = createSession("access_new_123", "refresh_new_456");
  return { session };
};

/**
 * Mock submit onboarding API
 * Validates all required fields before accepting
 */
export const apiSubmit = async (
  accessToken: string,
  draft: OnboardingDraft,
): Promise<{ submissionId: string; status: "RECEIVED" | "FAILED" }> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // Accept both original and refreshed tokens
  if (!accessToken || (accessToken !== "access_abc_123" && accessToken !== "access_new_123")) {
    throw new ApiError("UNAUTHORIZED", "Invalid access token", 401);
  }

  // Validate required fields
  const errors: string[] = [];

  if (!draft.profile.fullName?.trim()) {
    errors.push("Full name is required");
  }
  if (!draft.profile.dateOfBirth?.trim()) {
    errors.push("Date of birth is required");
  }
  if (!draft.profile.nationality?.trim()) {
    errors.push("Nationality is required");
  }
  if (!draft.document.documentType?.trim()) {
    errors.push("Document type is required");
  }
  if (!draft.document.documentNumber?.trim()) {
    errors.push("Document number is required");
  }
  if (!draft.address.addressLine1?.trim()) {
    errors.push("Address line is required");
  }
  if (!draft.address.city?.trim()) {
    errors.push("City is required");
  }
  if (!draft.address.country?.trim()) {
    errors.push("Country is required");
  }
  if (!draft.consents.termsAccepted) {
    errors.push("Terms must be accepted");
  }

  if (errors.length > 0) {
    throw new ApiError(
      "VALIDATION_ERROR",
      `Validation failed: ${errors.join(", ")}`,
      400,
    );
  }

  return {
    submissionId:
      "SUB-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    status: "RECEIVED",
  };
};
