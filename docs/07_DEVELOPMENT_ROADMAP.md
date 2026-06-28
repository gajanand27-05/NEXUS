# Development Roadmap — Nexus

**Version:** v1.0.0  
**Status:** Draft  
**Last Updated:** 2026-06-28  
**Changelog:**
- v1.0.0 — Initial roadmap: 4-week MVP sprint breakdown, phases 2-4, task-level detail for Week 1

---

## 1. Timeline Overview

```
Week 1    Week 2    Week 3    Week 4
────────  ────────  ────────  ────────
Auth      Discover  My Events UI Polish
Profile   Event     Passport  Testing
DB setup  Details   Org Dash  Deploy
Landing   Apply     Create    Launch
pages     flow      Event
```

---

## 2. Milestones

| Milestone | End of Week | Deliverable | Success Gate |
|---|---|---|---|
| M1: Foundation | 1 | Auth, Profile, DB, Landing | User can sign up and create passport |
| M2: Core Discovery | 2 | Discover, Event Details, Apply | User can find and apply to an event |
| M3: User Dashboard | 3 | My Events, Passport edit, Org Dashboard | Student tracks apps; Org creates event |
| M4: Ship | 4 | Polish, test, deploy, college launch | One real hackathon runs on Nexus |

---

## 3. Week-by-Week Breakdown

### Week 1 — Foundation (M1)

| Day | Tasks | Files | Dependencies |
|---|---|---|---|
| **Mon** | Initialize Next.js + TypeScript + Tailwind; configure Supabase project; install Supabase client libs | `package.json`, `tailwind.config.ts`, `supabase/client.ts` | None |
| **Mon** | Set up folder structure (app, components, lib, types, styles) | `app/`, `components/`, `lib/`, `types/` | Above |
| **Tue** | Implement Google + GitHub OAuth; create auth callback route | `app/auth/callback/route.ts`, `supabase/auth.ts` | Supabase project |
| **Tue** | Create Supabase middleware for session handling | `middleware.ts` | Auth setup |
| **Wed** | Create `profiles` table migration; apply RLS policies | `supabase/migrations/001_profiles.sql` | Supabase project |
| **Wed** | Build Landing page UI (logo, tagline, OAuth buttons) | `app/page.tsx` | None |
| **Thu** | Build Passport create form (first login flow) | `app/(main)/passport/page.tsx` | Auth + profiles table |
| **Thu** | Server Action: createProfile, getProfile | `lib/actions/profile.ts` | Profiles table |
| **Fri** | Connect Passport form to Server Action; handle loading/success/error states | Above + components | Server Actions |
| **Fri** | Redirect logic: first login → passport, returning → discover | `middleware.ts` | Auth |
| **Sat** | Testing: auth flow, profile creation, redirects | Manual + error states | All Week 1 items |
| **Sun** | Buffer / bug fixes | — | — |

**Week 1 files created:**
- `app/` — layout, page, auth callback
- `app/(main)/` — authenticated route group
- `app/(main)/passport/` — profile creation
- `lib/actions/profile.ts`
- `types/profile.ts`
- `supabase/client.ts`, `supabase/server.ts`, `supabase/middleware.ts`

---

### Week 2 — Core Discovery (M2)

| Day | Tasks | Dependencies |
|---|---|---|
| **Mon** | Create `events` + `applications` table migrations + RLS | Week 1 DB |
| **Mon** | Seed 2-3 sample events for development | Events table |
| **Tue** | Build Discover page: Server Component fetching published events | Events table + auth |
| **Tue** | Build EventCard component (title, date, mode, prize, organizer) | — |
| **Wed** | Add search bar (client-side filter) | Discover page |
| **Wed** | Add mode filter tabs (Online / Offline / Hybrid) | Discover page |
| **Thu** | Build Event Details page with Server Component | Events table |
| **Thu** | Render full event info: description, timeline, metadata | Event Details page |
| **Fri** | Build Apply button + Server Action (applyToEvent) | Applications table |
| **Fri** | Handle "Already Applied", "Registration Closed", "Apply" states | Event Details page |
| **Sat** | Server Action: listEvents with filters | Events table |
| **Sun** | Buffer / bug fixes | — |

---

### Week 3 — User Dashboard (M3)

| Day | Tasks | Dependencies |
|---|---|---|
| **Mon** | Build My Events page with tabbed layout | Applications table |
| **Mon** | Fetch applications grouped by status (pending/accepted/rejected) | Server Action |
| **Tue** | Build ApplicationCard component with status badge | — |
| **Tue** | Add Cancel Application button + Server Action | Applications table |
| **Wed** | Build Passport edit page (update existing profile) | Week 1 profile |
| **Wed** | Add skills tag editor, GitHub URL, Looking for Team toggle | Passport page |
| **Thu** | Build Organizer Dashboard layout | — |
| **Thu** | Build Create Event form + Server Action | Events table |
| **Fri** | Build View Applicants page per event | Applications table |
| **Fri** | Build Approve/Reject buttons + Server Action | Applications table |
| **Sat** | Connect all Organizer flows end-to-end | All above |
| **Sun** | Buffer / bug fixes | — |

