# Jonojivan Loan + Recharge — Implementation Plan

Scope: customer-facing UI/UX only. No admin panel, no real backend, no provider integrations.
All data is mocked behind a thin service layer so a real API can be plugged in later without touching UI.

> **Git rule for this work:** nothing gets committed. All changes stay in the working tree for review.

---

## 0. Pre-flight (blockers found)

| Issue | Detail | Fix (run by you) |
|---|---|---|
| Files owned by `root` | `app/`, `public/`, `package.json`, `.git/` etc. are `root:staff`, mode `644/755`, so they can't be edited or added to as your user. | `sudo chown -R nikhil:staff ~/Desktop/loan-webiste` |
| Git "dubious ownership" | Same cause; `git status` fails. | Fixed by the `chown` above (or `git config --global --add safe.directory ~/Desktop/loan-webiste`) |

Stack confirmed: **Next.js 16.3.8 (App Router)**, React 19.2, Tailwind CSS v4, TypeScript, no `src/` folder, alias `@/*` → `./*`.

Next 16 conventions to follow (verified in `node_modules/next/dist/docs`):
- `params` / `searchParams` are **Promises** → `const { id } = await props.params`.
- Use the global `PageProps<'/transactions/[id]'>` / `LayoutProps<'/'>` helpers (no import).
- `generateStaticParams` + `export const dynamicParams = false` for the closed set of bill categories.
- Pages/layouts are Server Components by default; only interactive leaves get `'use client'`.
- Route groups `(name)` for shared layouts without changing URLs.

---

## 1. Folder structure

Strategy: **`app/` is for routing only** (pages, layouts, loading/error/not-found). All reusable code lives in root-level `components/`, `lib/`, `types/`. Route-specific, non-reusable pieces may be colocated in a private `_components/` folder.

