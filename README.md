# eKYC Onboarding App

A React Native/Expo mobile application for electronic Know Your Customer (eKYC) onboarding. Built with Zustand for state management, TypeScript, and React Navigation.

## Features

### Milestone 1: Core UX + Baseline State ✅

- **Authentication**: Login screen with email/password validation
- **Multi-Step Onboarding**: 5-step form (Profile, Document, Selfie, Address, Review)
- **Theme System**: Light/dark mode with token-based design system
- **Settings**: Theme toggle and logout
- **Form State Sync**: Draft persists across step navigation
- **Mocked APIs**: Realistic API simulation with delays and error handling

### Milestone 2: Session Management + Synchronization ✅

- **Token Expiry Detection**: Automatic detection with periodic checks
- **Token Refresh**: Refresh-then-retry pattern for 401 errors
- **Navigation Guards**: Route protection and session expiry alerts
- **Draft Preservation**: Draft survives logout and session expiry
- **Robust Error Handling**: Clear error messages and state preservation

## Tech Stack

- **React Native** (0.81.5) + **Expo** (54.0)
- **TypeScript** (strict mode)
- **Zustand** (5.0) - State management
- **React Navigation** (7.2) - Routing
- **AsyncStorage** - Persistence
- **Jest** - Testing
- **Babel** - Transpilation

## Project Structure

```
src/
├── features/
│   ├── auth/                    # Authentication & session lifecycle
│   │   ├── store.ts            # Auth store with refresh logic
│   │   ├── types.ts            # TypeScript types
│   │   ├── useAuthGuard.ts      # Token expiry hook
│   │   └── __tests__/
│   ├── theme/                  # Theming system
│   │   ├── store.ts            # Theme store
│   │   ├── tokens.ts           # Design tokens (colors, spacing, etc.)
│   │   ├── types.ts
│   │   ├── provider.tsx        # ThemeProvider & useTheme hook
│   │   └── __tests__/
│   ├── onboarding/             # Onboarding flow
│   │   ├── store.ts            # Onboarding store + submission
│   │   ├── types.ts
│   │   └── __tests__/
│   └── common/
│       ├── api.mocks.ts        # Mocked API functions
│       └── api.wrapper.ts      # Refresh-retry wrapper
├── screens/
│   ├── LoginScreen/
│   ├── HomeScreen/
│   ├── OnboardingScreen/       # 5-step form
│   └── SettingsScreen/
├── navigators/                 # React Navigation stacks
├── components/                 # Reusable UI components
└── types/                      # Global types
```

## Getting Started

### Installation

```bash
# Install dependencies
npm install --legacy-peer-deps

# (optional) Clean cache if needed
npm cache clean --force
```

### Running the App

```bash
# Development server
npm start

# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

### Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm test -- --watch

```

## Demo Credentials

All APIs are mocked. Use these credentials to login:

**Email:** `test@example.com`
**Password:** `password123`

## Key Features Explained

### Feature-Based Architecture

Code is organized by feature (auth, theme, onboarding), not by type (components, reducers). Each feature is self-contained with its store, types, and tests.

### Zustand Stores

- **Auth Store** (`src/features/auth/store.ts`)
  - Manages: status, user, session, login/logout
  - Lifecycle: Detects expiry, handles refresh-then-retry
  - Persists: Session in memory (can be extended to AsyncStorage)

- **Theme Store** (`src/features/theme/store.ts`)
  - Manages: Current theme (light/dark)
  - Persists: Theme to AsyncStorage (survives app restart)
  - Provides: `useTheme()` hook for consuming components

- **Onboarding Store** (`src/features/onboarding/store.ts`)
  - Manages: Draft form data, current step, submission state
  - Sync: Preserves draft when navigating between steps
  - Persists: Draft to AsyncStorage (auto-resume on restart)
  - Submit: Handles refresh-then-retry on token expiry

### Session Management (M2)

The app detects token expiry and handles it gracefully:

