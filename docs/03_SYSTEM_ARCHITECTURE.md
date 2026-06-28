# System Architecture — Nexus

**Version:** v1.0.0  
**Status:** Draft  
**Last Updated:** 2026-06-28  
**Changelog:**
- v1.0.0 — Initial architecture: layers, component tree, routing, data flow, auth, state, error handling, ADRs

---

## 1. Architecture Principles

1. **Frontend-first architecture.** The UI drives the design. Database and API exist to serve the screens, not the reverse.
2. **Backend-as-a-Service for MVP.** Supabase handles auth, database, storage, and RLS. No custom backend services.
3. **Server Components by default.** Next.js App Router Server Components for data fetching; Client Components only when interactivity is required.
4. **Client Components only when interactive.** Forms, toggles, tab switches, and real-time updates are client-side. Everything else stays on the server.
5. **Authentication before authorization.** Auth gates every route; RLS enforces row-level permissions at the database layer.
6. **Mobile-first responsive design.** All layouts designed for 320px first, then scale up.
7. **Zero custom backend.** No Express, FastAPI, or additional server until a requirement genuinely demands it (e.g., AI processing, background jobs).

---

## 2. High-Level Architecture

```
┌─────────────────────────────────────────────────┐
│                   Browser                        │
│  (Next.js App — Vercel Edge/Hobby)             │
│                                                   │
│  ┌─────────────────────────────────────────────┐ │
│  │          Next.js App Router                  │ │
│  │  Server Components  │  Client Components    │ │
│  │  Server Actions     │  Hooks & Context      │ │
│  └─────────────────────────────────────────────┘ │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│                   Supabase                        │
│                                                   │
│  ┌──────────┐  ┌──────────┐  ┌───────────────┐  │
│  │   Auth   │  │PostgreSQL│  │   Storage     │  │
│  │ OAuth    │  │  Tables  │  │ Cover images  │  │
│  │ JWT      │  │  RLS     │  │ Uploads       │  │
│  └──────────┘  └──────────┘  └───────────────┘  │
│                                                   │
│  ┌──────────────┐                                 │
│  │  Realtime    │  (Future: notifications)        │
│  └──────────────┘                                 │
└─────────────────────────────────────────────────┘
```

---

## 3. Application Layers

```
┌─────────────────────────────────────────────────┐
│               PRESENTATION LAYER                 │
│  Pages, Layouts, Components, Tailwind Styles     │
│  Concern: How the UI looks and feels            │
├─────────────────────────────────────────────────┤
│               APPLICATION LAYER                  │
│  Server Actions, Route Handlers, Hooks, Context  │
│  Concern: Orchestrating user intent → data      │
├─────────────────────────────────────────────────┤
│               DATA ACCESS LAYER                  │
│  Supabase Client (server & browser), Queries     │
│  Concern: Talking to the database               │
├─────────────────────────────────────────────────┤
│                    SUPABASE                      │
│  Auth | PostgreSQL | Storage | Realtime         │
│  Concern: Storing and securing data             │
└─────────────────────────────────────────────────┘
```

**Key rule:** Each layer only talks to the layer directly below it. A component never calls Supabase directly — it calls a Server Action or a hook that wraps the data access.

---

## 4. Component Tree

### 4.1 Landing / Auth

```
app/page.tsx (Landing)
├── AuthCard
│   ├── GoogleSignInButton
│   └── GitHubSignInButton
```

### 4.2 Discover Events

```
app/(main)/layout.tsx
├── BottomNav (mobile) / Sidebar (desktop)
│
app/(main)/events/page.tsx (Discover)
├── SearchBar
├── FilterBar
│   ├── ModeFilter (online/offline/hybrid)
│   └── DateSort
└── EventGrid
    └── EventCard (repeating)
        ├── CoverImage
        ├── EventTitle
        ├── EventMeta (date, mode, prize)
        └── StatusBadge
```

### 4.3 Event Details

```
app/(main)/events/[id]/page.tsx
├── EventHeader
│   ├── CoverImage
│   └── EventTitle + Tagline
├── EventInfo
│   ├── DateRange
│   ├── ModeBadge
│   ├── Location
│   └── PrizePool
├── EventDescription (markdown rendered)
├── EventTimeline
└── ApplySection
    ├── ApplyButton (if open)
    ├── AppliedBadge (if applied)
    └── ClosedBadge (if closed)
```