```
loan-webiste/
├── app/
│   ├── layout.tsx                  # Root: <html>, fonts, metadata, globals.css
│   ├── globals.css                 # Tailwind v4 @theme design tokens
│   ├── not-found.tsx
│   ├── sitemap.ts                  # generated sitemap
│   ├── robots.ts
│   │
│   ├── (site)/                     # Public pages — Header + Footer + MobileBottomNav
│   │   ├── layout.tsx
│   │   ├── page.tsx                # /
│   │   ├── loans/
│   │   │   ├── page.tsx            # /loans
│   │   │   ├── personal-loan/page.tsx
│   │   │   ├── business-loan/page.tsx
│   │   │   ├── eligibility/page.tsx
│   │   │   ├── emi-calculator/page.tsx
│   │   │   └── apply/page.tsx      # step wizard
│   │   ├── recharge/
│   │   │   ├── page.tsx            # /recharge — Recharge & Bills hub
│   │   │   ├── mobile/page.tsx     # static segment wins over [category]
│   │   │   ├── dth/page.tsx
│   │   │   └── [category]/page.tsx # electricity|broadband|fastag|gas|water|landline|insurance
│   │   ├── offers/page.tsx
│   │   ├── transactions/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       ├── page.tsx
│   │   │       └── not-found.tsx
│   │   ├── support/page.tsx
│   │   ├── faq/page.tsx
│   │   ├── about/page.tsx
│   │   └── contact/page.tsx
│   │
│   └── (auth)/                     # Minimal layout: logo + centered card, no bottom nav
│       ├── layout.tsx
│       ├── login/page.tsx
│       └── register/page.tsx
│
├── components/
│   ├── ui/                         # Design-system primitives (no business logic)
│   │   ├── Button.tsx  Input.tsx  PhoneInput.tsx  AmountInput.tsx
│   │   ├── Select.tsx  BottomSheet.tsx  SheetSelect.tsx   # select → bottom sheet on mobile
│   │   ├── Tabs.tsx  SegmentedControl.tsx  Slider.tsx
│   │   ├── Card.tsx  Badge.tsx  StatusBadge.tsx  Accordion.tsx
│   │   ├── Stepper.tsx  OtpInput.tsx  StickyCTA.tsx  EmptyState.tsx  Skeleton.tsx
│   │   └── Container.tsx  SectionHeading.tsx
│   ├── layout/
│   │   ├── Header.tsx              # server; desktop nav
│   │   ├── MobileMenu.tsx          # client; hamburger drawer
│   │   ├── MobileBottomNav.tsx     # client; Home | Recharge | Loans | More
│   │   ├── Footer.tsx
│   │   └── Logo.tsx
│   ├── sections/                   # Reusable page sections
│   │   ├── Hero.tsx  QuickActions.tsx  ServiceGrid.tsx
│   │   ├── BenefitsGrid.tsx  HowItWorks.tsx  FaqSection.tsx  CtaBanner.tsx
│   └── features/
│       ├── recharge/
│       │   ├── MobileRechargeForm.tsx   # client; prepaid/postpaid, number, operator, circle
│       │   ├── PlanBrowser.tsx          # client; category tabs + plan list
│       │   ├── PlanCard.tsx
│       │   ├── PopularPlansStrip.tsx
│       │   └── DthRechargeFlow.tsx      # client; provider + subscriber → account summary
│       ├── bills/
│       │   ├── BillPaymentFlow.tsx      # client; ONE universal flow for every category
│       │   ├── BillDetailsCard.tsx
│       │   └── ProviderPicker.tsx       # searchable list, works for any # of providers
│       ├── payment/
│       │   └── PaymentResult.tsx        # success / pending / failed states
│       ├── loans/
│       │   ├── LoanProductCard.tsx
│       │   ├── LoanProductTemplate.tsx  # shared by personal + business loan pages
│       │   ├── EmiCalculator.tsx        # client; sliders + result
│       │   ├── EligibilityChecker.tsx   # client; form + result screen
│       │   └── application/
│       │       ├── LoanApplicationWizard.tsx   # client; step state machine
│       │       └── steps/ PersonalStep.tsx EmploymentStep.tsx LoanStep.tsx
│       │                  KycStep.tsx DocumentsStep.tsx ReviewStep.tsx SubmittedStep.tsx
│       ├── transactions/
│       │   ├── TransactionList.tsx      # client; type + status + date filters
│       │   ├── TransactionItem.tsx
│       │   └── TransactionDetail.tsx
│       ├── offers/OfferCard.tsx  OfferFilters.tsx
│       ├── support/SupportSearch.tsx  IssueCategories.tsx  ContactOptions.tsx
│       └── auth/LoginForm.tsx  RegisterForm.tsx
│
├── lib/
│   ├── data/                       # Static mock data (typed)
│   │   ├── services.ts             # 9 service categories: slug, label, icon, input config
│   │   ├── operators.ts  circles.ts  plans.ts  dth-providers.ts
│   │   ├── bill-providers.ts       # providers keyed by category
│   │   ├── loans.ts  offers.ts  faqs.ts  transactions.ts  navigation.ts
│   ├── services/                   # async mock "API" — the only thing UI calls
│   │   ├── recharge.ts             # getPlans, detectOperator, fetchDthAccount
│   │   ├── bills.ts                # fetchBill(category, provider, consumerNo)
│   │   ├── transactions.ts         # getTransactions, getTransaction(id)
│   │   └── loans.ts                # checkEligibility, submitApplication
│   ├── emi.ts                      # pure EMI math
│   ├── eligibility.ts              # pure eligibility rules (FOIR-style)
│   ├── format.ts                   # ₹ formatting (en-IN), dates, masking ••••4321
│   ├── validation.ts               # mobile, PAN, IFSC, pincode, etc.
│   └── cn.ts                       # className join helper
│
├── types/
│   └── index.ts                    # Service, Provider, Plan, Bill, Transaction, LoanProduct …
│
└── public/
    └── images/ …                   # logos, hero illustrations (replace Next starter SVGs)
```

### Component architecture rules
1. **Layers:** `ui` (primitives) → `sections` (composed blocks) → `features` (domain flows) → `app/**/page.tsx` (thin: fetch data, set metadata, compose).
2. **Server first:** pages, `Header`, `Footer`, cards, static sections are Server Components. `'use client'` only on interactive leaves (forms, sliders, tabs, sheets, filters, wizard, mobile nav).
3. **Data-driven, not page-per-provider:** every operator/provider/plan comes from `lib/data` via `lib/services`. Adding a provider = adding a data row, never a new page.
4. **Config-driven bill flow:** each entry in `services.ts` declares its input label (Consumer No. / Vehicle No. / Policy No.), input mode (`numeric`/`text`), pattern and helper text; `BillPaymentFlow` renders from that config.
5. **No new runtime dependencies** by default (Tailwind + React only). Icons via inline SVG / emoji per the spec. (Optional later: `lucide-react`.)