---

### Week 4 — Ship (M4)

| Day | Tasks | Dependencies |
|---|---|---|
| **Mon** | UI polish: consistent spacing, loading skeletons, empty states | All screens |
| **Mon** | Error boundaries: error.tsx per route segment, not-found.tsx | All routes |
| **Tue** | Mobile responsiveness audit: test at 320px, 768px, 1024px | All screens |
| **Tue** | Accessibility audit: keyboard nav, contrast, screen reader labels | All screens |
| **Wed** | Final Supabase RLS policy review and testing | Auth + all tables |
| **Wed** | Performance: lazy load images, static generation for public pages | Discover, Landing |
| **Thu** | Deploy to Vercel (production); connect custom domain (optional) | Vercel project |
| **Thu** | Set up Supabase production project; run migrations | Supabase project |
| **Fri** | College launch: partner with KNSIT tech club coordinator | Deployment |
| **Fri** | Create first real event on the platform | Organizer flow |
| **Sat** | Monitor: fix critical bugs from real usage | All systems |
| **Sun** | Retrospective: what broke, what users asked for, what to add next | Feedback |

---

## 4. Phase 2-4 Roadmap

### Phase 2 (Post-MVP — 4-6 weeks)

| Feature | Tables Needed | Dependencies |
|---|---|---|
| Team formation (create/join teams) | `teams`, `team_members` | MVP users base |
| Project submission | `projects` | Teams |
| Activity feed (system-generated posts) | `posts` | Events + applications |
| Comments on posts | `comments` | Posts |
| Notifications center | `notifications` | Applications |
| College dashboard (basic) | `colleges` | College partnerships |
| Public profile pages | `profiles` (public toggle) | MVP profiles |

### Phase 3 (6-8 weeks)

| Feature | New Infrastructure | Dependencies |
|---|---|---|
| Real-time messaging | Supabase Realtime | User base |
| Event chat channels | Supabase Realtime | Messaging |
| Company dashboard | `companies` table | Company partnerships |
| Company challenges | `challenges` table | Companies |
| Hack Score / reputation | `reputation` table | User activity data |

### Phase 4 (8-12 weeks)

| Feature | New Infrastructure | Dependencies |
|---|---|---|
| AI team matching | FastAPI microservice | Profile data + user base |
| AI resume review | FastAPI + ML model | Training data |
| AI project judging | FastAPI + ML model | Judging criteria data |
| Sponsor marketplace | `sponsorships` table | Active user base |
| Premium subscriptions | Payments (Stripe) | Revenue model |
| Native mobile app | React Native / Flutter | Validated web product |

---

## 5. Task Estimation

| Module | Estimated Hours | Complexity |
|---|---|---|
| Project setup + Supabase config | 4 | Low |
| Auth (OAuth + middleware + callback) | 6 | Medium |
| Profiles (create, edit, server actions) | 8 | Medium |
| Database migrations + RLS (all tables) | 6 | Medium |
| Landing page | 3 | Low |
| Discover events (list, search, filter) | 10 | Medium |
| Event details page | 6 | Medium |
| Apply flow (button, server action, states) | 6 | Medium |
| My events (tabs, status, cancel) | 10 | Medium |
| Organizer dashboard | 4 | Low |
| Create event form | 8 | Medium |
| View applicants + approve/reject | 8 | Medium |
| UI polish + responsive audit | 8 | Low |
| Testing + bug fixes | 8 | Medium |
| Deploy + college launch | 4 | Low |

**Total estimated hours:** 99  
**Team of 1 (full-time):** ~3-4 weeks  
**Team of 2 (full-time):** ~2 weeks  

---

## 6. Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Supabase RLS misconfiguration causes data leak | Medium | High | Thorough policy testing before launch; use Supabase SQL editor to simulate queries |
| Vercel cold starts slow down Discover page | Medium | Medium | Static generation for public pages; serverless functions warm-up |
| College partner backs out before launch | Medium | High | Have 2-3 backup clubs identified; run a small internal event instead |
| Student adoption lower than expected | High | High | Onboard via mandatory event registration; make platform the only way to register |
| OAuth provider rate limits during peak | Low | Medium | Cache auth tokens; implement graceful fallback |
| Migration conflicts between local and prod | Low | High | Use Supabase migration files (not dashboard); test migrations in preview branch first |

---

## 7. Definition of Done

A feature is complete when:

1. Code is written and type-checks with `tsc --noEmit`
2. Loading, empty, error, and edge states are implemented
3. Mobile responsive at 320px, 768px, 1024px
4. RLS policies tested with both student and organizer roles
5. Server Action returns appropriate error codes from the error catalogue
6. Feature passes manual testing on the acceptance criteria from the PRD
7. No lint warnings (`npm run lint`)

---

## 8. Dev Environment Setup

```
# Clone repo
git clone https://github.com/gajanand27-05/NEXUS.git
cd NEXUS

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

# Run Supabase locally (optional)
npx supabase start

# Run migrations
npx supabase db push

# Start dev server
npm run dev
```
