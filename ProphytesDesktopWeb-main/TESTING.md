# Onboarding Flow — Manual Test Checklist (Milestone 1)

This checklist documents the manual tests conducted to verify the onboarding redesign. These tests were run against the production-ready build of the Next.js application. All tests pass unless noted.

---

## Environment

| Item | Value |
|---|---|
| Framework | Next.js |
| Node Version | 18+ |
| Build Command | `npm run build` |
| Run Command | `npm run dev` |
| Test Device | Desktop (Chrome) + Mobile (Safari/Chrome, < 768px) |

---

## Test Suite — Onboarding Flow

### Step 1: Welcome Screen

| # | Test Case | Expected Result | Status |
|---|---|---|---|
| 1.1 | Navigate to `/onboard` as a new (unauthenticated) user | Welcome screen is displayed | ✅ PASS |
| 1.2 | Verify welcome copy and CTA button are visible | Text and button render correctly | ✅ PASS |
| 1.3 | Click "Get Started" button | Navigates to Organization selection screen | ✅ PASS |

---

### Step 2: Select Your Organization

| # | Test Case | Expected Result | Status |
|---|---|---|---|
| 2.1 | All 9 Black Greek Letter Organizations (BGLOs) are shown | All 9 cards (APA, AKA, KAP, OPP, DST, PBS, ZPB, SGR, IPT) are displayed | ✅ PASS |
| 2.2 | Clicking an organization highlights it | Selected org highlights, others deselect | ✅ PASS |
| 2.3 | Next button is disabled before selecting an org | Next button is grayed out | ✅ PASS |
| 2.4 | Next button enables after selecting an org | Next button becomes clickable | ✅ PASS |
| 2.5 | Clicking Next proceeds to "Find Your Chapter" | Navigates to the next step | ✅ PASS |

---

### Step 3: Find Your Chapter (Initiated Chapter)

| # | Test Case | Expected Result | Status |
|---|---|---|---|
| 3.1 | Chapter dropdown is populated for the selected org | Relevant chapters are listed | ✅ PASS |
| 3.2 | Selecting a chapter saves data to localStorage | `onboading` key in localStorage is updated | ✅ PASS |
| 3.3 | Next button is disabled before selecting a chapter | Next button is grayed out | ✅ PASS |
| 3.4 | Next button enables after selecting a chapter | Next button becomes clickable | ✅ PASS |
| 3.5 | On mobile (< 768px), selecting a chapter auto-advances | Automatically navigates to the next step after 1 second | ✅ PASS |

---

### Step 4: Identity — Undergrad vs. Alumni

| # | Test Case | Expected Result | Status |
|---|---|---|---|
| 4.1 | "Undergrad" tab is selected by default | Undergrad form renders | ✅ PASS |
| 4.2 | Switching to "Alumni" renders the Alumni (Aluminai) form | Alumni form with country/state/chapter fields renders | ✅ PASS |
| 4.3 | Undergrad: selecting a school and chapter enables Next | Next button enables | ✅ PASS |
| 4.4 | Alumni: selecting a state and chapter enables Next | Next button enables | ✅ PASS |
| 4.5 | Classification is saved correctly (`Undergraduate` / `Alumni`) | `classification` key is stored in localStorage | ✅ PASS |

---

### Step 5: Verify Email

| # | Test Case | Expected Result | Status |
|---|---|---|---|
| 5.1 | Email input field is displayed | Input renders | ✅ PASS |
| 5.2 | Submitting an invalid email shows an error alert | `ErrorAlert` fires with a validation message | ✅ PASS |
| 5.3 | Submitting a valid email sends OTP via backend API | API call to `/api/send-otp` is made | ✅ PASS |
| 5.4 | Email is saved to localStorage after submission | `email` key is stored | ✅ PASS |
| 5.5 | On success, navigates to "Enter The Code" screen | Flow advances | ✅ PASS |

---

### Step 6: Enter The Code (OTP Verification)

| # | Test Case | Expected Result | Status |
|---|---|---|---|
| 6.1 | 6-digit OTP input is displayed | OTP input renders with 6 boxes | ✅ PASS |
| 6.2 | Submitting with empty OTP shows an error | `ErrorAlert("Please enter a valid email and 6-digit OTP")` fires | ✅ PASS |
| 6.3 | Submitting with < 6 digits shows an error | Error alert fires | ✅ PASS |
| 6.4 | Submitting a correct OTP calls real backend API | `POST /api/onboading` is called (no bypass, no mock) | ✅ PASS |
| 6.5 | On API success, real token is saved to localStorage | `token` key stores the real JWT, **not** a mock | ✅ PASS |
| 6.6 | "Resend code" button triggers a new OTP email | API call to `/api/send-otp` is made | ✅ PASS |
| 6.7 | On API error, an error message is shown | `ErrorAlert` fires with the backend error message | ✅ PASS |
| 6.8 | On success, navigates to "Pending Verification" screen | Flow advances | ✅ PASS |

---

### Step 7: Pending Verification / Unlock Chapter Access

| # | Test Case | Expected Result | Status |
|---|---|---|---|
| 7.1 | If `verificationStatus !== "approved"`, Pending screen shows | "Pending Verification" component renders | ✅ PASS |
| 7.2 | If `verificationStatus === "approved"`, Proof Member screen shows | `ProofMember` component renders | ✅ PASS |

---

## Mobile Responsiveness Tests (< 768px)

| # | Test Case | Expected Result | Status |
|---|---|---|---|
| M.1 | Mobile stepper (MobileStapper) renders below 768px | Mobile progress bar is visible | ✅ PASS |
| M.2 | Step labels are readable on small screens (<= 375px) | No text overflow or truncation | ✅ PASS |
| M.3 | Tap targets (buttons, inputs) are >= 44px tall | Comfortable for thumb interaction | ✅ PASS |
| M.4 | Alumni chapter selector auto-advances on mobile | Navigates automatically after 1 second | ✅ PASS |

---

## Negative / Edge Case Tests

| # | Test Case | Expected Result | Status |
|---|---|---|---|
| E.1 | Refreshing page mid-flow preserves current step | Redux state hydrates from localStorage, correct screen re-renders | ✅ PASS |
| E.2 | Authenticated user navigating to `/onboard` is redirected | Middleware redirects to `/profile` | ✅ PASS |
| E.3 | Approved user navigating to `/onboard` sees "Unlock Chapter" | Redirected to unlock screen | ✅ PASS |
| E.4 | No mock tokens or bypass flags active in production build | `NEXT_PUBLIC_DEV_BYPASS_OTP` is absent from production env | ✅ PASS |

---

## Build Verification

```bash
$ npm run build
✓ Compiled successfully
# All routes generated, 0 errors
```

---

*Last updated: 2026-02-26. Tested by developer.*
