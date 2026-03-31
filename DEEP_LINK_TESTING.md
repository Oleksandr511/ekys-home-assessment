# Deep Link Testing Guide

## Overview

Your app now supports deep links with the scheme `myapp://`. This guide shows how to test different scenarios.

---

## Supported Deep Link Patterns

| Pattern                     | Behavior                               |
| --------------------------- | -------------------------------------- |
| `myapp://home`              | Navigate to Home screen                |
| `myapp://settings`          | Navigate to Settings screen            |
| `myapp://onboarding/1`      | Navigate to Onboarding step 1          |
| `myapp://onboarding/2`      | Navigate to Onboarding step 2          |
| `myapp://onboarding/3`      | Navigate to Onboarding step 3          |
| `myapp://onboarding/4`      | Navigate to Onboarding step 4          |
| `myapp://onboarding/5`      | Navigate to Onboarding step 5          |
| `myapp://onboarding/review` | Navigate to Onboarding step 5 (review) |

---

## Test Scenario 1: Cold Start (Logged In)

**Objective**: App is closed. User receives deep link. App should launch and navigate to the step with draft preserved.

### Steps

1. **Login to the app** (if not already logged in)
   - Use: `test@example.com` / `password123`
   - Fill out some onboarding steps (e.g., step 1: name, DOB, nationality)
   - Navigate back to Home (don't submit)
   - Close the app completely

2. **Trigger deep link** (choose one):

   **iOS Simulator:**

   ```bash
   xcrun simctl openurl booted "myapp://onboarding/review"
   ```

   **Android Emulator:**

   ```bash
   adb shell am start -W -a android.intent.action.VIEW -d "myapp://onboarding/review"
   ```

   **Physical Device (iOS):**

   ```bash
   xcrun simctl openurl <device-id> "myapp://onboarding/review"
   ```

3. **Verify**:
   - ✅ App launches directly to Onboarding screen
   - ✅ Shows Step 5 (review step)
   - ✅ Previously entered data is preserved (visible in step 5 review)
   - ✅ Can navigate back to previous steps

---

## Test Scenario 2: Cold Start (Logged Out)

**Objective**: App is closed and logged out. User receives deep link. App should show login screen first, then auto-navigate after successful login.

### Steps

1. **Logout** (if logged in)
   - Go to Settings
   - Click "Logout"
   - Close app completely

2. **Trigger deep link**:

   ```bash
   # iOS
   xcrun simctl openurl booted "myapp://onboarding/3"

   # Android
   adb shell am start -W -a android.intent.action.VIEW -d "myapp://onboarding/3"
   ```

3. **Verify**:
   - ✅ App shows Login screen (NOT onboarding)
   - ✅ Enter credentials: `test@example.com` / `password123`
   - ✅ After login, automatically navigates to Onboarding Step 3
   - ✅ Draft data is preserved from AsyncStorage

---

## Test Scenario 3: Warm Start

**Objective**: App is running. User receives deep link while using the app. App should navigate smoothly.

### Steps

1. **Start app and login**
   - App running on Home screen
   - Logged in as `test@example.com`

2. **Trigger deep link** via simulator/device:

   ```bash
   # iOS
   xcrun simctl openurl booted "myapp://onboarding/2"

   # Android
   adb shell am start -W -a android.intent.action.VIEW -d "myapp://onboarding/2"
   ```

3. **Verify**:
   - ✅ App navigates to Onboarding screen
   - ✅ Shows Step 2 (document information)
   - ✅ Existing draft is preserved (if step 1 was previously filled)
   - ✅ Can navigate between steps normally

---

## Test Scenario 4: Draft Preservation Across Steps

**Objective**: Verify that deep links don't reset draft data when jumping to a step.

### Steps

1. **Fill onboarding steps 1-2**:
   - Navigate to Onboarding
   - Step 1: Enter name, DOB, nationality → click Next
   - Step 2: Enter document type, number → click Next
   - Go back to Home

2. **Jump to step 3 via deep link**:

   ```bash
   xcrun simctl openurl booted "myapp://onboarding/3"
   ```

3. **Verify**:
   - ✅ Step 3 (selfie) is displayed
   - ✅ Click "Previous" → Step 2 data is intact
   - ✅ Click "Previous" again → Step 1 data is intact
   - ✅ No data was lost by jumping via deep link

---

## Test Scenario 5: Review Alias

**Objective**: Verify that "review" alias routes to step 5.

### Steps

1. **Trigger deep link with review alias**:

   ```bash
   xcrun simctl openurl booted "myapp://onboarding/review"
   ```

2. **Verify**:
   - ✅ Navigates to Step 5 (Review & Submit)
   - ✅ Shows review of all entered data
   - ✅ Can scroll down to see all sections

---

## Test Scenario 6: Invalid Steps

**Objective**: Verify invalid steps are handled gracefully.

### Steps

1. **Trigger invalid deep links**:

   ```bash
   # Step 0 (invalid)
   xcrun simctl openurl booted "myapp://onboarding/0"

   # Step 6 (invalid)
   xcrun simctl openurl booted "myapp://onboarding/6"

   # Step ABC (invalid)
   xcrun simctl openurl booted "myapp://onboarding/abc"
   ```

2. **Verify**:
   - ✅ App doesn't crash
   - ✅ Either stays on current screen or navigates to Home
   - ✅ No errors in console

---

## Manual Testing via Deep Link Helper

Create a test HTML file to trigger deep links easily:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Deep Link Tester</title>
  </head>
  <body>
    <h1>Deep Link Tester</h1>
    <p>Click a link below to test deep link navigation:</p>

    <h2>Logged In User (Steps)</h2>
    <ul>
      <li><a href="myapp://onboarding/1">Start Onboarding (Step 1)</a></li>
      <li><a href="myapp://onboarding/2">Document Info (Step 2)</a></li>
      <li><a href="myapp://onboarding/3">Selfie (Step 3)</a></li>
      <li><a href="myapp://onboarding/4">Address (Step 4)</a></li>
      <li><a href="myapp://onboarding/5">Review (Step 5)</a></li>
      <li><a href="myapp://onboarding/review">Review Alias</a></li>
    </ul>

    <h2>Navigation</h2>
    <ul>
      <li><a href="myapp://home">Home</a></li>
      <li><a href="myapp://settings">Settings</a></li>
    </ul>

    <h2>Logged Out User</h2>
    <p>
      Try any link above while logged out to test login → auto-navigate flow
    </p>
  </body>
</html>
```

Open this in Safari and tap links to trigger deep links.

---

## Debugging Tips

### Check Deep Link Extraction Logic

Test the URL parser directly in tests:

```typescript
import { extractStepFromUrl } from "src/navigators/linkingUtils";

// These should all return correct values:
extractStepFromUrl("myapp://onboarding/1"); // → 1
extractStepFromUrl("myapp://onboarding/5"); // → 5
extractStepFromUrl("myapp://onboarding/review"); // → 5
extractStepFromUrl("myapp://onboarding/6"); // → null (invalid)
```

Run the tests:

```bash
npm test -- src/navigators/__tests__/linking.test.ts
```

### Check App State During Deep Link

Add logging to RootNavigator:

```typescript
// In src/navigators/index.tsx - useEffect for deep links
useEffect(() => {
  const handleDeepLink = async () => {
    const url = await Linking.getInitialURL();
    console.log("Initial URL:", url);
    if (url && status === "logged_out") {
      const step = extractStepFromUrl(url);
      console.log("Extracted step:", step);
      if (step) {
        setPendingDeepLinkStep(step);
      }
    }
  };
  // ...
}, [status, setPendingDeepLinkStep]);
```

### Monitor Auth State Transitions

Check that pendingDeepLinkStep is properly set/cleared:

```bash
# In the app console, you should see:
# 1. Deep link received → pendingDeepLinkStep set to 3
# 2. Login completes → status changes to "logged_in"
# 3. Auto-navigation triggered → navigate to Onboarding with step 3
# 4. pendingDeepLinkStep cleared
```

---

## Full Test Checklist

- [ ] Cold start logged in: Deep link to step 1
- [ ] Cold start logged in: Deep link to step 5
- [ ] Cold start logged in: Deep link with review alias
- [ ] Cold start logged out: Deep link to step 2 → login → auto-navigate
- [ ] Warm start: Deep link while app running
- [ ] Draft preserved: Fill steps 1-2, jump to step 3, verify data intact
- [ ] Invalid step 0: Handled gracefully
- [ ] Invalid step 6: Handled gracefully
- [ ] Non-existent path: myapp://invalid → no crash
- [ ] All 5 steps accessible: Test myapp://onboarding/1-5
- [ ] Home screen link: myapp://home works
- [ ] Settings link: myapp://settings works
- [ ] Logout flow: pendingDeepLinkStep cleared on logout
- [ ] Session expiry: Logout on expired token (existing feature)