### 4.4 My Events

```
app/(main)/me/events/page.tsx
├── TabBar
│   ├── PendingTab
│   ├── AcceptedTab
│   ├── RejectedTab
│   └── CompletedTab
└── EventList
    └── ApplicationCard (repeating)
        ├── EventTitle
        ├── StatusBadge
        └── Actions (cancel if pending)
```

### 4.5 Developer Passport

```
app/(main)/passport/page.tsx
├── PassportHeader
│   ├── Avatar (initials fallback)
│   └── DisplayName + Email
├── ProfileForm
│   ├── CollegeInput
│   ├── SkillsInput (tag editor)
│   ├── GitHubInput (URL validation)
│   ├── BioTextarea
│   └── LookingForTeamToggle
└── SaveButton
```

### 4.6 Organizer Dashboard

```
app/(main)/organizer/page.tsx
├── DashboardHeader
│   └── CreateEventButton
├── EventManagementList
│   └── EventManagementCard (repeating)
│       ├── EventTitle + Status
│       ├── ApplicantCount
│       └── ViewApplicantsButton
│
app/(main)/organizer/events/new/page.tsx
├── EventForm
│   ├── TitleInput
│   ├── DescriptionEditor
│   ├── ModeSelect
│   ├── DateRangePicker
│   ├── RegistrationDeadlinePicker
│   ├── PrizePoolInput
│   ├── MaxParticipantsInput
│   └── PublishButton / SaveDraftButton
│
app/(main)/organizer/events/[id]/applicants/page.tsx
├── ApplicantList
│   └── ApplicantCard (repeating)
│       ├── ApplicantName + Avatar
│       ├── Skills
│       ├── StatusBadge
│       └── ApproveButton / RejectButton
```

---

## 5. Routing

### 5.1 MVP Routes

| Path | Screen | Auth Required | Role Required |
|---|---|---|---|
| `/` | Landing / Auth | No | — |
| `/events` | Discover Events | Yes | — |
| `/events/[id]` | Event Details | Yes | — |
| `/me/events` | My Events | Yes | `student` |
| `/passport` | Developer Passport | Yes | — |
| `/organizer` | Organizer Dashboard | Yes | `organizer` |
| `/organizer/events/new` | Create Event | Yes | `organizer` |
| `/organizer/events/[id]/applicants` | View Applicants | Yes | `organizer` |

### 5.2 Route Architecture

- `app/page.tsx` — Landing (public)
- `app/(main)/layout.tsx` — Authenticated shell with navigation
- `app/(main)/events/` — Discover + Details
- `app/(main)/me/` — My Events
- `app/(main)/passport/` — Developer Passport
- `app/(main)/organizer/` — Organizer Dashboard
- `app/auth/callback` — OAuth redirect handler

### 5.3 Future Routes (Reserved)

| Path | Feature | Phase |
|---|---|---|
| `/events/[id]/teams` | Team management | Phase 2 |
| `/events/[id]/submit` | Project submission | Phase 2 |
| `/notifications` | Notification center | Phase 2 |
| `/college/[id]` | College dashboard | Phase 2 |
| `/company/[id]` | Company dashboard | Phase 3 |
| `/messages` | Direct messaging | Phase 3 |
| `/sponsor/[id]` | Sponsor dashboard | Phase 4 |

---

## 6. Data Flow

### 6.1 Login Flow

```
User → Clicks "Sign in with Google"
  → Supabase Auth redirects to Google
  → User authorizes
  → Google redirects back to /auth/callback
  → Supabase creates session (JWT)
  → Next.js middleware reads session
  → Check if profile exists
    → No → Redirect to /passport (first-time setup)
    → Yes → Redirect to /events (Discover)
```

### 6.2 Event Creation Flow

```
Organizer → Fills EventForm
  → Client-side validation
  → Server Action: createEvent(formData)
    → Supabase inserts into `events` (status: draft)
    → Returns event ID
  → Redirect to /organizer (event appears in list)
  → Organizer clicks "Publish"
    → Server Action: publishEvent(eventId)
      → Supabase updates `events.status` → 'published'
      → Event now visible in Discover
```

### 6.3 Apply Flow

```
Student → Opens Event Details
  → Server Component fetches event + user's application status
  → Renders ApplyButton (if eligible)
  → Student clicks "Apply"
    → Server Action: applyToEvent(eventId)
      → Supabase inserts into `applications` (status: pending)
      → Unique constraint prevents duplicates
  → UI updates: button shows "Applied" with status badge
  → Organizer sees new applicant in dashboard
```