1. **Token Expiry Check** (`checkTokenExpiry()`)
   - Compares current time with session.expiresAt
   - Runs on app load and every 60 seconds (via `useAuthGuard`)

2. **Refresh-Then-Retry Pattern**
   - On 401 error, attempts `apiRefresh()` once
   - If successful, retries original request with new token
   - If refresh fails, logs out and shows "Session Expired" alert

3. **Navigation Guard** (`RootNavigator`)
   - Subscribes to auth status
   - Routes based on: logged_out → AuthNavigator, logged_in → HomeNavigator
   - Shows alert and prevents access if session expires

### Theme System

Token-based theming with centralized design values:

```typescript
// src/features/theme/tokens.ts defines:
lightTheme = {
  colors: { primary, background, text, ... },
  spacing: { xs, sm, md, lg, xl },
  typography: { fontSize, fontWeight }
}
darkTheme = { ... }
```

Components consume via `useTheme()` hook - update once, apply everywhere.

### Form Validation

All form validation happens on submit (not on blur), as specified:

- Profile: name, DOB, nationality required
- Document: type, number required
- Address: address line, city, country required
- Review: terms must be accepted

### Mocked APIs

Located in `src/features/common/api.mocks.ts`:

- `apiLogin(email, password)` - Email/password auth with validation
- `apiMe(accessToken)` - Get current user (returns 401 if token invalid)
- `apiRefresh(refreshToken)` - Get new session with updated expiry
- `apiSubmit(accessToken, draft)` - Validate and submit onboarding

All APIs include:

- Realistic network delays (400-1200ms)
- Proper error codes (400, 401, 500)
- Validation feedback
- ApiError class for type-safe error handling

## Testing

### Test Suites (4 files, 33 tests)

1. **Theme Store** (`src/features/theme/__tests__/theme.store.test.ts`)
   - ✅ Theme toggle (light ↔ dark)
   - ✅ Token mapping for current theme
   - ✅ Persistence to AsyncStorage

2. **Onboarding Store** (`src/features/onboarding/__tests__/onboarding.store.test.ts`)
   - ✅ Draft field updates (nested objects)
   - ✅ Step navigation (next/prev)
   - ✅ Status tracking (not_started → in_progress)
   - ✅ Draft reset and persistence

3. **Auth Store** (`src/features/auth/__tests__/auth.store.test.ts`)
   - ✅ Token expiry detection
   - ✅ Token refresh flow
   - ✅ Login/logout lifecycle
   - ✅ Error state management
   - ✅ Expiry handling

4. **Onboarding Submit** (`src/features/onboarding/__tests__/onboarding.submit.test.ts`)
   - ✅ Successful submission clears draft
   - ✅ Validation fails preserve draft
   - ✅ Error states are set correctly
   - ✅ Submission status lifecycle

### Jest Configuration

- Preset: `react-native`
- Babel: Configured to handle TypeScript with `@babel/preset-typescript`
- AsyncStorage: Mocked for tests
- Setup file: Custom matchers and mocks in `jest.setup.js`

## Code Quality

✅ **Strict TypeScript**: All code typed, no `any` unless necessary
✅ **No Magic Strings**: Theme values centralized in `tokens.ts`
✅ **Clear Error Handling**: Custom `ApiError` class with status codes
✅ **Loading States**: Consistent UX across all async operations
✅ **Component Reusability**: Themed components reduce duplication
✅ **Test Coverage**: Core logic tested (stores, API, flows)
✅ **Separation of Concerns**: Feature-based architecture, clean dependencies

## Troubleshooting

### Tests failing?

```bash
npm test -- --clearCache
npm test
```

### App won't start?

```bash
npm install --legacy-peer-deps
expo start --clear
```

### Theme not persisting?

AsyncStorage is mocked in tests. In development, theme persists to device storage automatically.

## (Milestone 3 - Bonus)

Potential improvements if time permits:

2. **Deep Linking**: Support deep links like `myapp://onboarding/review`


