# Review: metabank-landing (commit c01c2dd)

## Scope
Commit c01c2dd "feat: real landing page + backend auth connection" touched four files:
- `src/pages/Home.jsx`
- `src/pages/Login.jsx`
- `src/pages/Register.jsx`
- `src/context/AuthContext.jsx`

---

## Part A — Home.jsx (7 required sections)

| # | Section | Present | Notes |
|---|---------|---------|-------|
| 1 | Hero — headline, subtext, "Open Account" (→/register), "Sign In" (→/login), floating card mockup | ✅ | `PageHero` with `action={{to:'/register'}}` and `secondary={{to:'/login'}}`. `HeroCard` shows card number `•••• 2048`, balance `PKR 2,450,800`, `Active` badge. |
| 2 | Why MetaBank — 3 cards (Zero hidden fees, 24/7 Digital banking, Bank-grade security) | ✅ | Exact titles match requirement. |
| 3 | Products — 4 cards (Personal Account, Business Account, MetaCard, Investments) each with icon and "Learn more" link | ✅ | All four present; each links to `/register`. |
| 4 | Live Exchange Rates — axios from open.er-api.com, USD/PKR/EUR/GBP/AED | ✅ | Fetches `https://open.er-api.com/v6/latest/USD`, renders all five currencies. |
| 5 | How it works — 3 steps (Create account → Verify identity → Start banking) | ✅ | Steps `01`/`02`/`03` with matching titles. |
| 6 | Testimonials — 3 fake quotes with name and city | ✅ | Zara Ahmed/Karachi, Hamza Raza/Lahore, Ayesha Malik/Islamabad. |
| 7 | Final CTA — "Join thousands" with Open Account button | ✅ | `<CTA title="Join thousands of customers banking smarter" … label="Open Account" />` renders button linking to `/register`. |

All 7 sections present and correctly ordered.

---

## Part B — Backend connection

### Register.jsx
- Password field: ✅ `type="password" name="password"` with `minLength={8}` and client-side guard (`form.password.length < 8`).
- Axios POST to `/api/auth/register`: ✅ `axios.post('http://localhost:4000/api/auth/register', {...})`.
- Loading state: ✅ `loading` state, button disabled during request.
- Success/error messages: ✅ `done` state shows success; `error` state shows failure message.
- Navigate to `/login` after 2 s: ✅ `setTimeout(() => navigate('/login'), 2000)`.

### Login.jsx
- Axios POST to `/api/auth/login`: ✅.
- `login()` called with `accountNumber` and `balance`: ✅ `res.data.user.accountNumber`, `res.data.user.balance` passed.
- Token saved as `mb_token`: ✅ `localStorage.setItem('mb_token', res.data.token)`.
- Offline fallback to demo mode: ✅ `if (!err.response)` branch creates a demo user and navigates after 1.2 s.

### AuthContext.jsx
- `logout` removes `mb_token`: ✅ `localStorage.removeItem('mb_token')` added.

---

## Blocker

**Missing build verification for this commit.**

The task instructions state: "Verify the build passed (the coder's commit message should confirm this). Do NOT re-run npm run build; read the coder's recorded results."

The three commits prior to HEAD all recorded build output in their message bodies (e.g., `Build: vite build -- 2135 modules transformed, 0 errors`). Commit `c01c2dd` ("feat: real landing page + backend auth connection") has no body — only the subject line. No build log file was found in the repository. The task instructions state that missing required verification blocks approval.

**Location:** git log — commit c01c2dd message body is empty.  
**Consequence:** There is no recorded evidence that `npm run build` passed after these changes. The changes are functionally correct on inspection, but approval cannot be granted without the coder's recorded build result.  
**Required correction:** The coder must run `npm run build`, confirm it exits cleanly, and amend the commit message (or push a follow-up commit) recording the build output, e.g., `Build: vite build passed — N modules, 0 errors`.