### 6.4 Passport Update Flow

```
Student → Opens Passport screen
  → Server Component fetches profile
  → Renders ProfileForm with current values
  → Student edits fields
  → Client-side validation before submit
  → Server Action: updateProfile(formData)
    → Supabase updates `profiles` row
  → UI shows success toast
```

---

## 7. Authentication Flow

### 7.1 OAuth Pipeline

```
Google / GitHub OAuth
        │
        ▼
Supabase Auth (creates auth.users row)
        │
        ▼
Auth Callback (/auth/callback)
        │
        ▼
Next.js Middleware (reads session cookie)
        │
        ▼
Check: profile exists in `profiles` table?
   ├── No  → Redirect to /passport (create profile)
   └── Yes → Redirect to /events (Discover)
```

### 7.2 Middleware Protection

- Middleware checks for valid Supabase session on every route
- Public routes: `/` (landing), `/auth/callback`
- Protected routes: all `/events`, `/me/*`, `/passport`, `/organizer/*`
- Role-gated routes: `/organizer/*` requires `role = 'organizer'`

### 7.3 Session Handling

- Supabase stores session in cookies (httpOnly)
- Middleware refreshes session on each request
- Server Components use `createServerComponentClient`
- Client Components use `createBrowserClient`
- On logout: clear session cookie → redirect to landing

---

## 8. Authorization

### 8.1 Application-Level Permissions

| Action | Student | Organizer |
|---|---|---|
| View Discover | ✅ | ✅ |
| View Event Details | ✅ | ✅ (own drafts too) |
| Apply to event | ✅ | ❌ |
| Cancel own application | ✅ | ❌ |
| Edit own Passport | ✅ | ✅ |
| Create event | ❌ | ✅ |
| Publish/draft event | ❌ | ✅ |
| View applicants | ❌ | ✅ (own events) |
| Approve/reject applicants | ❌ | ✅ (own events) |

### 8.2 Enforcement Layers

| Layer | Mechanism |
|---|---|
| Route level | Next.js Middleware redirects if no session / wrong role |
| Component level | Conditional rendering based on `user.role` |
| Action level | Server Action checks `auth.uid()` and role before write |
| Database level | Supabase RLS policies on every table |

---

## 9. State Management

### 9.1 Strategy

| State Type | Tool | Where Used |
|---|---|---|
| Server state (data from DB) | Server Components + Server Actions | Events, applications, profiles |
| Form state | React `useState` / `useActionState` | EventForm, ProfileForm |
| UI state (tabs, modals, toasts) | React `useState` + Context | TabBar, BottomNav, notifications |
| Auth session | Supabase Auth Client (context) | Layout, middleware |
| Theme | CSS variables + `prefers-color-scheme` | Global styles |

**No external state library.** MVP does not need Redux, Zustand, or React Query. Server Components handle data fetching natively; Server Actions handle mutations. If client-side caching becomes necessary post-MVP, React Query can be added without architectural changes.

### 9.2 Data Fetching Rules

- **Reads:** Server Components fetch data directly using Supabase server client
- **Mutations:** Server Actions handle inserts, updates, deletes
- **Revalidation:** `revalidatePath()` or `revalidateTag()` after mutations
- **Optimistic updates:** Not in MVP — keep mutations synchronous for predictability

---

## 10. Error Handling

### 10.1 Async Operation Lifecycle

Every data-fetching or mutation operation follows this pattern:

```
┌──────────┐
│  IDLE    │  Initial state (no operation in progress)
└────┬─────┘
     │ User triggers action
     ▼
┌──────────┐
│ LOADING  │  Skeleton UI or spinner shown
└────┬─────┘
     │
     ├── Success ──────► ┌──────────┐
     │                    │ SUCCESS  │  Data displayed, toast on mutations
     │                    └──────────┘
     │
     └── Error ────────► ┌──────────┐
                         │  ERROR   │  Error message + retry button
                         └──────────┘
```

### 10.2 Error Boundaries

- **Route level:** `error.tsx` per route segment
- **Global:** `global-error.tsx` for catastrophic failures
- **Not found:** `not-found.tsx` for invalid event IDs, missing profiles

### 10.3 Error Categories