---

## 2. Design system (Phase 1)

- `app/globals.css` `@theme` tokens: brand primary (trust blue/teal), accent (recharge green), success / warning / danger, neutrals, radii, shadows, spacing; light + dark.
- Typography: keep Geist via `next/font/google`; remove the hard-coded `Arial` body font.
- Breakpoints (Tailwind defaults match spec): base `<640` mobile, `sm:` 640, `lg:` 1024.
- Touch targets ≥ 44px; full-width buttons on mobile; visible focus rings; `inputMode="numeric"` / `tel` on numeric fields.
- `BottomSheet` = native `<dialog>` styled as bottom sheet on mobile, centered modal on `lg:`.
- `StickyCTA` = fixed above `MobileBottomNav` on mobile, inline on desktop; page padding accounts for both.

---

## 3. Build phases

Each phase ends with: `npm run lint` + `npm run build` clean, then visual check at 375 / 768 / 1280px in the browser pane. **No commits.**

### Phase 1 — Foundation
- Tokens, `ui/` primitives, `cn`, `format`, `types`.
- Root layout metadata ("Jonojivan — Loans & Recharge"), `viewport` export.
- `(site)/layout.tsx`: `Header` (desktop: Logo, Home, Loans, Recharge & Bills, Offers, EMI Calculator, Help, Login, **Apply Now**; mobile: Logo, Login, hamburger), `MobileMenu`, `Footer`, `MobileBottomNav` (Home | Recharge | Loans | More → opens menu sheet). Active state via `usePathname`.
- `(auth)/layout.tsx`, `not-found.tsx`. Remove starter content/SVGs.

### Phase 2 — Home `/`
Hero (headline, supporting text, Apply for Loan / Recharge Now) → QuickActions (2×2 on mobile, 4-up on desktop) → **Recharge & Pay Bills** ServiceGrid (9 services; 2-col mobile, 3-col tablet, 4–5 col desktop) → Loan products teaser → Offers strip → How it works → FAQ preview → CTA.

### Phase 3 — Recharge & Bills
- `/recharge` hub: ServiceGrid + popular operators + recent transactions teaser.
- `/recharge/mobile`: Prepaid/Postpaid segmented control, `+91` PhoneInput (auto-detect operator/circle from mock prefix map on 10 digits, editable), operator + circle `SheetSelect`, **View Plans** sticky CTA → `PlanBrowser` (tabs: Popular, Unlimited, Data, Validity, Talktime, SMS) → plan selected in bottom sheet → mock pay → `PaymentResult`. Postpaid path → fetch bill → same bill-details UI.
- `/recharge/dth`: provider + Subscriber ID → **Continue** → customer name, current plan, due amount, recommended plans, editable recharge amount → pay → result.
- `/recharge/[category]`: `generateStaticParams` over 7 bill categories, `dynamicParams = false`, `generateMetadata` per category. Universal `BillPaymentFlow`: Select Provider (searchable, unlimited providers) → identifier field from config → **Fetch Bill** → `BillDetailsCard` (customer, due date, amount) → **Pay ₹X** → result. FASTag variant allows custom top-up amount; Insurance uses policy no. + DOB — both via config, same component.
- States everywhere: loading skeleton, invalid input, bill not found, already paid, success / pending / failed.

### Phase 4 — Loans
- `/loans`: hero "Find the Right Loan for Your Needs", Personal/Business cards, Benefits (5 cards), How It Works (5 steps, vertical on mobile, horizontal on desktop).
- `/loans/personal-loan` & `/loans/business-loan`: one `LoanProductTemplate` fed by `lib/data/loans.ts` with the 10 sections: hero, overview, amount/tenure, eligibility, documents, benefits, embedded `EmiCalculator`, process, FAQs, Apply Now.
- `/loans/emi-calculator`: three range sliders + synced inputs (amount, rate, tenure months/years), live result (EMI, principal, interest, total) + simple principal/interest bar, **Apply for Loan** → `/loans/apply?amount=…&tenure=…` (prefills wizard).
  - Check: ₹2,00,000 @ 12% × 24 → EMI ₹9,415. Spec shows interest ₹25,960 / total ₹2,25,960, which is the *rounded* EMI × 24 (exact is ₹25,953). Plan: compute totals from the rounded EMI so UI matches the spec.
