# Tech Stack — Nexus

**Version:** v1.0.0  
**Status:** Draft  
**Last Updated:** 2026-06-28  
**Changelog:**
- v1.0.0 — Initial tech stack: frontend, backend, hosting, tools, justifications

---

## 1. Stack Overview

```
┌─────────────────────────────────────────────────┐
│              FRONTEND (Presentation)             │
│  Next.js 15 + TypeScript 5 + Tailwind CSS 4     │
├─────────────────────────────────────────────────┤
│              BACKEND (Data + Logic)              │
│  Supabase (Auth + PostgreSQL + Storage + RLS)    │
│  Next.js Server Actions (mutation layer)         │
├─────────────────────────────────────────────────┤
│              HOSTING + INFRASTRUCTURE            │
│  Vercel (Production + Preview)                   │
│  GitHub (Source control + CI)                    │
└─────────────────────────────────────────────────┘
```

No additional backend services, databases, queues, or caches in MVP.

---

## 2. Frontend

| Technology | Version | Purpose | Rationale |
|---|---|---|---|
| **Next.js** | 15.x | React framework | App Router, Server Components, Server Actions, file-based routing |
| **TypeScript** | 5.x | Type safety | Catch errors at compile time; self-documenting API contracts |
| **Tailwind CSS** | 4.x | Styling | Utility-first; fast iteration; consistent design tokens |
| **Lucide Icons** | latest | Iconography | Open-source, tree-shakeable, consistent outline style |

### 2.1 Why Next.js over alternatives

| Alternative | Why Not |
|---|---|
| **Vite + React** | No built-in SSR, no file-based routing, no Server Actions; would require additional libraries for auth and data fetching |
| **Remix** | Smaller ecosystem; less community support; Server Components are React-native (not Remix-native) |
| **Create React App** | Deprecated; no SSR; poor SEO |
| **Astro** | Good for content sites; not ideal for authenticated, interactive dashboards |

### 2.2 Why Tailwind over alternatives

| Alternative | Why Not |
|---|---|
| **Vanilla CSS** | Slower iteration; naming conventions; no design tokens |
| **CSS Modules** | Scoped but no utility system; every style needs a file |
| **Styled Components** | Runtime CSS-in-JS; larger bundle; slower than utility CSS |
| **Shadcn/ui** | Used as component inspiration, not as a dependency — copy/paste only what we need |

---

## 3. Backend / Database

| Technology | Version | Purpose | Rationale |
|---|---|---|---|
| **Supabase Auth** | — | Authentication | Google + GitHub OAuth built-in; JWT sessions; cookie-based |
| **Supabase PostgreSQL** | 15.x | Database | Managed PostgreSQL; RLS policies; real-time (future) |
| **Supabase Storage** | — | File storage | Cover images; project submissions (future) |
| **Next.js Server Actions** | — | API mutations | No custom backend needed; type-safe form handling |

### 3.1 Why Supabase over alternatives

| Alternative | Why Not |
|---|---|
| **Firebase** | NoSQL (bad for relational data like users × events × applications); vendor lock-in; less flexible querying |
| **Appwrite** | Smaller community; fewer resources; less mature auth |
| **Custom Node.js + PostgreSQL** | Slower MVP; need to build auth, migrations, API layer, hosting — every week spent on infra is a week not spent on product |
| **Neon + Clerk** | Two services instead of one; more complexity; Clerk is expensive at scale |

### 3.2 Why Server Actions over REST

| Approach | Why Not |
|---|---|
| **REST API (Next.js Route Handlers)** | More boilerplate (routes, validation, error mapping); Server Actions replace this with functions |
| **tRPC** | Adds a dependency; Server Actions are native to Next.js 15; tRPC adds more value in a monorepo with multiple clients |
| **GraphQL** | Massive overkill for 3 tables and 13 operations; Schema complexity for no user-facing benefit |

---

## 4. Hosting & DevOps

| Technology | Purpose | Rationale |
|---|---|---|
| **Vercel** | Frontend hosting | Built for Next.js; automatic deploys from GitHub; preview URLs per branch |
| **Supabase Cloud** | Database hosting | Managed PostgreSQL; dashboard for migrations, RLS, storage |
| **GitHub** | Source control + CI | PRs, code review, issue tracking |

### 4.1 Why Vercel over alternatives

| Alternative | Why Not |
|---|---|
| **Netlify** | Next.js support is secondary; fewer serverless region options |
| **Railway** | Better for backend services; we don't have a custom backend |
| **AWS / GCP** | Overkill for MVP; 100x more configuration |

---

## 5. Development Tools

| Tool | Purpose |
|---|---|
| **VS Code** | Editor |
| **npm** | Package manager |
| **ESLint** | Code linting |
| **Prettier** | Code formatting |
| **Supabase CLI** | Local development, migrations |
| **Vercel CLI** | Local preview builds |

---

## 6. Dependencies (package.json)

### 6.1 Production Dependencies

| Package | Purpose |
|---|---|
| `next` | Framework |
| `react` / `react-dom` | UI library |
| `@supabase/ssr` | Supabase server/client helpers for Next.js |
| `@supabase/supabase-js` | Supabase JavaScript client |
| `lucide-react` | Icons |
| `clsx` | Conditional class names |
| `tailwind-merge` | Merge Tailwind classes without conflicts |

### 6.2 Dev Dependencies

| Package | Purpose |
|---|---|
| `typescript` | Type checking |
| `@types/react` / `@types/node` | TypeScript types |
| `tailwindcss` | CSS framework |
| `postcss` / `autoprefixer` | CSS processing |
| `eslint` / `eslint-config-next` | Linting |
| `prettier` / `prettier-plugin-tailwindcss` | Formatting |

---

## 7. Future Stack Additions (Not MVP)

| Technology | Phase | Purpose |
|---|---|---|
| **FastAPI (Python)** | Phase 4 | AI microservice (team matching, resume review, project judging) |
| **Supabase Realtime** | Phase 3 | Live notifications, event chat |
| **Stripe** | Phase 4 | Premium subscriptions, sponsor payments |
| **React Query** | Phase 2 | Client-side caching if Server Components prove insufficient for data freshness |
| **shadcn/ui** | Phase 2 | Pre-built accessible components if custom components become too time-consuming |

---

## 8. Version Strategy

| Package | Update Cadence | Notes |
|---|---|---|
| Next.js | Minor versions only | Major versions may need breaking changes |
| Supabase client | Latest | Stable API; no breaking changes expected |
| Tailwind | Latest | v4 is a major upgrade from v3; lock to v4 |
| TypeScript | Latest | Always use latest stable |