| Category | Example | Handling |
|---|---|---|
| Auth | Session expired | Redirect to landing + toast |
| Network | Supabase unreachable | Retry button + offline message |
| Validation | Missing required field | Inline form error |
| Permission | Student tries to create event | Toast + disable button |
| Not found | Invalid event ID | Not-found page |
| Server | 500 from Supabase | Generic error + contact support |

---

## 11. Deployment

### 11.1 Pipeline

```
GitHub (main branch)
        │
        ▼
Vercel (automatic deploy on push)
   ├── Production: nexus.vercel.app
   └── Preview: per-branch preview URLs
        │
        ▼
Supabase (managed cloud)
   ├── Project: nexus-supabase-project
   ├── PostgreSQL database
   └── Auth / Storage configured via dashboard
```

### 11.2 Environment Variables

| Variable | Source | Used By |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard | Supabase client |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard | Supabase client |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard | Server Actions (admin) |

### 11.3 Vercel Configuration

- Framework preset: Next.js (autodetected)
- Build command: `next build` (default)
- Output directory: `.next` (default)
- Node.js version: 20.x (LTS)
- Function region: Default (auto)

### 11.4 MVP Deployment Constraints

- Free-tier Vercel (Hobby) + Free-tier Supabase
- No custom domain in MVP (use Vercel subdomain)
- No CDN optimization beyond Vercel's defaults
- No edge functions (serverless functions are sufficient)

---

## 12. Future Expansion

### 12.1 AI Service Integration (Phase 4)

```
Next.js App
    │
    ├── Server Action calls FastAPI endpoint
    │
    ▼
FastAPI Microservice (Python)
    ├── AI Team Matching (skill vectors)
    ├── AI Resume Review (profile scoring)
    ├── AI Project Judge (assistive evaluation)
    └── AI Event Recommendations (collaborative filtering)
        │
        ▼
    Supabase (reads profile/event data for inference)
```

### 12.2 Realtime (Phase 3)

- Supabase Realtime enables:
  - Live notification delivery
  - Event chat messages
  - Application status updates without polling

### 12.3 Storage Expansion (Phase 2+)

- Supabase Storage for:
  - Event cover images (MVP — via URL)
  - Project submission files (Phase 2)
  - Certificates (Phase 3)

---

## 13. Architecture Decision Records

| ADR | Decision | Reason |
|---|---|---|
| ADR-001 | **Next.js App Router** | Server Components reduce client JS; nested layouts; native Server Actions for mutations |
| ADR-002 | **Supabase** | Faster MVP than building custom backend; built-in Auth + PostgreSQL + RLS + Storage |
| ADR-003 | **Generic Event model** | Tables use `events`, `applications` not `hackathons`; supports workshops, contests, bootcamps without renaming |
| ADR-004 | **Two roles only** | Student + Organizer minimizes RLS complexity; other roles added per-phase |
| ADR-005 | **No custom backend** | Server Actions + RLS handle all MVP data flow; FastAPI only added when AI features require Python |
| ADR-006 | **Server Components by default** | Smaller client bundles; direct DB access without API layer; automatic streaming |
| ADR-007 | **No external state library** | Server Components + `useState` + Context cover all MVP needs; React Query can be added later |
| ADR-008 | **RLS for authorization** | Security enforced at database level — cannot be bypassed by client code; single source of truth |
| ADR-009 | **Mobile-first responsive** | Primary users (students) access via phone; desktop is secondary |
| ADR-010 | **UUID primary keys** | Non-sequential prevents ID enumeration; Supabase-native; RLS-safe |
| ADR-011 | **Environment variables for config** | No hardcoded secrets; different values per environment (dev/staging/prod) |
| ADR-012 | **Versioned documentation** | Each doc has version + changelog; enables tracking requirement evolution |

---

## Appendix: Technology Checklist

| Technology | Version | Purpose | MVP? |
|---|---|---|---|
| Next.js | 15.x | App framework | ✅ |
| TypeScript | 5.x | Type safety | ✅ |
| Tailwind CSS | 4.x | Styling | ✅ |
| Supabase JS Client | 2.x | Auth + DB + Storage | ✅ |
| Supabase PostgreSQL | 15.x | Database | ✅ |
| Vercel | — | Hosting | ✅ |
| GitHub | — | Source control | ✅ |
| FastAPI (Python) | — | AI microservice | ❌ Phase 4 |