- `/loans/eligibility`: income, employment type, loan amount, existing EMI, age → result screen (eligible / partially eligible with max amount / not eligible + reasons), CTA to apply. Logic in pure `lib/eligibility.ts`.
- `/loans/apply`: `LoanApplicationWizard` — Personal → Employment → Loan Requirements → KYC → Documents → Review → Submitted. Progress dots + "Step n of 6" (the spec's "of 5" mock is inconsistent with its 7 listed steps; Submitted is a terminal screen, not counted). Per-step validation, Back/Continue sticky footer, draft kept in `sessionStorage`, edit-from-review, mock reference number on submit. Document step = UI-only file pickers with preview, nothing uploaded.

### Phase 5 — Offers, Transactions, Support, FAQ
- `/offers`: filter chips (All, Recharge, Cashback, Loans, Promotions), scannable `OfferCard` (title, value, code w/ copy, validity, CTA).
- `/transactions`: type tabs (All, Recharge, Bills, Loans) + status filter (Successful, Pending, Failed) + date range; filters in URL `searchParams` so they're shareable/back-button safe; grouped by date; empty state.
- `/transactions/[id]`: status hero with distinct success/pending/failed styling, amount, provider, masked number, txn ID, date, payment method, **Download Receipt** (print stylesheet / `window.print()`), **Need Help?** → `/support?txn=id`. Unknown id → `notFound()`.
- `/support`: search ("How can we help?") filtering FAQs, 6 issue categories, contact options (WhatsApp, Call, Email, Raise Support Request form — mock submit).
- `/faq`: grouped accordion (Recharge, Bills, Loans, Payments, Account) with group tabs; FAQPage JSON-LD.

### Phase 6 — Auth + static pages
- `/login`: "Welcome Back", +91 mobile → Continue → OTP screen (6-box `OtpInput`, resend timer) → mock success. "Continue with OTP" divider per spec.
- `/register`: Name, Mobile, Email → OTP. Minimal.
- `/about`, `/contact` (address, channels, contact form — mock).

### Phase 7 — Polish & QA
- `loading.tsx` skeletons where data is "fetched"; `error.tsx` for feature segments.
- Per-page `metadata`, `sitemap.ts`, `robots.ts`, Open Graph defaults.
- Accessibility pass: labels, `aria-live` on results, keyboard nav for sheets/tabs/accordion, contrast.
- Responsive pass against spec rules (§20): mobile single-column + bottom nav + sticky CTA + bottom sheets; tablet 2-col; desktop 3–4 col, multi-column forms, side-by-side content.
- Final `npm run lint` + `npm run build`; walk every route in the browser pane at three widths.

---

## 4. Route checklist (26 screens)

| Route | Type | Key components |
|---|---|---|
| `/` | static | Hero, QuickActions, ServiceGrid |
| `/loans` | static | LoanProductCard, BenefitsGrid, HowItWorks |
| `/loans/personal-loan` | static | LoanProductTemplate |
| `/loans/business-loan` | static | LoanProductTemplate |
| `/loans/eligibility` | static + client | EligibilityChecker |
| `/loans/emi-calculator` | static + client | EmiCalculator |
| `/loans/apply` | static + client | LoanApplicationWizard |
| `/recharge` | static | ServiceGrid |
| `/recharge/mobile` | static + client | MobileRechargeForm, PlanBrowser |
| `/recharge/dth` | static + client | DthRechargeFlow |
| `/recharge/[category]` ×7 | SSG | BillPaymentFlow |
| `/offers` | static + client | OfferCard, OfferFilters |
| `/transactions` | dynamic (searchParams) | TransactionList |
| `/transactions/[id]` | dynamic | TransactionDetail |
| `/support` | static + client | SupportSearch, IssueCategories |
| `/faq` | static | Accordion |
| `/about`, `/contact` | static | — |
| `/login`, `/register` | static + client | LoginForm, RegisterForm, OtpInput |

---

## 5. Out of scope
Admin panel, real payments/BBPS/operator APIs, real auth/sessions, document storage, backend persistence. The `lib/services/*` boundary is where those plug in later.
